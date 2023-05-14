import React from 'react';
import "./App.css";
import placeData from "../placeData.json"
import { ResultPage } from './ResultPage';
import { LoginPage } from './Login'
import { CreateAccountPage } from './CreateAccount';
import { ForgotPwPage } from './Forgotpw'

function App() {
  return (
    <ResultPage data={placeData}/>
    //<LoginPage />
    //<CreateAccountPage />
    //<ForgotPwPage />

  );
}

export default App;


