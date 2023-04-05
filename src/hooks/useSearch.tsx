import { useState, useCallback, useEffect } from "react";
import { Post } from "../interfaces/post.interface";
import { extraFilter } from "../utils/extraFilter";

/**

custom hook that manages the state and logic for searching
and filtering a list of posts based on a search term.
@function
@module useSearch
@param {string} initialState - The initial state for the search term.
@returns {Object}
  @property {string} searchTerm - The current search term.
  @property {Function} setSearchTerm - A function to update the search term.
  @property {Array<Post>} results - An array of filtered posts based on the search term.
  @property {boolean} isLoading - Indicates if the search is in progress.
  @property {boolean} showMessage - Indicates if a message should be displayed (when there are no search results).
  @property {boolean} error - Indicates if an error occurred during the search process.
*/

export const useSearch = (initialState: string) => {
  const [searchTerm, setSearchTerm] = useState(initialState);
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [error, setError] = useState(false);

  const search = useCallback(
    async (keyword: string) => {
      setIsLoading(true);
      setError(false);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?q=${keyword}`
        );

        const data: Post[] = await response.json();

        const filteredData = extraFilter(data, keyword);

        setResults(filteredData);
        setShowMessage(false);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setResults([]);
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  useEffect(() => {
    let timeUntilSearch = 500;
    setResults([]);

    if (searchTerm.trim() === "") {
      setShowMessage(true);

      return;
    }

    if (isLoading) {
      return;
    }

    const debounceFn = setTimeout(() => {
      setResults([]); // Agregamos esta línea para limpiar los resultados antes de la nueva búsqueda
      search(searchTerm);
    }, timeUntilSearch);

    return () => {
      clearTimeout(debounceFn);
    };
  }, [searchTerm]);

  return { searchTerm, setSearchTerm, results, isLoading, showMessage, error };
};
