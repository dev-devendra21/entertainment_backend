import { addBookmarkData } from "./media.service.js";
import fetchTmdb from "./tmdb.service.js";

const getMovieVideos = async (movieId) => {
  const data = await fetchTmdb(
    `movie/${movieId}/videos?language=en-US`,
    "Failed to fetch movie videos",
  );
  return data.results.filter((video) => video.type === "Trailer");
};

const getMovies = async (category, page, userId, failureMessage) => {
  const data = await fetchTmdb(
    `movie/${category}?language=en-US&page=${page}`,
    failureMessage,
  );
  return addBookmarkData(userId, data.results);
};

const getPopularMovies = (page, userId) =>
  getMovies("popular", page, userId, "Failed to fetch popular movies");

const getTopRatedMovies = (page, userId) =>
  getMovies("top_rated", page, userId, "Failed to fetch top rated movies");

const getUpcomingMovies = (page, userId) =>
  getMovies("upcoming", page, userId, "Failed to fetch upcoming movies");

export {
  getMovieVideos,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
};
