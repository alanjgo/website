import React from 'react'
import './Experience.css'

export function Experience() {
  const experiences = [
      {
        id: 1,
        company: "Staycation",
        position: "Product Manager",
        period: "2025 - Today",
        description: "In charge of creating a delightful staying experience for 4M users.",
      },
      {
        id: 2,
        company: "Skeepers",
        position: "Product Manager",
        period: "2022 - 2025",
        description: "In charge of Influencer Marketing brand users (+20M ARR).",
      },
      {
        id: 3,
        company: "Noé",
        position: "Founder associate",
        period: "2022",
        description: "Launched a recruitment platform to hire Product Managers.",
      },
      {
        id: 4,
        company: "IAE Bordeaux",
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
    </section>
  )
}
