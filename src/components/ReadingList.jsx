import { useState, useMemo } from 'react'
import { books } from '../data/books'
import './ReadingList.css'

export function ReadingList() {
    const [filter] = useState('All')

    // Extract unique categories
    /* const categories = useMemo(() => {
      const cats = new Set(books.map(book => book.category))
      return ['All', ...Array.from(cats).sort()]
    }, []) */

    const filteredBooks = useMemo(() => {
        if (filter === 'All') return books
        return books.filter(book => book.category === filter)
    }, [filter])

    return (
        <section className="reading-list-container">
            <h2 className="reading-list-title">Reading List</h2>

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
                                <span className="goldmine-badge" title="Goldmine">⭐️</span>
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
