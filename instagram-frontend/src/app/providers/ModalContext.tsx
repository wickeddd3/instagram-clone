import { createContext, useContext, useState, type ReactNode } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  modalContent: ReactNode;
  hasModalCloseButton: boolean;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasModalCloseButton, setHasModalCloseButton] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = ({
    content,
    hasCloseButton = false,
  }: {
    content: ReactNode;
    hasCloseButton?: boolean;
  }) => {
    setModalContent(content);
    setHasModalCloseButton(hasCloseButton);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setHasModalCloseButton(false);
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalContent,
        hasModalCloseButton,
        openModal,
        closeModal,
      }}
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
