import React, { useState } from "react";
import "./App.css";
import placeData from "../placeData.json";
import { ResultPage } from "./ResultPage";
import { LoginPage } from "./Login";
import { CreateAccountPage } from "./CreateAccount";
import { ForgotPwPage } from "./Forgotpw";
import { ReviewCard } from "./ReviewCard";
import { ReviewList } from "./ReviewList";
import { SelectedPage } from "./SelectedPage";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ResultList } from "./ResultList";
import { Home } from "./Home";
import { SavedPlaces } from './SavedPlace'
import { AddLocation } from './AddLocation'

function App() {
  /* For logging in, you can use:
    email: thanhl@gmail.com
    pass: thanh123 */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="createAccount" element={<CreateAccountPage />} />
        <Route path="forgotPw" element={<ForgotPwPage />} />
        <Route path="addLocation" element={isLoggedIn ? <AddLocation /> : <Navigate to="/login" />} />
        <Route path="savedPlaces" element={isLoggedIn ? <SavedPlaces /> : <Navigate to="/login" />} />
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="result" element={<ResultPage data={placeData} />}></Route>
        <Route path="result/:placeId" element={<SelectedPage />}></Route>
        <Route path="*" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;








