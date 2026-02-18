import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export const DrawerCloseButton = ({
  onClose,
  className,
  iconSize = 24,
}: {
  onClose: () => void;
  className?: string;
  iconSize?: number;
}) => {
  return (
    <button
      onClick={onClose}
      className={`absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer ${className}`}
    >
      <X size={iconSize} />
    </button>
  );
};

export const Drawer = ({
  content,
  width = 460,
  onClose,
  hasCloseButton = false,
}: {
  content: ReactNode;
  width?: number;
  onClose: () => void;
  hasCloseButton?: boolean;
}) => {
  return (
    <motion.aside
      initial={false}
      animate={{ width: width }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex flex-col h-screen fixed top-0 z-60 bg-[#0d1015] border-r border-gray-800"
      onBlur={onClose}
    >
      <div className="p-6 flex flex-col h-full relative">
        {hasCloseButton && <DrawerCloseButton onClose={onClose} />}
        {content}
      </div>
    </motion.aside>
  );
};
