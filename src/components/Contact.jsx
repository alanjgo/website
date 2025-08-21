import React, { useState } from 'react'
import './Contact.css'

export function Contact() {

  return (
    <section id="contact" className="contact">
      <div className="container">
          <h2 className="section-title">Contact</h2>
        
              <div className="contact-method">
                <div className="contact-icon">📧</div>
              
              <div className="contact-method">
                <div className="contact-icon">💼</div>
                <div>
                  <h4>LinkedIn</h4>
                  <p>linkedin.com/in/alanjego</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-icon">🐙</div>
                <div>
                  <h4>GitHub</h4>
                  <p>github.com/alanjego</p>
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}
