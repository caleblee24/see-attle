import React from "react";

export function Navbar() {
    return (
        <header>
            <div className="navbar">
                <div className="logo">
                    <a href="index.html"><img className="downsizeLogo" src="imgs/See-attleIcon.svg" alt="seattle icon"></img></a>
                </div>
                <ul className="links">
                    <li><a href="index.html" className="black-links"><p className="underline">Home</p></a></li>
                    <li><a href="PageHTML/addLocation.html" className="black-links"><p className="underline">Add a Location</p></a></li>
                    <li><a href="PageHTML/savedPlaces.html" className="black-links"><p className="underline">Saved Locations</p></a></li>
                </ul>
                <div className="profileContainer revealDropDown">
                    <img className="profileImg" src="imgs/PuppyProfile.jpg" alt="cute puppy"></img>
                        <nav>
                            <ul>
                                <li><a className="topElement black-links" href="PageHTML/login.html">Sign In</a></li>
                                <li><a className="bottomElement black-links" href="#">Sign Out</a></li>
                            </ul>
                        </nav>
                </div>
                <div className="toggle-btn">
                    <i className="fa-solid fa-bars"></i>
                </div>
            </div>
        
            <div className="dropdown-menu">
                <li><a href="index.html" className="black-links">Home</a></li>
                <li><a href="PageHTML/addLocation.html" className="black-links">Add a Location</a></li>
                <li><a href="PageHTML/savedPlaces.html" className="black-links">Saved Locations</a></li>
                <li><a className="topElement black-links" href="PageHTML/login.html">Sign In</a></li>
                <li><a className="bottomElement black-links" href="#">Sign Out</a></li>
            </div>
        </header>
    )
}