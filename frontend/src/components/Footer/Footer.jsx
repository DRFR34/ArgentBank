import React from 'react'

import './Footer.scss'
/**
 * A simple Footer, displaying the current year in the copyright.
 *
 * @return {JSX.Element} The footer component.
 */
export default function Footer() {
const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <p className="footer-text">Copyright 2020 - {currentYear} Argent Bank</p>
    </footer>
  )
}
