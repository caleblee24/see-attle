import React, { Component } from 'react';
import { ResultCard } from './ResultCard';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useState, useEffect } from 'react';
import {getDatabase, ref, set as firebaseSet, push as firebasePush, onValue,} from "firebase/database";

// class SavedPlaces extends Component {
//   state = {
//     places: placeData,
//   };

//   render() {
//     const savedPlaces = this.state.places.filter(place => place.saved);

//     return (
//       <div>
//         <Navbar />
//         <main className="flex-1 full-height">
//           <div>
//             <h1>Saved Places Result</h1>
//             {savedPlaces.map((place) => (
//               <ResultCard key={place.id} place={place} />
//             ))}
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }
// }

export function SavedPlaces() {
  const [placeData, setPlaceData] = useState(null);
  const [userData, setUserData] = useState(null);
  const username = localStorage.getItem('user');

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

  useEffect(() => {
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

  let userSavedIds = undefined;
  if (userData) {
    userSavedIds = userData.find(user => user.username === username).savedPlaces;
  }

  let savedPlaces = undefined;
  if (placeData && userSavedIds) {
    savedPlaces = placeData.filter(place => userSavedIds.includes(place.id));
  }

  if (savedPlaces === undefined || userSavedIds === undefined) {
    return <>Loading...</>;
  }

  return (
    <div>
      <Navbar />
      <main className="flex-1 full-height">
        <div>
          <h1>Saved Places Result</h1>
          {savedPlaces.map((place) => (
            <ResultCard key={place.id} place={place} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );

}




