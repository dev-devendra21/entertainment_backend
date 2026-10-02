import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import * as tvService from "../services/tv.service.js";

const getPopularTvShows = asyncHandler(async (req, res) => {
  const tvShows = await tvService.getPopularTvShows(
    req.params.page,
    req.user._id,
  );
  return res
    .status(200)
    .json(
      new ApiResponse(true, "Popular tv shows fetched successfully", tvShows),
    );
});

const getTopRatedTvShows = asyncHandler(async (req, res) => {
  const tvShows = await tvService.getTopRatedTvShows(
    req.params.page,
    req.user._id,
  );
  return res
    .status(200)
    .json(
      new ApiResponse(true, "Top rated tv shows fetched successfully", tvShows),
    );
});

const getUpcomingTvShows = asyncHandler(async (req, res) => {
  const tvShows = await tvService.getUpcomingTvShows(
    req.params.page,
    req.user._id,
  );
  return res
    .status(200)
    .json(
      new ApiResponse(true, "Upcoming tv shows fetched successfully", tvShows),
    );
});

const getAiringTvShows = asyncHandler(async (req, res) => {
  const tvShows = await tvService.getAiringTvShows(
    req.params.page,
    req.user._id,
  );
  return res
    .status(200)
    .json(
      new ApiResponse(true, "On air tv shows fetched successfully", tvShows),
    );
});

const getTvShowVideos = asyncHandler(async (req, res) => {
  const videos = await tvService.getTvShowVideos(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(true, "Tv show videos fetched successfully", videos));
});

const getTvShowDetails = asyncHandler(async (req, res) => {
  const details = await tvService.getTvShowDetails(req.params.id);
  return res
    .status(200)
    .json(
      new ApiResponse(true, "Tv show details fetched successfully", details),
    );
});

export {
  getPopularTvShows,
  getTopRatedTvShows,
  getUpcomingTvShows,
  getAiringTvShows,
  getTvShowVideos,
  getTvShowDetails,
};
