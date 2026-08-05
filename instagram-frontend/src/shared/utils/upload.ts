import {
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_IMAGE_LABEL,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from "@/shared/config";

/**
 * Validate a single image file against the accepted types and size cap.
 * Returns a human-readable reason when the file is rejected, or null when valid.
 */
export const validateImageFile = (file: File): string | null => {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])) {
    return `"${file.name}" is not a supported image (${ACCEPTED_IMAGE_LABEL}).`;
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `"${file.name}" is larger than ${String(MAX_FILE_SIZE_MB)}MB.`;
  }
  return null;
};

export const createUploadPath = (userId: string, file: File): string => {
  // Generate a unique file path for the uploaded file
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}${Math.random()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;
  return filePath;
};

export const generatePreview = (file: File): string => {
  return URL.createObjectURL(file);
};

export const getFileData = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    return e.target.files[0];
  }
  return null;
};
