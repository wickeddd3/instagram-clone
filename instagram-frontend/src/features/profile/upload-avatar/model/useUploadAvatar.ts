import { useMutation } from "@apollo/client/react";
import { UPLOAD_PROFILE_AVATAR } from "../api/mutation";
import { useState } from "react";
import {
  createUploadPath,
  generatePreview,
  getFileData,
} from "@/shared/utils/upload";
import { uploadImage } from "@/shared/lib/supabase-upload";

export const useUploadAvatar = ({
  userId,
  onCompleted = () => {},
}: {
  userId: string;
  onCompleted?: () => void;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [uploadAvatar, { loading, error }] = useMutation(
    UPLOAD_PROFILE_AVATAR,
    {
      onCompleted: () => {
        onCompleted?.();
      },
    },
  );

  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = getFileData(e);

    if (!file) return;

    const url = generatePreview(file);
    setPreviewUrl(url);

    setIsUploading(true);

    try {
      // Create unique file path
      const filePath = createUploadPath(userId, file);

      // Get Public URL after upload
      const publicUrl = await uploadImage(file, filePath, "avatars");

      // Upload avatar URL to profile
      await uploadAvatar({
        variables: {
          avatarUrl: publicUrl,
        },
      });
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setIsUploading(false);
    }
  };

  return {
    previewUrl,
    isUploading,
    uploadAvatar,
    loading,
    error,
    handleUploadAvatar,
  };
};
