import { useModalActions } from "@/shared/lib";
import { ModalContent } from "@/shared/ui";
import { ImportImage, usePreviewUpload } from "@/features/story/import-image";
import { CreateStory } from "@/features/story/create-story";

export const CreateStoryModal = () => {
  const { closeModal } = useModalActions();
  const { file, previewUrl, selectFile, reset } = usePreviewUpload();

  // The step is derived from whether an image is selected: importing when empty,
  // composing otherwise. usePreviewUpload owns validation and object-URL cleanup.
  return (
    <ModalContent className="w-full max-w-[90%] md:max-w-3/5 lg:max-w-2/5 h-full max-h-3/4 flex flex-col md:flex-row">
      {file && previewUrl ? (
        <CreateStory
          previewUrl={previewUrl}
          file={file}
          onReplace={selectFile}
          onSuccess={reset}
          onBack={reset}
          onClose={closeModal}
        />
      ) : (
        <ImportImage onSelect={selectFile} />
      )}
    </ModalContent>
  );
};
