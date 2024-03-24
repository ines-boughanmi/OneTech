import React from 'react'
import oneTech from '../../assets/onetech.png'
import "./navbar.css"

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <a  className="navbar-brand" ><img src={oneTech} alt="OneTech"/></a>
      <div id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" >Log in</a>
          </li>
          <li className="nav-item">
            <a className="nav-link">Sign up</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default NavBar
