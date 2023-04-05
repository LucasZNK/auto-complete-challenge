import React from "react";
import { Post } from "../../interfaces/post.interface";
import HighLightMatch from "../HighLightMatch/HighLightMatch";
import "./Result.css";

interface Props {
  showSearchMessage: boolean;
  results: Post[];
  searchTerm: string;
  isLoading: boolean;
  error: boolean;
}

const Results = ({
  showSearchMessage,
  results,
  searchTerm,
  isLoading,
  error,
}: Props) => {
  console.log(error);

  // ...
  if (isLoading) {
    return <div className="results-loading">Loading(Spinner)...</div>;
  }

  if (error) {
    return (
      <div className="results-error">Sorry, we get an error, try again. </div>
    );
  }

  if (showSearchMessage) {
    return (
      <div className="results-search-message">
        Search any post you want with our incredible search bar :D{" "}
      </div>
    );
  }

  return (
    <div className="results-container">
      {results && results.length > 0 ? (
        results.map((result) => {
          return (
            <div key={result.id} className="card">
              <div className="card-title">Post id: {result.id}</div>
              <div className="card-content">
                <HighLightMatch searchTerm={searchTerm} text={result.title} />
              </div>
            </div>
          );
        })
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};

export default Results;
