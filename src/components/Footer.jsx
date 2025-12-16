import { Link, useLocation } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import './Footer.css'

export function Footer() {
  const location = useLocation()
  const isReadingList = location.pathname === '/reading-list'

  return (
    <footer className="footer">
      <nav className="footer-nav">
        {isReadingList ? (
          <Link to="/" className="footer-link">Home</Link>
        ) : (
          <Link to="/reading-list" className="footer-link">Reading List</Link>
        )}
        <a href="https://world.alanjego.com" className="footer-link" target="_blank" rel="noopener noreferrer">
          World <ExternalLink size={10} />
        </a>
      </nav>
    </footer>
  )
}
