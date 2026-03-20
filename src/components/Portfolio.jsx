import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './Portfolio.css'

export function Portfolio() {
  const [activeScreenshot, setActiveScreenshot] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef(null)
  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "Curiositas",
        description:
          "A blog explaining technologies used daily. No technical background required. Started with power plants and internet.",
        logo: "/curiositas-logo.svg",
        url: "https://curiositas.alanjego.com",
        screenshots: [
          {
            id: 'curiositas-1',
            thumbnail: '/curiositas-open-graph.png',
            full: '/curiositas-open-graph.png',
            alt: 'Curiositas preview',
          },
        ],
      },
      {
        id: 2,
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
        id: 3,
        title: "Vibin",
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

  const scrollToProject = useCallback((index) => {
    const container = scrollRef.current
    if (!container) return
    const child = container.children[index]
    if (!child) return
    container.scrollTo({ left: child.offsetLeft - container.offsetLeft, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const items = Array.from(container.children)
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = items.indexOf(entry.target)
            if (index !== -1) setActiveIndex(index)
          }
        }
      },
      { root: container, threshold: 0.5 }
    )

    for (const item of items) observer.observe(item)
    return () => observer.disconnect()
  }, [projects])

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
          <div className="carousel-wrapper">
            {activeIndex > 0 && (
              <button
                type="button"
                className="carousel-nav carousel-nav--prev"
                onClick={() => scrollToProject(activeIndex - 1)}
                aria-label="Previous project"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
            )}
            <div className="projects-list" ref={scrollRef}>
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
                  <div className="project-footer">
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
                    {project.url && (
                      <a
                        className="project-link project-link--corner"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.title} in a new tab`}
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M7 17 17 7" />
                          <path d="M9 7h8v8" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {activeIndex < projects.length - 1 && (
              <button
                type="button"
                className="carousel-nav carousel-nav--next"
                onClick={() => scrollToProject(activeIndex + 1)}
                aria-label="Next project"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            )}
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
                className="carousel-nav carousel-nav--prev"
                onClick={() => navigateScreenshot(-1)}
                aria-label="Voir le screenshot précédent"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
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
                className="carousel-nav carousel-nav--next"
                onClick={() => navigateScreenshot(1)}
                aria-label="Voir la capture suivante"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
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
                      className={`screenshot-lightbox__dot${isActive ? ' screenshot-lightbox__dot--active' : ''
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
