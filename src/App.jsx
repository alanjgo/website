import React from 'react'
import { Hero } from './components/Hero'
import { Portfolio } from './components/Portfolio'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'

function App() {
  return (
    <main className="app">
      <Hero />
      <Contact />
      <Experience />
      <Portfolio />
    </main>
  )
}

export default App
