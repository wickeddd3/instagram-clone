import { useModal } from "@/app/providers/ModalContext";
import { SettingsModal } from "../ui/SettingsModal";

export const useSettingsModal = () => {
  const { openModal } = useModal();

  const openSettingsModal = () => {
    openModal({ content: <SettingsModal /> });
  };

  return {
    openSettingsModal,
  };
};
