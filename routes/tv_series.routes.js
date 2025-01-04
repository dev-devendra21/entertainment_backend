import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getPopularTvShows, getTopRatedTvShows, getUpcomingTvShows, getAiringTvShows, getTvShowVideos, getTvShowDetails } from "../controller/tv.controller.js";

const routes = express.Router();

routes.get("/popular/:page", authMiddleware, getPopularTvShows);
routes.get("/top_rated/:page", authMiddleware, getTopRatedTvShows);
routes.get("/upcoming/:page", authMiddleware, getUpcomingTvShows);
routes.get("/airing_today/:page", authMiddleware, getAiringTvShows);
routes.get("/:id/videos", authMiddleware, getTvShowVideos);
routes.get("/:id", authMiddleware, getTvShowDetails);

export default routes