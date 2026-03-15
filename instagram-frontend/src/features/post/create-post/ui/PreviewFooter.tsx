// import { X } from "lucide-react";

export const PreviewFooter = ({
  previews,
  onThumbnailClick,
}: {
  previews: string[];
  onRemove?: (value: number) => void;
  onThumbnailClick?: (value: number) => void;
}) => {
  return (
    <div className="w-full bg-neutral-950 p-4 border-t border-neutral-800">
      <div className="flex gap-2 overflow-x-auto overflow-y-hidden h-20 items-center custom-scrollbar">
        {previews.map((url: string, index: number) => (
          <div
            key={url}
            onClick={() => onThumbnailClick?.(index)} // Jump main carousel
            className="relative shrink-0 w-14 h-14 cursor-pointer hover:opacity-80 transition"
          >
            <img
              src={url}
              className="w-full h-full object-cover rounded-sm border border-neutral-700"
            />
            {/* <button
              onClick={(e) => {
                e.stopPropagation(); // Don't trigger the thumbnail click
                onRemove?.(index);
              }}
              className="absolute -top-1 -right-1 bg-black text-white rounded-full border border-neutral-700 p-0.5"
            >
              <X size={10} />
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};
