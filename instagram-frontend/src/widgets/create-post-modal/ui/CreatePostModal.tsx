import { useEffect, useState } from "react";
import { useModalActions } from "@/app/providers/ModalContext";
import { ModalContent } from "@/shared/ui/Modal";
import { ImportImage, usePreviewUpload } from "@/features/post/import-image";
import { CreatePost } from "@/features/post/create-post";

export const CreatePostModal = () => {
  const { closeModal } = useModalActions();
  const { files, previewUrls, handleFileChange } = usePreviewUpload();
  const [step, setStep] = useState<"import" | "upload">("import");

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <ModalContent className="w-full max-w-5/6 md:max-w-4/5 lg:max-w-2/3 h-full max-h-3/4 flex flex-col md:flex-row">
      {step === "import" && (
        <ImportImage
          onChange={(files) => handleFileChange(files, () => setStep("upload"))}
        />
      )}
      {step === "upload" && previewUrls.length > 0 && (
        <CreatePost
          files={files}
          previewUrls={previewUrls}
          onSuccess={() => setStep("import")}
          onBack={() => setStep("import")}
          onClose={closeModal}
        />
      )}
    </ModalContent>
  );
};
