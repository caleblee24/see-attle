import React from "react";
import { ResultHeader } from "./ResultHeader";
import { ReviewList } from "./ReviewList";
import { Hours } from "./Hours";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SelectedPage(props) {
  const { placeId } = useParams();
  const [placeData, setPlaceData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/placeData.json");
      const json = await res.json();

      setPlaceData(json);
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, []);

  let place = undefined;
  if (placeData) {
    const place1 = placeData.find((data) => data.id === parseInt(placeId));
    place = place1;
  }

  if (place === undefined) {
    return <>Loading...</>;
  }

  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
}
