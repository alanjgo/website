import { useState } from 'react'
import { Hero } from './Hero'
import { Card } from './Card'
import { Portfolio } from './Portfolio'
import { Experience } from './Experience'
import { Contact } from './Contact'

export function Home() {
    const [isCardVisible, setIsCardVisible] = useState(false)
    const [isCardClicked, setIsCardClicked] = useState(false)

    const handleMouseEnter = () => {
        setIsCardVisible(true)
        setIsCardClicked(false)
    }

    const handleMouseLeave = () => {
        if (!isCardClicked) {
            setIsCardVisible(false)
        }
    }

    const handleClick = () => {
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
            <Experience />
            <Portfolio />
        </div>
    )
}
