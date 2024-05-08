import React from 'react'
import { NavLink } from 'react-router-dom'

import logo from '../../assets/img/argentBankLogo.png'

import './NavBar.scss'

export default function NavBar() {
  return (
    <header>
      <nav className="nav">

         <NavLink to="/">
          <img className='nav__logo' src={logo} alt="Argent Bank Logo" />
        </NavLink>

       <NavLink to="/sign-in">
          <div className='SignInBox'>
            <i className="fa fa-user-circle"></i>
            <span>Sign In</span>
          </div>
        </NavLink>

      </nav>
    </header>
  )
}
