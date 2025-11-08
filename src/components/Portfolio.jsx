import React, { useEffect, useState } from 'react'
import './Portfolio.css'

export function Portfolio() {
  const [activeScreenshot, setActiveScreenshot] = useState(null)
  const projects = [
    {
      id: 1,
      title: "Lumi",
      description: "Get personalized financial advice with AI. Manage your money as easily as a game.",
      logo: "/lumi.png",
      screenshots: [
        {
          id: 'lumi-1',
          thumbnail: '/screenshots/lumi-thumb.png',
          full: '/screenshots/lumi.png',
          alt: 'Interface principale de Lumi',
        },
      ],
    },
    {
      id: 2,
      title:"Vibin",
      description: "Your social app for your close friends. On iOS.",
      logo: "/vibin.png",
      screenshots: [
        {
          id: 'vibin-1',
          thumbnail: '/screenshots/vibin-thumb.png',
          full: '/screenshots/vibin.png',
          alt: 'Flux social de Vibin',
        },
      ],
    },
  ]

  useEffect(() => {
    if (!activeScreenshot) {
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveScreenshot(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeScreenshot])

  const openScreenshot = (screenshot) => {
    setActiveScreenshot(screenshot)
  }

  const closeScreenshot = () => {
    setActiveScreenshot(null)
  }

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
                      {project.screenshots.map((screenshot) => (
                        <button
                          key={screenshot.id}
                          type="button"
                          className="project-screenshot-button"
                          onClick={() =>
                            openScreenshot({
                              src: screenshot.full,
                              alt: screenshot.alt ?? `Capture du projet ${project.title}`,
                            })
                          }
                          aria-label={`Afficher le screenshot ${screenshot.alt ?? `du projet ${project.title}`}`}
                        >
                          <img
                            src={screenshot.thumbnail || screenshot.full}
                            alt={screenshot.alt ?? `Screenshot du projet ${project.title}`}
                            className="project-screenshot"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
            ))}
          </div>
        </div>
      </div>
      {activeScreenshot && (
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
              aria-label="Fermer la capture"
            >
              ×
            </button>
            <img
              src={activeScreenshot.src}
              alt={activeScreenshot.alt}
              className="screenshot-lightbox__image"
            />
          </div>
        </div>
      )}
    </section>
  )
}
