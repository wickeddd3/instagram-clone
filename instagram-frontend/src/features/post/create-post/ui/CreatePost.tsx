import { useMemo, useRef, useState } from "react";
import { useAuth } from "@/app/providers/AuthContext";
import { AuthUser } from "./AuthUser";
import { CaptionTextarea } from "./CaptionTextarea";
import { LoadingSpinner } from "./LoadingSpinner";
import { BackButton } from "@/shared/ui/BackButton";
import { ShareButton } from "@/shared/ui/ShareButton";
import { usePostSubmission } from "../model/usePostSubmission";
import { PreviewFooter } from "./PreviewFooter";
import { ImageCarousel } from "@/shared/ui/ImageCarousel";
import type { Swiper as SwiperType } from "swiper";

interface DetailsProps {
  files: File[];
  previewUrls: string[];
  onSuccess: () => void;
  onBack: () => void;
  onClose: () => void;
}

export const CreatePost = ({
  files,
  previewUrls,
  onSuccess,
  onBack,
  onClose,
}: DetailsProps) => {
  const { authProfile } = useAuth();
  const [caption, setCaption] = useState("");
  const swiperRef = useRef<SwiperType | null>(null);

  const { handleShare, isUploading } = usePostSubmission(files, caption, () => {
    setCaption("");
    onSuccess();
    onClose();
  });

  // Convert string URLs to the object format expected by ImageCarousel
  const mediaItems = useMemo(
    () => previewUrls.map((url) => ({ url })),
    [previewUrls],
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white">
      <div className="bg-neutral-950 border-b border-neutral-800 w-full flex items-center justify-between">
        <BackButton onClick={onBack} />
        <h1 className="text-center py-3 font-semibold">Create new post</h1>
        <ShareButton loading={isUploading} onClick={handleShare} />
      </div>

      <div className="flex-1 h-[400px] w-full flex flex-col md:flex-row">
        {/* Preview Image */}
        <div className="w-full md:w-[60%] h-1/2 md:h-full bg-black flex items-center justify-center relative border-r border-gray-700">
          <div className="w-full h-full flex flex-col">
            <ImageCarousel
              media={mediaItems}
              onSwiper={(slide) => (swiperRef.current = slide)}
            />
            <PreviewFooter
              previews={previewUrls}
              onThumbnailClick={(i: any) => swiperRef.current?.slideTo(i)}
            />
          </div>
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
