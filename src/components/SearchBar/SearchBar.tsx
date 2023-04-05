import React from "react";
import "./SearchBar.css";
import Results from "../Results/Results";
import { useSearch } from "../../hooks/useSearch";

const SearchBar = () => {
  const initialKeyTermState = "";
  const { searchTerm, setSearchTerm, results, isLoading, showMessage, error } =
    useSearch(initialKeyTermState);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCleanSearch = () => {
    setSearchTerm("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [results]);

  return (
    <div className="main-container">
      <div className="search-container">
        <label htmlFor="auto-complete" className="search-label">
          Insert whatever you want to search!
        </label>
        <input
          type="text"
          id="auto-complete"
          ref={inputRef}
          name="autocomplete"
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
          autoComplete="off"
        />

        <button
          aria-label="Clean search box and results"
          onClick={handleCleanSearch}
          className="search-button"
        >
          Clean Search
        </button>
      </div>

      <Results
        results={results}
        showSearchMessage={showMessage}
        searchTerm={searchTerm}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SearchBar;
