import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';

const prices = ["Free", "$", "$$", "$$$", "$$$$"];

function AddLocation() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [locations, setLocations] = useState([]); // State to hold the locations
  const [location, setLocation] = useState({
    name: "",
    address: "",
    desc: "",
    tags: "",
    hours: "",
    price: [],
    photo: null,
    saved: true,
  });
  const [placeAdded, setPlaceAdded] = useState(false); // State to track if place has been added successfully

  useEffect(() => {
    // Fetch the existing locations from the external JSON file
    fetch('./data/placeData.json')
      .then(response => response.json())
      .then(data => {
        const existingData = data || []; // Retrieve existing data from the JSON file
        // Retrieve existing data from local storage
        const storedData = JSON.parse(localStorage.getItem('placeData')) || [];
        // Merge the existing data from the JSON file with the data stored in local storage
        const mergedData = [...existingData, ...storedData];
        setLocations(mergedData); // Update the locations state with the merged data
      })
      .catch(error => console.error('Error:', error));
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
      let priceArr = [...location.price];
      if (e.target.checked) {
        // If the checkbox is checked, add the value to the price array
        priceArr.push(e.target.value);
      } else {
        // If the checkbox is unchecked, remove the value from the price array
        priceArr = priceArr.filter(price => price !== e.target.value);
      }
      // Update the location state with the new price array
      setLocation(prevLocation => ({
        ...prevLocation,
        price: priceArr
      }));
    } else if (name === 'photo') {
      // Update the location state with the selected photo file
      setLocation(prevLocation => ({
        ...prevLocation,
        photo: e.target.files[0]
      }));
    } else {
      // Update the location state with the new value
      setLocation(prevLocation => ({
        ...prevLocation,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      const { tags, photo, ...rest } = location;
      const hoursObj = {
        Mon: rest.monday || "",
        Tues: rest.tuesday || "",
        Weds: rest.wednesday || "",
        Thurs: rest.thursday || "",
        Fri: rest.friday || "",
        Sat: rest.saturday || "",
        Sun: rest.sunday || "",
      };
      const tagsArr = tags.split(', ');
      const finalLocation = {
        id: locations.length + 1,
        name: rest.name,
        address: rest.address,
        coverImg: { img: "", alt: "" },
        desc: rest.desc,
        hours: hoursObj,
        tags: tagsArr,
        googleLink: "",
        saved: true,
        price: rest.price,
      };

    // Add the new location to the existing locations
    const updatedLocations = [...locations, finalLocation];
    setLocations(updatedLocations);
    setPlaceAdded(true); // Set placeAdded to true to display the popup

    // Update the placeData.json file with the updated locations
    fetch('/data/placeData.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedLocations)
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));

  }
};

  const handlePopupClose = () => {
    setPlaceAdded(false); // Close the popup
    navigate('/home'); // Redirect to home
  };

  return (
    <div className="add-place-body">
      <Navbar />
      <div className="add-place-container">
        <div className="add-place-form">
          <h1>Add Place</h1>
          <p>Provide information about a place in Seattle that you would like to share with others.</p>
          <form className="add-place" onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <label htmlFor="name">Place Name:</label>
              <input type="text" id="name" name="name" onChange={handleChange} required />

              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" onChange={handleChange} required />

              <label htmlFor="desc">Description:</label>
              <textarea id="desc" name="desc" onChange={handleChange} required />

              <label htmlFor="tags">Tags:</label>
              <input type="text" id="tags" name="tags" onChange={handleChange} required placeholder="eg. cafe, free, kitties" />

              <button type="button" onClick={() => setStep(2)}>Next</button>
            </>
          )}


          {step === 2 && (
            <>
            <div>
              <label htmlFor="hours">Hours:</label>
            </div>

              {/* Render form inputs for days and hours */}
              <label htmlFor="monday">Monday:</label>
              <input
                type="text"
                id="monday"
                name="monday"
                value={location.monday}
                onChange={handleChange}
                placeholder="eg. 12-6PM"
              />

              <label htmlFor="tuesday">Tuesday:</label>
              <input
                type="text"
                id="tuesday"
                name="tuesday"
                value={location.tuesday}
                onChange={handleChange}
                placeholder="eg. 12-6PM"
              />

              <label htmlFor="wednesday">Wednesday:</label>
              <input
                type="text"
                id="wednesday"
                name="wednesday"
                value={location.wednesday}
                onChange={handleChange}
                placeholder="eg. 12-6PM"
              />

              <label htmlFor="thursday">Thursday:</label>
              <input
                type="text"
                id="thursday"
                name="thursday"
                value={location.thursday}
                onChange={handleChange}
                placeholder="eg. 12-6PM"
              />

              <label htmlFor="friday">Friday:</label>
              <input
                type="text"
                id="friday"
                name="friday"
                value={location.friday}
                onChange={handleChange}
                placeholder="eg. 12-6PM"
              />

              <label htmlFor="saturday">Saturday:</label>
              <input
                type="text"
                id="saturday"
                name="saturday"
                value={location.saturday}
                onChange={handleChange}
                placeholder="eg. 12-6PM"
              />

              <label htmlFor="sunday">Sunday:</label>
              <input
                type="text"
                id="sunday"
                name="sunday"
                value={location.sunday}
                onChange={handleChange}
                placeholder="eg. 12-6PM"
              />

              <button type="button" onClick={() => setStep(3)}>Next</button>
            </>
          )}

          {step === 3 && (
            <>
              <fieldset>
                <legend>Price:</legend>
                {prices.map((price, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      name="price"
                      value={price}
                      onChange={handleChange}
                    />
                    {price}
                  </label>
                ))}
              </fieldset>

              <label htmlFor="photo">Place Photo:</label>
              <input type="file" id="photo" name="photo" onChange={handleChange} accept="image/*" />

              <button type="submit">Submit</button>
            </>
          )}
          </form>
        </div>
      </div>
      <Footer />
      {placeAdded && (
        <div className="popup-kacey">
          <div className="popup-kacey-content">
            <h2>Location Added Successfully</h2>
            <p>Your place has been added successfully. Thank you for sharing!</p>
            <button onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export {AddLocation}







