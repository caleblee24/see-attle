import React from "react";
import { Stars } from "./stars";

export function ReviewCard(props) {
  const data = props.data;

  return (
    <div className="review-cards">
      <div className="card-header">
        <div>
          <img className="profile-img" src={data.pfp.img} alt={data.pfp.alt}></img>
        </div>
        <div>
          <h3 className="profile-name">{data.displayName}</h3>
          <Stars rating={data.rating}></Stars>
          <time dateTime={data.date}>{new Date(data.date).getMonth() + 1 + '/' + new Date(data.date).getDate() + '/' + new Date(data.date).getFullYear()}</time>
        </div>
      </div>

      <div className="review-body">
        <p>{data.desc}</p>
        <div className="review-imgs">
          {data.imgs.map(img => {
            return (
              <img key={img.img} src={img.img} alt={img.alt}></img>
            )
          })}
        </div>
      </div>

      <hr></hr>
    </div>
  );
}
