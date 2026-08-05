import { toast } from "sonner";
import { useAuth } from "@/entities/profile";
import { BackButton } from "@/shared/ui";
import { ShareButton } from "@/shared/ui";
import { PreviewImage } from "@/shared/ui";
import { uploadImage } from "@/shared/lib";
import { createUploadPath } from "@/shared/utils";
import { useCreateStory } from "../model/useCreateStory";

interface DetailsProps {
  previewUrl: string;
  fileToUpload: File | null;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
  setStep: (value: "upload" | "details") => void;
  onClose: () => void;
}

export const CreateStory = ({
  previewUrl,
  fileToUpload,
  isUploading,
  setIsUploading,
  setStep,
  onClose,
}: DetailsProps) => {
  const { authUser } = useAuth();

  const handleResetState = () => {
    setStep("upload");
    setIsUploading(false);
    onClose();
  };

  const { createStory } = useCreateStory({ onCompleted: handleResetState });

  if (!authUser) return null;

  const CURRENT_USER_ID = authUser.id;

  // Handle Sharing Post + Uploading Image
  const handleShare = async () => {
    if (!fileToUpload) return;

    setIsUploading(true);

    try {
      // Create unique file path
      const filePath = createUploadPath(CURRENT_USER_ID, fileToUpload);

      // Get Public URL after upload
      const publicUrl = await uploadImage(fileToUpload, filePath, "stories");

      // Create Story
      await createStory({
        variables: {
          mediaUrl: publicUrl,
          mediaType: "IMAGE",
        },
      });
    } catch {
      toast.error("Failed to create story. Please try again.");
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white">
      <div className="bg-neutral-950 border-b border-neutral-800 w-full flex items-center justify-between">
        <BackButton onClick={() => setStep("upload")} />
        <h1 className="text-center py-3 font-semibold">Create story</h1>
        <ShareButton loading={isUploading} onClick={handleShare} />
      </div>

      <div className="flex-1 h-[400px] w-full flex flex-col md:flex-row">
        {/* Preview Image */}
        <div className="w-full h-full bg-black flex items-center justify-center">
          <PreviewImage previewUrl={previewUrl} />
        </div>
      </div>
    </div>
  );
};
