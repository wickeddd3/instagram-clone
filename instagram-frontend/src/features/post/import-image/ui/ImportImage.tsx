import { ImagePlus } from "lucide-react";
import { useState, type ChangeEvent, type DragEvent } from "react";
import { ACCEPTED_IMAGE_ACCEPT, ACCEPTED_IMAGE_LABEL, MAX_FILE_SIZE_MB, MAX_UPLOAD_FILES } from "@/shared/config";

export const ImportImage = ({ onChange }: { onChange: (files: File[]) => void }) => {
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

    if (e.dataTransfer.files.length > 0) {
      onChange(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) onChange([...e.target.files]);
    // Reset so selecting the same file again still fires onChange.
    e.target.value = "";
  };

  return (
    <div
      className="w-full h-full flex flex-col text-white"
      onDragOver={handleDrag}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <div className="bg-neutral-950 border-b border-neutral-800 w-full text-center py-3 font-semibold">
        Create new post
      </div>

      <div
        className={`flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center transition-colors ${
          isDragging ? "bg-neutral-900" : "bg-transparent"
        }`}
      >
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-full transition-colors ${
            isDragging ? "bg-indigo-950 text-indigo-400" : "bg-neutral-900 text-white"
          }`}
        >
          <ImagePlus size={44} strokeWidth={1.25} aria-hidden="true" />
        </div>

        <p className="text-xl font-light">{isDragging ? "Drop your photos here" : "Drag photos here"}</p>

        <label className="cursor-pointer rounded-md bg-indigo-800 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
          Select from computer
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={ACCEPTED_IMAGE_ACCEPT}
            multiple
          />
        </label>

        <p className="max-w-xs text-xs font-light text-neutral-400">
          {ACCEPTED_IMAGE_LABEL} · up to {MAX_FILE_SIZE_MB}MB each · {MAX_UPLOAD_FILES} photos max
        </p>
      </div>
    </div>
  );
};
