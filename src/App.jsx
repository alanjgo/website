import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { ReadingList } from './components/ReadingList'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reading-list" element={<ReadingList />} />
        </Routes>
        <Footer />
        <Analytics />
      </main>
    </Router>
  )
}

export default App
