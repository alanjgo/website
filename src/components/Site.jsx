import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { sites } from '../data/sites'
import './Site.css'

const PREVIEW_WIDTH = 320
const PREVIEW_HEIGHT = 248
const PREVIEW_GAP = 24
const VIEWPORT_MARGIN = 16

export function Site() {
  const displayedSites = useMemo(() => [...sites].reverse(), [])
  const cardRefs = useRef(new Map())
  const [activeSiteName, setActiveSiteName] = useState(null)
  const [previewPosition, setPreviewPosition] = useState(null)

  const activeSite = displayedSites.find((site) => site.name === activeSiteName) ?? null
  const hasActivePreview = Boolean(activeSite?.ogTitle && activeSite?.ogImage)

  const updatePreviewPosition = useCallback(() => {
    if (!activeSiteName) {
      setPreviewPosition(null)
      return
    }

    const activeCard = cardRefs.current.get(activeSiteName)

    if (!activeCard) {
      setPreviewPosition(null)
      return
    }

    const rect = activeCard.getBoundingClientRect()
    const fitsRight = window.innerWidth - rect.right >= PREVIEW_WIDTH + PREVIEW_GAP + VIEWPORT_MARGIN
    const left = fitsRight
      ? rect.right + PREVIEW_GAP
      : Math.max(VIEWPORT_MARGIN, rect.left - PREVIEW_WIDTH - PREVIEW_GAP)
    const centeredTop = rect.top + rect.height / 2 - PREVIEW_HEIGHT / 2
    const top = Math.min(
      Math.max(centeredTop, VIEWPORT_MARGIN),
      window.innerHeight - PREVIEW_HEIGHT - VIEWPORT_MARGIN
    )

    setPreviewPosition({
      top,
      left,
    })
  }, [activeSiteName])

  useEffect(() => {
    if (!hasActivePreview) {
      setPreviewPosition(null)
      return undefined
    }

    updatePreviewPosition()

    const handleViewportChange = () => {
      updatePreviewPosition()
    }

    window.addEventListener('resize', handleViewportChange)
    window.addEventListener('scroll', handleViewportChange, true)

    return () => {
      window.removeEventListener('resize', handleViewportChange)
      window.removeEventListener('scroll', handleViewportChange, true)
    }
  }, [hasActivePreview, updatePreviewPosition])

  const activatePreview = useCallback((siteName) => {
    setActiveSiteName(siteName)
  }, [])

  const deactivatePreview = useCallback((siteName) => {
    setActiveSiteName((currentSiteName) => (currentSiteName === siteName ? null : currentSiteName))
  }, [])

  return (
    <section className="site-page">
      <div className="site-intro">
        <h1 className="site-title">Cool sites</h1>
        <p className="site-description">
          A list of great websites.
        </p>
      </div>

      <div className="site-grid">
        {displayedSites.map((site) => (
          <a
            key={site.name}
            className={`site-card${site.name === activeSiteName ? ' site-card--active' : ''}`}
            href={site.url}
            target="_blank"
            rel="noreferrer"
            ref={(node) => {
              if (node) {
                cardRefs.current.set(site.name, node)
              } else {
                cardRefs.current.delete(site.name)
              }
            }}
            onMouseEnter={() => activatePreview(site.name)}
            onMouseLeave={() => deactivatePreview(site.name)}
            onFocus={() => activatePreview(site.name)}
            onBlur={() => deactivatePreview(site.name)}
          >
            <div className="site-heading">
              <div className="site-name-group">
                <img
                  className="site-favicon"
                  src={`https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(site.url)}`}
                  alt=""
                  loading="lazy"
                />
                <p className="site-name">{site.name}</p>
              </div>
              <ArrowUpRight size={18} />
            </div>
          </a>
        ))}
      </div>

      {hasActivePreview && previewPosition ? (
        <div
          className="site-preview"
          aria-hidden="true"
          style={{
            top: `${previewPosition.top}px`,
            left: `${previewPosition.left}px`,
          }}
        >
          <div className="site-preview__image-frame">
            <img
              className="site-preview__image"
              src={activeSite.ogImage}
              alt=""
              loading="eager"
            />
          </div>
          <p className="site-preview__title">{activeSite.ogTitle}</p>
        </div>
      ) : null}
    </section>
  )
}
