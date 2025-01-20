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

const getRecommended = async (req, res) => {
    try{
        const { type } = req.params;
        const genres = {
            movie: [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37],
            tv: [35, 16, 18, 99, 80, 10762, 10751, 10759, 9648, 10763, 10764, 10765, 10766, 10767, 10768, 37]
          };
          
        const genreId = genres[type]?.[Math.floor(Math.random() * genres[type]?.length)] || null;
          

        const url = `${process.env.TMDB_BASE_URL}discover/${type}?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`;;
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
        
        res.status(200).json(new ApiResponse(true, "recommended movies and tv series fetched successfully", searchResults));
    }catch(error){
        res.status(500).json(new ApiError(false, error.message));
    
    } 
}


 export { getTrending, getSearchQuery, getRecommended };