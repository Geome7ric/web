// Enhanced blog data interface with comprehensive SEO fields
// Place this in: src/types/blog.ts

export interface EnhancedBlogProps {
  // Basic content
  title: string;
  slug: string;
  content: BlogSection[];

  // SEO Meta Tags
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
  metaKeywords: string[];
  socialDescription?: string;

  // Media
  heroImage: BlogImage;
  heroVideo?: string; // Added heroVideo field
  intermediateImage?: BlogImage;
  featuredImage?: BlogImage; // For social sharing

  // Publishing Info
  publishedAt: string;
  lastModified?: string;
  readingTimeMinutes: number;

  // Categorization
  category: string;
  tags: string[];

  // Content Structure
  sections: BlogSection[];
  tableOfContents?: boolean;

  // Engagement
  related?: RelatedArticle[];

  // Author Info (for future multi-author support)
  author?: {
    name: string;
    bio?: string;
    avatar?: string;
    social?: {
      twitter?: string;
      linkedin?: string;
    };
  };

  // Advanced SEO
  canonical?: string;
  noindex?: boolean;
  priority?: number; // For sitemap
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";

  // Analytics
  views?: number;
  likes?: number;
  shares?: number;
}

export interface BlogImage {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface BlogSection {
  type:
    | "intro"
    | "highlight"
    | "problem"
    | "solution"
    | "benefits"
    | "testimonial"
    | "cta"
    | "conclusion"
    | "faq";
  title?: string;
  content?: string;
  items?: string[];
  quote?: string;
  author?: string;
  buttonText?: string;
  buttonLink?: string;

  // For FAQ sections
  questions?: {
    question: string;
    answer: string;
  }[];
}

export interface RelatedArticle {
  slug: string;
  title: string;
  reason: string;
  image?: string;
  publishedAt?: string;
}

// Blog data example with SEO optimization
export const exampleBlogPost: EnhancedBlogProps = {
  title:
    "Los Beneficios de la Digitalización: Software a Medida para tu Empresa",
  slug: "beneficios-digitalizacion-software-medida",
  content: [
    {
      type: "intro",
      content:
        "En la era digital actual, las empresas que no se adaptan quedan relegadas. La digitalización no es solo una tendencia, es una necesidad empresarial que determina el éxito o fracaso de cualquier organización.",
    },
    {
      type: "problem",
      title: "Los Desafíos de los Sistemas Tradicionales",
      content:
        "Muchas empresas siguen operando con procesos manuales y sistemas obsoletos que limitan su crecimiento y productividad.",
    },
    {
      type: "solution",
      title: "Software a Medida: La Solución Integral",
      content:
        "El desarrollo de software personalizado ofrece una solución específica para cada empresa, adaptándose perfectamente a sus procesos y necesidades únicas.",
    },
    {
      type: "benefits",
      title: "Principales Beneficios del Software a Medida",
      items: [
        "Automatización de procesos repetitivos",
        "Integración completa con sistemas existentes",
        "Escalabilidad según el crecimiento empresarial",
        "Mayor seguridad y control de datos",
        "Reducción de costos operativos a largo plazo",
        "Ventaja competitiva diferenciadora",
        "Soporte técnico especializado",
      ],
    },
    {
      type: "testimonial",
      quote:
        "Desde que implementamos nuestro software a medida con Geome7ric, hemos reducido el tiempo de procesamiento en un 60% y eliminado errores manuales.",
      author: "María González, CEO de TechSolutions",
    },
    {
      type: "cta",
      title: "¿Listo para transformar tu empresa?",
      content:
        "Contáctanos para una consulta gratuita y descubre cómo podemos desarrollar la solución perfecta para tu negocio.",
      buttonText: "Solicitar Consulta Gratuita",
      buttonLink: "/contacto",
    },
    {
      type: "conclusion",
      title: "El Futuro es Digital",
      content:
        "La inversión en software a medida no es un gasto, es una inversión estratégica que posiciona a tu empresa para el éxito a largo plazo en un mercado cada vez más competitivo.",
    },
  ],
  seoTitle:
    "Digitalización Empresarial: 7 Beneficios del Software a Medida | Geome7ric",
  seoDescription:
    "Descubre cómo el software a medida puede transformar tu empresa. Análisis completo de beneficios, casos de éxito y guía de implementación.",
  focusKeyword: "software a medida",
  metaKeywords: [
    "digitalización empresarial",
    "software personalizado",
    "transformación digital",
    "desarrollo de software",
  ],

  category: "Desarrollo de Software",
  tags: [
    "Digitalización",
    "Software a Medida",
    "Transformación Digital",
    "Automatización",
  ],

  heroImage: {
    src: "/assets/blogs/beneficios-digitalizacion-software-medida/hero.webp",
    alt: "Empresario utilizando software a medida en tablet",
    caption: "La digitalización transforma la manera de hacer negocios",
  },
  heroVideo:
    "/assets/blogs/beneficios-digitalizacion-software-medida/hero_video.mp4", // Added heroVideo field

  publishedAt: "2024-12-15T10:00:00Z",
  lastModified: "2024-12-20T14:30:00Z",
  readingTimeMinutes: 8,
  sections: [], // Using content instead of sections

  related: [
    {
      slug: "como-elegir-empresa-desarrollo-software",
      title: "Cómo Elegir la Empresa de Desarrollo Correcta",
      reason: "Guía completa para seleccionar el partner tecnológico ideal",
    },
    {
      slug: "tendencias-desarrollo-software-2024",
      title: "Tendencias en Desarrollo de Software 2024",
      reason: "Mantente actualizado con las últimas tecnologías",
    },
  ],

  tableOfContents: true,
  priority: 0.8,
  changeFrequency: "weekly",
};
