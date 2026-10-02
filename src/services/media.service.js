import env from "../config/env.js";
import bookmarkRepository from "../repositories/bookmark.repository.js";

const addBookmarkData = async (userId, mediaItems) => {
  const bookmarks = await bookmarkRepository.findMovieIdsByUser(userId);
  const bookmarkedIds = new Set(
    bookmarks.map(({ movieId }) => String(movieId)),
  );

  return mediaItems.map((media) => ({
    ...media,
    backdrop_path: media.backdrop_path
      ? `${env.TMDB_IMAGE_URL}${media.backdrop_path}`
      : null,
    poster_path: media.poster_path
      ? `${env.TMDB_IMAGE_URL}${media.poster_path}`
      : null,
    isBookmark: bookmarkedIds.has(String(media.id)),
  }));
};

export { addBookmarkData };
