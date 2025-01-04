import express from "express";
import {loginUser, registerUser, logoutUser} from "../controller/user.controller.js";
import {userSchemaValidation} from "../models/validation/validate.js";


const routes = express.Router();


routes.post("/register", userSchemaValidation(), registerUser);
routes.post("/login", loginUser);
routes.post("/logout", logoutUser);



export default routes;