import React from "react";
import "./HighLightMatch.css";

interface HighlightTextProps {
  searchTerm: string;
  text: string;
}

/**
 * A React component that highlights a search term within a text string.
 *
 * @property {string} searchTerm - The term to be highlighted.
 * @property {string} text - The text to be highlighted.
 
 */
const HighLightMatch: React.FC<HighlightTextProps> = ({ searchTerm, text }) => {
  // Regular expression that matches all occurrences of `searchTerm` within `text`,'gi' is to ignore case.
  // The search term is captured as a group using parentheses.
  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <b className="match-color" key={index}>
            {part}
          </b>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      )}
    </span>
  );
};

export default HighLightMatch;
