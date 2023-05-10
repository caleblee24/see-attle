import React from "react";
import { ResultList } from "./ResultList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export function ResultPage(props) {
  const data = props.data;

  // the anchor tag that leads back to index.html is a wip bc not sure if that's how we should
  // be linking pages and index.html isnt the valid link anymore
  return (
    <main className="flex-1 full-height">
      <div className="page-content">
        <section className="result-list flex-auto">

          <h1>Results</h1>
          <a className="nav-back" href="../index.html">
            <FontAwesomeIcon icon={faChevronLeft} />
            <p>Back to filter</p>
          </a>

          <ResultList data={data}/>
        </section>
      </div>
    </main>
  );
}
