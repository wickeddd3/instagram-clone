import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { usePreviewUpload } from "../../../hooks/usePreviewUpload";
import { Upload } from "./Upload";
import { Details } from "./Details";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const {
    previewUrl,
    handleFileChange,
    fileToUpload,
    isUploading,
    setIsUploading,
  } = usePreviewUpload();

  const [step, setStep] = useState<"upload" | "details">("upload");

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-60"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X size={24} />
      </button>
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="bg-neutral-900 rounded-xl w-full max-w-5/6 md:max-w-4/5 lg:max-w-2/3 h-full max-h-3/4 flex flex-col md:flex-row overflow-hidden"
      >
        {step === "upload" && (
          <Upload
            onChange={(e) => handleFileChange(e, () => setStep("details"))}
          />
        )}
        {step === "details" && previewUrl && (
          <Details
            previewUrl={previewUrl}
            fileToUpload={fileToUpload}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
            setStep={setStep}
            onClose={onClose}
          />
        )}
      </motion.div>
    </motion.div>
  );
};
