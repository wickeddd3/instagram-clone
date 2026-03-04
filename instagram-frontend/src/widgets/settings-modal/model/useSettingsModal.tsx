import { useModalActions } from "@/app/providers/ModalContext";
import { SettingsModal } from "../ui/SettingsModal";

export const useSettingsModal = () => {
  const { openModal } = useModalActions();

  const openSettingsModal = () => {
    openModal({ content: <SettingsModal /> });
  };

  return {
    openSettingsModal,
  };
};
