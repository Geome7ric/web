"use client";

import { useState } from "react";
import { useBudgetStore, BudgetDetails } from "@/store/budgetStore";

export default function BudgetAdmin() {
  const { budget, setBudget, resetBudget } = useBudgetStore();

  // Estado para manejar formularios colapsados/expandidos
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    steps: false,
    deliverables: false,
    investment: false,
    modusOperandi: false,
  });

  // Función para alternar la expansión de una sección
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  // Manejar cambios en los campos de texto
  const handleTextChange = (field: string, value: string) => {
    setBudget({ [field]: value });
  };
  // Manejar cambios en campos anidados (como timeline e investment)
  const handleNestedChange = <T extends keyof BudgetDetails>(
    parent: T,
    field: string,
    value: unknown
  ) => {
    setBudget({
      [parent]: {
        ...(typeof budget[parent] === "object" && budget[parent] !== null
          ? budget[parent]
          : {}),
        [field]: value,
      },
    } as Partial<BudgetDetails>);
  };

  // Añadir un nuevo paso
  const addStep = () => {
    const newStep = {
      title: `${budget.steps.length + 1}. Nuevo Paso`,
      description: "Descripción de este paso...",
    };

    setBudget({
      steps: [...budget.steps, newStep],
    });
  };

  // Actualizar un paso
  const updateStep = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    const updatedSteps = [...budget.steps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      [field]: value,
    };

    setBudget({ steps: updatedSteps });
  };

  // Eliminar un paso
  const removeStep = (index: number) => {
    const updatedSteps = budget.steps.filter((_, i) => i !== index);
    setBudget({ steps: updatedSteps });
  };

  // Añadir un nuevo entregable
  const addDeliverable = () => {
    setBudget({
      deliverables: [...budget.deliverables, "Nuevo entregable"],
    });
  };

  // Actualizar un entregable
  const updateDeliverable = (index: number, value: string) => {
    const updatedDeliverables = [...budget.deliverables];
    updatedDeliverables[index] = value;

    setBudget({ deliverables: updatedDeliverables });
  };

  // Eliminar un entregable
  const removeDeliverable = (index: number) => {
    const updatedDeliverables = budget.deliverables.filter(
      (_, i) => i !== index
    );
    setBudget({ deliverables: updatedDeliverables });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">
            Administrar Presupuesto
          </h1>
          <p className="text-gray-600 mt-1">
            Modifica los detalles del presupuesto según tu necesidad.
          </p>
        </div>

        {/* Sección General */}
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={() => toggleSection("general")}
            className="flex justify-between items-center w-full text-lg font-medium text-gray-700"
          >
            Información General
            <span className="text-gray-500">
              {expandedSections.general ? "▲" : "▼"}
            </span>
          </button>

          {expandedSections.general && (
            <div className="mt-4 grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título de la Propuesta
                </label>
                <input
                  type="text"
                  value={budget.title}
                  onChange={(e) => handleTextChange("title", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Cliente
                  </label>
                  <input
                    type="text"
                    value={budget.clientName}
                    onChange={(e) =>
                      handleTextChange("clientName", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contacto del Cliente
                  </label>
                  <input
                    type="text"
                    value={budget.clientContact}
                    onChange={(e) =>
                      handleTextChange("clientContact", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tu Nombre
                  </label>
                  <input
                    type="text"
                    value={budget.fromName}
                    onChange={(e) =>
                      handleTextChange("fromName", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tu Email
                  </label>
                  <input
                    type="email"
                    value={budget.fromEmail}
                    onChange={(e) =>
                      handleTextChange("fromEmail", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha
                  </label>
                  <input
                    type="text"
                    value={budget.date}
                    onChange={(e) => handleTextChange("date", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Propuesta
                  </label>
                  <input
                    type="text"
                    value={budget.proposalNumber}
                    onChange={(e) =>
                      handleTextChange("proposalNumber", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Introducción
                </label>
                <textarea
                  value={budget.introduction}
                  onChange={(e) =>
                    handleTextChange("introduction", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Objetivo
                </label>
                <textarea
                  value={budget.objective}
                  onChange={(e) =>
                    handleTextChange("objective", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md h-24"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sección Pasos */}
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={() => toggleSection("steps")}
            className="flex justify-between items-center w-full text-lg font-medium text-gray-700"
          >
            Pasos del Proceso ({budget.steps.length})
            <span className="text-gray-500">
              {expandedSections.steps ? "▲" : "▼"}
            </span>
          </button>

          {expandedSections.steps && (
            <div className="mt-4">
              <div className="space-y-4">
                {budget.steps.map((step, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md p-4"
                  >
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Paso {index + 1}</h3>
                      <button
                        onClick={() => removeStep(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Eliminar
                      </button>
                    </div>

                    <div className="grid gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Título
                        </label>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) =>
                            updateStep(index, "title", e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Descripción
                        </label>
                        <textarea
                          value={step.description}
                          onChange={(e) =>
                            updateStep(index, "description", e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded-md h-20"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addStep}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Añadir Paso
              </button>
            </div>
          )}
        </div>

        {/* Sección Entregables */}
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={() => toggleSection("deliverables")}
            className="flex justify-between items-center w-full text-lg font-medium text-gray-700"
          >
            Entregables ({budget.deliverables.length})
            <span className="text-gray-500">
              {expandedSections.deliverables ? "▲" : "▼"}
            </span>
          </button>

          {expandedSections.deliverables && (
            <div className="mt-4">
              <div className="space-y-3">
                {budget.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={deliverable}
                      onChange={(e) => updateDeliverable(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={() => removeDeliverable(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addDeliverable}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Añadir Entregable
              </button>
            </div>
          )}
        </div>

        {/* Cronograma e Inversión */}
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={() => toggleSection("investment")}
            className="flex justify-between items-center w-full text-lg font-medium text-gray-700"
          >
            Cronograma e Inversión
            <span className="text-gray-500">
              {expandedSections.investment ? "▲" : "▼"}
            </span>
          </button>

          {expandedSections.investment && (
            <div className="mt-4 grid gap-6">
              <div>
                <h3 className="font-medium mb-2">Cronograma</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Horas de Trabajo
                    </label>
                    <input
                      type="number"
                      value={budget.timeline.hours}
                      onChange={(e) =>
                        handleNestedChange(
                          "timeline",
                          "hours",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Días Hábiles
                    </label>
                    <input
                      type="text"
                      value={budget.timeline.days}
                      onChange={(e) =>
                        handleNestedChange("timeline", "days", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Inversión</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monto
                    </label>
                    <input
                      type="number"
                      value={budget.investment.amount}
                      onChange={(e) =>
                        handleNestedChange(
                          "investment",
                          "amount",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Moneda
                    </label>
                    <input
                      type="text"
                      value={budget.investment.currency}
                      onChange={(e) =>
                        handleNestedChange(
                          "investment",
                          "currency",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Términos de Pago
                  </label>
                  <textarea
                    value={budget.investment.paymentTerms}
                    onChange={(e) =>
                      handleNestedChange(
                        "investment",
                        "paymentTerms",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modus Operandi */}
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={() => toggleSection("modusOperandi")}
            className="flex justify-between items-center w-full text-lg font-medium text-gray-700"
          >
            Modus Operandi
            <span className="text-gray-500">
              {expandedSections.modusOperandi ? "▲" : "▼"}
            </span>
          </button>

          {expandedSections.modusOperandi && budget.modusOperandi && (
            <div className="mt-4 grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={budget.modusOperandi.description}
                  onChange={(e) =>
                    handleNestedChange(
                      "modusOperandi",
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-md h-20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enlace
                </label>
                <input
                  type="text"
                  value={budget.modusOperandi.link}
                  onChange={(e) =>
                    handleNestedChange("modusOperandi", "link", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}
        </div>

        {/* Acciones */}
        <div className="p-6 flex justify-between">
          <button
            onClick={resetBudget}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Restaurar Valores Predeterminados
          </button>

          <a
            href="/es/budget"
            target="_blank"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Ver Presupuesto
          </a>
        </div>
      </div>
    </div>
  );
}
