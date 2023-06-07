import React, { useEffect, useState } from "react";
import { Stars } from "./stars";
import { useNavigate } from "react-router-dom";
import {getDatabase, ref, set as firebaseSet, push as firebasePush, onValue,} from "firebase/database";

/* Creates one result card used to populate result list. Props.place takes in a single "place" object
 as described in placeData.json. */
export function ResultCard(props) {
  const navigate = useNavigate();
  const place = props.place;

  return (
    <div className="result-card" onClick={() => navigate(`/result/${place.id}`)}>
      <div>
        <img className="result-imgs" src={place['coverImg'].img} alt={place['coverImg'].alt}></img>
      </div>
      <div>
        <h2 className="result-name">{place.name}</h2>
        <Stars rating={getAvgRating(place.id)} />
        <p className="result-desc">{place.desc}</p>
        <div className="result-tags"> {place.tags.map(tag => {
          return <p className="result-tags-items">{tag}</p>
        })}</div>
      </div>
    </div>
  );
}

// getting average rating
export const getAvgRating = (placeId) => {
  const [reviewData, setReviewData] = useState(null);

  useEffect( () => {
    const db = getDatabase();
    const reviewDataRef = ref(db, "reviewData");

    onValue(reviewDataRef, function(snapshot) {
      const reviewDataObj = snapshot.val();
      const objKeys = Object.keys(reviewDataObj);
      const objArray = objKeys.map((keyString) => {
        reviewDataObj[keyString].key = keyString;
        return reviewDataObj[keyString];
      });
      setReviewData(objArray);
    });

  }, []);

  let ratings = undefined;
  let total = 0;

  if (reviewData) {
    reviewData.filter( x => {
      return x.placeId === placeId;
    }).map(entry => {
      return entry.rating;
    });

    if (ratings) {
      ratings.forEach(rating => {
        total += rating;
      });
      return ratings.length === 0 ? 0 : total/ratings.length;
    }
  }

  if (reviewData === null || ratings === undefined) {
    return 0;
  }

  return ratings.length === 0 ? 0 : total/ratings.length;
}