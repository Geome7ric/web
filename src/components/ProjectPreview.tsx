import { Link } from "@/i18n/routing";
import Image from "next/image";

// Define the project type
type Project = {
  id: string;
  slug?: string;
  title: string;
  client: string;
  description: string;
  hero: string;
};

type ProjectPreviewProps = {
  project: Project;
};

export default function ProjectPreview({ project }: ProjectPreviewProps) {
  return (
    <Link href={`portfolio/${project.slug || project.id}`} key={project.id}>
      {" "}
      <div
        className="
        hover:transform hover:scale-105
        duration-300
        hover:shadow-primary/50
        border-primary/25
        dark:hover:shadow-accent/25 
        dark:border-accent
        hover:shadow-lg
        hover:border-opacity-50
        shadow-lg border  border-opacity-25
        rounded-lg overflow-hidden 
        transition p-6
        
        text-dark
         min-h-[280px]"
      >
        {" "}
        <div className="relative h-24 w-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-3/5 h-4/5 bg-dark/20 rounded-xl blur-lg"></div>
          </div>{" "}
          <Image
            src={project.hero!}
            alt={project.title}
            fill
            style={{
              objectFit: "contain",
            }}
            className="rounded-lg z-10"
          />
        </div>
        <div className="w-full  pt-4">
          {/* agregar un separador */}
          <div className="h-0.5 w-full bg-dark/30 dark:bg-white/30 mb-2"></div>{" "}
          <p className="dark:text-gray-400 mb-4 ">{project.description}</p>
        </div>
      </div>
    </Link>
  );
}
