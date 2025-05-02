"use client";
import { useEffect, useState, useRef } from "react";
import { InlineWidget } from "react-calendly";

interface CalendlySchedulerProps {
  url?: string;
  duration?: number;
}

// Define an interface for the Calendly event data
interface CalendlyEvent {
  event: string;
  payload: {
    height?: string;
    [key: string]: unknown;
  };
  data?: unknown;
}

const CalendlyScheduler = ({
  url = "https://calendly.com/geome7ric/30min",
}: CalendlySchedulerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeHeight, setIframeHeight] = useState(700);
  const iframeRef = useRef<HTMLDivElement>(null);

  // Configuración de los colores para Calendly
  const pageSettings = {
    backgroundColor: "0A0A0A",
    hideEventTypeDetails: false,
    hideLandingPageDetails: false,
    primaryColor: "00EF91",
    textColor: "FFFFFF",
  };

  useEffect(() => {
    // Configurar los eventos de Calendly
    const handleCalendlyEvent = (e: MessageEvent<CalendlyEvent>) => {
      if (!e.data.event || typeof e.data.event !== "string") return;
      if (e.origin !== "https://calendly.com") return;

      const eventName = e.data.event;
      console.log("Calendly event:", eventName, e.data);

      if (eventName === "calendly.event_scheduled") {
      } else if (eventName === "calendly.date_and_time_selected") {
      } else if (eventName === "calendly.event_type_viewed") {
      } else if (eventName === "calendly.profile_page_viewed") {
      } else if (eventName === "calendly.page_load") {
        setIsLoading(false);
      } else if (eventName === "calendly.error") {
      }

      if (e.data.payload.height) {
        const newHeight = parseInt(e.data.payload.height);
        setIframeHeight(newHeight + 50); // Añadimos 50px para evitar scroll
      }
    };

    // Añadir escuchador de eventos para los mensajes de Calendly
    window.addEventListener("message", handleCalendlyEvent);

    // Fallback para el estado de carga
    const loadTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Limpieza al desmontar el componente
    return () => {
      window.removeEventListener("message", handleCalendlyEvent);
      clearTimeout(loadTimeout);
    };
  }, []);

  return (
    <div
      id="calendly"
      className="relative flex flex-col items-center 
       lg:mt-16 xl:mt-32 
      justify-center sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl w-full flex flex-col items-center">
        <div className="rounded-lg shadow-lg w-full">
          {isLoading && (
            <div className="w-full h-64 flex items-center justify-center"></div>
          )}
          <div className="">
            <div ref={iframeRef} className=" w-full h-full">
              <InlineWidget
                url={url}
                styles={{
                  height: `${iframeHeight}px`,
                  width: "100%",
                }}
                pageSettings={pageSettings}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendlyScheduler;
