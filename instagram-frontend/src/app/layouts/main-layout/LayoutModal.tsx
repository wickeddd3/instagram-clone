import { useModalActions, useModalState } from "@/app/providers/ModalContext";
import { Modal } from "@/shared/ui/Modal";
import { memo } from "react";

export const LayoutModal = memo(() => {
  const { isModalOpen, modalContent, hasModalCloseButton } = useModalState();
  const { closeModal } = useModalActions();

  return (
    isModalOpen && (
      <Modal
        content={modalContent}
        onClose={closeModal}
        hasCloseButton={hasModalCloseButton}
      />
    )
  );
});

LayoutModal.displayName = "LayoutModal";
