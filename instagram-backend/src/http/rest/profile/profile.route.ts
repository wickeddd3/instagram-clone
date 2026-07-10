import { Router } from "express";
import type { Services } from "@/container";
import { attachUser, requireAuth } from "@/http/middleware/auth.middleware";
import { asyncHandler } from "@/http/lib/async-handler";
import { uploadAvatarFile } from "./profile.upload";
import { createProfileController } from "./profile.controller";

/**
 * /profiles routes. Avatar upload is authenticated (attachUser resolves the JWT,
 * requireAuth rejects anonymous callers) and multipart (uploadAvatarFile parses
 * the `avatar` file before the controller runs).
 */
export const createProfileRouter = (services: Services): Router => {
  const router = Router();
  const controller = createProfileController(services);

  router.post(
    "/avatar",
    asyncHandler(attachUser),
    requireAuth,
    uploadAvatarFile,
    asyncHandler(controller.uploadAvatar),
  );

  return router;
};
