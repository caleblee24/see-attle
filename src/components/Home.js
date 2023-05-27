import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Trending } from "./Trending";
import { HomeButtons } from "./HomeButtons";

export function Home(props) {
    return (

        <div>
            <Navbar></Navbar>
            <HomeButtons updateFilteredData={props.updateFilteredData}></HomeButtons>
            <h1 className="h1Style">Trending Activities!</h1>
            <Trending></Trending>
            <Footer></Footer>
        </div>
    )
}