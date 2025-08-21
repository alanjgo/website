import React from 'react'
import './Experience.css'

export function Experience() {
  const experiences = [
    {
      id: 1,
      company: "Staycation",
      position: "Product Manager",
      period: "2025 - Présent",
      description: "Développement d'applications web modernes avec React et Vue.js. Leadership technique d'une équipe de 5 développeurs.",
    },
    {
      id: 2,
      company: "Skeepers",
      position: "Product Manager",
      period: "2022 - 2025",
      description: "Création de solutions web complètes, de la conception à la mise en production. Collaboration avec les équipes design et produit.",
    },
    {
      id: 3,
      company: "Noé",
      position: "Founder associate",
      period: "2022",
      description: "Développement d'interfaces utilisateur innovantes et responsive. Participation à la conception de l'expérience utilisateur.",
    },

  ]

  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Work experience</h2>
        </div>

        <div className="experience-content">
          <div className="experience-section">
            <div className="timeline">
              {experiences.map((exp) => (
                <div key={exp.id} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <p className="company-name">{exp.company}</p>
                      <span className="position">{exp.position}</span>
                      <span className="period">{exp.period}</span>
                    </div>
                    <p className="timeline-description">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
