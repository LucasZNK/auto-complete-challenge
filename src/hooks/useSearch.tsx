import { useState, useCallback, useEffect } from "react";
import { Post } from "../interfaces/post.interface";
import { extraFilter } from "../utils/extraFilter";

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
