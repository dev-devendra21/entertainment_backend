import dotenv from "dotenv";
import { z } from "zod";
import logger from "../lib/logger.js";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  MONGO_URI: z.string().trim().min(1),
  CLIENT_URL: z.string().trim().min(1),
  JWT_SECRET: z.string().trim().min(1),
  TMDB_ACCESS_TOKEN: z.string().trim().min(1),
  TMDB_API_KEY: z.string().trim().min(1),
  TMDB_BASE_URL: z.string().trim().min(1),
  TMDB_IMAGE_URL: z.string().trim().min(1),
});

const paredEnv = envSchema.safeParse(process.env);
if (!paredEnv.success) {
  logger.fatal({ errors: paredEnv.error.format() }, "Invalid environment variables");
  process.exit(1);
}

const env = Object.freeze(paredEnv.data);

export default env;
