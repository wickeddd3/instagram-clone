import { useCallback, useMemo, useState, type ReactNode } from "react";
import {
  ModalActionsContext,
  ModalStateContext,
  type ModalState,
} from "./ModalContext";

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
