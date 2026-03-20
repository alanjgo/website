import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import './Navbar.css'

const links = [
  { to: '/', label: 'About' },
  { to: '/reading-list', label: 'Readings' },
  { to: '/cool-sites', label: 'Sites' },
]

export function Navbar() {
  const location = useLocation()

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__group">
          <nav className="navbar__nav" aria-label="Primary">
            {links.map((link) => (
              <motion.div
                key={link.to}
                className="navbar__item"
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 420, damping: 30 }}
              >
                {location.pathname === link.to && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="navbar__active-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <Link
                  to={link.to}
                  className={`navbar__link ${location.pathname === link.to ? 'is-active' : ''}`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
