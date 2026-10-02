import { rateLimit } from "express-rate-limit";
import ApiError from "../utils/ApiError.js";

const createRateLimiter = (limit, message) =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => res.status(429).json(new ApiError(false, message)),
  });

const apiRateLimiter = createRateLimiter(
  100,
  "Too many requests. Please try again later.",
);

const authRateLimiter = createRateLimiter(
  10,
  "Too many authentication attempts. Please try again later.",
);

export { apiRateLimiter, authRateLimiter };
