import env from "./config/env.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import apiRoutes from "./routes/index.route.js";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import logger from "./lib/logger.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { apiRateLimiter } from "./middleware/rate-limit.middleware.js";

const app = express();
app.use(helmet());
app.use(pinoHttp({ logger }));
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use("/api", apiRateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", apiRoutes);
app.use(errorMiddleware);

export default app;
