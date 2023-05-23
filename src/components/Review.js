import React, { useState } from 'react';
import { Stars } from "./stars";

function WriteReviewPage() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform review submission logic here
    console.log('Review submitted:', { rating, review, photos });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setPhotos(selectedFiles);
  };

  return (
    <div className="body-styling">
      <header>
        <div className="navbar">
          <div className="logo">
            <a href="../index.html">
              <img className="downsizeLogo" src="../PageIMGS/See-attleIcon.svg" alt="seattle icon" />
            </a>
          </div>
          <ul className="links">
            <li>
              <a href="../index.html" className="black-links">
                <p className="underline">Home</p>
              </a>
            </li>
            <li>
              <a href="addLocation.html" className="black-links">
                <p className="underline">Add a Location</p>
              </a>
            </li>
            <li>
              <a href="savedPlaces.html" className="black-links">
                <p className="underline">Saved Locations</p>
              </a>
            </li>
          </ul>
          <div className="profileContainer revealDropDown">
            <img className="profileImg" src="../PageIMGS/PuppyProfile.jpg" alt="cute puppy" />
            <nav>
              <ul>
                <li>
                  <a className="topElement black-links" href="login.html">
                    Sign In
                  </a>
                </li>
                <li>
                  <a className="bottomElement black-links" href="#">
                    Sign Out
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="toggle-btn">
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>

        <div className="dropdown-menu">
          <li>
            <a href="../index.html" className="black-links">
              Home
            </a>
          </li>
          <li>
            <a href="addLocation.html" className="black-links">
              Add a Location
            </a>
          </li>
          <li>
            <a href="savedPlaces.html" className="black-links">
              Saved Locations
            </a>
          </li>
          <li>
            <a className="topElement black-links" href="login.html">
              Sign In
            </a>
          </li>
          <li>
            <a className="bottomElement black-links" href="#">
              Sign Out
            </a>
          </li>
        </div>
      </header>

      <main className="flex-1 full-height">
        <div className="review-box">
          <div>
            <a className="nav-back" href="resultSelectionMS.html">
              <h1>Seattle Meowtropolitan</h1>
            </a>

            <div className="review-container">
              <form className="review" onSubmit={handleSubmit}>
                <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`fa-regular fa-star${star <= rating ? ' filled' : ''}`}
                      onClick={() => setRating(star)}
                    ></i>
                  ))}
                </div>
                <textarea
                  id="review"
                  name="review"
                  placeholder="Leave a review..."
                  aria-label="Input review text"
                  required
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>
                <div className="review-btns">
                  <label className="res-sel-btn clear-btn">
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleFileChange}
                      multiple
                    />
                    Upload photos
                  </label>
                  <button className="res-sel-btn" type="submit" role="button">
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <div className="footer-container">
        <footer className="footerStyle">
          <div className="container footerDivStyle">
            <p className="footerDivTextStyle underline">Contact Us</p>
            <p className="footerDivTextStyle underline">Terms</p>
            <p className="footerDivTextStyle underline">Privacy</p>
            <p className="footerDivTextStyle"> &#169; Info 340: Group-BB4</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default WriteReviewPage;

