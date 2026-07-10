// Constraints for profile-related uploads. The avatar arrives as multipart form
// data, so these bound the multer instance (size + allowed image types) rather
// than a JSON body.
export const AVATAR_MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export const AVATAR_ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;

export const isAllowedAvatarMime = (mime: string): boolean => (AVATAR_ALLOWED_MIME as readonly string[]).includes(mime);
