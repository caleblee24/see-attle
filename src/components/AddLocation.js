import React from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const AddLocation = () => {
  return (
    <div className="add-place-body">
      <Navbar />
      <div className="add-place-container">
        <div className="add-place-form">
          <h1>Add Place</h1>
          <p>Provide information about a place in Seattle that you would like to share with others.</p>
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
      <Footer />
    </div>
  );
}

export { AddLocation };


