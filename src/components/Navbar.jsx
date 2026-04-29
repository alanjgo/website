import { useLayoutEffect, useRef, useState } from 'react'
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
  const activeIndex = Math.max(
    links.findIndex((link) => link.to === location.pathname),
    0,
  )
  const itemRefs = useRef([])
  const [pill, setPill] = useState(null)

  useLayoutEffect(() => {
    const updatePill = () => {
      const activeItem = itemRefs.current[activeIndex]

      if (!activeItem) return

      const nextPill = {
        x: activeItem.offsetLeft,
        top: activeItem.offsetTop,
        width: activeItem.offsetWidth,
        height: activeItem.offsetHeight,
      }

      setPill((currentPill) => {
        if (
          currentPill &&
          currentPill.x === nextPill.x &&
          currentPill.top === nextPill.top &&
          currentPill.width === nextPill.width &&
          currentPill.height === nextPill.height
        ) {
          return currentPill
        }

        return nextPill
      })
    }

    updatePill()

    const resizeObserver = new ResizeObserver(updatePill)

    itemRefs.current.forEach((item) => {
      if (item) resizeObserver.observe(item)
    })

    window.addEventListener('resize', updatePill)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updatePill)
    }
  }, [activeIndex])

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__group">
          <nav className="navbar__nav" aria-label="Primary">
            {pill && (
              <motion.span
                aria-hidden="true"
                className="navbar__active-pill"
                initial={false}
                animate={{ x: pill.x, width: pill.width, height: pill.height }}
                style={{ top: pill.top }}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            {links.map((link, index) => (
              <motion.div
                key={link.to}
                ref={(node) => {
                  itemRefs.current[index] = node
                }}
                className="navbar__item"
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 420, damping: 30 }}
              >
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
