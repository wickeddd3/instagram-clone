import { Image } from "lucide-react";
import { useState, type ChangeEvent, type DragEvent } from "react";

export const ImportImage = ({
  onChange,
}: {
  onChange: (files: File[]) => void;
}) => {
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

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      onChange(files);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      onChange([...files]);
    }
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center text-white transition-colors ${
        isDragging ? "bg-neutral-900" : "bg-transparent"
      }`}
      onDragOver={handleDrag}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <div className="bg-neutral-950 border-b border-neutral-800 w-full text-center py-3 font-semibold">
        Create new post
      </div>
      <div className="flex flex-col items-center justify-center flex-1 gap-4">
        <Image
          size={64}
          strokeWidth={1}
          className={isDragging ? "text-indigo-500" : "text-white"}
        />
        <p className="text-xl font-light">Drag photos and videos here</p>
        <label className="bg-indigo-800 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold cursor-pointer transition">
          Select from computer
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
            multiple
          />
        </label>
      </div>
    </div>
  );
};
