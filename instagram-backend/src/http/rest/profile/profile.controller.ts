import type { Request, Response } from "express";
import type { Services } from "@/container";
import { BadRequestError, UnauthorizedError } from "@/errors/app.error";

/**
 * Thin HTTP adapter for profile avatar uploads. multer has already parsed the
 * multipart file onto req.file; this validates presence and delegates the
 * Storage upload + profile update to the account service.
 */
export const createProfileController = (services: Services) => ({
  uploadAvatar: async (req: Request, res: Response): Promise<void> => {
    if (!req.userId) throw new UnauthorizedError();
    if (!req.file) throw new BadRequestError("Avatar file is required");

    const { buffer, originalname, mimetype } = req.file;
    const profile = await services.account.uploadAvatar(req.userId, { buffer, originalname, mimetype });
    res.json({ data: profile });
  },
});
