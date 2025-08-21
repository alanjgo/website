import React from 'react'
import './Portfolio.css'

export function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "Dashboard de Visualisation de Données",
      description: "Interface moderne pour l'analyse et la présentation de données complexes avec des graphiques interactifs.",
      image: "/data-visualization-dashboard.png",
      technologies: ["React", "D3.js", "TypeScript", "CSS Modules"],
      link: "#"
    },
    {
      id: 2,
      title: "Système de Design et Composants",
      description: "Bibliothèque de composants réutilisables avec documentation complète et guide de style.",
      image: "/design-system-components-interface.png",
      technologies: ["React", "Storybook", "CSS-in-JS", "Jest"],
      link: "#"
    },
    {
      id: 3,
      title: "Interface E-commerce Moderne",
      description: "Plateforme de vente en ligne avec design épuré et expérience utilisateur optimisée.",
      image: "/modern-ecommerce-interface.png",
      technologies: ["Next.js", "Stripe", "Tailwind CSS", "PostgreSQL"],
      link: "#"
    },
    {
      id: 4,
      title: "Application Mobile Interface",
      description: "Design d'interface mobile intuitive et responsive pour application de productivité.",
      image: "/mobile-app-interface.png",
      technologies: ["React Native", "Figma", "Framer Motion", "Redux"],
      link: "#"
    },
    {
      id: 5,
      title: "Interface d'Application Web",
      description: "Application web complète avec architecture moderne et performances optimisées.",
      image: "/web-application-interface.png",
      technologies: ["Vue.js", "Node.js", "MongoDB", "Docker"],
      link: "#"
    },
    {
      id: 6,
      title: "Gradient Géométrique Minimaliste",
      description: "Design abstrait utilisant des formes géométriques et des dégradés pour créer une esthétique moderne.",
      image: "/minimalist-geometric-gradient.png",
      technologies: ["CSS", "SVG", "Canvas", "WebGL"],
      link: "#"
    }
  ]

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Portfolio</h2>
          <p className="section-subtitle">
            Une sélection de mes projets récents, montrant ma passion pour le design et le développement.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <button className="view-project-btn">Voir le projet</button>
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
