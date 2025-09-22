import React, { useState } from 'react'
import './Portfolio.css'

// Composant Carrousel
function ImageCarousel({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <button className="carousel-btn prev" onClick={prevImage} aria-label="Image précédente">
          ‹
        </button>
        <div className="carousel-image-container">
          <img 
            src={images[currentIndex]} 
            alt={`${title} - Image ${currentIndex + 1}`}
            className="carousel-image"
          />
        </div>
        <button className="carousel-btn next" onClick={nextImage} aria-label="Image suivante">
          ›
        </button>
      </div>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "AI personal finance assistant",
      description: "In progress. Get personalized financial advice with AI. Manage your money as easily as a game.",
      image: "/5578703.png",
      link: "#"
    },
    {
      id: 2,
      title:"Vibin",
      description: "Your social app for your close friends. Available on iOS.",
      images: ["/AppStore-D.png", "/AppStore-F.png", "/Group 114.png"],
      link: "#"
    },
  ]

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                {project.images ? (
                  <ImageCarousel images={project.images} title={project.title} />
                ) : (
                  <img src={project.image} alt={project.title} />
                )}
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
