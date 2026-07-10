import { createContext, useContext, type ReactNode } from "react";

export interface ModalState {
  isModalOpen: boolean;
  modalContent: ReactNode;
  hasModalCloseButton: boolean;
}

export interface ModalActions {
  openModal: (params: { content: ReactNode; hasCloseButton?: boolean }) => void;
  closeModal: () => void;
}

export const ModalStateContext = createContext<ModalState | undefined>(
  undefined,
);
export const ModalActionsContext = createContext<ModalActions | undefined>(
  undefined,
);

export const useModalState = () => {
  const context = useContext(ModalStateContext);
  if (!context)
    throw new Error("useModalState must be used within ModalProvider");
  return context;
};

export const useModalActions = () => {
  const context = useContext(ModalActionsContext);
  if (!context)
    throw new Error("useModalActions must be used within ModalProvider");
  return context;
};
