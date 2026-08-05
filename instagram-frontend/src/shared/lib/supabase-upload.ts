import { supabase } from "./supabase";
import { env } from "@/shared/config";

// Same result as `uploadImage`, but streams upload progress. The storage-js
// client's `.upload()` gives no progress events, so we POST straight to the
// Storage REST endpoint with XHR (the only browser API that reports upload
// progress) and reuse the client only to resolve the public URL afterward.
export const uploadImageWithProgress = async (
  file: File,
  path: string,
  bucketName: string,
  onProgress?: (percent: number) => void,
): Promise<string> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const accessToken = session?.access_token;
  if (!accessToken) throw new Error("Not authenticated");

  const url = `${env.VITE_SUPABASE_URL}/storage/v1/object/${bucketName}/${path}`;

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
    xhr.setRequestHeader("apikey", env.VITE_SUPABASE_ANON_KEY);
    xhr.setRequestHeader("x-upsert", "true");
    if (file.type) xhr.setRequestHeader("Content-Type", file.type);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress?.(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(new Error(`Upload failed with status ${xhr.status}`));
    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(file);
  });

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(path);

  return publicUrl;
};

export const uploadImage = async (
  file: File,
  path: string,
  bucketName: string,
) => {
  // Upload file to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(path, file);

  // Handle upload error
  if (uploadError) throw uploadError;

  // Get Public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(path);

  return publicUrl;
};

export const removeImage = async (path: string, bucketName: string) => {
  const { error: deleteError } = await supabase.storage
    .from(bucketName)
    .remove([path]);

  if (deleteError) throw deleteError;
};
