import { Post } from "../interfaces/post.interface";

/**
Filters the given array of Post objects based on a search term.
This filter is necessary because the JsonPlaceholder API does not always provide
100% accurate results for keywords "filter". It returns some results that do not
actually match the search term, so those irrelevant results are removed using this filter.
@param {Post[]} results - The array of Post objects to filter.
@param {string} searchTerm - The search term to filter by.
@returns {Post[]} - The filtered array of Post objects.
*/

export function extraFilter(results: Post[], searchTerm: string): Post[] {
  return results.filter(
    (result) => result.title && result.title.includes(searchTerm)
  );
}
