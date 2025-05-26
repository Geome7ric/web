import { create } from "zustand";

export interface BudgetDetails {
  title: string;
  clientName?: string;
  clientContact?: string;
  fromName: string;
  fromEmail: string;
  date: string;
  proposalNumber?: string;
  introduction: string;
  objective: string;
  steps: {
    title: string;
    description: string;
  }[];
  deliverables: string[];
  timeline: {
    hours: number;
    days: string;
  };
  investment: {
    amount: number;
    currency: string;
    paymentTerms: string;
  };
  modusOperandi?: {
    description: string;
    link: string;
  };
}

interface BudgetStore {
  budget: BudgetDetails;
  // eslint-disable-next-line no-unused-vars
  setBudget: (budgetData: Partial<BudgetDetails>) => void;
  resetBudget: () => void;
}

// Valores predeterminados para el presupuesto
const defaultBudget: BudgetDetails = {
  title: " Validación de Idea de Negocio Digital",
  clientName: "Empresa Innovation Tech",
  clientContact: "María González - CEO",
  fromName: "Matias Rios",
  fromEmail: "contacto@geome7ric.com",
  date: "26 de Mayo, 2025",
  proposalNumber: "G7-VID-2025-001",
  introduction:
    "En Geome7ric, comprendemos que el lanzamiento de una nueva idea de negocio digital es una inversión significativa de tiempo y recursos. Por ello, ofrecemos un servicio especializado de validación de ideas de negocio diseñado para mitigar riesgos, optimizar la asignación de recursos y, fundamentalmente, confirmar la existencia de una demanda real en el mercado antes de acometer el desarrollo completo.",
  objective:
    "Nuestro objetivo es proporcionarle datos concretos y feedback temprano que le permitan tomar decisiones informadas sobre la viabilidad y el potencial de su idea de negocio.",
  steps: [
    {
      title: "1. Definición y Clarificación de la Idea",
      description:
        "Partiremos de su concepto inicial para definir con precisión el problema a resolver, la solución propuesta y el público objetivo.",
    },
    {
      title: "2. Creación de Identidad Visual y Dominio Provisional",
      description:
        "Desarrollaremos una imagen de marca básica (nombre sugerido, paleta de colores, logo simple) y le asistiremos en la selección y adquisición de un dominio web provisional, priorizando opciones efectivas y económicas para esta fase.",
    },
    {
      title: "3. Diseño de Interfaz Inicial (Mockup/Wireframe)",
      description:
        "Crearemos bocetos o wireframes funcionales que representen la estructura y el flujo principal de su futuro negocio digital, enfocándonos en cómo transmitirá valor y resolverá el problema del usuario.",
    },
    {
      title: "4. Desarrollo de Landing Page Estratégica",
      description:
        "Construiremos una página de aterrizaje atractiva y funcional que comunique claramente su proyecto (qué es, qué soluciona). Incluiremos elementos esenciales como textos legales básicos y llamados a la acción efectivos.",
    },
    {
      title: "5. Configuración de Lista de Espera (Waitlist)",
      description:
        "Integraremos un sistema de lista de espera en la landing page para capturar el correo electrónico de los primeros interesados, permitiendo medir el interés inicial y construir una base de potenciales usuarios.",
    },
    {
      title: "6. Implementación de Analíticas Básicas",
      description:
        "Configuraremos herramientas de analítica web para rastrear visitas, interacciones y conversiones en la landing page, obteniendo datos cuantitativos sobre el interés generado.",
    },
    {
      title: "7. Despliegue de Landing Page",
      description:
        "Pondremos en línea la landing page, haciéndola accesible al público para iniciar la fase de promoción y captación.",
    },
    {
      title: "8. Estrategia de Promoción Orgánica Inicial",
      description:
        "Ejecutaremos una campaña de difusión orgánica en canales seleccionados (redes sociales, comunidades online relevantes) para atraer visitantes cualificados a su landing page sin incurrir en costos publicitarios en esta etapa.",
    },
    {
      title: "9. Medición y Análisis de Resultados Clave",
      description:
        "Monitorizaremos y analizaremos las métricas clave: tasa de conversión de la landing page, número de suscriptores y el feedback cualitativo recibido. Estos datos son cruciales para la validación.",
    },
    {
      title: "10. Conclusiones y Recomendaciones Estratégicas",
      description:
        "Con base en los datos recopilados, le presentaremos un informe con las conclusiones sobre la validación de su idea y recomendaciones claras sobre los siguientes pasos: avanzar con el desarrollo del Producto Mínimo Viable (MVP), pivotar la idea o reconsiderar el proyecto.",
    },
  ],
  deliverables: [
    "Una landing page funcional y desplegada online.",
    "Identidad visual básica (logo simple, paleta de colores).",
    "Sistema de lista de espera configurado con los primeros contactos (si los hay).",
    "Acceso a las analíticas básicas de la landing page.",
    "Un informe final con el análisis de los resultados, feedback recopilado y recomendaciones estratégicas para su idea de negocio.",
  ],
  timeline: {
    hours: 12,
    days: "3 a 5 días hábiles",
  },
  investment: {
    amount: 500,
    currency: "USD",
    paymentTerms:
      "50% al inicio del proyecto, 50% a la entrega de los entregables finales",
  },
  modusOperandi: {
    description:
      "Transformamos tu idea de negocio digital en una solución tecnológica a medida mediante un proceso estructurado y transparente. Desde la comprensión inicial de tus necesidades hasta el desarrollo iterativo y el soporte posterior al lanzamiento, trabajamos en estrecha colaboración contigo en cada etapa para garantizar que la solución final se alinee perfectamente con tus objetivos comerciales y resuelva los desafíos específicos de tu empresa.",
    link: "https://geome7ric.com",
  },
};

export const useBudgetStore = create<BudgetStore>((set) => ({
  budget: defaultBudget,

  setBudget: (budgetData) =>
    set((state) => ({
      budget: { ...state.budget, ...budgetData },
    })),
  resetBudget: () => set({ budget: defaultBudget }),
}));
