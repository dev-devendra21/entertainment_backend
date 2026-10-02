import express from "express";
import userRoutes from "./user.routes.js";
import movieRoutes from "./movies.routes.js";
import bookmarkRoutes from "./bookmark.routes.js";
import restRoutes from "./rest.routes.js";

const routes = express.Router();

routes.use("/users", userRoutes);
routes.use("/movies", movieRoutes);
routes.use("/bookmarks", bookmarkRoutes);
routes.use("/", restRoutes);
