"use client";

import { useEffect } from "react";

/**
 * Hook para manejar la restauración del desplazamiento
 * Este hook asegura que la página se posicione en la parte superior al navegar
 */
export const useScrollRestoration = () => {
  useEffect(() => {
    // Asegurar que la página inicie desde la parte superior al cargar
    const shouldScrollToTop = window.sessionStorage.getItem("scrollToTop");

    if (shouldScrollToTop) {
      // Pequeño retraso para asegurar que la navegación se ha completado
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
        // Limpiar flag después de usarla
        window.sessionStorage.removeItem("scrollToTop");
      }, 0);
    }
  }, []);
};

/**
 * Función para configurar el scroll al iniciar una navegación
 * @returns Una función que se puede usar en el evento onClick
 */
export const useScrollToTopOnNavigation = () => {
  return () => {
    window.sessionStorage.setItem("scrollToTop", "true");
  };
};

export default useScrollRestoration;
