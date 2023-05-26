import React from "react";
import { ResultHeader } from "./ResultHeader";
import { ReviewList } from "./ReviewList";
import { Hours } from "./Hours";
import placeData from "../placeData.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate, Link } from "react-router-dom";

export function SelectedPage(props) {
  const navigate = useNavigate();
  const { placeId } = useParams();

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
