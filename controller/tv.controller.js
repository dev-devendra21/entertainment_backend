import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import bookmarkModel from "../models/schema/bookmarkModel.js";

const getPopularTvShows = async (req, res) => {
    try {
        const {page} = req.params || 1;
        const url = `${process.env.TMDB_BASE_URL}tv/popular?language=en-US&page=${page}`;
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
            return res.status(400).json(new ApiError(false, "Failed to fetch popular tv shows"));
        }
        else {
            const bookmarks = await bookmarkModel.find({userId: req.user._id}).select("movieId");
            const tvShows = data.results.map((tvShow) => {
                const isTrue = bookmarks.some(value => (value.movieId === tvShow.id))
                return {
                    ...tvShow,
                    backdrop_path: tvShow.backdrop_path ? `${process.env.TMDB_IMAGE_URL}${tvShow.backdrop_path}` : null,
                    poster_path: tvShow.poster_path ? `${process.env.TMDB_IMAGE_URL}${tvShow.poster_path}` : null,
                    isBookmark: isTrue,
                }
            })
            res.status(200).json(new ApiResponse(true, "Popular tv shows fetched successfully", tvShows));
        }
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}

const getTopRatedTvShows = async (req, res) => {
    try {
        const {page} = req.params || 1;
        const url = `${process.env.TMDB_BASE_URL}tv/top_rated?language=en-US&page=${page}`;
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
            return res.status(400).json(new ApiError(false, "Failed to fetch top rated tv shows"));
        }
        else {
            const bookmarks = await bookmarkModel.find({userId: req.user._id}).select("movieId");
            const tvShows = data.results.map((tvShow) => {
                const isTrue = bookmarks.some(value => (value.movieId === tvShow.id))
                return {
                    ...tvShow,
                    backdrop_path: tvShow.backdrop_path ? `${process.env.TMDB_IMAGE_URL}${tvShow.backdrop_path}` : null,
                    poster_path: tvShow.poster_path ? `${process.env.TMDB_IMAGE_URL}${tvShow.poster_path}` : null,
                    isBookmark: isTrue,
                }
            })
            res.status(200).json(new ApiResponse(true, "Top rated tv shows fetched successfully", tvShows));
        }
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}

const getUpcomingTvShows = async (req, res) => {
    try {
        const {page} = req.params || 1;
        const url = `${process.env.TMDB_BASE_URL}tv/on_the_air?language=en-US&page=${page}`;
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
            return res.status(400).json(new ApiError(false, "Failed to fetch upcoming tv shows"));
        }
        else {
            const bookmarks = await bookmarkModel.find({userId: req.user._id}).select("movieId");
            const tvShows = data.results.map((tvShow) => {
                const isTrue = bookmarks.some(value => (value.movieId === tvShow.id))
                return {
                    ...tvShow,
                    backdrop_path: tvShow.backdrop_path ? `${process.env.TMDB_IMAGE_URL}${tvShow.backdrop_path}` : null,
                    poster_path: tvShow.poster_path ? `${process.env.TMDB_IMAGE_URL}${tvShow.poster_path}` : null,
                    isBookmark: isTrue,
                }
            })
            res.status(200).json(new ApiResponse(true, "Upcoming tv shows fetched successfully", tvShows));
        }
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}

const getAiringTvShows = async (req, res) => {
    try {
        const {page} = req.params || 1;
        const url = `${process.env.TMDB_BASE_URL}tv/airing_today?language=en-US&page=${page}`;
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
            return res.status(400).json(new ApiError(false, "Failed to fetch on airing tv shows"));
        }
        else {
            const bookmarks = await bookmarkModel.find({userId: req.user._id}).select("movieId");
            const tvShows = data.results.map((tvShow) => {
                const isTrue = bookmarks.some(value => (value.movieId === tvShow.id))
                return {
                    ...tvShow,
                    backdrop_path: tvShow.backdrop_path ? `${process.env.TMDB_IMAGE_URL}${tvShow.backdrop_path}` : null,
                    poster_path: tvShow.poster_path ? `${process.env.TMDB_IMAGE_URL}${tvShow.poster_path}` : null,
                    isBookmark: isTrue,
                }
            })
            res.status(200).json(new ApiResponse(true, "On air tv shows fetched successfully", tvShows));
        }
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}

const getTvShowVideos = async (req, res) => {
    try{
        const { id } = req.params;
        const url = `${process.env.TMDB_BASE_URL}tv/${id}/videos?language=en-US`;
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
            return res.status(400).json(new ApiError(false, "Failed to fetch tv show videos"));
        }
        else {
            const videos = data.results.filter((video) => video.type === "Trailer");
            res.status(200).json(new ApiResponse(true, "Tv show videos fetched successfully", videos));
        }
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}

const getTvShowDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const url = `${process.env.TMDB_BASE_URL}tv/${id}?language=en-US`;
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
            return res.status(400).json(new ApiError(false, "Failed to fetch tv show details"));
        }else {
            res.status(200).json(new ApiResponse(true, "Tv show details fetched successfully", data));
        }
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}


export { getPopularTvShows, getTopRatedTvShows, getUpcomingTvShows, getAiringTvShows, getTvShowVideos, getTvShowDetails };