import { useNavigate } from "react-router-dom";
import { useModalActions } from "@/shared/lib";
import { ModalContent } from "@/shared/ui";
import { signOut } from "@/shared/lib";

export const SettingsModal = () => {
  const navigate = useNavigate();
  const { closeModal } = useModalActions();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
    closeModal();
  };

  const handleEditProfile = () => {
    navigate("/accounts/edit");
    closeModal();
  };

  return (
    <ModalContent className="w-full max-w-[400px] m-2">
      <div className="flex flex-col text-sm text-foreground font-normal">
        <button
          onClick={handleEditProfile}
          className="py-3.5 border-b border-border active:bg-foreground/5 transition-colors cursor-pointer"
        >
          Edit Profile
        </button>
        <button className="py-3.5 border-b border-border active:bg-foreground/5 transition-colors cursor-pointer">
          QR Code
        </button>
        <button className="py-3.5 border-b border-border active:bg-foreground/5 transition-colors cursor-pointer">
          Notifications
        </button>
        <button className="py-3.5 border-b border-border active:bg-foreground/5 transition-colors cursor-pointer">
          Privacy and Security
        </button>
        <button
          onClick={handleLogout}
          className="text-red-500 py-3.5 border-b border-border font-bold active:bg-foreground/5 transition-colors cursor-pointer"
        >
          Log Out
        </button>
        <button
          onClick={closeModal}
          className="py-3.5 active:bg-foreground/5 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </ModalContent>
  );
};
