import React from 'react'
import oneTech from '../../assets/onetech.png'
import "./navbar.css"
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <img className="logo" src={oneTech} alt="OneTech" />
        </div>
        <div id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/login">
                <p className="nav-link">Log in</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register">
                <p className="nav-link">Sign up</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar
