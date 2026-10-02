import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  loginUser as authenticateUser,
  logoutUser as endUserSession,
  registerUser as createUser,
} from "../services/user.service.js";

const registerUser = asyncHandler(async (req, res) => {
  const user = await createUser(req.body);
  return res
    .status(201)
    .json(new ApiResponse(true, "User registered successfully", user));
});

const loginUser = asyncHandler(async (req, res) => {
  const { token } = await authenticateUser(req.body);
  res.cookie("token", token);
  return res
    .status(200)
    .json(new ApiResponse(true, "User logged in successfully", { token }));
});

const logoutUser = asyncHandler(async (req, res) => {
  const authorization = req.get("authorization") || "";
  const bearerToken = authorization.match(/^Bearer\s+(.+)$/i)?.[1];
  const token = req.cookies?.token || bearerToken;

  await endUserSession(token);
  res.clearCookie("token");
  return res
    .status(200)
    .json(new ApiResponse(true, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser };
