import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthContext";
import { useModal } from "@/app/providers/ModalContext";
import { ModalContent } from "@/shared/ui/Modal";

export const SettingsModal = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { closeModal } = useModal();

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
    <ModalContent className="w-[400px] m-2">
      <div className="flex flex-col text-sm text-white font-normal">
        <button
          onClick={handleEditProfile}
          className="py-3.5 border-b border-neutral-800 active:bg-white/5 transition-colors cursor-pointer"
        >
          Edit Profile
        </button>
        <button className="py-3.5 border-b border-neutral-800 active:bg-white/5 transition-colors cursor-pointer">
          QR Code
        </button>
        <button className="py-3.5 border-b border-neutral-800 active:bg-white/5 transition-colors cursor-pointer">
          Notifications
        </button>
        <button className="py-3.5 border-b border-neutral-800 active:bg-white/5 transition-colors cursor-pointer">
          Privacy and Security
        </button>
        <button
          onClick={handleLogout}
          className="text-red-500 py-3.5 border-b border-neutral-800 font-bold active:bg-white/5 transition-colors cursor-pointer"
        >
          Log Out
        </button>
        <button
          onClick={closeModal}
          className="py-3.5 active:bg-white/5 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </ModalContent>
  );
};
