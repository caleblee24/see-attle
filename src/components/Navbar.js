import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from "react-router-dom";
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import {getDatabase, ref, set as firebaseSet, push as firebasePush, onValue,} from "firebase/database";

export function Navbar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(undefined);

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

  function logOut() {
    localStorage.clear();
    navigate('/login');
  }

  let user = undefined;
  if (userData) {
    const user1 = userData.find((user) => user.username === localStorage.getItem('user'));
    user = user1;
  }

  if (user === undefined) {
    return <>Loading...</>;
  }

  return (
      <header>
      <div className="navbar">
        <div className="logo">
          <Link to="/"><img className="downsizeLogo" src="/imgs/See-attleIcon.svg" alt="seattle icon" /></Link>
        </div>
        <ul className="links">
          <li><Link to="/" className="black-links"><p className="underline">Home</p></Link></li>
          <li><Link to="/addLocation" className="black-links"><p className="underline">Add a Location</p></Link></li>
          <li><Link to="/savedPlaces" className="black-links"><p className="underline">Saved Locations</p></Link></li>
        </ul>
        <div className="profileContainer revealDropDown">
          <img className="profileImg" src={user.pfp.img} alt="cute puppy" />
          <nav>
            <ul>
              <li onClick={logOut}><Link className="bottomElement black-links">Sign Out</Link></li>
            </ul>
          </nav>
        </div>
        <div className="toggle-btn">
          <FontAwesomeIcon className="fa-solid fa-bars" icon={faBars} />
        </div>
      </div>

      <div className="dropdown-menu">
        <li><Link to="/home" className="black-links">Home</Link></li>
        <li><Link to="/addLocation" className="black-links"><p className="underline">Add a Location</p></Link></li>
        <li><Link to="/savedPlaces" className="black-links">Saved Locations</Link></li>
        <li onClick={logOut}><Link className="bottomElement black-links">Sign Out</Link></li>
      </div>
    </header>
  )
}
