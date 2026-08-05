import { ImagePlus } from "lucide-react";
import { useState, type ChangeEvent, type DragEvent } from "react";
import { ACCEPTED_IMAGE_ACCEPT, ACCEPTED_IMAGE_LABEL, MAX_FILE_SIZE_MB } from "@/shared/config";

export const ImportImage = ({ onSelect }: { onSelect: (file: File) => void }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragover" || e.type === "dragenter") {
      setIsDragging(true);
    } else if (e.type === "dragleave" || e.type === "drop") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    // A story holds a single image; take the first dropped file.
    const [file] = e.dataTransfer.files;
    if (file) onSelect(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onSelect(file);
    e.target.value = ""; // allow re-selecting the same file
  };

  return (
    <div
      className="w-full h-full flex flex-col text-foreground"
      onDragOver={handleDrag}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <div className="bg-surface border-b border-border w-full text-center py-3 font-semibold">
        Create story
      </div>

      <div
        className={`flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center transition-colors ${
          isDragging ? "bg-surface" : "bg-transparent"
        }`}
      >
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-full transition-colors ${
            isDragging ? "bg-primary/15 text-primary" : "bg-surface text-foreground"
          }`}
        >
          <ImagePlus size={44} strokeWidth={1.25} aria-hidden="true" />
        </div>

        <p className="text-xl font-light">{isDragging ? "Drop your photo here" : "Drag a photo here"}</p>

        <label className="cursor-pointer rounded-md bg-primary px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-primary-hover">
          Select from computer
          <input type="file" className="hidden" onChange={handleFileChange} accept={ACCEPTED_IMAGE_ACCEPT} />
        </label>

        <p className="max-w-xs text-xs font-light text-muted">
          {ACCEPTED_IMAGE_LABEL} · up to {MAX_FILE_SIZE_MB}MB
        </p>
      </div>
    </div>
  );
};
