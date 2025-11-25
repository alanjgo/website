import { useEffect, useRef } from 'react'
import './Experience.css'

export function Experience() {
  const experiences = [
    {
      id: 1,
      company: "Staycation",
      logo: "/staycation.png",
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
      logo: "/noe.png",
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
                        <a href={exp.website} target="_blank" rel="noopener noreferrer" title={`See ${exp.company} website`}>
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
