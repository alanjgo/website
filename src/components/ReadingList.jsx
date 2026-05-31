import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Heart } from 'lucide-react'
import { books } from '../data/books'
import './ReadingList.css'

const READING_TABS = [
    { id: 'books', label: 'Books' },
    { id: 'graphic-novel', label: 'Graphic Novel' },
]

const isGraphicNovel = (book) => (
    book.type === 'graphic-novel'
)

export function ReadingList() {
    const [activeTab, setActiveTab] = useState('books')
    const [showFavorites, setShowFavorites] = useState(false)
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
                                onClick={() => setActiveTab(tab.id)}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                            >
                                {tab.label}
                            </motion.button>
                        ))}
                    </div>
                    <button
                        type="button"
                        className={`filter-button ${showFavorites ? 'active' : ''}`}
                        aria-label={showFavorites ? 'Show all books' : 'Show favorite books'}
                        aria-pressed={showFavorites}
                        onClick={() => setShowFavorites(!showFavorites)}
                    >
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
                id="reading-list-panel"
                className="reading-list-grid"
                role="tabpanel"
                aria-labelledby={`reading-tab-${activeTab}`}
            >
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                        <article
                            key={`${book.title}-${index}`}
                            className="book-card"
                        >
                            <div className="book-cover-container">
                                {book.cover ? (
                                    <img
                                        src={book.cover}
                                        alt={`Cover of ${book.title}`}
                                        className="book-cover-image"
                                        loading="lazy"
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
                        </article>
                    ))
                ) : (
                    <p className="reading-list-empty">No titles here yet.</p>
                )}
            </div>
        </section>
    )
}
