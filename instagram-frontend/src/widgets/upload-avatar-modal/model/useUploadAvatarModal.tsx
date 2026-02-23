import { useModal } from "@/app/providers/ModalContext";
import { UploadAvatarModal } from "../ui/UploadAvatarModal";

export const useUploadAvatarModal = () => {
  const { openModal } = useModal();

  const openUploadAvatarModal = ({ avatarUrl }: { avatarUrl?: string }) => {
    openModal({
      content: <UploadAvatarModal avatarUrl={avatarUrl} />,
    });
  };

  return {
    openUploadAvatarModal,
  };
};
