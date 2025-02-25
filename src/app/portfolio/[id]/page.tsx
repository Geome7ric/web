"use client";

import { getProject } from "@/app/data";
import Image from "next/image";
import Link from "next/link";
// import arrow back from lucide-react
import { ArrowLeft } from "lucide-react";
import Contact from "@/components/Contact";
import { useParams } from "next/navigation";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function Project() {
  // get id from route params
  let { id } = useParams();

  if (!id) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Proyecto no encontrado
      </div>
    );
  }

  id = id.toString();

  const project = getProject({ id });

  if (!project) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Proyecto no encontrado
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1">
            <div className="flex flex-col justify-center h-full">
              <h1 className="text-4xl font-bold text-white">
                {project.client}
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                {project.description}
              </p>
            </div>
          </div>
          <div className="col-span-1">
            <Image
              src={project.hero}
              alt={project.title}
              width={400}
              height={200}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* linea divisoria como el footer */}
        <div className="border-t border-gray-600/25 mt-8 pt-6 text-center text-gray-500 text-sm"></div>

        <h2 className="font-semibold text-subtitle mt-6">El reto</h2>

        <div
          className="
          mt-4
        text-gray-400
        "
          dangerouslySetInnerHTML={{ __html: project.challenge! }}
        ></div>

        <h2 className="font-semibold text-subtitle mt-6">La solución</h2>

        <div
          className="
          mt-4
        text-gray-400
        "
          dangerouslySetInnerHTML={{ __html: project.solution! }}
        ></div>

        <h2 className="font-semibold text-subtitle mt-6">El resultado</h2>

        <div
          className="
          mt-4
        text-gray-400
          "
          dangerouslySetInnerHTML={{ __html: project.result! }}
        ></div>

        {/* seccion testimonaials
        
            testimonials: [
          {
            name: "Javier Amusquibar",
            position: "Owner",
            photo: "https://i.pravatar.cc/121",
            review:
              "Ahora tenemos un sistema que nos permite gestionar los pedidos de manera más eficiente y rápida. ¡Gracias!",
          },
        ]*/}

        <h2 className="font-semibold text-subtitle mt-6">Testimonios</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {project.testimonials!.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col gap-4 p-4 
              rounded-lg "
            >
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.photo}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-accent">{testimonial.name}</h3>
                  <p className="text-gray-400">{testimonial.position}</p>
                </div>
              </div>
              <p className="text-gray-400 italic">
                &quot;{testimonial.review}&quot;
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h2 className="font-semibold text-subtitle mt-6">Tecnologías</h2>

          <div className="flex flex-wrap gap-4 mt-4  ">
            {Object.entries(project.stack!).map(([type, techs]) => (
              <div
                key={type}
                className="flex flex-col gap-2 border border-solid
                p-2 rounded-lg border-accent/50"
              >
                <h3
                  className="text-sm text-accent w-auto
                  capitalize p-2
                "
                >
                  {type}
                </h3>

                {/* separador */}
                <div className="border-t border-gray-600/25"></div>

                <div className="flex flex-wrap gap-2 b">
                  {techs.map(
                    (tech: {
                      name: string;
                      link: string;
                      icon: StaticImport;
                    }) => (
                      <Link
                        href={tech.link}
                        target="_blank"
                        key={tech.name}
                        className="text-gray-400 hover:text-accent"
                      >
                        <div className="flex items-center gap-2 p-4">
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            width={24}
                            height={24}
                            className={`rounded-lg`}
                          />
                          <span className="">{tech.name}</span>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-4 text-gray-400"
            dangerouslySetInnerHTML={{ __html: project.stack_explanation! }}
          ></div>
        </div>

        <Contact
          subject={`${project.title}`}
          message={`Hola, me gustaría saber más sobre el proyecto ${project.title}`}
        />

        <div
          className="mt-8
          transition duration-300
          hover:-translate-x-2
          max-w-48
        "
        >
          <Link href="/portfolio" className="">
            <div className="flex flex-row items-left">
              <div className="flex items-center">
                <ArrowLeft
                  className="w-5 h-5 text-accent
                "
                />
              </div>
              <span
                className="inline-block
               py-2 px-4 
                rounded-lg text-md 
                font-semibold transition
                duration-300
                text-accent
                cursor-pointer"
              >
                Volver al portafolio
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
