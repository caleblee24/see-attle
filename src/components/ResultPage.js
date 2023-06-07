import React from "react";
import { ResultList } from "./ResultList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function ResultPage(props) {
  const data = props.data; // data should be the filtered list of places that matches whatever filter condition
  // user entered on home page

  return (
    <>
      <Navbar />
      <main className="flex-1 full-height">
        <div className="page-content">
          <section className="result-list flex-auto">
            <h1>Results</h1>
            <Link className="nav-back" to="/home">
              <FontAwesomeIcon icon={faChevronLeft} />
              <p>Back to filter</p>
            </Link>

            <ResultList data={data} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
