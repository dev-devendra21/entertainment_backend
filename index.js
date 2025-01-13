import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import movieRoutes from "./routes/movies.routes.js";
import tvRoutes from "./routes/tv_series.routes.js";
import restRoutes from "./routes/rest.routes.js";
import bookmarkRoutes from "./routes/bookmark.routes.js";
import cookieParser from "cookie-parser";

connectDB()

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/tv", tvRoutes);
app.use("/api/v1/bookmarks", bookmarkRoutes);
app.use("/api/v1/", restRoutes);



export default app