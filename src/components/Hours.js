import React from "react";

export function Hours(props) {
  const place = props.place; // place is a place object

  return (
    <div className="hours">
      <h2>Operating Hours:</h2>
      <ul>
          {Object.entries(place.hours).map(([key, value]) => {
            return <li key={key}><strong>{key}</strong>: {value}</li>
          })}
      </ul>
    </div>
  )
}