import { addBookmarkData } from "./media.service.js";
import fetchTmdb from "./tmdb.service.js";

const getTvShows = async (category, page, userId, failureMessage) => {
  const data = await fetchTmdb(
    `tv/${category}?language=en-US&page=${page}`,
    failureMessage,
  );
  return addBookmarkData(userId, data.results);
};

const getPopularTvShows = (page, userId) =>
  getTvShows("popular", page, userId, "Failed to fetch popular tv shows");

const getTopRatedTvShows = (page, userId) =>
  getTvShows("top_rated", page, userId, "Failed to fetch top rated tv shows");

const getUpcomingTvShows = (page, userId) =>
  getTvShows("on_the_air", page, userId, "Failed to fetch upcoming tv shows");

const getAiringTvShows = (page, userId) =>
  getTvShows(
    "airing_today",
    page,
    userId,
    "Failed to fetch on airing tv shows",
  );

const getTvShowVideos = async (id) => {
  const data = await fetchTmdb(
    `tv/${id}/videos?language=en-US`,
    "Failed to fetch tv show videos",
  );
  return data.results.filter((video) => video.type === "Trailer");
};

const getTvShowDetails = (id) =>
  fetchTmdb(`tv/${id}?language=en-US`, "Failed to fetch tv show details");

export {
  getPopularTvShows,
  getTopRatedTvShows,
  getUpcomingTvShows,
  getAiringTvShows,
  getTvShowVideos,
  getTvShowDetails,
};
