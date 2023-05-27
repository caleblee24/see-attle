import React from "react";
import { Stars } from "./stars";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { getAvgRating } from "./ResultCard";

export function ResultHeader(props) {
  const place = props.place; // place is a place object

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
            <FontAwesomeIcon className="fa-regular fa-bookmark" icon={faBookmark} />
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
