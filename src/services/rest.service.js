import { addBookmarkData } from "./media.service.js";
import fetchTmdb from "./tmdb.service.js";

const getTrending = async (userId) => {
  const data = await fetchTmdb(
    "trending/all/day?language=en-US",
    "Failed to fetch trending movies and tv series",
  );
  return addBookmarkData(userId, data.results);
};

const getSearchQuery = async (type, query, page, userId) => {
  const searchParams = new URLSearchParams({
    query,
    language: "en-US",
    include_adult: "false",
    page: String(page),
  });
  const data = await fetchTmdb(
    `search/${type}?${searchParams}`,
    "Failed to fetch search results",
  );
  const searchResults = await addBookmarkData(userId, data.results);

  return {
    searchResults,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
};

export { getTrending, getSearchQuery };
