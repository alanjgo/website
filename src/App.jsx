import React, { useState } from 'react'
import { Hero } from './components/Hero'
import { Card } from './components/Card'
import { Portfolio } from './components/Portfolio'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'
import { Analytics } from '@vercel/analytics/react'

function App() {
  const [isCardVisible, setIsCardVisible] = useState(false)
  const [isCardClicked, setIsCardClicked] = useState(false)

  const handleMouseEnter = () => {
    setIsCardVisible(true)
    setIsCardClicked(false)
  }

  const handleMouseLeave = () => {
    if (!isCardClicked) {
      setIsCardVisible(false)
    }
  }

  const handleClick = () => {
    setIsCardVisible(true)
    setIsCardClicked(true)
  }

  return (
    <main className="app">
      <Hero 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
      <Contact /> 
      <Card 
        isVisible={isCardVisible} 
        onClick={() => {
          setIsCardVisible(false)
          setIsCardClicked(false)
        }} 
      />
      <Experience />
      <Portfolio />
      <Analytics />
    </main>
  )
}

export default App
