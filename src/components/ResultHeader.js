import React from "react";
import { Stars } from "./stars";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as regBookmark } from '@fortawesome/free-regular-svg-icons'
import { getAvgRating } from "./ResultCard";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { useState, useEffect } from 'react';
import {getDatabase, ref, set as firebaseSet, push as firebasePush, onValue,} from "firebase/database";

export function ResultHeader(props) {
  const place = props.place; // place is a place object
  // const [placeData, setPlaceData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const username = localStorage.getItem('user');
  const [isSaved, setIsSaved] = useState(setTimeout(function() { checkIfSaved(); }, 3));

  useEffect(() => {
    const db = getDatabase();
    const userDataRef = ref(db, "userData");

    onValue(userDataRef, function(snapshot) {
      const userDataObj = snapshot.val();
      const objKeys = Object.keys(userDataObj);
      const objArray = objKeys.map((keyString) => {
        userDataObj[keyString].key = keyString;
        if (userDataObj[keyString].username === username) {
          setUser(userDataObj[keyString]);
        }
        return userDataObj[keyString];
      });
      setUserData(objArray);
    });
  }, []);

  function bookmarkClicked() {
    setIsSaved(!isSaved);

    const db = getDatabase();
    const userDataRef = ref(db, "userData/" + user.key + "/savedPlaces");

    console.log(user);
    const saved = user.savedPlaces;
    let newSaved= undefined;
    if (!isSaved) { // add to list, set isnt synchronous so we gotta do opposite
      newSaved = [...saved, place.id];
      firebaseSet(userDataRef, newSaved)
    } else {
      newSaved = saved.filter(id => id !== place.id);
      firebaseSet(userDataRef, newSaved)
    }

  }

  function checkIfSaved() {
    if (user) {
      const saved = user.savedPlaces;
      setIsSaved(saved.includes(place.id));
    }
  }


  return (
    <>
      <h1>{place.name}</h1>

      <div>
        <div className="res-sel-img-rating">
          <div className="result-selection-img-container">
            <img
              className="result-selection-img"
              src={place['coverImg'].img} alt={place['coverImg'].alt}
            ></img>
            <a href="photos.html">
              <button className="res-sel-btn">See photos</button>
            </a>
            <Stars rating={getAvgRating(place.id)} />
          </div>
        </div>

        <div className="res-sel-info">
          <div className="desc-bookmark-container">
            <p className="res-sel-desc">{place.desc}</p>
            <FontAwesomeIcon onClick={bookmarkClicked} className={isSaved ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"} icon={isSaved ? faBookmark : regBookmark} />
          </div>

          <div className="res-sel-btns">
            <a href="writeReview.html">
              <button className="res-sel-btn">Write a review</button>
            </a>
            <a
              href={place.googleLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="res-sel-btn clear-btn"> Directions</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
