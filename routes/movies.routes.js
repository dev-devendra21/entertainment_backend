import { getMoviesVideos, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "../controller/movies.controller.js";
import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

const routes = express.Router();

routes.get("/:movieId/videos", authMiddleware, getMoviesVideos);
routes.get("/popular/:page", authMiddleware, getPopularMovies);
routes.get("/top_rated/:page", authMiddleware, getTopRatedMovies);
routes.get("/upcoming/:page", authMiddleware, getUpcomingMovies);


export default routes


