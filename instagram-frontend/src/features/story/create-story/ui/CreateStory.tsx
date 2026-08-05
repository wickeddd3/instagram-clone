import { toast } from "sonner";
import { useState, type ChangeEvent } from "react";
import { RefreshCw } from "lucide-react";
import { useAuth } from "@/entities/profile";
import { BackButton, ShareButton, PreviewImage } from "@/shared/ui";
import { uploadImage } from "@/shared/lib";
import { createUploadPath } from "@/shared/utils";
import { ACCEPTED_IMAGE_ACCEPT } from "@/shared/config";
import { useCreateStory } from "../model/useCreateStory";

interface DetailsProps {
  previewUrl: string;
  file: File;
  onReplace: (file: File) => void;
  onSuccess: () => void;
  onBack: () => void;
  onClose: () => void;
}

export const CreateStory = ({ previewUrl, file, onReplace, onSuccess, onBack, onClose }: DetailsProps) => {
  const { authUser } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  const { createStory } = useCreateStory({
    onCompleted: () => {
      onSuccess();
      onClose();
    },
  });

  const handleReplace = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.files?.[0];
    if (next) onReplace(next);
    e.target.value = ""; // allow re-selecting the same file
  };

  const handleShare = async () => {
    if (!authUser) return;

    setIsUploading(true);
    try {
      const filePath = createUploadPath(authUser.id, file);
      const publicUrl = await uploadImage(file, filePath, "stories");
      await createStory({ variables: { mediaUrl: publicUrl, mediaType: "IMAGE" } });
    } catch {
      toast.error("Failed to create story. Please try again.");
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-foreground">
      <div className="bg-surface border-b border-border w-full flex items-center justify-between">
        <BackButton onClick={onBack} />
        <h1 className="text-center py-3 font-semibold">Create story</h1>
        <ShareButton loading={isUploading} onClick={handleShare} />
      </div>

      <div className="flex-1 h-[400px] w-full flex flex-col md:flex-row">
        {/* Preview Image */}
        <div className="relative w-full h-full bg-black flex items-center justify-center">
          <PreviewImage previewUrl={previewUrl} />

          {!isUploading && (
            <label
              title="Replace photo"
              className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white cursor-pointer transition hover:bg-black/80"
            >
              <RefreshCw size={14} aria-hidden="true" />
              Replace
              <input type="file" className="hidden" onChange={handleReplace} accept={ACCEPTED_IMAGE_ACCEPT} />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};
