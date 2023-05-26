import React from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddLocation = () => {
    return (
        <div className="add-place-body">
            <header>
                <div className="navbar">
                    <div className="logo">
                        <a href="../index.html">
                            <img className="downsizeLogo" src="../PageIMGS/See-attleIcon.svg" alt="seattle icon"/>
                        </a>
                    </div>
                    <ul className="links">
                        <li><a href="../index.html" className="black-links"><p className="underline">Home</p></a></li>
                        <li><a href="addLocation.html" className="black-links"><p className="underline">Add a Location</p></a></li>
                        <li><a href="savedPlaces.html" className="black-links"><p className="underline">Saved Locations</p></a></li>
                    </ul>
                    <div className="profileContainer revealDropDown">
                        <img className="profileImg" src="../PageIMGS/PuppyProfile.jpg" alt="cute puppy"/>
                        <nav>
                            <ul>
                                <li><a className="topElement black-links" href="login.html">Sign In</a></li>
                                <li><a className="bottomElement black-links" href="#">Sign Out</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="toggle-btn">
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>

                <div className="dropdown-menu">
                    <li><a href="../index.html" className="black-links">Home</a></li>
                    <li><a href="addLocation.html" className="black-links">Add a Location</a></li>
                    <li><a href="savedPlaces.html" className="black-links">Saved Locations</a></li>
                    <li><a className="topElement black-links" href="login.html">Sign In</a></li>
                    <li><a className="bottomElement black-links" href="#">Sign Out</a></li>
                </div>
            </header>

            <div className="add-place-container">
                <div className="add-place-form">
                    <h1>Add Place</h1>
                    <p>Provide information about place in Seattle that you would like to share with others.</p>
                    <form className="add-place" action="submit-form.php" method="post">
                        <label htmlFor="place-name">Place Name:</label>
                        <input type="text" id="place-name" name="place-name" placeholder="eg. Seattle Meowtropolitan" required aria-label="Enter place name" />
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" name="address" placeholder="eg. 1225 N 45th St, Seattle, WA" required aria-label="Enter place address" />
                        <label htmlFor="tags">Tags:</label>
                        <input type="text" id="tags" name="tags" placeholder="eg. cafe, free, kitties" aria-label="Enter tags related to the place" />
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" aria-label="Enter description of the place"></textarea>
                        <label htmlFor="photo">Place Photo:</label>
                        <input type="file" id="photo" name="photo" aria-label="Upload a photo of the place" />
                        <button type="submit" aria-label="Submit form by clicking add place">Add Place</button>
                    </form>
                </div>
            </div>

            <footer className="footerStyle">
                <div className="container footerDivStyle">
                    <p className="footerDivTextStyle underline">Contact Us</p>
                    <p className="footerDivTextStyle underline">Terms</p>
                    <p className="footerDivTextStyle underline">Privacy</p>
                    <p className="footerDivTextStyle">&#169; Info 340: Group-BB4</p>
                </div>
            </footer>
        </div>
    );
}

export {AddLocation}

