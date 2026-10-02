import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import * as moviesService from "../services/movies.service.js";

const getMoviesVideos = asyncHandler(async (req, res) => {
  const videos = await moviesService.getMovieVideos(req.params.movieId);
  return res
    .status(200)
    .json(new ApiResponse(true, "Movie videos fetched successfully", videos));
});

const getPopularMovies = asyncHandler(async (req, res) => {
  const movies = await moviesService.getPopularMovies(
    req.params.page,
    req.user._id,
  );
  return res
    .status(200)
    .json(new ApiResponse(true, "Popular movies fetched successfully", movies));
});

const getTopRatedMovies = asyncHandler(async (req, res) => {
  const movies = await moviesService.getTopRatedMovies(
    req.params.page,
    req.user._id,
  );
  return res
    .status(200)
    .json(
      new ApiResponse(true, "Top rated movies fetched successfully", movies),
    );
});

const getUpcomingMovies = asyncHandler(async (req, res) => {
  const movies = await moviesService.getUpcomingMovies(
    req.params.page,
    req.user._id,
  );
  return res
    .status(200)
    .json(
      new ApiResponse(true, "Upcoming movies fetched successfully", movies),
    );
});

export {
  getMoviesVideos,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
};
