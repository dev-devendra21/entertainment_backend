import { Schema, model } from "mongoose";

const bookmarkSchema = new Schema({
    movieId: {
        type: Number,
        required: true,
    },
    media_type: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    backdrop_path: {
        type: String,
        required: true,
    },
    release_date: {
        type: String,
        required: true,
    },
    isBookmarked: {
        type: Boolean,
        required: true,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

const Bookmark = model("Bookmark", bookmarkSchema);

export default Bookmark