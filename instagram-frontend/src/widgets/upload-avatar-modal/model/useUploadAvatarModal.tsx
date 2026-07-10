import { useModalActions } from "@/shared/lib/modal";
import { UploadAvatarModal } from "../ui/UploadAvatarModal";

export const useUploadAvatarModal = () => {
  const { openModal } = useModalActions();

  const openUploadAvatarModal = ({ avatarUrl }: { avatarUrl?: string }) => {
    openModal({
      content: <UploadAvatarModal avatarUrl={avatarUrl} />,
    });
  };

  return {
    openUploadAvatarModal,
  };
};
