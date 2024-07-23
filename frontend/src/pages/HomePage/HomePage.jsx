import React from 'react'

import FeatureCard, { cardOptions } from '../../components/FeatureCard/FeatureCard'

import './HomePage.scss'
export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <div className='hero-content__subtiltles'>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          </div>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </div>

      </section> 
        
        < section className='featuresGrid'>

        <FeatureCard {...cardOptions.opt1} />

        <FeatureCard {...cardOptions.opt2} />

        <FeatureCard {...cardOptions.opt3} />

      </section>
    </main>
  )
}
