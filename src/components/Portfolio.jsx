import React from 'react'
import './Portfolio.css'

export function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "Lumi",
      description: "Get personalized financial advice with AI. Manage your money as easily as a game.",
      logo: "/lumi.png",
    },
    {
      id: 2,
      title:"Vibin",
      description: "Your social app for your close friends. On iOS.",
      logo: "/vibin.png",
    },
  ]

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
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
