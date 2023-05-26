import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header>
      <div className="navbar">
        <div className="logo">
          <Link to="/"><img className="downsizeLogo" src="imgs/See-attleIcon.svg" alt="seattle icon" /></Link>
        </div>
        <ul className="links">
          <li><Link to="/" className="black-links"><p className="underline">Home</p></Link></li>
          <li><Link to="/addLocation" className="black-links"><p className="underline">Add a Location</p></Link></li>
          <li><Link to="/savedPlaces" className="black-links"><p className="underline">Saved Locations</p></Link></li>
        </ul>
        <div className="profileContainer revealDropDown">
          <img className="profileImg" src="imgs/PuppyProfile.jpg" alt="cute puppy" />
          <nav>
            <ul>
              <li><Link className="topElement black-links" to="/login">Sign In</Link></li>
              <li><Link className="bottomElement black-links" to="#">Sign Out</Link></li>
            </ul>
          </nav>
        </div>
        <div className="toggle-btn">
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>

      <div className="dropdown-menu">
        <li><Link to="/home" className="black-links">Home</Link></li>
        <li><Link to="/addLocation" className="black-links"><p className="underline">Add a Location</p></Link></li>
        <li><Link to="/savedPlaces" className="black-links">Saved Locations</Link></li>
        <li><Link className="topElement black-links" to="/login">Sign In</Link></li>
        <li><Link className="bottomElement black-links" to="/login">Sign Out</Link></li>
      </div>
    </header>
  )
}
