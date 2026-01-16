import { Image } from "lucide-react";
import type { ChangeEvent } from "react";

interface UploadProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Upload = ({ onChange }: UploadProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white">
      <div className="bg-neutral-950 border-b border-neutral-800 w-full text-center py-3 font-semibold">
        Create new post
      </div>
      <div className="flex flex-col items-center justify-center flex-1 gap-4">
        <Image size={64} strokeWidth={1} />
        <p className="text-xl font-light">Drag photos and videos here</p>
        <label className="bg-indigo-800 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold cursor-pointer transition">
          Select from computer
          <input
            type="file"
            className="hidden"
            onChange={onChange}
            accept="image/*"
          />
        </label>
      </div>
    </div>
  );
};
