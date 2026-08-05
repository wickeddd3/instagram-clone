import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { generatePreview, validateImageFile } from "@/shared/utils";
import { MAX_UPLOAD_FILES } from "@/shared/config";

export interface PreviewItem {
  id: string;
  file: File;
  previewUrl: string;
}

/**
 * Owns the selected media for the create-post flow. Files are validated (type +
 * size) and capped at MAX_UPLOAD_FILES before a preview URL is created, so no
 * object URL is ever made for a rejected file. Every created URL is revoked on
 * removal, reset, and unmount to avoid leaks.
 *
 * A ref mirrors the item list so validation, URL creation, and revocation all
 * run as plain side effects outside the state updater — safe under StrictMode's
 * double-invoked updaters, which would otherwise leak duplicate object URLs.
 */
export const usePreviewUpload = () => {
  const [items, setItems] = useState<PreviewItem[]>([]);
  const itemsRef = useRef<PreviewItem[]>([]);

  const commit = useCallback((next: PreviewItem[]) => {
    itemsRef.current = next;
    setItems(next);
  }, []);

  const addFiles = useCallback(
    (incoming: File[]) => {
      if (!incoming.length) return;

      const current = itemsRef.current;
      const remaining = MAX_UPLOAD_FILES - current.length;
      if (remaining <= 0) {
        toast.error(`You can add up to ${String(MAX_UPLOAD_FILES)} photos.`);
        return;
      }

      const accepted: PreviewItem[] = [];
      const errors: string[] = [];

      for (const file of incoming) {
        if (accepted.length >= remaining) {
          errors.push(`You can add up to ${String(MAX_UPLOAD_FILES)} photos.`);
          break;
        }
        const error = validateImageFile(file);
        if (error) {
          errors.push(error);
          continue;
        }
        accepted.push({ id: crypto.randomUUID(), file, previewUrl: generatePreview(file) });
      }

      if (errors.length) toast.error(errors[0]);
      if (accepted.length) commit([...current, ...accepted]);
    },
    [commit],
  );

  const removeFile = useCallback(
    (id: string) => {
      const target = itemsRef.current.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      commit(itemsRef.current.filter((item) => item.id !== id));
    },
    [commit],
  );

  const reset = useCallback(() => {
    itemsRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    commit([]);
  }, [commit]);

  // Revoke any remaining URLs when the flow unmounts.
  useEffect(() => {
    return () => itemsRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl));
  }, []);

  return {
    items,
    files: items.map((item) => item.file),
    previewUrls: items.map((item) => item.previewUrl),
    addFiles,
    removeFile,
    reset,
  };
};
