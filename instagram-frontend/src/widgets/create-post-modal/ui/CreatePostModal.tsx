import { useCallback } from "react";
import { useModalActions } from "@/shared/lib";
import { ModalContent } from "@/shared/ui";
import { ImportImage, usePreviewUpload } from "@/features/post/import-image";
import { CreatePost } from "@/features/post/create-post";

export const CreatePostModal = () => {
  const { closeModal } = useModalActions();
  const { items, files, previewUrls, addFiles, removeFile, reset } = usePreviewUpload();

  // The step is derived from whether any media is selected: importing when the
  // list is empty, composing otherwise. Removing the last photo returns the user
  // to the import screen for free. usePreviewUpload owns object-URL cleanup.
  const hasMedia = items.length > 0;

  // PreviewFooter works in array positions; map the index back to the item id.
  const removeAt = useCallback((index: number) => removeFile(items[index].id), [items, removeFile]);

  return (
    <ModalContent className="w-full max-w-5/6 md:max-w-4/5 lg:max-w-[855px] h-full max-h-3/4 flex flex-col md:flex-row">
      {hasMedia ? (
        <CreatePost
          files={files}
          previewUrls={previewUrls}
          onAddFiles={addFiles}
          onRemoveAt={removeAt}
          onSuccess={reset}
          onBack={reset}
          onClose={closeModal}
        />
      ) : (
        <ImportImage onChange={addFiles} />
      )}
    </ModalContent>
  );
};
