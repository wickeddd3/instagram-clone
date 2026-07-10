import type { Request, Response } from "express";
import type { Services } from "@/container";
import type { SignupBody } from "./auth.schema";

/**
 * Thin HTTP adapter for signup. The body has already been validated and cleaned
 * by the validate middleware; this delegates the auth-user + profile + session
 * creation to the account service and holds no business logic.
 */
export const createAuthController = (services: Services) => ({
  signup: async (req: Request<unknown, unknown, SignupBody>, res: Response): Promise<void> => {
    const result = await services.account.signup(req.body);
    res.status(201).json({ data: result });
  },
});
