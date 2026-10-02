import bookmarkRepository from "../repositories/bookmark.repository.js";

const toggleBookmark = async (userId, bookmarkData) => {
  const existingBookmark = await bookmarkRepository.findByMovieAndUser(
    bookmarkData.id,
    userId,
  );

  if (existingBookmark) {
    await bookmarkRepository.deleteById(existingBookmark._id);
    return { removed: true };
  }

  const bookmark = await bookmarkRepository.create({
    movieId: bookmarkData.id,
    media_type: bookmarkData.media_type,
    title: bookmarkData.title,
    backdrop_path: bookmarkData.backdrop_path,
    release_date: bookmarkData.release_date,
    isBookmarked: bookmarkData.isBookmarked,
    userId,
  });

  return { removed: false, bookmark };
};

const getBookmarks = (userId) => bookmarkRepository.findByUser(userId);

const deleteBookmark = (id) => bookmarkRepository.deleteById(id);

const searchBookmarks = async (userId, query, page) => {
  const pageSize = 10;
  const { searchResults, totalResults } =
    await bookmarkRepository.searchByTitle(userId, query, page, pageSize);

  return {
    searchResults,
    totalPages: Math.ceil(totalResults / pageSize),
    totalResults,
  };
};

export { toggleBookmark, getBookmarks, deleteBookmark, searchBookmarks };
