import pino from "pino";

// Structured logger. Pretty-prints in development; emits JSON in production so
// logs are machine-parseable by the hosting platform.
export const logger = pino(process.env.NODE_ENV === "production" ? {} : { transport: { target: "pino-pretty" } });
