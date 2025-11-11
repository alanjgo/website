import React, { useEffect, useState } from 'react'
import './Hero.css'

export function Hero({ onMouseEnter, onMouseLeave, onClick }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section 
      id="home" 
      className="hero"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
        <div className="hero-header">
          <div className="profile-photo">
            <img src="https://ca.slack-edge.com/T02MSU1QQ-U08PARTAW22-7cb8ff5ed9ce-512" alt="Alan Jego" />
          </div>
          <h1 className="hero-title">Alan Jego</h1>
        </div>
        
        <p className="hero-subtitle">
          I like building smooth experiences on digital products.
        </p>

        <div className="hero-description">
          <p className="hero-text">
            As a Product Manager, I'm always looking to find the best way to meet business objectives and make the best product for users.
          </p>

          <p className="hero-text-secondary">
            I love exploring new technologies and interesting topics such as coding, sociology or philosophy.
          </p>
        </div>
      </div>
    </section>
  )
}
