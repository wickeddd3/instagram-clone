import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { useFocusTrap } from "@/shared/lib";

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
      aria-label="Close"
      title="Close"
      className={`absolute top-4 right-4 text-foreground hover:text-muted cursor-pointer ${className}`}
    >
      <X size={iconSize} aria-hidden="true" />
    </button>
  );
};

export const Drawer = ({
  content,
  width = 460,
  onClose,
  hasCloseButton = false,
  label = "Dialog",
}: {
  content: ReactNode;
  width?: number;
  onClose: () => void;
  hasCloseButton?: boolean;
  label?: string;
}) => {
  const ref = useRef<HTMLElement>(null);
  useFocusTrap(ref, onClose);

  return (
    <motion.aside
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      initial={false}
      animate={{ width: width }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex flex-col h-screen fixed top-0 z-60 bg-background border-r border-border"
    >
      <div className="p-6 flex flex-col h-full relative">
        {hasCloseButton && <DrawerCloseButton onClose={onClose} />}
        {content}
      </div>
    </motion.aside>
  );
};
