import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";

const fetchTmdb = async (path, failureMessage) => {
  const response = await fetch(`${env.TMDB_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${env.TMDB_ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) {
    const error = new ApiError(false, failureMessage);
    error.statusCode = 400;
    throw error;
  }

  return response.json();
};

export default fetchTmdb;
