import { uploadImage } from "@/shared/lib/supabase-upload";
import { createUploadPath } from "@/shared/utils/upload";

export const useUploadPostMedia = () => {
  const uploadMedia = async (files: File[], userId: string) => {
    const uploadPromises = files.map(async (file) => {
      // Create unique file path
      const filePath = createUploadPath(userId, file);

      // Get Public URL after upload
      const publicUrl = await uploadImage(file, filePath, "posts");

      return {
        url: publicUrl,
        type: file.type.startsWith("video") ? "VIDEO" : "IMAGE",
      };
    });

    return Promise.all(uploadPromises);
  };

  return { uploadMedia };
};
