import React from 'react'
import './Experience.css'

export function Experience() {
  const experiences = [
      {
        id: 1,
        company: "Staycation",
        logo: "/public/staycation.png",
        website: "https://staycation.co",
        position: "Product Manager",
        period: "2025 - Today",
        description: "In charge of creating a delightful staying experience for 4M users.",
      },
      {
        id: 2,
        company: "Skeepers",
        logo: "/skeepers.jpeg",
        website: "https://skeepers.com",
        position: "Product Manager",
        period: "2022 - 2025",
        description: "In charge of Influencer Marketing brand users (+1 000 Mid-Enterprise level brands).",
      },
      {
        id: 3,
        company: "Noé",
        logo: "data:image/jpeg;base64,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",
        position: "Founder associate",
        website: "https://www.noe.pm",
        period: "2022",
        description: "Launched a recruitment platform to hire Product Managers.",
      },
      {
        id: 4,
        company: "IAE Bordeaux",
        logo: "/iaebordeaux.jpeg",
        website: "https://www.iae-bordeaux.fr",
        position: "Student",
        period: "2020 - 2022",
        description: "Master of Strategic Marketing",
      },

  ]

  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
        </div>
          <div className="experience-section">
            <div className="timeline">
              {experiences.map((exp) => (
                <div key={exp.id} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <div className="position">{exp.position}</div>
                      <div className="company-info">
                        <p className="company-name">{exp.company}</p>
                        <div className="company-logo">
                          <a href={exp.website} target="_blank" rel="noopener noreferrer" title={`Voir le site de ${exp.company}`}>
                            <img src={exp.logo} alt={`${exp.company} logo`} />
                          </a>
                        </div>
                        <span className="period">{exp.period}</span>
                      </div>
                    </div>
                    <p className="timeline-description">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </section>
  )
}
