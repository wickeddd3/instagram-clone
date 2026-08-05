// Upload constraints for post/story/avatar media. MAX_UPLOAD_FILES mirrors the
// backend's createPost media cap (1–10) so the client rejects before uploading.
export const MAX_UPLOAD_FILES = 10;

export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;

// Human-readable list for hint text and the file input's `accept` attribute.
export const ACCEPTED_IMAGE_LABEL = "PNG, JPG, WEBP, GIF";
export const ACCEPTED_IMAGE_ACCEPT = ACCEPTED_IMAGE_TYPES.join(",");
