import React from "react";
import { ResultHeader } from "./ResultHeader";
import { ReviewList } from "./ReviewList";
import { Hours } from "./Hours";
import placeData from "../placeData.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from "react-router-dom";

export function SelectedPage(props) {
  const navigate = useNavigate();
  const { placeId } = useParams();

  const place = placeData.find(data => {
    return data.id === parseInt(placeId)});
  console.log(place);

  return (
    <main className="flex-1 full-height">
      <div className="page-content">
        <section className="result-selection flex-auto">
          <a className="nav-back" onClick={() => navigate(`/`)}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <p>Back to results</p>
          </a>

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
