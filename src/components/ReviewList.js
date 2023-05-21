import React from "react";
import reviewData from "../reviewData.json";
import userData from "../userData.json";
import { ReviewCard } from "./ReviewCard";

export function ReviewList(props) {
  const place = props.place;

  const reviews = reviewData.filter((review) => {
    return review.placeId === place.id;
  });

  const reviewsWithUser = reviews.map(review => {
    const userIndex = userData.find(user => {return review.userId === user.id});

    return {...review, displayName: userIndex.displayName, pfp: userIndex.pfp};
  });

  return (
      <div className="reviews">
        <h2>Reviews</h2>

        <div>
          {reviewsWithUser.map(data => {
            return <ReviewCard key={data.id} data={data} />
          })}
        </div>
      </div>
  )
}