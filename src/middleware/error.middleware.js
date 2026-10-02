import logger from "../lib/logger.js";
import ApiError from "../utils/ApiError.js";

const errorMiddleware = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || 500;
  const message = statusCode >= 500 ? "Internal server error" : error.message;

  if (statusCode >= 500) {
    logger.error({ err: error }, "Request failed");
  }

  return res
    .status(statusCode)
    .json(new ApiError(false, message, error.details));
};

export default errorMiddleware;
