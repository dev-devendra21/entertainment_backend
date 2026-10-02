import userModel from "../models/schema/usermodel.js";

const findByEmail = (email) => userModel.findOne({ email });

const create = (userData) => userModel.create(userData);

export default { findByEmail, create };
