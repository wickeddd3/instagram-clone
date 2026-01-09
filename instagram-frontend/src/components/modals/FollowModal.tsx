import { X } from "lucide-react";
import { motion } from "framer-motion";
import { FollowerList } from "../follow/FollowerList";
import { FollowingList } from "../follow/FollowingList";

interface FollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  title: string;
}

export const FollowModal = ({
  isOpen,
  onClose,
  username,
  title,
}: FollowModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-60"
    >
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="bg-neutral-900 rounded-xl w-full max-w-5/6 md:max-w-3/5 lg:max-w-1/3 h-full max-h-2/5 flex flex-col md:flex-row overflow-hidden"
      >
        <div className="w-full h-full flex flex-col">
          <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
            <h1 className="text-center flex-1 font-semibold">{title}</h1>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1">
            {title === "Followers" ? (
              <FollowerList username={username} />
            ) : (
              <FollowingList username={username} />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
