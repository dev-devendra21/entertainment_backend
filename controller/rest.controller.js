import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import bookmarkModel from "../models/schema/bookmarkModel.js";

const getTrending = async (req, res) => {

    try {
     const url = `${process.env.TMDB_BASE_URL}trending/all/day?language=en-US`;
     const options = {
         method: 'GET',
         headers: {
         accept: 'application/json',
         Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
         }
     };
 
     const response = await fetch(url, options);
 
     const data = await response.json();
     if (!response.ok) {
         return res.status(400).json(new ApiError(false, "Failed to fetch trending movies and tv series"));
     }
         const bookmarks = await bookmarkModel.find({userId: req.user._id}).select("movieId");
         const trendingData = data.results.map((movie) => {
             const isTrue = bookmarks.some(value => (value.movieId === movie.id))
             return {
                 ...movie,
                 backdrop_path: movie.backdrop_path ? `${process.env.TMDB_IMAGE_URL}${movie.backdrop_path}` : null,
                 poster_path: movie.poster_path ? `${process.env.TMDB_IMAGE_URL}${movie.poster_path}` : null,
                 isBookmark: isTrue
             }
            })   
         res.status(200).json(new ApiResponse(true, "Trending movies and tv series fetched successfully", trendingData));
    }
    catch (error) {
     res.status(500).json(new ApiError(false, error.message));
    }
 }

const getSearchQuery = async (req, res) => {
    try{
        const {type, query, page} = req.params;
        const url = `${process.env.TMDB_BASE_URL}search/${type}?query=${query}&language=en-US&include_adult=false&page=${page}`;
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
            }
        };

        const response = await fetch(url, options);

        const data = await response.json();
        if (!response.ok) {
            return res.status(400).json(new ApiError(false, "Failed to fetch search results"));
        }
        const bookmarks = await bookmarkModel.find({userId: req.user._id}).select("movieId");
        const searchResults = data.results.map((movie) => {
            const isTrue = bookmarks.some(value => (value.movieId === movie.id))
            return {
                ...movie,
                backdrop_path: movie.backdrop_path ? `${process.env.TMDB_IMAGE_URL}${movie.backdrop_path}` : null,
                poster_path: movie.poster_path ? `${process.env.TMDB_IMAGE_URL}${movie.poster_path}` : null,
                isBookmark: isTrue
            }})
        const totalPages = data.total_pages;
        const totalResults = data.total_results;
        res.status(200).json(new ApiResponse(true, "Search results fetched successfully", {searchResults, totalPages, totalResults}));
    }catch(error){
        res.status(500).json(new ApiError(false, error.message));
    }
}


 export { getTrending, getSearchQuery };