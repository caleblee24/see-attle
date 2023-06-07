import React from "react";
import { ReviewCard } from "./ReviewCard";
import { useState, useEffect } from "react";

export function ReviewList(props) {
  const [reviewData, setReviewData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect( () => {
    fetch("/data/reviewData.json")
      .then((res) => {
        return res.json()})
      .then((data) => {
        setReviewData(data);
      })
  }, []);

  useEffect( () => {
    fetch("/data/userData.json")
      .then((res) => {
        return res.json()})
      .then((data) => {
        setUserData(data);
      })
  }, []);

  const place = props.place;

  let reviews = undefined;
  if (reviewData) {
    reviews = reviewData.filter((review) => {
      return review.placeId === place.id;
    });
  }

  let reviewsWithUser = undefined;
  if (userData && reviews) {
    reviewsWithUser = reviews.map(review => {
      const userIndex = userData.find(user => {return review.userId === user.id});

      return {...review, displayName: userIndex.displayName, pfp: userIndex.pfp};
    });
  }

  if (reviews === undefined || reviewsWithUser === undefined) {
    return <>Loading...</>;
  }

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