import { useState } from "react";
import { useAuth } from "@/app/providers/AuthContext";
import { useUploadPostMedia } from "./useUploadMedia";
import { useCreatePost } from "./useCreatePost";

export const usePostSubmission = (
  files: File[],
  caption: string,
  onCompleted: () => void,
) => {
  const { authUser } = useAuth();
  const { uploadMedia } = useUploadPostMedia();
  const { createPost } = useCreatePost({ onCompleted });
  const [isUploading, setIsUploading] = useState(false);

  const handleShare = async () => {
    if (!files.length || !authUser) return;
    setIsUploading(true);
    try {
      // 1. Upload post media files to storage
      const mediaUrls = await uploadMedia(files, authUser.id);
      // 2. Create post with uploaded media files url
      await createPost({ variables: { media: mediaUrls, caption } });
    } catch (error) {
      console.error(error);
      setIsUploading(false);
    }
  };

  return { handleShare, isUploading };
};
