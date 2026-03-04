import { useModalActions } from "@/app/providers/ModalContext";
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
