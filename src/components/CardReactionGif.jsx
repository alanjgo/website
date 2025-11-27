import { useEffect, useState } from 'react'
import gifSrc from './assets/Christian Bale GIF by PeacockTV.gif'
import './CardReactionGif.css'

export function CardReactionGif({ isVisible = false }) {
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    if (isVisible) {
      // Délai de 3 secondes avant d'afficher le gif
      const timer = setTimeout(() => {
        setShouldShow(true)
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      setShouldShow(false)
    }
  }, [isVisible])

  if (!shouldShow) {
    return null
  }

  return (
    <div className="card-reaction-gif">
      <img 
        src={gifSrc} 
        alt="Impressive. Very nice."
        className="card-reaction-gif__image"
      />
    </div>
  )
}

