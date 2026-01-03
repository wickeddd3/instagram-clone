import { motion, AnimatePresence } from "framer-motion";
import { useSupabaseUpload } from "../../hooks/useSupabaseUpload";
import { usePreviewUpload } from "../../hooks/usePreviewUpload";
import {
  REMOVE_PROFILE_AVATAR,
  UPLOAD_PROFILE_AVATAR,
} from "../../graphql/mutations/profile";
import { useMutation } from "@apollo/client/react";
import { createUploadPath, getFileData } from "../../utils/upload";
import { useAuth } from "../../contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface UploadAvatarModalProps {
  avatarUrl?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const UploadAvatarModal = ({
  avatarUrl,
  isOpen,
  onClose,
}: UploadAvatarModalProps) => {
  const { user } = useAuth();

  const { uploadImage, removeImage } = useSupabaseUpload();
  const { previewUrl, isUploading, setIsUploading } = usePreviewUpload();

  const [removeAvatar] = useMutation(REMOVE_PROFILE_AVATAR, {
    onCompleted: () => {
      onClose();
    },
  });

  const [uploadAvatar] = useMutation(UPLOAD_PROFILE_AVATAR, {
    onCompleted: () => {
      onClose();
      setIsUploading(false);
    },
  });

  if (!user) return null;

  const CURRENT_USER_ID = user.id;

  const handleUploadPhoto = async (
    e: React.ChangeEvent<HTMLInputElement>,
    userId: string
  ) => {
    const file = getFileData(e);

    if (!file) return;

    setIsUploading(true);

    try {
      // Create unique file path
      const filePath = createUploadPath(userId, file);

      // Get Public URL after upload
      const publicUrl = await uploadImage(file, filePath, "avatars");

      // Upload avatar URL to profile
      await uploadAvatar({
        variables: {
          avatarUrl: publicUrl,
        },
      });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Failed to upload avatar. Check console for details.");
      setIsUploading(false);
    }
  };

  const handleRemoveCurrentPhoto = async (url?: string) => {
    if (!url) return;
    const profileAvatarPath = url?.split("avatars/")[1];
    await removeAvatar();
    await removeImage(profileAvatarPath, "avatars");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
            className="relative bg-neutral-900 w-full max-w-[400px] rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col">
              <div className="flex flex-col items-center gap-4 p-6 border-b border-neutral-800">
                <div className="w-9 h-9 md:w-15 md:h-15 shrink-0">
                  <img
                    src={previewUrl || avatarUrl || "/ig-default.jpg"}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                {isUploading && (
                  <div className="w-full bg-blue-500/20 text-blue-200 text-xs p-2 text-center flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={14} /> Uploading to
                    server...
                  </div>
                )}
                <span className="font-semibold text-lg">
                  Change Profile Photo
                </span>
              </div>
              <label className="py-3.5 text-sm text-indigo-700 font-bold border-b border-neutral-800 active:bg-white/5 transition-colors cursor-pointer text-center">
                Upload Photo
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleUploadPhoto(e, CURRENT_USER_ID)}
                  accept="image/*"
                />
              </label>
              <button
                disabled={true}
                className="py-3.5 text-sm text-white font-normal border-b border-neutral-800 active:bg-white/5 transition-colors cursor-pointer"
              >
                Manage sync settings
              </button>
              <button
                disabled={!avatarUrl}
                onClick={() => handleRemoveCurrentPhoto(avatarUrl)}
                className="py-3.5 text-sm text-red-500 font-bold border-b border-neutral-800 active:bg-white/5 transition-colors cursor-pointer"
              >
                Remove Current Photo
              </button>
              <button
                onClick={onClose}
                className="py-3.5 text-sm text-white font-normal active:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
