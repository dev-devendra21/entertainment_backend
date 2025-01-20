import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getTrending, getSearchQuery, getRecommended } from "../controller/rest.controller.js";

const routes = express.Router();


routes.get("/trending/movies_&_tv_series", authMiddleware, getTrending);
routes.get('/search/:type/:query/:page', authMiddleware, getSearchQuery);
routes.get('/recommendations/:type', authMiddleware, getRecommended);


export default routes