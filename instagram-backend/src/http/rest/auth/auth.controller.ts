import type { Request, Response } from "express";
import type { Services } from "../../../container";
import { parseBody } from "../../lib/validate";
import { signupBody } from "./auth.schema";

/**
 * Thin HTTP adapter for signup. Validates the body and delegates the auth-user +
 * profile + session creation to the account service; holds no business logic.
 */
export const createAuthController = (services: Services) => ({
  signup: async (req: Request, res: Response): Promise<void> => {
    const body = parseBody(req, signupBody);
    const result = await services.account.signup(body);
    res.status(201).json({ data: result });
  },
});
