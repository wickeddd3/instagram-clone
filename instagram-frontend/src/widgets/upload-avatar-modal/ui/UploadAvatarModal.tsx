import { useAuth } from "@/entities/profile";
import { useModalActions } from "@/shared/lib";
import { ModalContent } from "@/shared/ui";
import { ProgressRing } from "./ProgressRing";
import {
  UploadAvatar,
  useUploadAvatar,
} from "@/features/profile/upload-avatar";
import { RemoveAvatarButton } from "@/features/profile/remove-avatar";

export const UploadAvatarModal = ({ avatarUrl }: { avatarUrl?: string }) => {
  const { authUser } = useAuth();
  const { closeModal } = useModalActions();
  const { previewUrl, isUploading, progress, handleUploadAvatar } =
    useUploadAvatar({
      userId: authUser?.id ?? "",
      onCompleted: closeModal,
    });

  if (!authUser) return null;

  const displayUrl = previewUrl || avatarUrl || "/ig-default.jpg";

  return (
    <ModalContent className="w-[400px] m-2">
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-3 p-6 border-b border-neutral-800">
          <ProgressRing progress={progress} active={isUploading} size={112}>
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src={displayUrl}
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
            </div>
          </ProgressRing>
          <span className="font-semibold text-lg">Change profile photo</span>
          {isUploading ? (
            <span
              className="text-xs text-indigo-300"
              role="status"
              aria-live="polite"
            >
              Uploading… {progress}%
            </span>
          ) : (
            <span className="text-xs text-neutral-400">
              JPG, PNG or GIF. Max 5MB.
            </span>
          )}
        </div>
        <UploadAvatar onClick={handleUploadAvatar} />
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
