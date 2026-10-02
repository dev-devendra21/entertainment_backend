import express from "express";
import v1Routes from "./v1/index.route.js";
const routes = express.Router();

routes.use("/v1", v1Routes);
