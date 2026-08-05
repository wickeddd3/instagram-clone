import { toast } from "sonner";
import { useMutation } from "@apollo/client/react";
import { UPLOAD_PROFILE_AVATAR } from "../api/mutation";
import { useState } from "react";
import {
  createUploadPath,
  generatePreview,
  getFileData,
} from "@/shared/utils";
import { uploadImageWithProgress } from "@/shared/lib";

export const useUploadAvatar = ({
  userId,
  onCompleted = () => {},
}: {
  userId: string;
  onCompleted?: () => void;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

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

    setProgress(0);
    setIsUploading(true);

    try {
      // Create unique file path
      const filePath = createUploadPath(userId, file);

      // Upload to storage, reporting progress, then get the public URL
      const publicUrl = await uploadImageWithProgress(
        file,
        filePath,
        "avatars",
        setProgress,
      );

      // Upload avatar URL to profile
      await uploadAvatar({
        variables: {
          avatarUrl: publicUrl,
        },
      });
      setIsUploading(false);
    } catch {
      toast.error("Failed to upload avatar. Please try again.");
      setIsUploading(false);
    }
  };

  return {
    previewUrl,
    isUploading,
    progress,
    uploadAvatar,
    loading,
    error,
    handleUploadAvatar,
  };
};
