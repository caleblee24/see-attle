import React from 'react';
import "./App.css";
import placeData from "../placeData.json"
import { ResultPage } from './ResultPage';

function App() {
  return (
    <ResultPage data={placeData}/>
  );
}

export default App;