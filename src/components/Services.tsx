"use client";

import { useTranslations } from "next-intl";
// import Link from "next/link";

const Services = () => {
  const t = useTranslations("Services");

  const sections = [
    {
      key: "customApps",
    },
    {
      key: "operationalTools",
    },
    {
      key: "automation",
    },
  ];

  return (
    <section
      id="services"
      className="relative flex flex-col items-center justify-center pt-36 lg:pt-40 text-secondary dark:text-white z-0"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Título e introducción */}
        <h2 className="text-subtitle text-center mb-4">{t("title")}</h2>
        <p className="max-w-5xl mx-auto text-lg md:text-base text-center text-dark-300 dark:text-gray-300 mb-16">
          {t("intro")}
        </p>

        {/* Secciones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 my-24">
          {sections.map(({ key }) => (
            <div
              key={key}
              className=" dark:bg-dark-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <h3 className="text-xl md:text-lg mb-4 text-center">
                {t(`sections.${key}.title`)}
              </h3>

              <div className="mt-2 mb-4">
                <p className=" font-bold text-primary mb-1">
                  {t(`sections.${key}.what`)}
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed md:text-sm">
                  {t(`sections.${key}.whatText`)}
                </p>
              </div>

              <div>
                <p className=" font-bold text-primary mb-1">
                  {t(`sections.${key}.how`)}
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed md:text-sm">
                  {t(`sections.${key}.howText`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Por qué elegirnos */}
        <div className="mt-24 text-center">
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
        </div>

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
