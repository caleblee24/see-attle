import React, { Component } from 'react';
import { ResultCard } from './ResultCard';
// import placeData from '../placeData.json';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useState, useEffect } from 'react';

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
    const fetchData = async () => {
      const res = await fetch("/data/placeData.json");
      const json = await res.json();

      setPlaceData(json);
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/userData.json");
      const json = await res.json();

      setUserData(json);
    };

    fetchData().catch((err) => {
      console.log(err);
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




