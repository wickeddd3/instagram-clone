import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    onClose();
  };

  const handleEditProfile = () => {
    navigate("/accounts/edit");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
            className="relative bg-neutral-900 w-full max-w-[400px] rounded-xl overflow-hidden shadow-2xl"
          >
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
                onClick={onClose}
                className="py-3.5 active:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
