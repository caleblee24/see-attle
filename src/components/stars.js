import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons'

/* props.rating is a number 0-5 inclusive. This method will create the star icons to represent
 the rating. Ratings will be rounded to nearest .5 or whole value to be represented by either
 a half star or full star.
 For display only! Currently cannot be used for users to select a rating when leaving review */
export function Stars(props) {
  let rating = Math.round(props.rating * 2)/2;

  return (
    <div className="result-rating">
      {[...Array(5)].map((star) => {
        if (rating >= 1) {
          rating--;
          return <FontAwesomeIcon icon={faStar} />
        } else if (rating === 0.5) {
          rating = rating - 0.5;
          return <FontAwesomeIcon icon={faStarHalfStroke} />
        } else {
          return <FontAwesomeIcon icon={regStar} />
        }
      })}
    </div>
  )
}