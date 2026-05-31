import { useState } from 'react'
import { usePostHog } from '@posthog/react'
import { Hero } from './Hero'
import { Card } from './Card'
import { Portfolio } from './Portfolio'
import { Experience } from './Experience'
import { Contact } from './Contact'
import { CardReactionGif } from './CardReactionGif'

export function Home() {
    const [isCardVisible, setIsCardVisible] = useState(false)
    const [isCardClicked, setIsCardClicked] = useState(false)
    const posthog = usePostHog()

    const handleMouseEnter = () => {
        if (!isCardVisible) {
            posthog?.capture('business_card_revealed', { trigger: 'hover' })
        }
        setIsCardVisible(true)
        setIsCardClicked(false)
    }

    const handleMouseLeave = () => {
        if (!isCardClicked) {
            setIsCardVisible(false)
        }
    }

    const handleClick = () => {
        if (!isCardVisible) {
            posthog?.capture('business_card_revealed', { trigger: 'click' })
        }
        setIsCardVisible(true)
        setIsCardClicked(true)
    }

    return (
        <div className="app">
            <Hero
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            />
            <Contact />
            <Card
                isVisible={isCardVisible}
                onClick={() => {
                    setIsCardVisible(false)
                    setIsCardClicked(false)
                }}
            />
            <CardReactionGif isVisible={isCardVisible} />
            <Experience />
            <Portfolio />
        </div>
    )
}
