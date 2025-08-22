import React, { useEffect, useState } from 'react'
import './Hero.css'

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="hero">
      <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
        <div className="hero-header">
          <div className="profile-photo">
            <img src="https://ca.slack-edge.com/T02MSU1QQ-U08PARTAW22-7cb8ff5ed9ce-512" alt="Alan Jego" />
          </div>
          <h1 className="hero-title">Alan Jego</h1>
        </div>
        
        <p className="hero-subtitle">
          I build my ideas into beautiful, functional experiences that make a difference.
        </p>

        <div className="hero-description">
          <p className="hero-text">
            With a passion for creating meaningful digital experiences, I combine technical expertise with creative
            vision to deliver solutions that not only look beautiful but also solve real problems.
          </p>

          <p className="hero-text-secondary">
            When I'm not crafting digital experiences, you'll find me exploring new technologies, contributing to open
            source projects, or seeking inspiration in art and nature.
          </p>
        </div>
      </div>
    </section>
  )
}
