import pino from "pino";
import { config } from "../config/env.config";

// Structured logger. Pretty-prints in development; emits JSON in production so
// logs are machine-parseable by the hosting platform.
export const logger = pino({
  level: config.logLevel,
  ...(config.isProduction ? {} : { transport: { target: "pino-pretty" } }),
});
