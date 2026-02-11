import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export const Modal = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed inset-0 bg-black/60 flex items-center justify-center z-60 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const Content = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.4 }}
      className={`bg-neutral-900 rounded-xl overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const CloseButton = ({
  onClose,
  className,
  iconSize = 28,
}: {
  onClose: () => void;
  className?: string;
  iconSize?: number;
}) => {
  return (
    <button
      onClick={onClose}
      className={`text-white hover:text-gray-300 cursor-pointer ${className}`}
    >
      <X size={iconSize} />
    </button>
  );
};

Modal.Content = Content;
Modal.CloseButton = CloseButton;
