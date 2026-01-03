import { supabase } from "../lib/supabase";

export const useSupabaseUpload = () => {
  const uploadImage = async (file: File, path: string, bucketName: string) => {
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

  const removeImage = async (path: string, bucketName: string) => {
    const { error: deleteError } = await supabase.storage
      .from(bucketName)
      .remove([path]);

    if (deleteError) throw deleteError;
  };

  return { uploadImage, removeImage };
};
