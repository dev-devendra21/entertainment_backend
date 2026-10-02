import env from "./config/env.js";
import http from "http";
import app from "./index.js";
import connectDB from "./config/db.js";
import logger from "./lib/logger.js";

const server = http.createServer(app);
const port = env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    server.listen(port, () => {
      logger.info({ port }, "Server listening");
    });
  } catch (error) {
    logger.fatal({ err: error }, "Server startup failed");
    process.exit(1);
  }
}

startServer();
