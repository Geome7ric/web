import { projects } from "@/app/data";
import ProjectPreview from "@/components/ProjectPreview";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen py-24 px-6 text-white relative z-0 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <h1 className="dark:text-white text-dark text-4xl font-bold mb-4">
          Casos de éxito
        </h1>
        <p className="text-subtitle text-gray-600 mb-12">
          Soluciones digitales personalizadas para empresas.
        </p>
      </div>{" "}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto relative z-10">
        {projects.map((project) => (
          <ProjectPreview key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
