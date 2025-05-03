"use client";

import React from "react";

// Constantes para los textos
const STEPS = [
  {
    id: "01",
    title: "Diagnóstico personalizado",
    description:
      "Reunión presencial o por Meet para entender sus necesidades real.",
  },
  {
    id: "02",
    title: "Presupuesto con definición de solución",
    description:
      "Te enviamos una propuesta explican qué se construira, costo y cómo se ejecute.",
  },
  {
    id: "03",
    title: "Desarrollo iterativo en incrementos",
    description: "Modeleams, producir, inmediatamen ajustamos a cambios.",
  },
  {
    id: "04",
    title: "Entrega y puesta en producción",
    description:
      "Despliemos la apclación en su dominio y proveémos técnico terico durante los dias.",
  },
  {
    id: "05",
    title: "Relación de mantenimiento",
    description:
      "Realiza seguimiento para atender cugas, dudas, cambios o nuevas funcionalidades.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 bg-black text-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-5xl font-bold mb-12 text-center">Cómo funciona</h2>

        {/* Contenedor de los pasos - Formato vertical */}
        <div className="max-w-md mx-auto md:ml-24 relative items-center">
          {/* Línea vertical conectora */}
          <div className="absolute left-[34px] top-[70px] h-[calc(100%-100px)] w-[2px] bg-blue-600 opacity-50"></div>

          {/* Mapeo de los pasos */}
          {STEPS.map((step, index) => (
            <div key={step.id} className="mb-16 md:mb-16 relative">
              <div className="flex items-start">
                <div className="col-auto flex-shrink-0 w-[70px] h-[70px] bg-blue-600 rounded-full flex items-center justify-center z-10">
                  <span className="text-2xl font-bold text-white">
                    {step.id}
                  </span>
                </div>

                <div className="ml-4">
                  {/* Título y Descripción */}
                  <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                  <p className="text-base">{step.description}</p>
                </div>
              </div>
              {/* Puntos conectores */}
              {index < STEPS.length - 1 && (
                <div className="absolute left-[calc(50%-120px)] top-[calc(100%+20px)] ">
                  {[...Array(STEPS.length)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-blue-500/50 rounded-full mx-auto my-2"
                    ></div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
