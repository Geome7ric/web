"use client";

import { useEffect } from "react";
import { useBudgetStore } from "@/store/budgetStore";

export default function Budget() {
  // Obtener los datos del presupuesto desde el store
  const { budget } = useBudgetStore();
  // Efecto para cambiar el título de la página
  useEffect(() => {
    document.title = `Propuesta para ${budget.clientName || "Cliente"} - Geome7ric`;
  }, [budget.clientName, budget.title]);

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-white bg-transparent">
      {/* Header/Hero del presupuesto */}
      <div className=" text-white py-16 border-b-4 border-accent text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold my-8">
            {budget.title}
          </h1>
        </div>
      </div>
      <div className="container mx-auto p-6   shadow-lg my-8 max-w-5xl rounded-lg">
        {" "}
        {/* Detalles del presupuesto */}
        <div className="flex flex-col md:flex-row justify-between p-6 bg-blue-50 dark:bg-blue-900/30 mb-8 rounded-lg">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-400">
              Información del Cliente
            </h3>
            <p className="mb-2">
              <strong>Para:</strong> {budget.clientName}
            </p>
            <p>
              <strong>Atención:</strong> {budget.clientContact}
            </p>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-400">
              Información del Proveedor
            </h3>
            <p className="mb-2">
              <strong>De:</strong> {budget.fromName}, Geome7ric
            </p>
            <p className="mb-2">
              <strong>Web:</strong>{" "}
              <a
                href="https://geome7ric.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                geome7ric.com
              </a>
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {budget.fromEmail}
            </p>
            <p className="mb-2">
              <strong>Fecha:</strong> {budget.date}
            </p>
            <p>
              <strong>Propuesta N°:</strong> {budget.proposalNumber}
            </p>
          </div>
        </div>
        {/* Introducción y Objetivo */}
        <section className="mb-12 p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-2">
            Introducción y Objetivo
          </h2>
          <p className="mb-4 text-lg leading-relaxed dark:text-gray-300">
            {budget.introduction}
          </p>
          <p className="text-lg leading-relaxed dark:text-gray-300">
            {budget.objective}
          </p>
        </section>
        {/* Proceso de Validación */}
        <section className="mb-12 p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-2">
            Nuestro Proceso de Validación
          </h2>
          <p className="mb-6 text-lg leading-relaxed dark:text-gray-300">
            Le guiaremos a través de un proceso estructurado y ágil, enfocado en
            obtener resultados rápidos y accionables:
          </p>
          <ul className="space-y-4">
            {budget.steps.map((step, index) => (
              <li
                key={index}
                className="bg-dark/70 p-6 border-l-4 border-blue-500 dark:border-blue-400 rounded-r-lg shadow-sm"
              >
                <strong className="block mb-2 text-gray-800 dark:text-gray-200 text-lg">
                  {step.title}
                </strong>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ul>
        </section>{" "}
        {/* Entregables */}
        <section className="mb-12 p-6 border-b border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-2">
            Entregables Clave
          </h2>
          <p className="mb-6 text-lg leading-relaxed dark:text-gray-300">
            Al finalizar este proceso de validación, usted recibirá:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            {budget.deliverables.map((deliverable, index) => (
              <li
                key={index}
                className="text-gray-700 dark:text-gray-300 pl-2 text-lg"
              >
                {deliverable}
              </li>
            ))}
          </ul>
        </section>{" "}
        {/* Cronograma */}
        <section className="mb-12 p-6 border-b border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-2">
            Cronograma Estimado
          </h2>
          <p className="text-lg leading-relaxed dark:text-gray-300">
            El proceso completo de validación se estima en{" "}
            <strong>
              aproximadamente {budget.timeline.hours} horas de trabajo efectivo
            </strong>
            , lo que usualmente se traduce en{" "}
            <strong>{budget.timeline.days}</strong> desde el inicio de la
            colaboración y la recepción de la información necesaria por su
            parte.
          </p>
        </section>{" "}
        {/* Inversión */}
        <section className="mb-12 p-8 border border-blue-200 dark:border-blue-800 rounded-xl shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-2">
              Inversión Total
            </h2>
            <p className="mb-6 text-lg leading-relaxed dark:text-gray-300">
              El costo total para este servicio integral de Validación de Idea
              de Negocio es de:
            </p>{" "}
            <div className="text-center py-6 px-4 rounded-lg">
              {" "}
              <p className="text-5xl font-bold text-blue-600 dark:text-blue-400 my-4">
                {budget.investment.amount} {budget.investment.currency}
              </p>
              <p className="italic text-gray-600 dark:text-gray-400 mt-2 text-lg">
                Forma de pago: {budget.investment.paymentTerms}
              </p>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
                Propuesta válida por 15 días a partir de la fecha de emisión.
              </p>
            </div>
          </div>
        </section>
        {/* Modus Operandi */}
        {budget.modusOperandi && (
          <section className="mb-12 p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-2">
              Modus Operandi
            </h2>
            <p className="mb-4 text-lg leading-relaxed dark:text-gray-300">
              {budget.modusOperandi.description}
            </p>
            <p className="dark:text-gray-300">
              {" "}
              <a
                href={budget.modusOperandi.link}
                target="_blank"
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
              >
                {new URL(budget.modusOperandi.link).hostname}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </p>
          </section>
        )}{" "}
        {/* Próximos Pasos */}
        <section className="p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-2">
            Próximos Pasos
          </h2>
          <p className="mb-8 text-lg leading-relaxed dark:text-gray-300">
            Si esta propuesta se alinea con sus expectativas y desea proceder
            con la validación de su idea de negocio, por favor, póngase en
            contacto con nosotros para confirmar su aceptación. Estaremos
            encantados de agendar una breve reunión inicial para dar el primer
            paso.
          </p>
          <div className="text-center my-8">
            {" "}
            <a
              href={`mailto:${budget.fromEmail}?subject=Aceptación%20Propuesta%20Validación%Negocio%20-%20${budget.clientName}&body=Hola%20${budget.fromName},%0A%0AMe%20complace%20confirmar%20que%20aceptamos%20la%20propuesta%20de%20Validación%20de%20Idea%20de%20Negocio%Negocio.%20Estamos%20interesados%20en%20comenzar%20cuanto%20antes.%0A%0APor%20favor,%20indícanos%20los%20próximos%20pasos%20y%20propón%20algunas%20fechas%20para%20nuestra%20primera%20reunión.%0A%0ASaludos,%0A${budget.clientContact}`}
              className="flex bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg text-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 items-center justify-center mx-auto space-x-2"
            >
              <span>Aceptar Propuesta y Comenzar</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          <p className="mt-6 text-gray-600 dark:text-gray-400 text-center">
            Si tiene alguna pregunta o requiere alguna modificación, no dude en
            contactarnos.
          </p>
        </section>{" "}
      </div>{" "}
    </div>
  );
}
