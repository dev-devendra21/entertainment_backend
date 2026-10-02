import bookmarkModel from "../models/schema/bookmarkModel.js";

const findByMovieAndUser = (movieId, userId) =>
  bookmarkModel.findOne({ movieId, userId });

const create = (bookmarkData) => bookmarkModel.create(bookmarkData);

const deleteById = (id) => bookmarkModel.findByIdAndDelete(id);

const findByUser = (userId) => bookmarkModel.find({ userId });

const findMovieIdsByUser = (userId) =>
  bookmarkModel.find({ userId }).select("movieId");

const searchByTitle = async (userId, query, page, limit) => {
  const filter = {
    userId,
    title: { $regex: query, $options: "i" },
  };
  const pageNumber = Math.max(1, Number.parseInt(page, 10) || 1);
  const [searchResults, totalResults] = await Promise.all([
    bookmarkModel
      .find(filter)
      .limit(limit)
      .skip((pageNumber - 1) * limit),
    bookmarkModel.countDocuments(filter),
  ]);

  return { searchResults, totalResults };
};

export default {
  findByMovieAndUser,
  create,
  deleteById,
  findByUser,
  findMovieIdsByUser,
  searchByTitle,
};
