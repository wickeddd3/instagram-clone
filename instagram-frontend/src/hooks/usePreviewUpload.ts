import { useState } from "react";
import { generatePreview, getFileData } from "../utils/upload";

export const usePreviewUpload = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback?: () => void
  ) => {
    const file = getFileData(e);
    if (!file) return;

    setFileToUpload(file);
    const url = generatePreview(file);
    setPreviewUrl(url);
    callback?.();
  };

  return {
    generatePreview,
    previewUrl,
    fileToUpload,
    isUploading,
    setIsUploading,
    handleFileChange,
  };
};
