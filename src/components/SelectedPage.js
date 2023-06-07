import React from "react";
import { ResultHeader } from "./ResultHeader";
import { ReviewList } from "./ReviewList";
import { Hours } from "./Hours";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function SelectedPage(props) {
  const { placeId } = useParams();
  const [placeData, setPlaceData] = useState(null);

  useEffect( () => {
    fetch("./data/placeData.json")
      .then((res) => res.json())
      .then((data) => {
        setPlaceData(data);
      })
  }, []);

  const place = placeData.find(data => {
    return data.id === parseInt(placeId)});

  return (
    <main className="flex-1 full-height">
      <div className="page-content">
        <section className="result-selection flex-auto">
          <Link className="nav-back" to="/result">
            <FontAwesomeIcon icon={faChevronLeft} />
            <p>Back to results</p>
          </Link>

          <ResultHeader place={place} />
          <div>
            <ReviewList place={place} />
            <Hours place={place} />
          </div>
        </section>
      </div>
    </main>
  );
}
