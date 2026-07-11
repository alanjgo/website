import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { usePostHog } from '@posthog/react'
import { motion } from 'motion/react'
import { ArrowUpRight, Grid2X2, List } from 'lucide-react'
import { sites } from '../data/sites'
import './Site.css'

const PREVIEW_WIDTH = 320
const PREVIEW_HEIGHT = 264
const PREVIEW_GAP = 24
const VIEWPORT_MARGIN = 16
const VIEW_MODES = ['grid', 'list']

export function Site() {
  const displayedSites = useMemo(() => [...sites].reverse(), [])
  const cardRefs = useRef(new Map())
  const resultsRef = useRef(null)
  const viewButtonRefs = useRef([])
  const [viewMode, setViewMode] = useState('grid')
  const [viewPill, setViewPill] = useState(null)
  const [activeSiteName, setActiveSiteName] = useState(null)
  const [previewPosition, setPreviewPosition] = useState(null)
  const posthog = usePostHog()

  const activeViewIndex = Math.max(VIEW_MODES.indexOf(viewMode), 0)
  const activeSite = displayedSites.find((site) => site.name === activeSiteName) ?? null
  const hasActivePreview = viewMode === 'list' && Boolean(activeSite?.ogTitle && activeSite?.ogImage)

  useLayoutEffect(() => {
    const updateViewPill = () => {
      const activeButton = viewButtonRefs.current[activeViewIndex]

      if (!activeButton) return

      const nextViewPill = {
        x: activeButton.offsetLeft,
        top: activeButton.offsetTop,
        width: activeButton.offsetWidth,
        height: activeButton.offsetHeight,
      }

      setViewPill((currentViewPill) => {
        if (
          currentViewPill &&
          currentViewPill.x === nextViewPill.x &&
          currentViewPill.top === nextViewPill.top &&
          currentViewPill.width === nextViewPill.width &&
          currentViewPill.height === nextViewPill.height
        ) {
          return currentViewPill
        }

        return nextViewPill
      })
    }

    updateViewPill()

    const resizeObserver = new ResizeObserver(updateViewPill)

    viewButtonRefs.current.forEach((button) => {
      if (button) resizeObserver.observe(button)
    })

    window.addEventListener('resize', updateViewPill)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateViewPill)
    }
  }, [activeViewIndex])

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
    const resultsRect = resultsRef.current?.getBoundingClientRect()
    const fitsRight = window.innerWidth - rect.right >= PREVIEW_WIDTH + PREVIEW_GAP + VIEWPORT_MARGIN
    const left = fitsRight
      ? rect.right + PREVIEW_GAP
      : Math.max(VIEWPORT_MARGIN, rect.left - PREVIEW_WIDTH - PREVIEW_GAP)
    const centeredTop = rect.top + rect.height / 2 - PREVIEW_HEIGHT / 2
    const boundedTop = Math.max(resultsRect?.top ?? VIEWPORT_MARGIN, VIEWPORT_MARGIN)
    const boundedBottom = Math.min(
      resultsRect?.bottom ?? window.innerHeight - VIEWPORT_MARGIN,
      window.innerHeight - VIEWPORT_MARGIN
    )
    const maxHeight = Math.max(0, boundedBottom - boundedTop)
    const previewHeight = Math.min(PREVIEW_HEIGHT, maxHeight)
    const top = Math.min(
      Math.max(centeredTop, boundedTop),
      Math.max(boundedTop, boundedBottom - previewHeight)
    )

    setPreviewPosition({
      top,
      left,
      maxHeight,
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

  const handleViewModeChange = useCallback((nextViewMode) => {
    if (nextViewMode === viewMode) return

    posthog?.capture('cool_site_view_mode_changed', {
      from_view_mode: viewMode,
      to_view_mode: nextViewMode,
    })
    setViewMode(nextViewMode)
    setActiveSiteName(null)
    setPreviewPosition(null)
  }, [posthog, viewMode])

  return (
    <section className="site-page page-shell">
      <div className="site-header page-header">
        <div className="site-intro">
          <h1 className="site-title page-title">Cool sites</h1>
          <p className="site-description page-description">
            Websites that I love to see for fun.
          </p>
        </div>

        <div className="site-view-toggle" aria-label="Choose site view">
          {viewPill && (
            <motion.span
              aria-hidden="true"
              className="site-view-toggle__active-pill"
              initial={false}
              animate={{ x: viewPill.x, width: viewPill.width, height: viewPill.height }}
              style={{ top: viewPill.top }}
              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            />
          )}
          <motion.button
            ref={(node) => {
              viewButtonRefs.current[0] = node
            }}
            type="button"
            className={`site-view-toggle__button${viewMode === 'grid' ? ' site-view-toggle__button--active' : ''}`}
            aria-label="Grid view"
            aria-pressed={viewMode === 'grid'}
            title="Grid view"
            onClick={() => handleViewModeChange('grid')}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
          >
            <Grid2X2 size={17} aria-hidden="true" />
          </motion.button>
          <motion.button
            ref={(node) => {
              viewButtonRefs.current[1] = node
            }}
            type="button"
            className={`site-view-toggle__button${viewMode === 'list' ? ' site-view-toggle__button--active' : ''}`}
            aria-label="List view"
            aria-pressed={viewMode === 'list'}
            title="List view"
            onClick={() => handleViewModeChange('list')}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
          >
            <List size={18} aria-hidden="true" />
          </motion.button>
        </div>
      </div>

      <div ref={resultsRef} className={`site-results site-results--${viewMode}`}>
        {displayedSites.map((site) => (
          <a
            key={site.name}
            className={`site-card site-card--${viewMode}${site.name === activeSiteName ? ' site-card--active' : ''}`}
            href={site.url}
            target="_blank"
            rel="noreferrer"
            style={viewMode === 'grid' && site.ogImage ? { backgroundImage: `url(${site.ogImage})` } : undefined}
            onClick={() => posthog?.capture('cool_site_clicked', { site_name: site.name, site_url: site.url })}
            ref={(node) => {
              if (node && viewMode === 'list') {
                cardRefs.current.set(site.name, node)
              } else {
                cardRefs.current.delete(site.name)
              }
            }}
            onMouseEnter={viewMode === 'list' ? () => activatePreview(site.name) : undefined}
            onMouseLeave={viewMode === 'list' ? () => deactivatePreview(site.name) : undefined}
            onFocus={viewMode === 'list' ? () => activatePreview(site.name) : undefined}
            onBlur={viewMode === 'list' ? () => deactivatePreview(site.name) : undefined}
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
            maxHeight: `${previewPosition.maxHeight}px`,
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
