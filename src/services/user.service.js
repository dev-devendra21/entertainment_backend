import ApiError from "../utils/ApiError.js";
import blacklistTokenRepository from "../repositories/blacklist-token.repository.js";
import userRepository from "../repositories/user.repository.js";

const createServiceError = (statusCode, message) => {
  const error = new ApiError(false, message);
  error.statusCode = statusCode;
  return error;
};

const registerUser = async ({ email, password }) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw createServiceError(400, "User already exists");
  }

  const user = await userRepository.create({ email, password });
  return { _id: user._id, email: user.email };
};

const loginUser = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user || !password || !(await user.comparePassword(password))) {
    throw createServiceError(400, "Invalid email or password");
  }

  return { token: user.generateToken() };
};

const logoutUser = async (token) => {
  if (!token) {
    throw createServiceError(401, "Unauthorized");
  }

  const isBlacklisted = await blacklistTokenRepository.exists(token);
  if (!isBlacklisted) {
    await blacklistTokenRepository.create(token);
  }
};

export { registerUser, loginUser, logoutUser };
