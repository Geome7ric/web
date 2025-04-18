import React, { useState, useEffect } from "react";

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  iframeSrc: string;
}> = (props) => {
  const { isOpen, onClose, iframeSrc } = props;
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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

  return (
    <div
      className="fixed inset-0 bg-opacity-30 
      flex justify-center items-center z-50 p-36
      dark:bg-dark dark:bg-opacity-50
      bg-gray-900
      w-full h-full
      "
      onClick={handleBackdropClick}
    >
      <div className="dark:bg-dark bg-white rounded-lg w-full h-full overflow-hidden relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl text-gray-600 dark:hover:text-accent
          dark:text-white hover:text-primary transition duration-300"
        >
          &times;
        </button>
        {isLoading && (
          <div
            className="flex justify-center items-center w-full h-full
            bg-white dark:bg-dark
            "
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 10,
            }}
          >
            <div
              className="loader border-t-4 
            border-primary dark:border-accent
            rounded-full w-8 h-8 animate-spin"
            ></div>
          </div>
        )}
        <iframe
          src={iframeSrc}
          onLoad={() => setIsLoading(false)}
          className="w-full h-full dark:bg-dark bg-white"
          style={{
            display: isLoading ? "none" : "block",
            border: "none", // Remove border from iframe
            margin: 0, // Remove any margin
            padding: 0, // Remove any padding
          }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Modal;
