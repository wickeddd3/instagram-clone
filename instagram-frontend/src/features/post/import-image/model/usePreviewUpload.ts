import { useState } from "react";
import { generatePreview } from "@/shared/utils/upload";

export const usePreviewUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const processFiles = (files: File[], callback?: () => void) => {
    if (!files.length) return;

    setFiles(files);

    // Generate previews for all selected files
    const urls = files.map((file) => generatePreview(file));
    setPreviewUrls(urls);

    callback?.();
  };

  const handleFileChange = (files: File[], callback?: () => void) => {
    if (files) processFiles(files, callback);
  };

  return {
    files,
    previewUrls,
    handleFileChange,
  };
};
