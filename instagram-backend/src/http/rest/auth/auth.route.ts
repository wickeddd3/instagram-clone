import { Router } from "express";
import { json } from "body-parser";
import type { Services } from "@/container";
import { asyncHandler } from "@/http/lib/async-handler";
import { validate } from "@/http/middleware/request.middleware";
import { createAuthController } from "./auth.controller";
import { signupBody } from "./auth.schema";

/** /auth routes. Public: signup creates the account and returns a session. */
export const createAuthRouter = (services: Services): Router => {
  const router = Router();
  const controller = createAuthController(services);

  router.post("/signup", json({ limit: "16kb" }), validate({ body: signupBody }), asyncHandler(controller.signup));

  return router;
};
