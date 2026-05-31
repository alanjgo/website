import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import posthog from 'posthog-js'
import { PostHogErrorBoundary, PostHogProvider } from '@posthog/react'

posthog.init(import.meta.env.VITE_POSTHOG_TOKEN, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  defaults: '2026-01-30',
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <PostHogErrorBoundary>
        <App />
      </PostHogErrorBoundary>
    </PostHogProvider>
  </React.StrictMode>,
)
