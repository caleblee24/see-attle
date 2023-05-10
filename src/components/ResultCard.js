import React from "react";
import { Stars } from "./stars";
import reviewData from "../reviewData.json"

/* Creates one result card used to populate result list. Props.place takes in a single "place" object
 as described in placeData.json. */
export function ResultCard(props) {
  const place = props.place;

  // getting the ratings from the reviews dataset
  const ratings = reviewData.filter( x => {
    return x.placeId === place.id;
  }).map(entry => {
    return entry.rating;
  });

  // getting the average rating (hopefully with a database we wont need to explicitly calculate it here)
  const avgRating = () => {
    let total = 0;

    ratings.forEach(rating => {
      total += rating;
    })

    return ratings.length === 0 ? 0 : total/ratings.length;
  }

  return (
    <div className="result-card">
      <div>
        <img className="result-imgs" src={place['coverImg'].img} alt={place['coverImg'].alt}></img>
      </div>
      <div>
        <h2 className="result-name">{place.name}</h2>
        <Stars rating={avgRating()} />
        <p className="result-desc">{place.desc}</p>
        <div className="result-tags"> {place.tags.map(tag => {
          return <p className="result-tags-items">{tag}</p>
        })}</div>
      </div>
    </div>
  );
}