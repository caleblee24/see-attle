import React from "react";
import "./App.css";
import placeData from "../placeData.json";
import { ResultPage } from "./ResultPage";
import { LoginPage } from "./Login";
import { CreateAccountPage } from "./CreateAccount";
import { ForgotPwPage } from "./Forgotpw";
import { ReviewCard } from "./ReviewCard";
import { ReviewList } from "./ReviewList";
import { SelectedPage } from "./SelectedPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ResultList } from "./ResultList";
import { Home } from "./Home";
import { SavedPlaces } from './SavedPlace'
import { AddLocation } from './AddLocation'

function App() {
  return (
    // <ResultPage data={placeData}/>
    // <SelectedPage placeId={1} rating={"5"}/>
    //<LoginPage />
    //<CreateAccountPage />
    //<ForgotPwPage />
    <BrowserRouter>
      <Routes>
        <Route path="/CHANGELATER" element={""} /> {/* CHANGE ELEMENT TO HOME PAGE WHEN IT IS CREATED */}
        <Route path="/" element={<Home></Home>} /> {/* placeData is a
        placeholder for now, once filtering is set up, the filtered data should be passed up to app
        and passed in here */}
        <Route path="/result/:placeId" element={<SelectedPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

