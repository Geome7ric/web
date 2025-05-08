"use client";
import React, { useState, useEffect } from "react";

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  iframeSrc: string;
}> = (props) => {
  const { isOpen, onClose, iframeSrc } = props;
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Verificar el modo oscuro inicial
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode(); // Verificar al montar el componente

    // Observer para detectar cambios en el tema
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "class" &&
          mutation.target === document.documentElement
        ) {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsLoading(true); // Reset loading state when closing
      onClose();
    }
  };

  if (isMobile) {
    return null; // Do not render the modal on mobile
  }

  if (!isOpen) return null;

  // Calculamos el viewport actual donde está el usuario
  const viewportTop = window.scrollY;
  const viewportHeight = window.innerHeight;

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50
      ${isDarkMode ? "bg-gray-900 bg-opacity-70" : "bg-gray-600 bg-opacity-50"}
      w-full h-full
      overflow-y-auto`}
      onClick={handleBackdropClick}
      style={{
        position: "absolute",
        top: `${viewportTop}px`,
        height: `${viewportHeight}px`,
      }}
    >
      <div
        className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg w-4/5 h-4/5 overflow-hidden relative flex flex-col m-auto`}
      >
        <button
          onClick={onClose}
          className={`absolute top-2 right-4 text-2xl 
          ${isDarkMode ? "text-white hover:text-accent" : "text-gray-600 hover:text-primary"} 
          transition duration-300`}
        >
          &times;
        </button>
        {isLoading && (
          <div
            className={`flex justify-center items-center w-full h-full
            ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 10,
            }}
          >
            <div
              className={`loader border-t-4 
              ${isDarkMode ? "border-accent" : "border-primary"}
              rounded-full w-8 h-8 animate-spin`}
            ></div>
          </div>
        )}
        <iframe
          src={iframeSrc}
          onLoad={() => setIsLoading(false)}
          className={`w-full h-full ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
          style={{
            display: isLoading ? "none" : "block",
            border: "none",
            margin: 0,
            padding: 0,
          }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Modal;
