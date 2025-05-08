"use client";

import { useState, useEffect, useRef } from "react";

interface BackgroundGradientsProps {
  className?: string;
}

const BackgroundGradients = ({ className = "" }: BackgroundGradientsProps) => {
  const [pageHeight, setPageHeight] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const gradientContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    };
  }, []);

  // Crear gradientes dinámicamente basados en la altura de la página
  const renderGradients = () => {
    // Si no tenemos altura aún, mostrar gradientes por defecto
    if (pageHeight === 0) {
      setPageHeight(3000); // Altura por defecto
    }

    if (pageWidth === 0) {
      setPageWidth(1920); // Anchura por defecto
    }

    const gradients = [];
    // Calculamos cuántos gradientes necesitamos según la altura
    // Aproximadamente un gradiente cada 800px
    const numberOfGradients = Math.max(5, Math.ceil(pageHeight / 800));

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
        i === 0 ? 0 : Math.floor((pageHeight * i) / (numberOfGradients - 0.5));

      const animationDelay = randomBetween(400, 600);

      // mientras menos ancha la pantalla, mas desplazamiento en x
      // const xOffset = Math.floor(pageWidth * -0.3);

      // si es desktop, el desplazamiento es 0.3
      // si es mobile, el desplazamiento es 0.5

      let width = 200;
      let height = 200;

      const xOffset = Math.floor(width * -0.4);

      // si estamos en pantalla grande multiplicamos por 2 width y height
      if (pageWidth > 1024) {
        width = width * 2;
        height = height * 2;
      }

      gradients.push(
        <div
          key={`gradient-${i}`}
          className={`absolute  rounded-full 
            ${isPrimary ? "bg-primary" : "bg-accent"} 
            blur-[120px]
            ${isLeft ? "left-0" : "right-0 "}
            animate-smoke
            transition-opacity duration-4000`}
          style={{
            top: `${topPosition}px`,
            boxShadow: "0 0 100px rgba(0, 0, 0, 0.1)",
            // width que dependa del ancho de la pantalla
            width: `${width}px`,
            height: `${height}px`,
            left: isLeft ? `${xOffset}px` : "auto",
            right: isLeft ? "auto" : `${xOffset}px`,
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
      // style={{ minHeight: "100vh" }}
    >
      {renderGradients()}
    </div>
  );
};

export default BackgroundGradients;
