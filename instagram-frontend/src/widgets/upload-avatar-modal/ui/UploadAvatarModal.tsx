import { useAuth } from "@/entities/profile";
import { useModalActions } from "@/shared/lib";
import { ModalContent } from "@/shared/ui";
import { LoadingSpinner } from "./LoadingSpinner";
import { Avatar } from "./Avatar";
import {
  UploadAvatar,
  useUploadAvatar,
} from "@/features/profile/upload-avatar";
import { RemoveAvatarButton } from "@/features/profile/remove-avatar";

export const UploadAvatarModal = ({ avatarUrl }: { avatarUrl?: string }) => {
  const { authUser } = useAuth();
  const { closeModal } = useModalActions();
  const { previewUrl, isUploading, handleUploadAvatar } = useUploadAvatar({
    userId: authUser?.id ?? "",
    onCompleted: closeModal,
  });

  if (!authUser) return null;

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
