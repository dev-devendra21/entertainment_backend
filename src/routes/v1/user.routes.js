import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../../controller/user.controller.js";
import validateBody from "../../middleware/validate.middleware.js";
import { authRateLimiter } from "../../middleware/rate-limit.middleware.js";
import { userSchema } from "../../models/validation/validate.js";

const routes = express.Router();

routes.post(
  "/register",
  authRateLimiter,
  validateBody(userSchema),
  registerUser,
);
routes.post("/login", authRateLimiter, validateBody(userSchema), loginUser);
routes.post("/logout", logoutUser);

export default routes;
