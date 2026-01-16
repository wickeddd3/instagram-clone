import { X } from "lucide-react";
import { motion } from "framer-motion";

interface SearchSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsSidebar = ({
  isOpen,
  onClose,
}: SearchSidebarProps) => {
  if (!isOpen) return;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 460 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex flex-col h-screen fixed top-0 z-60 bg-[#0d1015] border-r border-gray-800"
    >
      <div className="p-6 flex flex-col h-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-8">Notifications</h2>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto">list</div>
      </div>
    </motion.aside>
  );
};
