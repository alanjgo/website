import React from 'react'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { Portfolio } from './components/Portfolio'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'

function App() {
  return (
    <main className="app">
      <Navigation />
      <Hero />
      <Experience />
      <Portfolio />
      <Contact />
    </main>
  )
}

export default App
