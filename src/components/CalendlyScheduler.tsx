"use client";
import { useEffect, useRef } from "react";
import { InlineWidget } from "react-calendly";

interface CalendlySchedulerProps {
  url?: string;
}

const CalendlyScheduler = ({
  url = "https://calendly.com/geome7ric/30min",
}: CalendlySchedulerProps) => {
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
    // Manejar el desplazamiento al cargar si hay un hash en la URL
    if (window.location.hash === "#calendly" && calendarRef.current) {
      setTimeout(() => {
        const headerHeight = 80; // Altura aproximada del header en px
        const yOffset = -headerHeight; // Offset negativo para compensar el header
        
        // Corregir el acceso a getBoundingClientRect para evitar el error de tipo
        if (calendarRef.current) {
          const rect = calendarRef.current.getBoundingClientRect();
          const y = rect.top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 1000);
    }
  }, []);

  return (
    <div
      id="calendly"
      ref={calendarRef}
      className="relative py-10 flex flex-col items-center justify-center w-full scroll-mt-24"
    >
      <div className="w-full max-w-6xl">
        <InlineWidget
          url={url}
          styles={{
            height: '750px',
            width: "100%",
          }}
          pageSettings={pageSettings}
        />
      </div>
    </div>
  );
};

export default CalendlyScheduler;
