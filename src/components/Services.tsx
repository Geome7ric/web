"use client";

import { useTranslations } from "next-intl";

const Services = () => {
  const t = useTranslations("Services");

  const services = [
    {
      title: t("items.i1.title"),
      description: t("items.i1.description"),
      icon: "🛠️",
      link: "/services/soluciones-personalizadas",
      keyword: t("items.i1.keyword"),
    },
    {
      title: t("items.i2.title"),
      description: t("items.i2.description"),
      icon: "🚀",
      link: "/services/productos-preconstruidos",
      keyword: t("items.i2.keyword"),
    },
    {
      title: t("items.i3.title"),
      description: t("items.i3.description"),
      icon: "💡",
      link: "/services/consultoria",
      keyword: t("items.i3.keyword"),
    },
    {
      title: t("items.i4.title"),
      description: t("items.i4.description"),
      icon: "📈",
      link: "/services/intervenciones-de-sistemas",
      keyword: t("items.i4.keyword"),
    },
  ];

  return (
    <section
      id="services"
      className="relative flex flex-col text-secondary dark:text-white
      items-center justify-center pt-48 lg:pt-38"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-title font-bold text-center mb-12">
          {t("title.p1")} <span className="text-primary">{t("title.p2")}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-8">
              <div className="text-2xl mb-2 text-primary flex justify-center"></div>
              <h3 className="text-2xl font-bold mb-4 text-center">
                {service.icon}
                {service.title}
              </h3>
              <p className="text-dark-300 dark:text-gray-300 mb-6 text-center">
                {service.description.split(service.keyword).map((part, i) => (
                  <span key={i}>
                    {part}
                    {i === 0 && (
                      <span className="dark:text-primary font-semibold hover:text-dark dark:hover:text-accent transition-transform duration-300 inline-block">
                        {service.keyword}
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
