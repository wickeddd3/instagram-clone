import { useModalActions } from "@/shared/lib";
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
