import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ModalState {
  isModalOpen: boolean;
  modalContent: ReactNode;
  hasModalCloseButton: boolean;
}

interface ModalActions {
  openModal: (params: { content: ReactNode; hasCloseButton?: boolean }) => void;
  closeModal: () => void;
}

const ModalStateContext = createContext<ModalState | undefined>(undefined);
const ModalActionsContext = createContext<ModalActions | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ModalState>({
    isModalOpen: false,
    modalContent: null,
    hasModalCloseButton: false,
  });

  const openModal = useCallback(
    ({
      content,
      hasCloseButton = false,
    }: {
      content: ReactNode;
      hasCloseButton?: boolean;
    }) => {
      setState({
        isModalOpen: true,
        modalContent: content,
        hasModalCloseButton: hasCloseButton,
      });
    },
    [],
  );

  const closeModal = useCallback(() => {
    setState({
      isModalOpen: false,
      modalContent: null,
      hasModalCloseButton: false,
    });
  }, []);

  const actions = useMemo(
    () => ({ openModal, closeModal }),
    [openModal, closeModal],
  );

  return (
    <ModalStateContext.Provider value={state}>
      <ModalActionsContext.Provider value={actions}>
        {children}
      </ModalActionsContext.Provider>
    </ModalStateContext.Provider>
  );
};

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
