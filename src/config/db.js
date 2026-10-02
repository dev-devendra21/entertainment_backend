import env from "./env.js";
import mongoose from "mongoose";
import logger from "../lib/logger.js";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.MONGO_URI);
        logger.info({ host: conn.connection.host }, "MongoDB connected");
    }
    catch (error) {
        logger.error({ err: error }, "MongoDB connection failed");
        process.exit(1);
    }
}

export default connectDB