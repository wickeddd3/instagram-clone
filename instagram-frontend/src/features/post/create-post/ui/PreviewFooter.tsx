import { Plus, X } from "lucide-react";
import type { ChangeEvent } from "react";
import { ACCEPTED_IMAGE_ACCEPT } from "@/shared/config";

interface PreviewFooterProps {
  previews: string[];
  activeIndex: number;
  canAddMore: boolean;
  onThumbnailClick: (index: number) => void;
  onRemove: (index: number) => void;
  onAddFiles: (files: File[]) => void;
}

export const PreviewFooter = ({
  previews,
  activeIndex,
  canAddMore,
  onThumbnailClick,
  onRemove,
  onAddFiles,
}: PreviewFooterProps) => {
  const handleAddFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) onAddFiles([...e.target.files]);
    e.target.value = ""; // allow re-selecting the same file
  };

  return (
    <div className="w-full bg-neutral-950 p-4 border-t border-neutral-800">
      <div className="flex gap-2 overflow-x-auto overflow-y-hidden h-20 items-center custom-scrollbar">
        {previews.map((url, index) => (
          <div
            key={url}
            onClick={() => onThumbnailClick(index)}
            className={`relative shrink-0 w-14 h-14 cursor-pointer rounded-sm transition ${
              index === activeIndex ? "ring-2 ring-indigo-500" : "opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={url}
              alt={`Selected image ${String(index + 1)}`}
              className="w-full h-full object-cover rounded-sm border border-neutral-700"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Don't trigger the thumbnail click
                onRemove(index);
              }}
              aria-label={`Remove image ${String(index + 1)}`}
              className="absolute -top-1.5 -right-1.5 bg-black/80 text-white rounded-full border border-neutral-700 p-0.5 hover:bg-black cursor-pointer"
            >
              <X size={12} aria-hidden="true" />
            </button>
          </div>
        ))}

        {canAddMore && (
          <label
            title="Add more photos"
            className="shrink-0 w-14 h-14 flex items-center justify-center rounded-sm border border-dashed border-neutral-600 text-neutral-400 cursor-pointer hover:border-neutral-400 hover:text-white transition"
          >
            <Plus size={20} aria-hidden="true" />
            <span className="sr-only">Add more photos</span>
            <input type="file" className="hidden" onChange={handleAddFiles} accept={ACCEPTED_IMAGE_ACCEPT} multiple />
          </label>
        )}
      </div>
    </div>
  );
};
