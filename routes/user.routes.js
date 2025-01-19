import express from "express";
import {loginUser, registerUser, logoutUser, getUserDetails} from "../controller/user.controller.js";
import {userSchemaValidation} from "../models/validation/validate.js";
import authMiddleware from "../middleware/auth.middleware.js";


const routes = express.Router();


routes.post("/register", userSchemaValidation(), registerUser);
routes.post("/login", loginUser);
routes.post("/logout", logoutUser);
routes.get('/details', authMiddleware, getUserDetails);



export default routes;