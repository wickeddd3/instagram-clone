import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/entities/profile";
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
    } catch {
      toast.error("Failed to create post. Please try again.");
      setIsUploading(false);
    }
  };

  return { handleShare, isUploading };
};
