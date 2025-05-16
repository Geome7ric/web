"use client";

import { getProject } from "@/app/data";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Contact from "@/components/Contact";
import { useParams } from "next/navigation";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

interface ImageWithCaption {
  url: string;
  caption: string;
}

function ImageCarousel({
  images,
  title,
}: {
  images: ImageWithCaption[];
  title: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="relative w-full pt-[56.25%]">
        {/* Direct carousel container */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl"
          ref={emblaRef}
        >
          <div className="flex h-full">
            {images.map((image, index) => (
              <div
                className="flex-[0_0_100%] min-w-0 h-full relative"
                key={index}
              >
                <Image
                  src={image.url}
                  alt={`${title} screenshot ${index + 1}`}
                  fill
                  className="object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-center">
                  <p className="text-sm md:text-base">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 sm:p-3 rounded-full text-white hover:bg-black/70 z-30"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 sm:p-3 rounded-full text-white hover:bg-black/70 z-30"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

export default function Project() {
  let { slug } = useParams();

  if (!slug) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Proyecto no encontrado
      </div>
    );
  }

  slug = slug.toString();
  const project = getProject({ id: slug });

  if (!project) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Proyecto no encontrado
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 xl:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 ">
          <div className="col-span-1">
            <Image
              src={project.hero}
              alt={project.title}
              width={400}
              height={200}
              className="rounded-lg"
            />
          </div>
          <div className="col-span-1">
            <div className="flex flex-col justify-center h-full">
              <p className="text-lg text-gray-600 mt-2">
                {project.description}
              </p>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="px-8">
          <div className="border-t border-gray-600/25 mt-8 pt-6 text-center text-gray-500 text-sm  "></div>
          <h2 className="font-semibold text-subtitle mt-6">El reto</h2>
          <div
            className="mt-4 text-gray-400"
            dangerouslySetInnerHTML={{ __html: project.challenge! }}
          ></div>

          <h2 className="font-semibold text-subtitle mt-6">La solución</h2>
          <div
            className="mt-4 text-gray-400"
            dangerouslySetInnerHTML={{ __html: project.solution! }}
          ></div>

          <h2 className="font-semibold text-subtitle mt-6">El resultado</h2>
          <div
            className="mt-4 text-gray-400"
            dangerouslySetInnerHTML={{ __html: project.result! }}
          ></div>
        </div>

        {/* Carrusel de imágenes */}
        {project.images && project.images.length > 0 && (
          <div className="mt-12 w-full">
            <div className="w-full flex justify-center">
              <ImageCarousel images={project.images} title={project.title} />
            </div>
          </div>
        )}

        {/* Testimonios */}
        <div className="px-8">
          <h2 className="font-semibold text-subtitle mt-6">Testimonios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {project.testimonials!.map((testimonial) => (
              <div
                key={testimonial.name}
                className="flex flex-col gap-4 p-4 rounded-lg"
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
                    {"url" in testimonial && testimonial.url && (
                      <Link
                        href={testimonial.url}
                        target="_blank"
                        className="text-gray-400 hover:text-accent"
                      >
                        <span>{testimonial.urlName}</span>
                      </Link>
                    )}
                  </div>
                </div>
                <p className="text-gray-400 italic">
                  &quot;{testimonial.review}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tecnologías */}
        <div className="mt-6 px-8">
          <h2 className="font-semibold text-subtitle mt-6">Tecnologías</h2>

          <div className="flex flex-wrap gap-4 mt-4">
            {Object.entries(project.stack!).map(([type, techs]) => (
              <div
                key={type}
                className="flex flex-col gap-2 border border-solid p-2 rounded-lg border-accent/50"
              >
                <h3 className="text-sm text-accent capitalize p-2">{type}</h3>
                <div className="border-t border-gray-600/25"></div>
                <div className="flex flex-wrap gap-2">
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
                            className="rounded-lg"
                          />
                          <span>{tech.name}</span>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-4 text-gray-400 "
            dangerouslySetInnerHTML={{
              __html: project.stack_explanation!,
            }}
          ></div>
        </div>

        {/* Contacto */}
        <div className="mt-2 px-4">
          <Contact
            subject={`${project.title}`}
            message={`Hola, me gustaría saber más sobre el proyecto ${project.title}`}
          />
        </div>

        {/* Volver */}
        <div className="mt-8 transition duration-300 hover:-translate-x-2 px-8">
          <Link href="/portfolio">
            <div className="flex flex-row items-left">
              <ArrowLeft className="absolute w-5 h-5 text-accent mt-3" />
              <span className="ml-4 inline-block py-2 px-4 rounded-lg text-md font-semibold text-accent cursor-pointer">
                Volver al portafolio
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
