import { useState, useMemo } from 'react'
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
                <h2 className="reading-list-title">Alan's reading list</h2>
                <button
                    className={`filter-button ${showFavorites ? 'active' : ''}`}
                    onClick={() => setShowFavorites(!showFavorites)}
                >
                    <span className="filter-text">{showFavorites ? 'Show All' : 'Show Favorites'}</span>
                    <Heart size={16} fill={showFavorites ? "#dc2626" : "none"} color={showFavorites ? "#dc2626" : "currentColor"} />
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
                                <Heart className="favorite-badge" size={20} fill="#dc2626" color="#dc2626" />
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
