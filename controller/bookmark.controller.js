import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import bookmarkModel from "../models/schema/bookmarkModel.js";


const setBookmark = async (req, res) => {
    try {
        const {id, media_type, title, backdrop_path, release_date, isBookmarked} = req.body;
        const isAlreadyBookmarked = await bookmarkModel.findOne({movieId: id, userId: req.user._id});
        if(isAlreadyBookmarked){ 
            await bookmarkModel.findByIdAndDelete(isAlreadyBookmarked._id);
            return res.status(200).json(new ApiResponse(true, "Bookmark removed successfully"));
        }
        const bookmark = await bookmarkModel.create({movieId: id, media_type, title, backdrop_path, release_date, isBookmarked, userId: req.user._id});

        return res.status(200).json(new ApiResponse(true, "Bookmark added successfully", bookmark));
    } catch(error){
        res.status(500).json(new ApiError(false, error.message));
    }
}


const getBookmarks = async (req, res) => {
    try {
        const bookmarks = await bookmarkModel.find({userId: req.user._id});
        res.status(200).json(new ApiResponse(true, "Bookmarks fetched successfully", bookmarks));
    } catch(error){
        res.status(500).json(new ApiError(false, error.message));
    }
}


const deleteBookmark = async (req, res) => {
    try {
        const {id} = req.params;
        await bookmarkModel.findByIdAndDelete(id);
        res.status(200).json(new ApiResponse(true, "Bookmark deleted successfully"));
    } catch(error){
        res.status(500).json(new ApiError(false, error.message));
    }
}

const searchBookmarks = async (req, res) => {
    try {
        const {query, page} = req.params;
        const searchResults = await bookmarkModel.find({userId: req.user._id, title: {$regex: query, $options: "i"}}).limit(10).skip((page - 1) * 10);
        const totalResults = (await bookmarkModel.find({userId: req.user._id, title: {$regex: query, $options: "i"}})).length;
        const totalPages = Math.ceil(totalResults / 10);
        res.status(200).json(new ApiResponse(true, "Bookmarks fetched successfully", {searchResults, totalPages, totalResults}));
    } catch(error){
        res.status(500).json(new ApiError(false, error.message));
    }
}


export {setBookmark, getBookmarks, deleteBookmark, searchBookmarks};