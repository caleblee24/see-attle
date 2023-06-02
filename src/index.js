import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD539-ojU5A_1SnZr6oRbam-xNV_LB3Jrw",
  authDomain: "info340-bb4.firebaseapp.com",
  projectId: "info340-bb4",
  storageBucket: "info340-bb4.appspot.com",
  messagingSenderId: "93245484544",
  appId: "1:93245484544:web:d71553e02041a2467932e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
