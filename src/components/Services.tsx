"use client";

const Services = () => {
  const services = [
    {
      title: "Soluciones personalizadas",
      description:
        "Soluciones a medida que se adapten a las necesidades únicas de tu negocio. Diseñamos y desarrollamos productos específicos para ti.",
      icon: "🛠️",
      link: "/services/soluciones-personalizadas",
      keyword: "Soluciones a medida",
    },
    {
      title: "Productos reconstruidos",
      description:
        "Descubre nuestra amplia gama de soluciones listas para usar, diseñadas para impulsar el rendimiento y la eficiencia de tu negocio.",
      icon: "🚀",
      link: "/services/productos-preconstruidos",
      keyword: "soluciones listas",
    },
    {
      title: "Consultoría y estrategia",
      description:
        "Transforma tus ideas en realidad con nuestra orientación experta. Te ayudamos a planificar, estrategizar y ejecutar tu visión.",
      icon: "💡",
      link: "/services/consultoria",
      keyword: "orientación experta",
    },
    {
      title: "Intervenciones de sistemas",
      description:
        "Optimiza tus sistemas actuales para mejorar la eficiencia y reducir costos. Identificamos e implementamos mejoras clave.",
      icon: "📈",
      link: "/services/intervenciones-de-sistemas",
      keyword: "mejoras clave",
    },
  ];

  return (
    <section
      id="services"
      className="relative flex flex-col text-white
      items-center justify-center pt-48 lg:pt-38"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-title font-bold text-center mb-12">
          Nuestros <span className="text-primary">servicios</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-8">
              <div className="text-2xl mb-2 text-primary flex justify-center"></div>
              <h3 className="text-2xl font-bold mb-4 text-center">
                {service.icon}
                {service.title}
              </h3>
              <p className="text-gray-300 mb-6 text-center">
                {service.description.split(service.keyword).map((part, i) => (
                  <span key={i}>
                    {part}
                    {i === 0 && (
                      <span className="text-primary font-semibold hover:text-accent transition-transform duration-300 inline-block">
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
