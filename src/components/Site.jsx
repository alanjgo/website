import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { sites } from '../data/sites'
import './Site.css'

export function Site() {
  const displayedSites = [...sites].reverse()

  return (
    <section className="site-page">
      <div className="site-intro">
        <Link to="/" className="site-back-link" aria-label="Back to home">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="site-title">Cool sites</h1>
        <p className="site-description">
          A list of great websites.
        </p>
      </div>

      <div className="site-grid">
        {displayedSites.map((site) => (
          <a
            key={site.name}
            className="site-card"
            href={site.url}
            target="_blank"
            rel="noreferrer"
          >
            <div className="site-heading">
              <div className="site-name-group">
                <img
                  className="site-favicon"
                  src={`https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(site.url)}`}
                  alt=""
                  loading="lazy"
                />
                <h2>{site.name}</h2>
              </div>
              <ArrowUpRight size={18} />
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
