import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { generatePreview, validateImageFile } from "@/shared/utils";

export interface StoryMedia {
  file: File;
  previewUrl: string;
}

/**
 * Owns the single image for the create-story flow. A story has one media item,
 * so selecting again replaces the current one. The file is validated (type +
 * size) before any preview URL is created, and every created URL is revoked when
 * it is replaced, reset, or the flow unmounts.
 *
 * A ref mirrors the current media so validation, URL creation, and revocation
 * run as plain side effects outside the state setter — safe under StrictMode.
 */
export const usePreviewUpload = () => {
  const [media, setMedia] = useState<StoryMedia | null>(null);
  const mediaRef = useRef<StoryMedia | null>(null);

  const commit = useCallback((next: StoryMedia | null) => {
    mediaRef.current = next;
    setMedia(next);
  }, []);

  const selectFile = useCallback(
    (file: File) => {
      const error = validateImageFile(file);
      if (error) {
        toast.error(error);
        return;
      }
      // Replace: revoke the previously selected preview before swapping it in.
      if (mediaRef.current) URL.revokeObjectURL(mediaRef.current.previewUrl);
      commit({ file, previewUrl: generatePreview(file) });
    },
    [commit],
  );

  const reset = useCallback(() => {
    if (mediaRef.current) URL.revokeObjectURL(mediaRef.current.previewUrl);
    commit(null);
  }, [commit]);

  useEffect(() => {
    return () => {
      if (mediaRef.current) URL.revokeObjectURL(mediaRef.current.previewUrl);
    };
  }, []);

  return {
    file: media?.file ?? null,
    previewUrl: media?.previewUrl ?? null,
    selectFile,
    reset,
  };
};
