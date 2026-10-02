import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import * as bookmarkService from "../services/bookmark.service.js";

const setBookmark = asyncHandler(async (req, res) => {
  const result = await bookmarkService.toggleBookmark(req.user._id, req.body);
  if (result.removed) {
    return res
      .status(200)
      .json(new ApiResponse(true, "Bookmark removed successfully"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(true, "Bookmark added successfully", result.bookmark),
    );
});

const getBookmarks = asyncHandler(async (req, res) => {
  const bookmarks = await bookmarkService.getBookmarks(req.user._id);
  res
    .status(200)
    .json(new ApiResponse(true, "Bookmarks fetched successfully", bookmarks));
});

const deleteBookmark = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await bookmarkService.deleteBookmark(id);
  res.status(200).json(new ApiResponse(true, "Bookmark deleted successfully"));
});

const searchBookmarks = asyncHandler(async (req, res) => {
  const { query, page } = req.params;
  const results = await bookmarkService.searchBookmarks(
    req.user._id,
    query,
    page,
  );
  res
    .status(200)
    .json(new ApiResponse(true, "Bookmarks fetched successfully", results));
});

export { setBookmark, getBookmarks, deleteBookmark, searchBookmarks };
