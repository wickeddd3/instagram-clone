import { motion, AnimatePresence } from "framer-motion";

interface UploadAvatarModalProps {
  avatarUrl?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const UploadAvatarModal = ({
  avatarUrl,
  isOpen,
  onClose,
}: UploadAvatarModalProps) => {
  const handleRemoveCurrentPhoto = async () => {
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
            <div className="flex flex-col">
              <div className="flex flex-col items-center gap-4 p-6 border-b border-neutral-800">
                <div className="w-9 h-9 md:w-15 md:h-15 shrink-0">
                  <img
                    src={avatarUrl || "/ig-default.jpg"}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-lg">
                  Change Profile Photo
                </span>
              </div>
              <button className="py-3.5 text-sm text-indigo-700 font-bold border-b border-neutral-800 active:bg-white/5 transition-colors cursor-pointer">
                Upload Photo
              </button>
              <button className="py-3.5 text-sm text-white font-normal border-b border-neutral-800 active:bg-white/5 transition-colors cursor-pointer">
                Manage sync settings
              </button>
              <button
                onClick={handleRemoveCurrentPhoto}
                className="py-3.5 text-sm text-red-500 font-bold border-b border-neutral-800 active:bg-white/5 transition-colors cursor-pointer"
              >
                Remove Current Photo
              </button>
              <button
                onClick={onClose}
                className="py-3.5 text-sm text-white font-normal active:bg-white/5 transition-colors cursor-pointer"
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
