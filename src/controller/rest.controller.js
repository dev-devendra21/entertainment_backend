import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import * as restService from "../services/rest.service.js";

const getTrending = asyncHandler(async (req, res) => {
  const trendingData = await restService.getTrending(req.user._id);
  res
    .status(200)
    .json(
      new ApiResponse(
        true,
        "Trending movies and tv series fetched successfully",
        trendingData,
      ),
    );
});

const getSearchQuery = asyncHandler(async (req, res) => {
  const { type, query, page } = req.params;
  const results = await restService.getSearchQuery(
    type,
    query,
    page,
    req.user._id,
  );
  res
    .status(200)
    .json(
      new ApiResponse(true, "Search results fetched successfully", results),
    );
});

export { getTrending, getSearchQuery };
