import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { usePostHog } from '@posthog/react'
import { motion, useReducedMotion } from 'motion/react'
import { Heart } from 'lucide-react'
import { books } from '../data/books'
import './ReadingList.css'

const READING_TABS = [
    { id: 'books', label: 'Books' },
    { id: 'graphic-novel', label: 'Graphic Novels' },
]

const FAVORITE_SPARKS = [
    { angle: -92, distance: 34, size: 5, delay: 0, color: 'var(--color-favorite)' },
    { angle: -46, distance: 38, size: 4, delay: 0.03, color: '#fb7185' },
    { angle: 8, distance: 35, size: 5, delay: 0.01, color: '#fda4af' },
    { angle: 52, distance: 32, size: 3, delay: 0.05, color: 'var(--color-favorite)' },
    { angle: 118, distance: 36, size: 4, delay: 0.02, color: '#fecdd3' },
    { angle: -158, distance: 31, size: 3, delay: 0.04, color: '#fb7185' },
]

const isGraphicNovel = (book) => (
    book.type === 'graphic-novel'
)

const REVEAL_GROUP_SIZE = 10
const REVEAL_STAGGER = 0.05

const getRevealScore = (title, seed) => {
    let hash = (2166136261 ^ seed) >>> 0

    for (let index = 0; index < title.length; index += 1) {
        hash ^= title.charCodeAt(index)
        hash = Math.imul(hash, 16777619)
    }

    hash ^= hash >>> 16
    hash = Math.imul(hash, 0x85ebca6b)
    hash ^= hash >>> 13

    return hash >>> 0
}

const createRandomRevealDelays = (bookList, seed) => {
    const delays = new Array(bookList.length).fill(0)

    for (let groupStart = 0; groupStart < bookList.length; groupStart += REVEAL_GROUP_SIZE) {
        const groupEnd = Math.min(groupStart + REVEAL_GROUP_SIZE, bookList.length)
        const randomOrder = Array.from(
            { length: groupEnd - groupStart },
            (_, offset) => groupStart + offset,
        ).sort((firstIndex, secondIndex) => (
            getRevealScore(bookList[firstIndex].title, seed)
            - getRevealScore(bookList[secondIndex].title, seed)
        ))

        randomOrder.forEach((bookIndex, revealIndex) => {
            delays[bookIndex] = revealIndex * REVEAL_STAGGER
        })
    }

    return delays
}

const bookCardVariants = {
    hidden: {
        opacity: 0,
        y: 12,
    },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            opacity: {
                delay,
                duration: 0.14,
                ease: 'linear',
            },
            y: {
                delay,
                duration: 0.52,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    }),
}

export function ReadingList() {
    const [activeTab, setActiveTab] = useState('books')
    const [showFavorites, setShowFavorites] = useState(false)
    const [revealSeed, setRevealSeed] = useState(0)
    const [sparkBurstId, setSparkBurstId] = useState(0)
    const [muteFavoriteHover, setMuteFavoriteHover] = useState(false)
    const shouldReduceMotion = useReducedMotion()
    const posthog = usePostHog()
    const activeTabIndex = Math.max(
        READING_TABS.findIndex((tab) => tab.id === activeTab),
        0,
    )
    const tabRefs = useRef([])
    const [tabPill, setTabPill] = useState(null)

    const filteredBooks = useMemo(() => {
        let result = books.filter((book) => (
            activeTab === 'graphic-novel' ? isGraphicNovel(book) : !isGraphicNovel(book)
        ))

        if (showFavorites) {
            result = result.filter(book => book.isGoldmine)
        }

        return result
    }, [activeTab, showFavorites])

    const revealDelays = useMemo(
        () => createRandomRevealDelays(filteredBooks, revealSeed),
        [filteredBooks, revealSeed],
    )

    useLayoutEffect(() => {
        const updateTabPill = () => {
            const activeItem = tabRefs.current[activeTabIndex]

            if (!activeItem) return

            const nextTabPill = {
                x: activeItem.offsetLeft,
                top: activeItem.offsetTop,
                width: activeItem.offsetWidth,
                height: activeItem.offsetHeight,
            }

            setTabPill((currentTabPill) => {
                if (
                    currentTabPill &&
                    currentTabPill.x === nextTabPill.x &&
                    currentTabPill.top === nextTabPill.top &&
                    currentTabPill.width === nextTabPill.width &&
                    currentTabPill.height === nextTabPill.height
                ) {
                    return currentTabPill
                }

                return nextTabPill
            })
        }

        updateTabPill()

        const resizeObserver = new ResizeObserver(updateTabPill)

        tabRefs.current.forEach((tab) => {
            if (tab) resizeObserver.observe(tab)
        })

        window.addEventListener('resize', updateTabPill)

        return () => {
            resizeObserver.disconnect()
            window.removeEventListener('resize', updateTabPill)
        }
    }, [activeTabIndex])

    useEffect(() => {
        if (!sparkBurstId) return undefined

        const timeout = window.setTimeout(() => {
            setSparkBurstId(0)
        }, 700)

        return () => window.clearTimeout(timeout)
    }, [sparkBurstId])

    return (
        <section className="reading-list-container">
            <div className="reading-list-header">
                <h1 className="reading-list-title">Alan&apos;s reading list</h1>
                <div className="reading-list-actions">
                    <div className="reading-tabs" role="tablist" aria-label="Reading list sections">
                        {tabPill && (
                            <motion.span
                                aria-hidden="true"
                                className="reading-tabs__active-pill"
                                initial={false}
                                animate={{ x: tabPill.x, width: tabPill.width, height: tabPill.height }}
                                style={{ top: tabPill.top }}
                                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                            />
                        )}
                        {READING_TABS.map((tab, index) => (
                            <motion.button
                                key={tab.id}
                                ref={(node) => {
                                    tabRefs.current[index] = node
                                }}
                                id={`reading-tab-${tab.id}`}
                                type="button"
                                role="tab"
                                aria-selected={activeTab === tab.id}
                                aria-controls="reading-list-panel"
                                className={`reading-tab ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => {
                                    posthog?.capture('reading_list_tab_switched', { tab: tab.id })
                                    if (tab.id !== activeTab) {
                                        setRevealSeed((seed) => seed + 1)
                                    }
                                    setActiveTab(tab.id)
                                }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                            >
                                {tab.label}
                            </motion.button>
                        ))}
                    </div>
                    <button
                        type="button"
                        className={`filter-button ${showFavorites ? 'active' : ''} ${muteFavoriteHover ? 'hover-muted' : ''}`}
                        aria-label={showFavorites ? 'Show all books' : 'Show favorite books'}
                        aria-pressed={showFavorites}
                        onClick={() => {
                            const next = !showFavorites
                            posthog?.capture('reading_list_favorites_toggled', { enabled: next })
                            if (next) {
                                setMuteFavoriteHover(false)
                                setSparkBurstId((currentSparkBurstId) => currentSparkBurstId + 1)
                            } else {
                                setMuteFavoriteHover(true)
                            }
                            setRevealSeed((seed) => seed + 1)
                            setShowFavorites(next)
                        }}
                        onMouseLeave={() => {
                            setMuteFavoriteHover(false)
                        }}
                    >
                        {sparkBurstId > 0 && (
                            <span
                                key={sparkBurstId}
                                className="favorite-sparks"
                                aria-hidden="true"
                            >
                                {FAVORITE_SPARKS.map((spark) => {
                                    const angle = (spark.angle * Math.PI) / 180

                                    return (
                                        <motion.span
                                            key={`${sparkBurstId}-${spark.angle}`}
                                            className="favorite-spark"
                                            initial={{
                                                opacity: 0,
                                                scale: 0.2,
                                                x: 0,
                                                y: 0,
                                            }}
                                            animate={{
                                                opacity: [0, 1, 1, 0],
                                                scale: [0.2, 1, 0.82, 0.15],
                                                x: Math.cos(angle) * spark.distance,
                                                y: Math.sin(angle) * spark.distance,
                                                rotate: spark.angle + 90,
                                            }}
                                            transition={{
                                                duration: 0.54,
                                                delay: spark.delay,
                                                ease: 'easeOut',
                                            }}
                                            style={{
                                                '--spark-size': `${spark.size}px`,
                                                '--spark-color': spark.color,
                                            }}
                                        />
                                    )
                                })}
                            </span>
                        )}
                        <motion.span
                            className="filter-heart"
                            initial={false}
                            animate={showFavorites
                                ? { scale: [1, 1.28, 0.94, 1], rotate: [-8, 6, 0] }
                                : { scale: [1, 0.92, 1], rotate: [0, -4, 0] }
                            }
                            transition={{ duration: 0.28, ease: 'easeOut' }}
                        >
                            <Heart size={16} fill={showFavorites ? "var(--color-favorite)" : "none"} color={showFavorites ? "var(--color-favorite)" : "currentColor"} />
                        </motion.span>
                    </button>
                </div>
            </div>

            <div
                key={`${activeTab}-${showFavorites ? 'favorites' : 'all'}`}
                id="reading-list-panel"
                className="reading-list-grid"
                role="tabpanel"
                aria-labelledby={`reading-tab-${activeTab}`}
            >
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                        <motion.article
                            key={book.title}
                            className="book-card"
                            custom={revealDelays[index]}
                            variants={bookCardVariants}
                            initial={shouldReduceMotion ? false : 'hidden'}
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.12 }}
                        >
                            <div className="book-cover-container">
                                {book.cover ? (
                                    <img
                                        src={book.cover}
                                        alt={`Cover of ${book.title}`}
                                        className="book-cover-image"
                                        loading={index < 10 ? 'eager' : 'lazy'}
                                    />
                                ) : (
                                    <div className="book-cover-placeholder">
                                        <span>{book.title[0]}</span>
                                    </div>
                                )}
                                {book.isGoldmine && (
                                    <Heart className="favorite-badge" size={20} fill="var(--color-favorite)" color="var(--color-favorite)" />
                                )}
                            </div>

                            <div className="book-info">
                                <h3 className="book-title">{book.title}</h3>
                                <p className="book-author">{book.author}</p>
                            </div>
                        </motion.article>
                    ))
                ) : (
                    <motion.p
                        className="reading-list-empty"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        No titles here yet.
                    </motion.p>
                )}
            </div>
        </section>
    )
}
