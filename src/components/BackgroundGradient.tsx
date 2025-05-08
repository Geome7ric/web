"use client";

import { useState, useEffect, useRef } from "react";

interface BackgroundGradientsProps {
  className?: string;
}

const BackgroundGradients = ({ className = "" }: BackgroundGradientsProps) => {
  // Inicializamos como nulo para evitar hidratación incorrecta
  const [pageHeight, setPageHeight] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState<number | null>(null);
  // Estado para controlar si estamos en cliente o no
  const [isMounted, setIsMounted] = useState(false);
  // Estado para controlar el modo oscuro/claro - usamos un valor fijo inicialmente para evitar hidratación incorrecta
  const [isDarkMode, setIsDarkMode] = useState(false);
  const gradientContainerRef = useRef<HTMLDivElement>(null);

  // Efecto que se ejecuta solo en el cliente después del montaje del componente
  useEffect(() => {
    // Marcar que el componente está montado (solo ocurre en el cliente)
    setIsMounted(true);

    // Detectar el modo claro/oscuro inicial
    const checkDarkMode = () => {
      if (document.documentElement.classList.contains("dark")) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    };

    checkDarkMode();

    // Observar cambios en el tema
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

    // Función para calcular la altura total de la página
    const calculatePageHeight = () => {
      // Obtenemos la altura del documento completo
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );

      // Obtenemos la anchura de la ventana
      const winWidth =
        window.innerWidth || document.documentElement.clientWidth;

      setPageHeight(docHeight);
      setPageWidth(winWidth);
    };

    // Calcular la altura inicial
    calculatePageHeight();

    // Recalcular cuando cambie el tamaño de la ventana
    window.addEventListener("resize", calculatePageHeight);

    // Recalcular cuando se cargue todo el contenido
    window.addEventListener("load", calculatePageHeight);

    // Limpiar event listeners
    return () => {
      window.removeEventListener("resize", calculatePageHeight);
      window.removeEventListener("load", calculatePageHeight);
      observer.disconnect();
    };
  }, []);

  // Crear gradientes dinámicamente basados en la altura de la página
  const renderGradients = () => {
    // No renderizar nada en el servidor o antes de que el componente esté montado
    if (!isMounted) return [];

    // Usar valores por defecto si no tenemos medidas aún
    const height = pageHeight || 3000;
    const width = pageWidth || 1920;

    const gradients = [];
    // Calculamos cuántos gradientes necesitamos según la altura
    // Aproximadamente un gradiente cada 800px
    const numberOfGradients = Math.max(6, Math.ceil(height / 800));

    // Crear gradientes distribuidos uniformemente
    for (let i = 0; i < numberOfGradients; i++) {
      // Alternar entre primario y acento
      const isPrimary = i % 2 === 0;
      // Alternar entre izquierda y derecha
      const isLeft = i % 2 === 0;

      const randomBetween = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      // Calcular la posición vertical
      const topPosition =
        i === 0 ? 0 : Math.floor((height * i) / (numberOfGradients - 0.5));

      const animationDelay = randomBetween(400, 600);

      // Valores fijos de estilos para evitar diferencias entre servidor y cliente
      const gradientWidth = 200;
      const gradientHeight = 200;
      const xOffset = Math.floor(gradientWidth * -0.4);

      // Si estamos en pantalla grande multiplicamos por 2 width y height
      const finalWidth = width > 1024 ? gradientWidth * 2 : gradientWidth;
      const finalHeight = width > 1024 ? gradientHeight * 2 : gradientHeight;

      // Definir colores más fuertes para el modo claro - sin transparencia
      const gradientColorClass = isPrimary ? "bg-primary" : "bg-accent";

      gradients.push(
        <div
          key={`gradient-${i}`}
          className={`absolute rounded-full 
            ${gradientColorClass}
            opacity-20
            animate-smoke
            transition-opacity duration-4000`}
          style={{
            top: `${topPosition}px`,
            boxShadow: "0 0 100px rgba(0, 0, 0, 0.1)",
            width: `${finalWidth}px`,
            height: `${finalHeight}px`,
            left: isLeft ? `${xOffset}px` : "auto",
            right: isLeft ? "auto" : `${xOffset}px`,
            filter: `blur(120px)`,
            transition: "opacity 2s ease-in-out, transform 2s ease-in-out",
            transitionDelay: `${animationDelay}ms`,
          }}
        />
      );
    }

    return gradients;
  };

  return (
    <div
      ref={gradientContainerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
    >
      {isMounted && renderGradients()}
    </div>
  );
};

export default BackgroundGradients;
