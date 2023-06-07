import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from "react-router-dom";
import { faBars } from '@fortawesome/free-solid-svg-icons'

export function Navbar() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.clear();
    console.log(localStorage.getItem('user'));
    navigate('/login');
  }

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
              <li><Link className="bottomElement black-links" onClick={logOut()}>Sign Out</Link></li>
            </ul>
          </nav>
        </div>
        <div className="toggle-btn">
          <FontAwesomeIcon className="fa-solid fa-bars" icon={faBars} />
        </div>
      </div>

      <div className="dropdown-menu">
        <li><Link to="/home" className="black-links">Home</Link></li>
        <li><Link to="/addLocation" className="black-links"><p className="underline">Add a Location</p></Link></li>
        <li><Link to="/savedPlaces" className="black-links">Saved Locations</Link></li>
        <li><Link className="bottomElement black-links" onClick={logOut()}>Sign Out</Link></li>
      </div>
    </header>
  )
}
