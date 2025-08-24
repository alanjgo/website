import React from 'react'
import { Hero } from './components/Hero'
import { Portfolio } from './components/Portfolio'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <main className="app">
      <Hero />
      <Contact />
      <Experience />
      <Portfolio />
      <Analytics />
    </main>
  )
}

export default App
