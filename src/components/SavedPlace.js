import React, { Component } from 'react';
import { ResultCard } from './ResultCard';
import placeData from '../placeData.json';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

class SavedPlaces extends Component {
  state = {
    places: placeData,
  };

  render() {
    const savedPlaces = this.state.places.filter(place => place.saved);

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
}

export { SavedPlaces };



