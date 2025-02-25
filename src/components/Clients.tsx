"use client"; // Asegúrate de marcar este componente como un Client Component

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const Clients = () => {
  // Datos de ejemplo de clientes y reseñas
  const reviews = [
    {
      id: 1,
      name: "Juan Pérez",
      role: "CEO, Empresa XYZ",
      review:
        "¡Increíble trabajo! El equipo superó nuestras expectativas. Altamente recomendado.",
      avatar: "https://i.pravatar.cc/121", // URL de la imagen del cliente
    },
    {
      id: 2,
      name: "María Gómez",
      role: "Directora de Marketing, ABC Corp",
      review:
        "Profesionales y comprometidos. Lograron resultados excepcionales en tiempo récord.",
      avatar: "https://i.pravatar.cc/231",
    },
    {
      id: 3,
      name: "Carlos Ruiz",
      role: "Fundador, Startup 123",
      review:
        "Gracias a su trabajo, nuestra plataforma ha crecido un 200%. ¡Gracias!",
      avatar: "https://i.pravatar.cc/341",
    },
    {
      id: 4,
      name: "Ana López",
      role: "Gerente de Producto, Empresa ZYX",
      review:
        "El equipo de Geome7ric es altamente competente y entregó resultados de calidad.",
      avatar: "https://i.pravatar.cc/451",
    },
    {
      id: 5,
      name: "Pedro Sánchez",
      role: "CTO, Empresa 456",
      review:
        "¡Excelente servicio! Nos ayudaron a superar un desafío técnico complejo.",
      avatar: "https://i.pravatar.cc/561",
    },
  ];

  return (
    <div className=" w-full mt-32 sm:mt-48">
      <h2 className="text-title text-center mb-16 mx-8">
        Clientes que
        <br className="hidden md:block" />
        &nbsp;<span className="text-primary">confían en nosotros</span>{" "}
      </h2>
      <div
        className="w-full flex flex-center
       items-center justify-center py-16 "
      >
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1} // Muestra 1 slides a la vez
          autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay cada 3 segundos
          loop={true} // Carrusel infinito
          className="w-full"
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {reviews.map((client) => (
            <SwiperSlide key={client.id}>
              <div
                className=" p-8 
                w-full max-w-sm mx-auto
                rounded-lg  text-center"
              >
                <Image
                  src={client.avatar}
                  width={150}
                  height={150}
                  alt={client.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-white">
                  {client.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{client.role}</p>
                <p className="text-gray-600 italic">
                  &quot;{client.review}&quot;
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Clients;
