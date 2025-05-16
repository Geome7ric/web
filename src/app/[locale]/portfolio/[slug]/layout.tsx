import { getProject } from "@/app/data";
import { Metadata } from "next";

// Route segment config
export const runtime = "edge";

// Función para generar metadatos dinámicos
export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  // Obtener datos del proyecto
  const project = getProject({ id: params.slug });

  // Si no hay proyecto, metadatos por defecto
  if (!project) {
    return {
      title: "Proyecto no encontrado | Geome7ric",
      description:
        "Explora nuestro portafolio de proyectos y descubre las soluciones digitales que Geome7ric puede ofrecer para tu negocio.",
    };
  }

  // Metadatos generados dinámicamente basados en el proyecto
  return {
    title: `${project.title} | Portafolio de Geome7ric`,
    description: project.description,
    keywords: [
      "desarrollo web",
      "desarrollo de aplicaciones",
      "diseño de software",
      "geome7ric",
      project.title,
    ],
    openGraph: {
      title: `${project.title} | Portafolio de Geome7ric`,
      description: project.description,
      url: `https://geome7ric.com/portfolio/${params.slug}`,
      siteName: "Geome7ric",
      locale: params.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Portafolio de Geome7ric`,
      description: project.description,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
