import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { useFocusTrap } from "@/shared/lib";

export const ModalWrapper = ({
  children,
  className,
  label = "Dialog",
  onClose,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
  onClose?: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, onClose ?? (() => {}));

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed inset-0 bg-black/60 flex flex-col items-center justify-center w-full z-100 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const ModalContent = ({
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
      className={`bg-surface rounded-xl overflow-hidden z-100 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const ModalCloseButton = ({
  onClose,
  className = "",
  iconSize = 28,
  tone = "surface",
}: {
  onClose: () => void;
  className?: string;
  iconSize?: number;
  /** "surface" adapts to the theme (use on a modal panel); "overlay" stays
   *  white for buttons sitting over the dark scrim or media. */
  tone?: "surface" | "overlay";
}) => {
  const toneClasses =
    tone === "overlay"
      ? "text-white hover:text-white/70"
      : "text-foreground hover:text-muted";

  return (
    <button
      onClick={onClose}
      aria-label="Close"
      title="Close"
      className={`${toneClasses} transition-colors cursor-pointer ${className}`}
    >
      <X size={iconSize} aria-hidden="true" />
    </button>
  );
};

export const Modal = ({
  content,
  onClose,
  hasCloseButton = false,
  label,
}: {
  content: ReactNode;
  hasCloseButton?: boolean;
  onClose: () => void;
  label?: string;
}) => {
  return (
    <ModalWrapper label={label} onClose={onClose}>
      {hasCloseButton && (
        <ModalCloseButton
          onClose={onClose}
          tone="overlay"
          className="absolute top-4 right-2.5 z-70"
        />
      )}
      {content}
    </ModalWrapper>
  );
};
