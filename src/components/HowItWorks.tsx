"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Constantes para los textos
const STEPS = [
  {
    id: "01",
    title: "Diagnóstico personalizado",
    shortDescription:
      "Entendemos tus necesidades para ofrecerte soluciones a medida.",
    fullDescription:
      "Iniciamos con una reunión para entender en profundidad las necesidades de tu negocio y los retos específicos que enfrentas.",
  },
  {
    id: "02",
    title: "Propuesta clara",
    shortDescription:
      "Te enviamos un presupuesto detallado con la solución adecuada.",
    fullDescription:
      "Te enviamos un presupuesto formal que incluye una descripción detallada de la solución propuesta, el costo y los plazos.",
  },
  {
    id: "03",
    title: "Reunión en vivo",
    shortDescription:
      "Presentamos y ajustamos la propuesta en una videollamada.",
    fullDescription:
      "Nos reunimos en una videollamada para revisar el presupuesto y hacer cualquier ajuste necesario, asegurándonos de que sea perfecto para ti.",
  },
  {
    id: "04",
    title: "Desarrollo ágil",
    shortDescription: "Implementamos la solución paso a paso, con tu feedback.",
    fullDescription:
      "El proceso de desarrollo se realiza en etapas iterativas, lo que nos permite ajustar rápidamente cualquier detalle según tus necesidades o feedback.",
  },
  {
    id: "05",
    title: "Entrega y puesta en producción",
    shortDescription: "Lanzamos la aplicación y aseguramos su funcionamiento.",
    fullDescription:
      "Una vez desarrollada la solución, la implementamos en tu dominio, asegurándonos de que todo funcione perfectamente desde el primer momento.",
  },
  {
    id: "06",
    title: "Soporte continuo",
    shortDescription: "Te ofrecemos mantenimiento para ajustes y mejoras.",
    fullDescription:
      "Te ofrecemos un servicio de mantenimiento para asegurarnos de que todo siga funcionando bien, implementando mejoras o realizando ajustes cuando sea necesario.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-20 bg-dark text-white flex flex-col items-center">
      <div className="container px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-10 text-center">
          Cómo funciona trabajar con Geome7ric
        </h2>

        {/* subtituloi */}
        <p className="text-lg text-center mb-10 md:mb-14 max-w-3xl mx-auto">
          Descubre los pasos clave en nuestro proceso para llevar tu proyecto
          del concepto a la realidad.
        </p>

        {/* Contenedor de los pasos - Formato vertical */}
        <div className="md:max-w-4xl md:mx-auto relative">
          {/* Eliminar la línea vertical continua que estaba aquí */}

          {/* Mapeo de los pasos */}
          {STEPS.map((step, index) => (
            <div key={step.id} className="mb-10 md:mb-14 relative">
              {/* Línea vertical que conecta cada elemento hasta antes del paso 06 */}
              {index < STEPS.length - 1 && step.id !== "05" && (
                <div className="absolute left-[34px] top-[70px] h-full w-[2px] bg-accent opacity-50 z-0"></div>
              )}
              <div className="flex items-start">
                {step.id === "06" && (
                  <Image
                    src="/assets/cycle.png"
                    alt="Cycle process"
                    width={70}
                    height={70}
                    className="col-auto flex-shrink-0 flex items-center justify-center hover:rotate-180 transition-all duration-1000 cursor-pointer"
                  />
                )}
                {step.id !== "06" && (
                  <div
                    className="col-auto flex-shrink-0 w-[70px] h-[70px] bg-accent text-dark hover:text-accent
                    rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg hover:bg-dark
                    transition-all duration-300 cursor-pointer group z-10 relative"
                  >
                    <span className="text-2xl font-bold group-hover:drop-shadow-[0_0_8px_var(--tw-shadow-color)] group-hover:shadow-accent transition-all duration-300">
                      {step.id}
                    </span>
                  </div>
                )}

                <div className="ml-6 md:ml-8">
                  {/* Título y Descripción */}
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg max-w-2xl md:hidden">
                    {step.shortDescription}
                  </p>
                  <p className="text-base md:text-lg max-w-2xl hidden md:block">
                    {step.fullDescription}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12 md:mt-16">
          <Link
            href="#calendly"
            className="px-6 py-3 
              border
              dark:bg-dark dark:border-accent dark:text-accent dark:hover:bg-accent dark:hover:text-dark
              bg-primary border-secondary text-secondary hover:bg-secondary hover:text-primary
              font-semibold text-lg rounded-lg shadow-lg transition duration-300"
          >
            Agenda una reunión
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
