import React, { useState, useEffect } from "react";
import CreateFilterBoxes from "./CreateFilterBoxes";
import Slider from "./Slider";
import { useNavigate } from "react-router-dom";
import {getDatabase, ref, set as firebaseSet, push as firebasePush, onValue,} from "firebase/database";

export function HomeButtons(props) {
    const [isClicked, setIsClicked] = useState(false);
    const [sliderLabel, setSliderLabel] = useState('Free');
    const navigate = useNavigate();
    const [placeData, setPlaceData] = useState(null);

    useEffect( () => {
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

    const handleClick = (event) => {
        setIsClicked(!isClicked);
    };

    const updateSliderLabel = (label) => {
        setSliderLabel(label);
    }

    const filterSlider = () => {
        const filtered = placeData.filter((place) => {
            return place.price === sliderLabel;
        });

        props.updateFilteredData(filtered);
        navigate(`/result`);
    }

    return (
        <>
            <div className="container">
                <div className="container fade-in-p encase">
                    <a className="containerText" href="#filterPopupOne" role="button" onClick={handleClick}>I know where I want to go</a>
                    <a className="containerText" href="PageHTML/survey.html">Help me decide</a>
                    <a className="containerText" href="#filterPopupTwo" role="button">Give me a random location</a>
                </div>
            </div>
            <div id="filterPopupOne" className="overlay">
                <div className="popup">
                    <h1>Choose Your Filters...</h1>
                    <a className="close" href="#" aria-label="exit the filter page button">&times;</a>
                    <div className="content ">
                        <CreateFilterBoxes filterBoxes={['test', 'test2', 'test3', 'test4', 'test5', 'looooooooong' , 'test6', 'test7']}></CreateFilterBoxes>
                    </div>
                    <Slider clicked={isClicked} updateSliderLabel={updateSliderLabel}></Slider>
                    <a className="filterButton" onClick={filterSlider}>Results</a>
                </div>
            </div>
            <div id="filterPopupTwo" className="overlay">
                <div className="popup">
                    <h1>Enter Some Basic Information...</h1>
                    <a className="close" href="#" aria-label="exit the filter page button">&times;</a>
                    <div className="content">
                        Basic Information...
                    </div>
                    <a className="filterButton" href="PageHTML/resultListMS.html">Results</a>
                </div>
            </div>
        </>
    )
}