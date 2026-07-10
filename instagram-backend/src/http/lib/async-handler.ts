import type { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Wraps an async route handler so a rejected promise is forwarded to Express's
 * error middleware. Express 5 forwards rejections natively, but wrapping keeps
 * the intent explicit and guards against handlers that throw synchronously
 * before their first await.
 */
export const asyncHandler =
  (handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>): RequestHandler =>
  (req, res, next) => {
    handler(req, res, next).catch(next);
  };
