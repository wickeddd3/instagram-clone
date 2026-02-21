import { useAuth } from "@/app/providers/AuthContext";
import { useModal } from "@/app/providers/ModalContext";
import { ModalContent } from "@/shared/ui/Modal";
import { LoadingSpinner } from "./LoadingSpinner";
import { Avatar } from "./Avatar";
import {
  UploadAvatar,
  useUploadAvatar,
} from "@/features/profile/upload-avatar";
import { RemoveAvatarButton } from "@/features/profile/remove-avatar";

export const UploadAvatarModal = ({ avatarUrl }: { avatarUrl?: string }) => {
  const { user } = useAuth();

  if (!user) return;

  const CURRENT_USER_ID = user?.id;
  const { closeModal } = useModal();
  const { previewUrl, isUploading, handleUploadAvatar } = useUploadAvatar({
    userId: CURRENT_USER_ID,
    onCompleted: closeModal,
  });

  return (
    <ModalContent className="w-[400px] m-2">
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-4 p-6 border-b border-neutral-800">
          <Avatar imageUrl={previewUrl || avatarUrl || "/ig-default.jpg"} />
          {isUploading && <LoadingSpinner />}
          <span className="font-semibold text-lg">Change Profile Photo</span>
        </div>
        <UploadAvatar onClick={handleUploadAvatar} />
        <button
          disabled={true}
          className="py-3.5 text-sm text-white font-normal border-b border-neutral-800 active:bg-white/5 transition-colors cursor-pointer"
        >
          Manage sync settings
        </button>
        <RemoveAvatarButton avatarUrl={avatarUrl || ""} onClick={closeModal} />
        <button
          onClick={closeModal}
          className="py-3.5 text-sm text-white font-normal active:bg-white/5 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </ModalContent>
  );
};
