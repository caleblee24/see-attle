import React from "react";
import { Stars } from "./stars";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as regBookmark } from '@fortawesome/free-regular-svg-icons'
import { getAvgRating } from "./ResultCard";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { useState, useEffect } from 'react';

export function ResultHeader(props) {
  const place = props.place; // place is a place object
  const [placeData, setPlaceData] = useState(null);
  const [userData, setUserData] = useState(null);
  const username = localStorage.getItem('user');
  const [isSaved, setIsSaved] = useState(setTimeout(function() { checkIfSaved(); }, 100));

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/placeData.json");
      const json = await res.json();

      setPlaceData(json);
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/userData.json");
      const json = await res.json();

      setUserData(json);
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, []);

  function bookmarkClicked() {
    setIsSaved(!isSaved);

    const user = userData.find(user => user.username === username);
    const saved = user.savedPlaces;
    let newSaved= undefined;
    if (!isSaved) { // add to list, set isnt synchronous so we gotta do opposite
      newSaved = [...saved, place.id];
    } else {
      newSaved = saved.filter(id => id !== place.id);
    }

  }

  function checkIfSaved() {
    if (userData) {
      const user = userData.find(user => user.username === username);
      const saved = user.savedPlaces;
      return saved.includes(place.id);
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
