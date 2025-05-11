"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

type Asset = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

interface InfiniteScrollProps {
  assets: Asset[];
  speed?: number;
  direction?: "ltr" | "rtl";
  className?: string;
  gap?: number; // Nueva propiedad para controlar el espaciado
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  assets,
  direction = "ltr",
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
      direction,
      dragFree: true,
    },
    []
  );

  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollThreshold = 200; // Umbral de desplazamiento (en píxeles)
  const [scrollAccumulator, setScrollAccumulator] = useState(0); // Acumulador para registrar el desplazamiento total

  useEffect(() => {
    const handleScroll = () => {
      if (!emblaApi) return;

      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;

      // Acumulamos el desplazamiento del scroll
      const newScrollAccumulator = scrollAccumulator + scrollDiff;
      setScrollAccumulator(newScrollAccumulator);

      // Desplazar solo cuando el acumulado supera el umbral
      if (Math.abs(newScrollAccumulator) >= scrollThreshold) {
        // Calculamos cuántas imágenes mover dependiendo del acumulado
        const moveCount = Math.floor(newScrollAccumulator / scrollThreshold);

        if (moveCount !== 0) {
          emblaApi.scrollTo(emblaApi.selectedScrollSnap() + moveCount);
        }

        // Restablecemos el acumulador después de mover el carrusel
        setScrollAccumulator(0);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [emblaApi, lastScrollY, scrollAccumulator]);

  // Si no hay assets para mostrar, no renderizar nada
  if (assets.length === 0) {
    return null;
  }

  return (
    <div className={`w-full h-full overflow-hidden  `}>
      <div className="h-[150px] relative h-full ">
        <div className="overflow-hidden" ref={emblaRef}>
          <div
            className="flex items-center "
            style={{
              // Se ajusta según el ancho de la pantalla
              width: `calc(100%)`,
            }}
          >
            {assets.map((asset, index) => (
              <div
                key={asset.id}
                className="flex-[0_0_auto] flex justify-center items-center"
                style={{
                  transform: `translateX(${24 * index * 1.2}px)`,
                }}
              >
                <Image
                  width={360}
                  height={360}
                  src={asset.src}
                  alt={asset.alt}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroll;
