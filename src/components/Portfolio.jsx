import React from 'react'
import './Portfolio.css'

export function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "AI personal finance assistant",
      description: "In progress. Get personalized financial advice with AI",
      image: "/design-system-components-interface.png",
      link: "#"
    },
    {
      id: 2,
      title:"Vibin",
      description: "Your social app for your close friends",
      image: "/src/components/assets/vibin.svg",
      link: "#"
    },
    {
      id: 3,
      title: "tchinandchill",
      description: "Website for a local cavist",
      image: "https://tchinandchill.com/wp-content/uploads/2021/02/Tchin-and-chill-Pour-un-plaisir-partage-vect-bio-blanc-1.png",
      link: "#"
    },
  ]

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Portfolio</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
