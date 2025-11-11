import { useCallback, useEffect, useRef } from 'react'
import './Card.css'

const CONFIG = {
  maxRotateX: 18,
  maxRotateY: 14,
  maxRotateZ: 4,
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export function Card({ isVisible = false, onClick }) {
  const cardRef = useRef(null)
  const cardSceneRef = useRef(null)
  const cardShellRef = useRef(null)

  const applyTransform = useCallback(({ x, y }) => {
    const cardElement = cardRef.current
    const sceneElement = cardSceneRef.current

    if (!cardElement || !sceneElement) {
      return
    }

    const rect = sceneElement.getBoundingClientRect()
    const relativeX = rect.width ? (x - rect.left) / rect.width - 0.5 : 0
    const relativeY = rect.height ? (y - rect.top) / rect.height - 0.5 : 0

    const rotateY = clamp(relativeX * 2 * CONFIG.maxRotateY, -CONFIG.maxRotateY, CONFIG.maxRotateY)
    const rotateX = clamp(-relativeY * 2 * CONFIG.maxRotateX, -CONFIG.maxRotateX, CONFIG.maxRotateX)
    const rotateZ = clamp(relativeX * 2 * CONFIG.maxRotateZ, -CONFIG.maxRotateZ, CONFIG.maxRotateZ)

    cardElement.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
      2
    )}deg) rotateZ(${rotateZ.toFixed(2)}deg)`

    const shadowX = CONFIG.maxRotateY ? (rotateY / CONFIG.maxRotateY) * 18 : 0
    const shadowY = CONFIG.maxRotateX ? (rotateX / CONFIG.maxRotateX) * 18 : 0

    cardElement.style.boxShadow = `${-shadowX.toFixed(1)}px ${shadowY.toFixed(
      1
    )}px 45px rgba(47, 43, 37, 0.18)`
  }, [])

  const handlePointerMove = useCallback(
    (event) => {
      applyTransform({ x: event.clientX, y: event.clientY })
    },
    [applyTransform]
  )

  const handlePointerLeave = useCallback(() => {
    const sceneElement = cardSceneRef.current

    if (!sceneElement) {
      return
    }

    const rect = sceneElement.getBoundingClientRect()
    applyTransform({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })
  }, [applyTransform])

  useEffect(() => {
    handlePointerLeave()
  }, [handlePointerLeave])

  useEffect(() => {
    const updatePosition = () => {
      const heroElement = document.querySelector('.hero')
      const cardShellElement = cardShellRef.current
      
      if (heroElement && cardShellElement) {
        const heroContent = heroElement.querySelector('.hero-content')
        
        if (heroContent) {
          const contentRect = heroContent.getBoundingClientRect()
          // Aligner avec le début du contenu du Hero
          const topPosition = contentRect.top + window.scrollY
          cardShellElement.style.top = `${topPosition}px`
        }
      }
    }

    updatePosition()
    
    // Utiliser requestAnimationFrame pour une mise à jour fluide
    const intervalId = setInterval(updatePosition, 100)
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition)
    }
  }, [isVisible])

  return (
    <div 
      ref={cardShellRef}
      className={`card-shell ${isVisible ? 'card-visible' : ''}`}
      onClick={onClick}
    >
      <div
        ref={cardSceneRef}
        className="card-scene"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <article className="card" data-card="" ref={cardRef}>
          <div className="card__overlay" aria-hidden="true" />
          <div className="card__inner">
            <div className="card__top">
              <span className="card__phone card__inline engraved-tight"></span>
              <div className="card__company">
                <div className="card__company-line">
                  <span className="card__company-word engraved-text">Staycation</span>
                </div>
                <span className="card__company-tagline engraved-text">Hotel Entertainment</span>
              </div>
            </div>
            <div className="card__center">
              <div className="card__person">
                <span className="card__person-first engraved-text">Alan</span>
                <span className="card__person-last engraved-text">Jego</span>
              </div>
              <span className="card__title engraved-text">Product Manager</span>
            </div>
            <div className="card__bottom">
              <span className="card__inline engraved-text card__bottom-line">
                <span className="card__bottom-address engraved-text">Paris, France</span>
                <span className="card__bottom-contact card__bottom-contact--fax">
                  <span className="card__bottom-label engraved-text" />
                  <span className="card__bottom-value engraved-text" />
                </span>
                <span className="card__bottom-contact email">alanjego@pm.me
                </span>
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

