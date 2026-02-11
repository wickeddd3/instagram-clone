import { useState } from "react";
import { usePreviewUpload } from "../../../hooks/usePreviewUpload";
import { Upload } from "./Upload";
import { Details } from "./Details";
import { Modal } from "../../Modal";

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
    <Modal>
      <Modal.CloseButton
        onClose={onClose}
        className="absolute top-4 right-2.5 z-70"
      />
      <Modal.Content className="w-full max-w-5/6 md:max-w-4/5 lg:max-w-2/3 h-full max-h-3/4 flex flex-col md:flex-row">
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
      </Modal.Content>
    </Modal>
  );
};
