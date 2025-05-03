"use client"; // Asegura que se ejecute en el cliente

import { useEffect, useState, createContext, useContext } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css"; // Importa los estilos de Notyf

// Contexto para el modal
interface ModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const useModal = () => useContext(ModalContext);

// Hook personalizado para manejar el estado del modal
export const useModalState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export const useNotyf = () => {
  // useMemo para evitar recrear Notyf en cada render
  const [notyf, setNotyf] = useState<Notyf | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const notyfInstance = new Notyf({
        duration: 4000,
        position: {
          x: "right",
          y: "bottom",
        },
        types: [
          {
            type: "success",
            background: "#00EF91",
            className: "text-dark",
          },
          {
            type: "error",
            className: "text-error",
            background: "#0A0A0A",
          },
        ],
      });
      setNotyf(notyfInstance);
    }
  }, []);

  return notyf;
};
