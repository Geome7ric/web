"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useCalendlyStore } from "@/store/calendlyStore";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
  title?: string;
  subtitle?: string;
}

const CalendlyModal = ({
  isOpen,
  onClose,
  url = "https://calendly.com/geome7ric/30min",
  title,
  subtitle,
}: CalendlyModalProps) => {
  const t = useTranslations("CalendlyModal");
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Use Zustand store
  const { setUrl, iframeHeight, setIsEmailSent } = useCalendlyStore();

  // Use translation fallback for title
  const modalTitle = title || t("defaultTitle");

  // Smooth modal close using useCallback to avoid re-creation on each render
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  }, [onClose]);

  // Close when clicking outside the modal with useCallback
  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    },
    [handleClose]
  );

  // Close with Escape key using useCallback
  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  ); // Close modal when an event is scheduled
  const handleEmailSent = useCallback(() => {
    setIsEmailSent(true);
    setTimeout(() => {
      handleClose();
    }, 1000);
  }, [handleClose, setIsEmailSent]);

  // Handle body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Update URL in store when modal opens
      setUrl(url);

      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, url, setUrl, handleOutsideClick, handleEscapeKey]);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className={`bg-white dark:bg-gray-900 rounded-xl w-full transform transition-transform duration-300 ${
          isClosing ? "scale-95" : "scale-100"
        }`}
        style={{
          width: "80%",
          maxWidth: "550px",
          maxHeight: "90vh",
          height:
            iframeHeight > 0 ? `${Math.min(iframeHeight + 60, 700)}px` : "auto",
          overflowY: "auto",
        }}
      >
        {/* Encabezado del modal */}
        <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
          {" "}
          <div>
            <h2 className="text-lg font-semibold text-black dark:text-white">
              {modalTitle}
            </h2>
            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-black dark:hover:text-white rounded-full p-1 transition-colors focus:outline-none"
            aria-label={t("closeLabel")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>{" "}
        {/* Contenido del modal */}
        <div className="p-0 sm:p-2 overflow-visible">
          {" "}
          <iframe
            src={url}
            width="100%"
            height="600"
            frameBorder="0"
            title={t("iframeTitle")}
            className="rounded-lg"
            onLoad={() => {
              // Simulate event scheduling after 5 seconds
              setTimeout(() => {
                handleEmailSent();
              }, 5000);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendlyModal;
