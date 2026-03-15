import { useState } from "react";
import { generatePreview } from "@/shared/utils/upload";

export const usePreviewUpload = () => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

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
    generatePreview,
    previewUrls,
    files,
    isUploading,
    setIsUploading,
    handleFileChange,
  };
};
