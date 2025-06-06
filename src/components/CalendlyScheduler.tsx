"use client";
import { useEffect, useState, useRef } from "react";
import { InlineWidget } from "react-calendly";
import { sendConfirmationEmail } from "@/app/api";
import { useTranslations } from "next-intl"; // Import useTranslations

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
    invitee?: {
      uri?: string;
    };
    [key: string]: unknown;
  };
  data?: unknown;
}

// Interfaz para la respuesta de la API de Calendly
interface InviteeResponse {
  resource: {
    name: string;
    email: string;
    timezone: string;
    created_at: string;
    updated_at: string;
    event: string; // URI del evento
    cancel_url: string;
    reschedule_url: string;
    status: string;
    [key: string]: unknown;
  };
}

// Interfaz para la respuesta del evento
interface EventResponse {
  resource: {
    start_time: string;
    end_time: string;
    name: string;
    status: string;
    [key: string]: unknown;
  };
}

const CALENDLY_API_KEY =
  "eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzQ2NTUwNDEwLCJqdGkiOiI0NTE4MmQ4Ny0xMjM2LTQwNzktODk0MS1lYjg5MGJlZGE1YTUiLCJ1c2VyX3V1aWQiOiI0ODk0MWE1Zi0wMGFkLTRkYzctYmY5NS04YTI2MDAxZjI0ODcifQ.r2306oGq6MZoVFarMIaZUfyEkOXweIXoq-4O9NQwduqKk4s8O0jMDbv9-0mc4XHLiWxw7ZsJaxrRrX4mN7o5fw";

// Función para obtener los detalles del invitado desde la API de Calendly
const getInviteeDetails = async (
  inviteeUri: string
): Promise<InviteeResponse | null> => {
  try {
    const response = await fetch(inviteeUri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CALENDLY_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error en la API: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los detalles del invitado:", error);

    return null;
  }
};

// Función para obtener los detalles del evento desde la API de Calendly
const getEventDetails = async (
  eventUri: string
): Promise<EventResponse | null> => {
  try {
    const response = await fetch(eventUri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CALENDLY_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error en la API: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los detalles del evento:", error);
    return null;
  }
};

const CalendlyScheduler = ({
  url = "https://calendly.com/geome7ric/30min",
  testEmail = false, // Por defecto no enviar email de prueba
}: CalendlySchedulerProps) => {
  const t = useTranslations("Calendly"); // Initialize useTranslations
  const [iframeHeight, setIframeHeight] = useState(700);
  const [isLoaded, setIsLoaded] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Detectar el modo oscuro/claro
  useEffect(() => {
    // Comprueba el modo oscuro inicial
    const checkDarkMode = () => {
      if (document.documentElement.classList.contains("dark")) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    };

    checkDarkMode();

    // Crea un observador de mutaciones para detectar cambios en la clase 'dark'
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

    // Iniciar la observación del elemento HTML
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []); // Configuración mejorada de los colores para Calendly
  const pageSettings = {
    backgroundColor: isDarkMode ? "121212" : "FFFFFF", // Fondos ligeramente contrastados para mejor visualización
    hideEventTypeDetails: false,
    hideLandingPageDetails: false,
    primaryColor: "00EF91", // Color de acento consistente en ambos modos
    textColor: isDarkMode ? "FFFFFF" : "171717", // Mejor contraste en texto
    hideGdprBanner: true,
    hideLoadingIndicator: true,
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
      } // Actualizar la altura con una transición suave para evitar saltos
      if (e.data.payload.height) {
        const newHeight = parseInt(e.data.payload.height);
        // Asegurar una altura mínima y evitar cambios pequeños
        const adjustedHeight = Math.max(newHeight, 650);
        // Solo actualizar si el cambio es significativo (más de 30px) o si es la primera carga
        if (!isLoaded || Math.abs(adjustedHeight - iframeHeight) > 30) {
          setIframeHeight(adjustedHeight);
        }
      }

      // Detectar cuando se completa una reserva y enviar el email de confirmación
      if (eventName === "calendly.event_scheduled" && !isEmailSent) {
        try {
          const payload = e.data.payload;
          // Definir tipos explícitos para evitar 'any'
          let inviteeData: { name: string; email: string } | null = null;
          let startTime: string | null = null;

          // Primero intenta recuperar la información del payload directamente si está disponible
          if (payload.event?.invitee?.name && payload.event?.invitee?.email) {
            inviteeData = {
              name: payload.event.invitee.name,
              email: payload.event.invitee.email,
            };
            startTime = payload.event?.scheduled_event?.start_time || null;
          } else if (payload.invitee?.uri) {
            // Si solo tenemos la URI, hacemos una llamada a la API de Calendly
            const inviteeUri = payload.invitee.uri;

            // Obtener los datos del invitado de la API
            const inviteeResponse = await getInviteeDetails(inviteeUri);

            if (inviteeResponse && inviteeResponse.resource) {
              // Extraer los datos del invitado
              inviteeData = {
                name: inviteeResponse.resource.name,
                email: inviteeResponse.resource.email,
              };

              // Usar la URI del evento incluida en la respuesta del invitado
              const eventUri = inviteeResponse.resource.event;

              if (eventUri) {
                // Obtener los detalles del evento para conseguir la hora de inicio
                const eventResponse = await getEventDetails(eventUri);
                if (eventResponse && eventResponse.resource) {
                  startTime = eventResponse.resource.start_time;
                }
              }
            }
          }

          // Verifica si tenemos todos los datos necesarios
          if (inviteeData?.name && inviteeData?.email && startTime) {
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
              name: inviteeData.name,
              email: inviteeData.email,
              date: date,
              time: time,
            });

            setIsEmailSent(true);
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
  }, [url, isEmailSent, testEmail, isDarkMode, iframeHeight, isLoaded]);

  return (
    <section
      id="calendly"
      ref={calendarRef}
      className="w-full px-4 sm:px-6 lg:px-8 mt-8 md:mt-4 lg:mt-16 xl:mt-32 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-16">
          {/* Columna izquierda: Texto */}
          <div className="w-full lg:w-1/2 flex items-center">
            <div>
              <h2 className="text-black dark:text-white text-subtitle text-3xl md:text-4xl font-bold mb-4 leading-tight transition-all duration-1000 text-center lg:text-left">
                {t('scheduleTitle')}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center lg:text-left">
                {t('scheduleDescription')}
              </p>

              {/* Botón de test en modo prueba */}
              {testEmail && !isEmailSent && (
                <div className="flex justify-center lg:justify-start">
                  <button
                    onClick={sendTestEmail}
                    className="bg-accent text-black dark:text-white px-4 py-2 rounded-md hover:bg-accent/90 transition-colors"
                  >
                    {t('sendTestEmailButton')}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Columna derecha: Calendario */}
          <div
            className="w-full lg:w-1/2"
            style={{
              // scale 0-8
              transform: `scale(${isLoaded ? 0.9 : 0.8})`,
              // smooth transition
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <div
              className=" rounded-xl overflow-hidden "
              style={{
                transition: "min-height 0.3s ease-in-out",
                position: "relative",
              }}
            >
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-100 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50">
                  <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full"></div>
                </div>
              )}

              <InlineWidget
                url={url}
                styles={{
                  height: iframeHeight ? `${iframeHeight}px` : "630px",
                  width: "100%",
                  margin: "0 auto",
                  transition: "height 0.3s ease-in-out",
                }}
                pageSettings={pageSettings}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendlyScheduler;
