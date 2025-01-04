import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import bookmarkModel from "../models/schema/bookmarkModel.js";

const getMoviesVideos = async (req, res) => {
    try{
        const { movieId } = req.params;
        const url = `${process.env.TMDB_BASE_URL}movie/${movieId}/videos?language=en-US`;
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
            return res.status(400).json(new ApiError(false, "Failed to fetch movie videos"));
        }
        else {
            const videos = data.results.filter((video) => video.type === "Trailer");
            res.status(200).json(new ApiResponse(true, "Movie videos fetched successfully", videos));
        }
    } catch(error){
        res.status(500).json(new ApiError(false, error.message));
    }
}



const getPopularMovies = async (req, res) => {
    try{
        const { page } = req.params || 1;
        const url = `${process.env.TMDB_BASE_URL}movie/popular?language=en-US&page=${page}`;
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
            return res.status(400).json(new ApiError(false, "Failed to fetch popular movies"));
        }
        else {
            const bookmarks = await bookmarkModel.find({userId: req.user._id}).select("movieId");
            const movies = data.results.map((movie) => {
               const isTrue = bookmarks.some(value => (value.movieId === movie.id))
               return {
                   ...movie,
                   backdrop_path: movie.backdrop_path ? `${process.env.TMDB_IMAGE_URL}${movie.backdrop_path}` : null,
                   poster_path: movie.poster_path ? `${process.env.TMDB_IMAGE_URL}${movie.poster_path}` : null,
                   isBookmark: isTrue,
                   
               }
            })  
            res.status(200).json(new ApiResponse(true, "Popular movies fetched successfully", movies));
        }
    }catch(error){
        res.status(500).json(new ApiError(false, error.message));
     }
}

const getTopRatedMovies = async (req, res) => {
    try{
        const { page } = req.params || 1;
        const url = `${process.env.TMDB_BASE_URL}movie/top_rated?language=en-US&page=${page}`;
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
            return res.status(400).json(new ApiError(false, "Failed to fetch top rated movies"));
        }
        else {
            const bookmarks = await bookmarkModel.find({userId: req.user._id}).select("movieId");
            const movies = data.results.map((movie) => {
                const isTrue = bookmarks.some(value => (value.movieId === movie.id))
                return {
                    ...movie,
                    backdrop_path: movie.backdrop_path ? `${process.env.TMDB_IMAGE_URL}${movie.backdrop_path}` : null,
                    poster_path: movie.poster_path ? `${process.env.TMDB_IMAGE_URL}${movie.poster_path}` : null,
                    isBookmark: isTrue,
                    
                }
             })  
            res.status(200).json(new ApiResponse(true, "Top rated movies fetched successfully", movies));
        }
    }catch(error){
        res.status(500).json(new ApiError(false, error.message));
    }
}

const getUpcomingMovies = async (req, res) => {
    try{
        const { page } = req.params || 1;
        const url = `${process.env.TMDB_BASE_URL}movie/upcoming?language=en-US&page=${page}`;
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
            return res.status(400).json(new ApiError(false, "Failed to fetch upcoming movies"));
        }
        else {
            const bookmarks = await bookmarkModel.find({userId: req.user._id}).select("movieId");
            const movies = data.results.map((movie) => {
                const isTrue = bookmarks.some(value => (value.movieId === movie.id))
                return {
                    ...movie,
                    backdrop_path: movie.backdrop_path ? `${process.env.TMDB_IMAGE_URL}${movie.backdrop_path}` : null,
                    poster_path: movie.poster_path ? `${process.env.TMDB_IMAGE_URL}${movie.poster_path}` : null,
                    isBookmark: isTrue,
                    
                }
             })  
            res.status(200).json(new ApiResponse(true, "Upcoming movies fetched successfully", movies));
        }
    }catch(error){
        res.status(500).json(new ApiError(false, error.message));
    }
}


export {getMoviesVideos, getPopularMovies, getTopRatedMovies, getUpcomingMovies };