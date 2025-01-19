import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import userModel from "../models/schema/usermodel.js";
import jwt from "jsonwebtoken";


const authMiddleware = async (req, res, next) => {
    try {
        const token =  req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json(new ApiResponse(false, "Unauthorized"));
        }

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).json(new ApiResponse(false, "Unauthorized"));
        }
        const user = await userModel.findOne({ _id: decodedToken._id }).select("-password");

        if (!user) {
            return res.status(401).json(new ApiResponse(false, "Unauthorized"));
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json(new ApiError(false, error.message));
    }
}

export default authMiddleware