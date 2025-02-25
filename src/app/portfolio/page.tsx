import Link from "next/link";
import Image from "next/image";
import { projects } from "../data";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen py-12 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-title font-bold mb-4">Casos de éxito</h1>
        <p className="text-subtitle text-gray-600 mb-12">
          Soluciones digitales personalizadas para empresas.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
        {projects.map((project) => (
          <Link href={`/portfolio/${project.id}`} key={project.id}>
            <div
              className="text-white 
              hover:transform hover:scale-105
              duration-300
              hover:shadow-accent/25 hover:shadow-lg
              hover:border-opacity-50
              shadow-lg border border-accent border-opacity-25
              rounded-lg overflow-hidden 
              transition flex flex-col  p-6"
            >
              <div className="">
                <Image
                  src={project.hero!}
                  alt={project.title}
                  width={100}
                  height={200}
                  className=""
                />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                {project.client}
              </h2>
              <p
                className="text-gray-500 mb-4
              max-w-sm
              "
              >
                {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
