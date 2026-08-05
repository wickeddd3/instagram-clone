import { useMemo, useRef, useState } from "react";
import { useAuth } from "@/entities/profile";
import { AuthUser } from "./AuthUser";
import { CaptionTextarea } from "./CaptionTextarea";
import { LoadingSpinner } from "./LoadingSpinner";
import { BackButton, ShareButton, ImageCarousel } from "@/shared/ui";
import { MAX_UPLOAD_FILES } from "@/shared/config";
import { usePostSubmission } from "../model/usePostSubmission";
import { PreviewFooter } from "./PreviewFooter";
import type { Swiper as SwiperType } from "swiper";

interface DetailsProps {
  files: File[];
  previewUrls: string[];
  onAddFiles: (files: File[]) => void;
  onRemoveAt: (index: number) => void;
  onSuccess: () => void;
  onBack: () => void;
  onClose: () => void;
}

export const CreatePost = ({
  files,
  previewUrls,
  onAddFiles,
  onRemoveAt,
  onSuccess,
  onBack,
  onClose,
}: DetailsProps) => {
  const { authProfile } = useAuth();
  const [caption, setCaption] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const { handleShare, isUploading } = usePostSubmission(files, caption, () => {
    setCaption("");
    onSuccess();
    onClose();
  });

  // Convert string URLs to the object format expected by ImageCarousel
  const mediaItems = useMemo(() => previewUrls.map((url) => ({ url })), [previewUrls]);

  const count = previewUrls.length;
  // Keep the highlighted thumbnail valid after a removal shrinks the list.
  const safeActiveIndex = Math.min(activeIndex, count - 1);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white">
      <div className="bg-neutral-950 border-b border-neutral-800 w-full flex items-center justify-between">
        <BackButton onClick={onBack} />
        <h1 className="text-center py-3 font-semibold">Create new post</h1>
        <ShareButton loading={isUploading} onClick={handleShare} />
      </div>

      <div className="flex-1 h-[400px] w-full flex flex-col md:flex-row">
        {/* Preview Image */}
        <div className="w-full md:w-[60%] h-3/4 md:h-full bg-black flex flex-col relative border-r border-gray-700">
          <div className="relative flex-1 min-h-0">
            <ImageCarousel
              media={mediaItems}
              onSwiper={(slide) => (swiperRef.current = slide)}
              onActiveIndexChange={setActiveIndex}
            />
            <span className="absolute top-3 right-3 z-10 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium">
              {safeActiveIndex + 1} / {count}
            </span>
          </div>
          <PreviewFooter
            previews={previewUrls}
            activeIndex={safeActiveIndex}
            canAddMore={count < MAX_UPLOAD_FILES}
            onThumbnailClick={(i) => swiperRef.current?.slideTo(i)}
            onRemove={onRemoveAt}
            onAddFiles={onAddFiles}
          />
        </div>
        {/* Details */}
        <div className="w-full h-full md:w-[40%] flex flex-col bg-neutral-900">
          {isUploading && <LoadingSpinner />}
          <AuthUser avatarUrl={authProfile?.avatarUrl} username={authProfile?.username || ""} />
          <CaptionTextarea value={caption} onChange={setCaption} disabled={isUploading} />
        </div>
      </div>
    </div>
  );
};
