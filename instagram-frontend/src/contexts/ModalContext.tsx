import { createContext, useContext, useState, type ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  content: ReactNode;
  hasCloseButton: boolean;
  openModal: ({
    content,
    hasCloseButton,
  }: {
    content: ReactNode;
    hasCloseButton?: boolean;
  }) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasCloseButton, setHasCloseButton] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const openModal = ({
    content,
    hasCloseButton = false,
  }: {
    content: ReactNode;
    hasCloseButton?: boolean;
  }) => {
    setContent(content);
    setHasCloseButton(hasCloseButton);
    setIsOpen(true);
  };

  const closeModal = () => {
    setContent(null);
    setHasCloseButton(false);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, content, hasCloseButton, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
