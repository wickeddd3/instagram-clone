import { Router } from "express";
import type { Services } from "@/container";
import { createAuthRouter } from "./auth";
import { createProfileRouter } from "./profile";

/**
 * The versioned REST API, mounted at /api/v1 alongside GraphQL; both transports
 * share the same services container. Body parsing is applied per-route (JSON for
 * signup, multipart for avatar upload) rather than globally, so multipart routes
 * aren't intercepted by a JSON parser. Add a resource by wiring its router here.
 */
export const createApiRouter = (services: Services): Router => {
  const router = Router();

  router.use("/auth", createAuthRouter(services));
  router.use("/profiles", createProfileRouter(services));

  return router;
};
