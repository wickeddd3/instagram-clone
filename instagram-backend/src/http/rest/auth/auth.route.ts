import { Router } from "express";
import { json } from "body-parser";
import type { Services } from "../../../container";
import { asyncHandler } from "../../lib/async-handler";
import { createAuthController } from "./auth.controller";

/** /auth routes. Public: signup creates the account and returns a session. */
export const createAuthRouter = (services: Services): Router => {
  const router = Router();
  const controller = createAuthController(services);

  router.post("/signup", json({ limit: "16kb" }), asyncHandler(controller.signup));

  return router;
};
