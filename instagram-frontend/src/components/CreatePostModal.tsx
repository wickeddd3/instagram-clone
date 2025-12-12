import React, { useState } from "react";
import { X, Image as ImageIcon, ArrowLeft } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"upload" | "details">("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setSelectedImage(url);
      setStep("details");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Close Button (Top Right) */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X size={32} />
      </button>

      {/* Modal Container */}
      <div className="bg-[#262626] w-full max-w-[800px] h-[600px] rounded-xl overflow-hidden flex flex-col md:flex-row transition-all animate-in fade-in zoom-in duration-200">
        {/* --- STEP 1: UPLOAD STATE --- */}
        {step === "upload" && (
          <div className="w-full h-full flex flex-col items-center justify-center text-white">
            <div className="border-b border-gray-700 w-full text-center py-3 font-semibold">
              Create new post
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-4">
              <ImageIcon size={64} strokeWidth={1} />
              <p className="text-xl font-light">Drag photos and videos here</p>
              <label className="bg-[#0095f6] hover:bg-[#1877f2] text-white px-4 py-1.5 rounded-md text-sm font-semibold cursor-pointer transition">
                Select from computer
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        )}

        {/* --- STEP 2: PREVIEW & DETAILS STATE --- */}
        {step === "details" && selectedImage && (
          <>
            {/* Left: Image Preview */}
            <div className="w-full md:w-[60%] h-[400px] md:h-full bg-black flex items-center justify-center relative border-r border-gray-700">
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setStep("upload");
                }}
                className="absolute top-4 left-4 p-2 bg-black/50 rounded-full hover:bg-black/70 text-white z-10"
              >
                <ArrowLeft size={20} />
              </button>
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Caption Input */}
            <div className="w-full md:w-[40%] flex flex-col bg-[#262626]">
              <div className="border-b border-gray-700 p-3 flex justify-between items-center">
                <span className="text-transparent">Back</span> {/* Spacer */}
                <span className="text-white font-semibold">Compose</span>
                <button className="text-[#0095f6] font-bold text-sm hover:text-white transition">
                  Share
                </button>
              </div>

              <div className="p-4 flex gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=3"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white font-semibold text-sm">
                  my_creative_life
                </span>
              </div>

              <textarea
                className="bg-transparent text-white w-full h-[200px] p-4 resize-none focus:outline-none placeholder-gray-500"
                placeholder="Write a caption..."
              />

              <div className="mt-auto p-4 border-t border-gray-700 text-gray-400 text-sm flex justify-between items-center cursor-pointer hover:bg-white/5">
                <span>Add Location</span>
                <span className="text-lg">📍</span>
              </div>
              <div className="p-4 border-t border-gray-700 text-gray-400 text-sm flex justify-between items-center cursor-pointer hover:bg-white/5">
                <span>Accessibility</span>
                <span className="text-lg">⌄</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreatePostModal;
