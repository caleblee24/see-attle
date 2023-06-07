import React from "react";
import { ResultHeader } from "./ResultHeader";
import { ReviewList } from "./ReviewList";
import { Hours } from "./Hours";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import {getDatabase, ref, set as firebaseSet, push as firebasePush, onValue,} from "firebase/database";

export function SelectedPage(props) {
  const { placeId } = useParams();
  const [placeData, setPlaceData] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const placeDataRef = ref(db, "placeData");

    onValue(placeDataRef, function(snapshot) {
      const placeDataObj = snapshot.val();
      const objKeys = Object.keys(placeDataObj);
      const objArray = objKeys.map((keyString) => {
        placeDataObj[keyString].key = keyString;
        return placeDataObj[keyString];
      });
      setPlaceData(objArray);
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
