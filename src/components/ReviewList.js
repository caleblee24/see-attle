import React from "react";
import { ReviewCard } from "./ReviewCard";
import { useState, useEffect } from "react";
import {getDatabase, ref, set as firebaseSet, push as firebasePush, onValue,} from "firebase/database";

export function ReviewList(props) {
  const [reviewData, setReviewData] = useState(null);
  const [userData, setUserData] = useState(null);

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

  useEffect( () => {
    const db = getDatabase();
    const userDataRef = ref(db, "userData");

    onValue(userDataRef, function(snapshot) {
      const userDataObj = snapshot.val();
      const objKeys = Object.keys(userDataObj);
      const objArray = objKeys.map((keyString) => {
        userDataObj[keyString].key = keyString;
        return userDataObj[keyString];
      });
      setUserData(objArray);
    });
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