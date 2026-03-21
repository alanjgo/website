import { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { Heart } from 'lucide-react'
import { books } from '../data/books'
import './ReadingList.css'

export function ReadingList() {
    const [filter] = useState('All')
    const [showFavorites, setShowFavorites] = useState(false)

    // Extract unique categories
    /* const categories = useMemo(() => {
      const cats = new Set(books.map(book => book.category))
      return ['All', ...Array.from(cats).sort()]
    }, []) */

    const filteredBooks = useMemo(() => {
        let result = books

        if (filter !== 'All') {
            result = result.filter(book => book.category === filter)
        }

        if (showFavorites) {
            result = result.filter(book => book.isGoldmine)
        }

        return result
    }, [filter, showFavorites])

    return (
        <section className="reading-list-container">
            <div className="reading-list-header">
                <h1 className="reading-list-title">Alan's reading list</h1>
                <button
                    className={`filter-button ${showFavorites ? 'active' : ''}`}
                    onClick={() => setShowFavorites(!showFavorites)}
                >
                    <span className="filter-text">{showFavorites ? 'Show All' : 'Show Favorites'}</span>
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

            <div className="reading-list-grid">
                {filteredBooks.map((book, index) => (
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
                ))}
            </div>
        </section>
    )
}
