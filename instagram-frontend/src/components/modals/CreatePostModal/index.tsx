import { useState } from "react";
import { usePreviewUpload } from "../../../hooks/usePreviewUpload";
import { Upload } from "./Upload";
import { Details } from "./Details";
import { useModal } from "../../../contexts/ModalContext";
import { ModalContent } from "../../Modal";

export const CreatePostModal = () => {
  const { closeModal } = useModal();

  const {
    previewUrl,
    handleFileChange,
    fileToUpload,
    isUploading,
    setIsUploading,
  } = usePreviewUpload();

  const [step, setStep] = useState<"upload" | "details">("upload");

  return (
    <ModalContent className="w-full max-w-5/6 md:max-w-4/5 lg:max-w-2/3 h-full max-h-3/4 flex flex-col md:flex-row">
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
          onClose={closeModal}
        />
      )}
    </ModalContent>
  );
};
