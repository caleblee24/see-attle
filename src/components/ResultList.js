import React from "react";
import { ResultCard } from "./ResultCard";

/* Creates the list of results to display to user. Props.data is the list of places to render. */
export function ResultList(props) {
  const data = props.data;

  return (
    <div className="result-cards-container">
      {data.map(place => {
      return <ResultCard place={place} />
    })}
    </div>
  )
}