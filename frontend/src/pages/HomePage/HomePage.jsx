import React from 'react'


import Hero from '../../components/Hero/Hero'
import FeatureCard, { cardOptions } from '../../components/FeatureCard/FeatureCard'

import './HomePage.scss'

/**
 * Displays the home page with hero section and feature cards.
 * 
 * @returns {JSX.Element} The HomePage component.
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
        
        < section className='featuresGrid'>

        <FeatureCard {...cardOptions.opt1} />

        <FeatureCard {...cardOptions.opt2} />

        <FeatureCard {...cardOptions.opt3} />

      </section>
    </main>
  )
}
