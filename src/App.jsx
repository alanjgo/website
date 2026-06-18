import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Home } from './components/Home'
import { ReadingList } from './components/ReadingList'
import { Site } from './components/Site'
import { Skills } from './components/Skills'
import { Navbar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { getPageTitle } from './routes'

function PageTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = getPageTitle(pathname)
  }, [pathname])

  return null
}

function App() {
  return (
    <Router>
      <PageTitle />
      <ScrollToTop />
      <main className="app-shell">
        <Navbar />
        <div className="app-shell__content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reading-list" element={<ReadingList />} />
            <Route path="/cool-sites" element={<Site />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Analytics />
        <SpeedInsights />
      </main>
    </Router>
  )
}

export default App
