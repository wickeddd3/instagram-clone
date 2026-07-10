import type { Request, Response, NextFunction } from "express";
import { verifySupabaseToken } from "../../lib/supabase";
import { UnauthorizedError } from "../../errors/app.error";

// Make the resolved user id available on the Express request for REST handlers.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- required to augment Express types
  namespace Express {
    interface Request {
      userId: string | null;
    }
  }
}

/**
 * Resolves the Supabase user id from a request's Authorization header. Shared by
 * the GraphQL context and the REST auth middleware so token handling lives in
 * exactly one place.
 */
export const getUserIdFromRequest = (req: Pick<Request, "headers">): Promise<string | null> =>
  verifySupabaseToken(req.headers.authorization ?? "");

/** Attaches `req.userId` (nullable) without rejecting anonymous requests. */
export const attachUser = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  req.userId = await getUserIdFromRequest(req);
  next();
};

/** Rejects the request with 401 unless a valid user is present. */
export const requireAuth = (req: Request, _res: Response, next: NextFunction): void => {
  if (!req.userId) {
    throw new UnauthorizedError();
  }
  next();
};
