import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/app.error";
import { logger } from "../../lib/logger";
import { config } from "../../config/env.config";

/** Catch-all 404 for unmatched routes. */
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: `Route ${req.method} ${req.path} not found`,
    },
  });
};

/**
 * Central Express error handler. Operational AppErrors surface their status and
 * message; anything else is logged and reported as a generic 500 so internals
 * never leak to clients.
 */
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  // Express only treats a handler as an error handler if it declares 4 params.
  _next: NextFunction,
): void => {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;
  const code = isAppError ? err.code : "INTERNAL_ERROR";
  const message = isAppError && err.isOperational ? err.message : "Internal server error";

  if (!isAppError || statusCode >= 500) {
    logger.error({ err }, "Unhandled error");
  }

  res.status(statusCode).json({
    error: {
      code,
      message,
      ...(isAppError && err.details ? { details: err.details } : {}),
      ...(config.isProduction || !(err instanceof Error) ? {} : { stack: err.stack }),
    },
  });
};
