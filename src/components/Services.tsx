"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
// import Link from "next/link";

const Services = () => {
  const t = useTranslations("Services");

  const sections = [
    {
      key: "customApps",
      image: "/assets/services/app_perfect_fit.webp",
    },
    {
      key: "operationalTools",
      image: "/assets/services/bussiness_solutions.webp",
    },
    {
      key: "automation",
      image: "/assets/services/automatic_reports.webp",
    },
  ];

  return (
    <section
      id="services"
      className="relative flex flex-col items-center justify-center pt-36 lg:pt-40 text-black dark:text-white z-0"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Título e introducción */}
        <h2 className="text-subtitle text-center mb-4 text-black dark:text-white">
          {t("title")}
        </h2>
        <p className="max-w-5xl mx-auto text-lg md:text-base text-center text-black/80 dark:text-white/80 mb-16">
          {t("intro")}
        </p>{" "}
        {/* Secciones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 my-24">
          {sections.map(({ key, image }) => (
            <div
              key={key}
              className="bg-white/50
               dark:bg-black/20 
               rounded-2xl  shadow-md hover:shadow-lg 
               transition-all duration-300 flex flex-col"
            >
              <div className="row flex justify-around items-center  p-4">
                {/* <Image
                  src={image}
                  alt={t(`sections.${key}.title`)}
                  width={80}
                  height={80}
                  className="rounded-lg"
                /> */}

                <h3
                  className="text-xl md:text-lg 
                  text-left flex items-center
                  text-black dark:text-white"
                >
                  {t(`sections.${key}.title`).replace(/^\💻\s|\⚙️\s|\📊\s/, "")}
                </h3>
              </div>

              {/* un separador de color que ocupe todo el ancho */}
              <div
                className="h-1 bg-gradient-to-r
               dark:from-accent dark:via-accent/50 dark:to-accent/20
               from-accent/50 via-accent/20 to-accent/10
               
               w-full mb-2"
              ></div>

              <div className="mt-2 mb-4 px-4">
                <p className="font-bold dark:text-accent mb-1">
                  {t(`sections.${key}.what`)}
                </p>
                <p className="text-black/70 dark:text-white/70 leading-relaxed md:text-sm">
                  {t(`sections.${key}.whatText`)}
                </p>
              </div>

              <div className="px-4 pb-4">
                <p className="font-bold dark:text-accent mb-1">
                  {t(`sections.${key}.how`)}
                </p>
                <p className="text-black/70 dark:text-white/70 leading-relaxed md:text-sm">
                  {t(`sections.${key}.howText`)}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Por qué elegirnos */}
        {/* <div className="mt-24 text-center">
          <h3 className="text-subtitle  mb-6">{t("whyTitle")}</h3>

          <ul
            className="text-start space-y-4 
          max-w-2xl mx-auto text-gray-600
           dark:text-gray-300 leading-relaxed"
          >
            {t.raw("whyBullets").map((bullet: string, index: number) => (
              <li key={index}>• {bullet}</li>
            ))}
          </ul>
        </div> */}
        <div className="mt-24 text-center">
          {/* <Link
            className="px-6 
            py-3 border border-accent
               text-accent
               hover:bg-accent
                 hover:text-dark
                 font-semibold 
                 text-lg rounded-lg shadow-lg transition duration-300"
            href="/#contact"
          >
            {t("ctaButton")}
          </Link> */}
        </div>
      </div>
    </section>
  );
};

export default Services;
