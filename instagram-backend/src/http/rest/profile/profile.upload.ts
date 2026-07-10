import multer from "multer";
import type { RequestHandler } from "express";
import { BadRequestError } from "../../../errors/app.error";
import { AVATAR_MAX_BYTES, isAllowedAvatarMime } from "./profile.schema";

// In-memory single-file upload for avatars: the buffer is streamed straight to
// Supabase Storage, so nothing touches local disk. Oversized files are rejected
// by multer's limit; disallowed types are rejected in the fileFilter.
const avatarUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: AVATAR_MAX_BYTES, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (!isAllowedAvatarMime(file.mimetype)) {
      cb(new BadRequestError("Unsupported image type"));
      return;
    }
    cb(null, true);
  },
});

/**
 * Parses a single `avatar` file and normalizes multer's own errors (e.g. the
 * size limit) into a 400 so they flow through the standard error envelope
 * instead of surfacing as a 500.
 */
export const uploadAvatarFile: RequestHandler = (req, res, next) => {
  avatarUpload.single("avatar")(req, res, (err: unknown) => {
    if (err instanceof multer.MulterError) {
      const message = err.code === "LIMIT_FILE_SIZE" ? "Avatar exceeds the 5 MB limit" : err.message;
      next(new BadRequestError(message));
      return;
    }
    // fileFilter rejections (already BadRequestError) and anything else pass through.
    next(err);
  });
};
