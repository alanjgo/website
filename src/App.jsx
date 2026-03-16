import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './components/Home'
import { ReadingList } from './components/ReadingList'
import { Site } from './components/Site'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <Router>
      <ScrollToTop />
      <main className="app-shell">
        <div className="app-shell__content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reading-list" element={<ReadingList />} />
            <Route path="/cool-sites" element={<Site />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </main>
    </Router>
  )
}

export default App
