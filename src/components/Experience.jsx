import React from 'react'
import './Experience.css'

export function Experience() {
  const experiences = [
    {
      id: 1,
      company: "TechCorp Solutions",
      position: "Développeur Frontend Senior",
      period: "2022 - Présent",
      description: "Développement d'applications web modernes avec React et Vue.js. Leadership technique d'une équipe de 5 développeurs.",
      technologies: ["React", "Vue.js", "TypeScript", "Node.js", "AWS"]
    },
    {
      id: 2,
      company: "Digital Innovations Lab",
      position: "Développeur Full Stack",
      period: "2020 - 2022",
      description: "Création de solutions web complètes, de la conception à la mise en production. Collaboration avec les équipes design et produit.",
      technologies: ["JavaScript", "Python", "Django", "PostgreSQL", "Docker"]
    },
    {
      id: 3,
      company: "Startup Creative",
      position: "Développeur Frontend",
      period: "2018 - 2020",
      description: "Développement d'interfaces utilisateur innovantes et responsive. Participation à la conception de l'expérience utilisateur.",
      technologies: ["React", "CSS3", "HTML5", "JavaScript", "Figma"]
    },
    {
      id: 4,
      company: "Web Agency Pro",
      position: "Développeur Web Junior",
      period: "2016 - 2018",
      description: "Création de sites web pour clients variés. Apprentissage des bonnes pratiques et des technologies modernes.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "WordPress"]
    }
  ]

  const skills = [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 95 },
    { name: "CSS/SCSS", level: 90 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 75 },
    { name: "SQL", level: 85 },
    { name: "Git", level: 90 },
    { name: "Figma", level: 70 }
  ]

  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Expérience & Compétences</h2>
          <p className="section-subtitle">
            Mon parcours professionnel et les technologies que j'utilise pour créer des expériences numériques exceptionnelles.
          </p>
        </div>

        <div className="experience-content">
          <div className="experience-section">
            <h3 className="subsection-title">Expérience Professionnelle</h3>
            <div className="timeline">
              {experiences.map((exp) => (
                <div key={exp.id} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4 className="company-name">{exp.company}</h4>
                      <span className="position">{exp.position}</span>
                      <span className="period">{exp.period}</span>
                    </div>
                    <p className="timeline-description">{exp.description}</p>
                    <div className="timeline-technologies">
                      {exp.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="skills-section">
            <h3 className="subsection-title">Compétences Techniques</h3>
            <div className="skills-grid">
              {skills.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
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
