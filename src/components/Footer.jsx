import { Link, useLocation } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import './Footer.css'

export function Footer() {
  const location = useLocation()

  return (
    <footer className="footer">
      <nav className="footer-nav">
        <Link to="/" className={`footer-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
        <Link
          to="/reading-list"
          className={`footer-link ${location.pathname === '/reading-list' ? 'active' : ''}`}
        >
          Reading List
        </Link>
        <Link
          to="/cool-sites"
          className={`footer-link ${location.pathname === '/cool-sites' ? 'active' : ''}`}
        >
          Cool Sites
        </Link>
        <a href="https://world.alanjego.com" className="footer-link" target="_blank" rel="noopener noreferrer">
          World <ExternalLink size={10} />
        </a>
      </nav>
    </footer>
  )
}
