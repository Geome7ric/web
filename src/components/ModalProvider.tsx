"use client";

import React from "react";
import { ModalContext, useModalState } from "@/app/hooks";
import Modal from "@/components/Modal";

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const modalState = useModalState();

  return (
    <ModalContext.Provider value={modalState}>
      {children}
      <Modal
        isOpen={modalState.isModalOpen}
        onClose={modalState.closeModal}
        iframeSrc="https://www.canva.com/design/DAGkRFTMSxI/gLiKreZyhmJ-dW05UVXlkQ/view?embed"
      />
    </ModalContext.Provider>
  );
}
