import userModel from "../models/schema/usermodel.js";
import blacklistTokenModel from "../models/schema/blacklistTokenModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUserExist = await userModel.findOne({ email });

        if (isUserExist) {
            res.status(400).json(new ApiError(false, "User already exists"));
        }
        else {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                return res.status(400).json(new ApiError(false, "Validation Error", {email: errorMessages[0], password: errorMessages[1]}));
            }
            const user = await userModel.create({ email, password });
            res.status(201).json(new ApiResponse(true, "User registered successfully", user));
        }
    }
    catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }


}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(400).json(new ApiError(false, "Invalid email or password"));
        }
        else {
            const isPasswordMatch = await user.comparePassword(password);
            if (isPasswordMatch) {
                const token = user.generateToken();
                res.cookie("token", token, {sameSite:'none'});
                res.status(200).json(new ApiResponse(true, "User logged in successfully", { token }));
            }
            else {
                res.status(400).json(new ApiError(false, "Invalid email or password"));
            }
        }
    }
    catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}

const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const blacklistToken = await blacklistTokenModel.findOne({ token });

        if (blacklistToken) {
            res.clearCookie("token");
            return res.status(200).json(new ApiResponse(true, "User logged out successfully"));
        }else {
            await blacklistTokenModel.create({ token });
            res.clearCookie("token");
            res.status(200).json(new ApiResponse(true, "User logged out successfully"));
        }   
    }
    catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}


export { registerUser, loginUser, logoutUser };