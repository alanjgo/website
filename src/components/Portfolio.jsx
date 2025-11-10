import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './Portfolio.css'

export function Portfolio() {
  const [activeScreenshot, setActiveScreenshot] = useState(null)
  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "Lumi",
        description: "Get personalized financial advice with AI. Manage your money as easily as a game.",
        logo: "/lumi.png",
        screenshots: [
          {
            id: 'lumi-1',
            thumbnail: '/screenshots/screen1_lumi.png',
            full: '/screenshots/screen1_lumi.png',
            alt: 'Screenshot Lumi',
          },
          {
            id: 'lumi-2',
            thumbnail: '/screenshots/screen2_lumi.png',
            full: '/screenshots/screen2_lumi.png',
            alt: 'Screenshot Lumi',
          },
          {
            id: 'lumi-3',
            thumbnail: '/screenshots/screen3_lumi.png',
            full: '/screenshots/screen3_lumi.png',
            alt: 'Screenshot Lumi',
          },
        ],
      },
      {
        id: 2,
        title:"Vibin",
        description: "Your social app for your close friends. Guess which of your friends published a vibe.",
        logo: "/vibin.png",
        screenshots: [
          {
            id: 'vibin-1',
            thumbnail: '/screenshots/screen1_vibin.png',
            full: '/screenshots/screen1_vibin.png',
            alt: 'Screenshot Vibin',
          },
          {
            id: 'vibin-2',
            thumbnail: '/screenshots/screen2_vibin.svg',
            full: '/screenshots/screen2_vibin.svg',
            alt: 'Screenshot Vibin',
          },
          {
            id: 'vibin-3',
            thumbnail: '/screenshots/screen3_vibin.png',
            full: '/screenshots/screen3_vibin.png',
            alt: 'Screenshot Vibin',
          },
        ],
      },
    ],
    []
  )

  const resolveScreenshotAlt = (projectTitle, fallbackAlt) => {
    if (fallbackAlt && fallbackAlt.trim().length > 0) {
      return fallbackAlt
    }

    return `Screenshot ${projectTitle}`
  }

  const openScreenshot = (projectId, screenshotIndex) => {
    setActiveScreenshot({ projectId, screenshotIndex })
  }

  const closeScreenshot = () => {
    setActiveScreenshot(null)
  }

  const navigateScreenshot = useCallback(
    (step) => {
      setActiveScreenshot((current) => {
        if (!current) {
          return current
        }

        const project = projects.find((candidate) => candidate.id === current.projectId)
        const projectScreenshots = project?.screenshots ?? []

        if (projectScreenshots.length === 0) {
          return null
        }

        const nextIndex =
          (current.screenshotIndex + step + projectScreenshots.length) % projectScreenshots.length

        return { ...current, screenshotIndex: nextIndex }
      })
    },
    [projects]
  )

  const goToScreenshot = useCallback(
    (targetIndex) => {
      setActiveScreenshot((current) => {
        if (!current) {
          return current
        }

        const project = projects.find((candidate) => candidate.id === current.projectId)
        const projectScreenshots = project?.screenshots ?? []

        if (
          projectScreenshots.length === 0 ||
          targetIndex < 0 ||
          targetIndex >= projectScreenshots.length
        ) {
          return current
        }

        return { ...current, screenshotIndex: targetIndex }
      })
    },
    [projects]
  )

  useEffect(() => {
    if (!activeScreenshot) {
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveScreenshot(null)
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        navigateScreenshot(1)
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        navigateScreenshot(-1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeScreenshot, navigateScreenshot])

  const activeProject = activeScreenshot
    ? projects.find((project) => project.id === activeScreenshot.projectId)
    : null
  const activeProjectScreenshots = activeProject?.screenshots ?? []
  const currentScreenshot =
    activeProjectScreenshots[activeScreenshot?.screenshotIndex ?? 0] ?? null
  const currentScreenshotAlt = currentScreenshot
    ? resolveScreenshotAlt(activeProject?.title ?? '', currentScreenshot.alt)
    : ''
  const currentScreenshotSrc =
    currentScreenshot?.full?.trim() || currentScreenshot?.thumbnail?.trim() || ''

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="projects-section">
          <div className="projects-list">
            {projects.map((project) => (
              <div key={project.id} className="project-item">
                  <div className="project-header">
                    <div className="project-title">{project.title}</div>
                    <div className="project-info">
                      <div className="project-logo">
                          <img src={project.logo} alt={`${project.title} logo`} />
                      </div>
                    </div>
                  </div>
                  <p className="project-description">{project.description}</p>
                  {project.screenshots && project.screenshots.length > 0 && (
                    <div className="project-screenshots">
                      {project.screenshots.map((screenshot, index) => {
                        const screenshotAlt = resolveScreenshotAlt(project.title, screenshot.alt)

                        return (
                          <button
                            key={screenshot.id}
                            type="button"
                            className="project-screenshot-button"
                            onClick={() => openScreenshot(project.id, index)}
                            aria-label={`Afficher l'image ${screenshotAlt}`}
                          >
                            <img
                              src={screenshot.thumbnail || screenshot.full}
                              alt={screenshotAlt}
                              className="project-screenshot"
                            />
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
            ))}
          </div>
        </div>
      </div>
      {activeScreenshot && currentScreenshot && (
        <div
          className="screenshot-lightbox"
          onClick={closeScreenshot}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="screenshot-lightbox__content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="screenshot-lightbox__close"
              onClick={closeScreenshot}
              aria-label="Fermer le screenshot"
            >
              ✕
            </button>
            {activeProjectScreenshots.length > 1 && (
              <button
                type="button"
                className="screenshot-lightbox__nav screenshot-lightbox__nav--prev"
                onClick={() => navigateScreenshot(-1)}
                aria-label="Voir le screenshot précédent"
              >
                ‹
              </button>
            )}
            <img
              src={currentScreenshotSrc}
              alt={currentScreenshotAlt}
              className="screenshot-lightbox__image"
            />
            {activeProjectScreenshots.length > 1 && (
              <button
                type="button"
                className="screenshot-lightbox__nav screenshot-lightbox__nav--next"
                onClick={() => navigateScreenshot(1)}
                aria-label="Voir la capture suivante"
              >
                ›
              </button>
            )}
            {activeProjectScreenshots.length > 1 && (
              <div className="screenshot-lightbox__dots">
                {activeProjectScreenshots.map((_, dotIndex) => {
                  const isActive = dotIndex === activeScreenshot.screenshotIndex

                  return (
                    <button
                      key={`screenshot-dot-${dotIndex}`}
                      type="button"
                      className={`screenshot-lightbox__dot${
                        isActive ? ' screenshot-lightbox__dot--active' : ''
                      }`}
                      onClick={() => goToScreenshot(dotIndex)}
                      aria-label={`Aller à la capture ${dotIndex + 1}`}
                      aria-current={isActive ? 'true' : 'false'}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
