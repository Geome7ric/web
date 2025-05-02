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
  const [iframeHeight, setIframeHeight] = useState(700);
  const [isLoaded, setIsLoaded] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Configuración de los colores para Calendly
  const pageSettings = {
    backgroundColor: "0A0A0A",
    hideEventTypeDetails: false,
    hideLandingPageDetails: false,
    primaryColor: "00EF91",
    textColor: "FFFFFF",
  };

  useEffect(() => {
    // Cargar el script de Calendly manualmente para asegurar carga más temprana
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    // Manejar el desplazamiento al cargar si hay un hash en la URL
    if (window.location.hash === "#calendly" && calendarRef.current) {
      setTimeout(() => {
        const headerHeight = 80; // Altura aproximada del header en px
        const yOffset = -headerHeight; // Offset negativo para compensar el header
        const y =
          calendarRef?.current?.getBoundingClientRect()?.top ||
          0 + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }, 1000);
    }

    // Asumimos que Calendly estará cargado después de un tiempo
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 2500);

    // Configurar los eventos de Calendly
    const handleCalendlyEvent = (e: MessageEvent<CalendlyEvent>) => {
      if (!e.data.event || typeof e.data.event !== "string") return;
      if (e.origin !== "https://calendly.com") return;

      const eventName = e.data.event;

      // Cuando Calendly termina de cargar, ocultar el spinner
      if (eventName === "calendly.page_load") {
        setIsLoaded(true);
      }

      // Solo actualizar la altura si es necesario
      if (e.data.payload.height) {
        const newHeight = parseInt(e.data.payload.height);
        setIframeHeight(newHeight);
      }
    };

    // Añadir escuchador de eventos para los mensajes de Calendly
    window.addEventListener("message", handleCalendlyEvent);

    // Limpieza al desmontar el componente
    return () => {
      window.removeEventListener("message", handleCalendlyEvent);
      if (script.parentNode) {
        document.head.removeChild(script);
      }
      clearTimeout(loadTimer);
    };
  }, [url]);

  return (
    <div
      id="calendly"
      ref={calendarRef}
      className="relative flex flex-col items-center 
       lg:mt-16 xl:mt-32 mt-8
      justify-center sm:px-6 lg:px-8 scroll-mt-24"
    >
      <div className="w-full max-w-6xl">
        <div className="w-full">
          {/* Contenedor del iframe sin bordes ni sombras */}
          <div
            style={{
              position: "relative",
              minHeight: "700px",
            }}
          >
            {/* Solo un indicador de carga, sin fondos que creen cuadrados */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                {/* <div className="w-12 h-12 border-t-4 border-primary border-solid rounded-full animate-spin"></div> */}
              </div>
            )}

            <InlineWidget
              url={url}
              styles={{
                height: iframeHeight ? `${iframeHeight}px` : "700px",
                width: "100%",
              }}
              pageSettings={pageSettings}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendlyScheduler;
