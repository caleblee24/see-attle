import React, { useState } from "react";
import "./App.css";

import { ResultPage } from "./ResultPage";
import { LoginPage } from "./Login";
import { CreateAccountPage } from "./CreateAccount";
import { ForgotPwPage } from "./Forgotpw";
import { SelectedPage } from "./SelectedPage";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Home } from "./Home";
import { SavedPlaces } from './SavedPlace'
import { AddLocation } from './AddLocation'

function App() {
  /* For logging in, you can use:
    email: thanhl@gmail.com
    pass: thanh123 */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filteredData, setFilteredData] = useState({});

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const updateFilteredData = (data) => {
    setFilteredData(data);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="home" element={isLoggedIn ? <Home updateFilteredData={updateFilteredData} /> : <Navigate to="/login" />} />
        <Route path="createAccount" element={<CreateAccountPage />} />
        <Route path="forgotPw" element={<ForgotPwPage />} />
        <Route path="addLocation" element={isLoggedIn ? <AddLocation /> : <Navigate to="/login" />} />
        <Route path="savedPlaces" element={isLoggedIn ? <SavedPlaces /> : <Navigate to="/login" />} />
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="result" element={<ResultPage data={filteredData} />}></Route>
        <Route path="result/:placeId" element={<SelectedPage />}></Route>
        <Route path="*" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;








