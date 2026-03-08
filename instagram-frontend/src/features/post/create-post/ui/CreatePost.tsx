import { useState } from "react";
import { useAuth } from "@/app/providers/AuthContext";
import { AuthUser } from "./AuthUser";
import { CaptionTextarea } from "./CaptionTextarea";
import { LoadingSpinner } from "./LoadingSpinner";
import { PreviewImage } from "@/shared/ui/PreviewImage";
import { BackButton } from "@/shared/ui/BackButton";
import { ShareButton } from "@/shared/ui/ShareButton";
import { uploadImage } from "@/shared/lib/supabase-upload";
import { createUploadPath } from "@/shared/utils/upload";
import { useCreatePost } from "../model/useCreatePost";

interface DetailsProps {
  previewUrl: string;
  fileToUpload: File | null;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
  setStep: (value: "upload" | "details") => void;
  onClose: () => void;
}

export const CreatePost = ({
  previewUrl,
  fileToUpload,
  isUploading,
  setIsUploading,
  setStep,
  onClose,
}: DetailsProps) => {
  const { authUser, authProfile } = useAuth();

  if (!authUser) return;

  const CURRENT_USER_ID = authUser?.id;
  const [caption, setCaption] = useState("");

  const handleResetState = () => {
    setStep("upload");
    setCaption("");
    setIsUploading(false);
    onClose();
  };

  const { createPost } = useCreatePost({ onCompleted: handleResetState });

  // Handle Sharing Post + Uploading Image
  const handleShare = async () => {
    if (!fileToUpload) return;

    setIsUploading(true);

    try {
      // Create unique file path
      const filePath = createUploadPath(CURRENT_USER_ID, fileToUpload);

      // Get Public URL after upload
      const publicUrl = await uploadImage(fileToUpload, filePath, "posts");

      // Create Post
      await createPost({
        variables: {
          imageUrl: publicUrl,
          caption: caption,
        },
      });
    } catch (error) {
      console.error("Error creating post:", error);
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white">
      <div className="bg-neutral-950 border-b border-neutral-800 w-full flex items-center justify-between">
        <BackButton onClick={() => setStep("upload")} />
        <h1 className="text-center py-3 font-semibold">Create new post</h1>
        <ShareButton loading={isUploading} onClick={handleShare} />
      </div>

      <div className="flex-1 h-[400px] w-full flex flex-col md:flex-row">
        {/* Preview Image */}
        <div className="w-full md:w-[60%] h-1/2 md:h-full bg-black flex items-center justify-center relative border-r border-gray-700">
          <PreviewImage previewUrl={previewUrl} />
        </div>
        {/* Details */}
        <div className="w-full h-full md:w-[40%] flex flex-col bg-neutral-900">
          {isUploading && <LoadingSpinner />}

          <AuthUser
            avatarUrl={authProfile?.avatarUrl}
            username={authProfile?.username || ""}
          />
          <CaptionTextarea
            value={caption}
            onChange={setCaption}
            disabled={isUploading}
          />
        </div>
      </div>
    </div>
  );
};
