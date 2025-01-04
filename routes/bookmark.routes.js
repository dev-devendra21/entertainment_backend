import express from "express";
import { setBookmark, getBookmarks, deleteBookmark, searchBookmarks } from "../controller/bookmark.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const routes = express.Router();

routes.route("/").post(authMiddleware, setBookmark).get(authMiddleware, getBookmarks);
routes.delete("/:id", authMiddleware, deleteBookmark);
routes.get("/search/:query/:page", authMiddleware, searchBookmarks);


export default routes