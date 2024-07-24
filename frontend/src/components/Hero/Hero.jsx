import React from 'react';

import './Hero.scss';

/**
 * Displays a hero section with the claimed benefits of ArgentBank.
 *
 * @return {JSX.Element} The Hero component.
 */
export default function Hero() {
  return (
    <div className="hero">

      <section className="hero__content">

        <p className="hero__content__subtitle">
          No fees.
        </p>

        <p className="hero__content__subtitle">No minimum deposit.</p>

        <p className="hero__content__subtitle">
          High interest rates.
        </p>

        <p className="hero__content__text">
          Open a savings account with Argent Bank today!
        </p>

      </section>

    </div>
  )
}
