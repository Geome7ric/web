"use client";
import { useEffect, useState, useRef } from "react";
import { InlineWidget } from "react-calendly";
import { sendConfirmationEmail } from "@/app/api";

interface CalendlySchedulerProps {
  url?: string;
  duration?: number;
  testEmail?: boolean; // Nueva prop para pruebas
}

// Define an interface for the Calendly event data
interface CalendlyEvent {
  event: string;
  payload: {
    height?: string;
    event?: {
      uri?: string;
      invitee?: {
        name?: string;
        email?: string;
      };
      scheduled_event?: {
        start_time?: string;
      };
    };
    [key: string]: unknown;
  };
  data?: unknown;
}

const CalendlyScheduler = ({
  url = "https://calendly.com/geome7ric/30min",
  testEmail = false, // Por defecto no enviar email de prueba
}: CalendlySchedulerProps) => {
  const [iframeHeight, setIframeHeight] = useState(700);
  const [isLoaded, setIsLoaded] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);

  // Configuración de los colores para Calendly
  const pageSettings = {
    backgroundColor: "0A0A0A",
    hideEventTypeDetails: false,
    hideLandingPageDetails: false,
    primaryColor: "00EF91",
    textColor: "FFFFFF",
  };

  // Función para enviar un correo electrónico de prueba
  const sendTestEmail = async () => {
    try {
      // Datos de prueba
      const currentDate = new Date();
      const testDate = new Date(currentDate);
      testDate.setDate(currentDate.getDate() + 3); // Cita de prueba en 3 días

      const formattedDate = testDate.toISOString().split("T")[0];
      const formattedTime = "16:00"; // Hora fija para prueba

      // Envía el correo de prueba
      await sendConfirmationEmail({
        name: "Usuario de Prueba",
        email: "matiasjriosb@gmail.com", // Reemplaza esto con tu correo para hacer la prueba
        date: formattedDate,
        time: formattedTime,
      });

      console.log("Correo de prueba enviado con éxito");
      setIsEmailSent(true);
    } catch (error) {
      console.error("Error al enviar el correo de prueba:", error);
    }
  };

  useEffect(() => {
    // Cargar el script de Calendly manualmente para asegurar carga más temprana
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    // Si estamos en modo prueba, enviamos un correo de prueba al cargar el componente
    if (testEmail && !isEmailSent) {
      sendTestEmail();
    }

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
    const handleCalendlyEvent = async (e: MessageEvent<CalendlyEvent>) => {
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

      // Detectar cuando se completa una reserva y enviar el email de confirmación
      if (eventName === "calendly.event_scheduled" && !isEmailSent) {
        try {
          console.log("Evento programado detectado:", e.data.payload.event);

          const invitee = e.data.payload.event?.invitee;
          const startTime = e.data.payload.event?.scheduled_event?.start_time;

          if (invitee?.name && invitee?.email && startTime) {
            console.log("Datos del invitado:", {
              name: invitee.name,
              email: invitee.email,
            });

            // Formatear los datos de la cita
            const scheduledDate = new Date(startTime);
            const date = scheduledDate.toISOString().split("T")[0];
            const time = scheduledDate.toLocaleTimeString("es-AR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });

            // Enviar el email de confirmación
            await sendConfirmationEmail({
              name: invitee.name,
              email: invitee.email,
              date: date,
              time: time,
            });

            setIsEmailSent(true);
            console.log("Email de confirmación enviado con éxito");
          } else {
            console.log("Datos de invitado no disponibles", {
              invitee,
              startTime,
            });
          }
        } catch (error) {
          console.error("Error al enviar el correo de confirmación:", error);
        }
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
  }, [url, isEmailSent, testEmail]);

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
          {/* Añadir botón de prueba para enviar email manualmente */}
          {testEmail && !isEmailSent && (
            <div className="flex justify-center mb-4">
              <button
                onClick={sendTestEmail}
                className="bg-primary text-black px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Enviar correo de prueba
              </button>
            </div>
          )}

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
