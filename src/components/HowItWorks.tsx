"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { scrollToElement } from "../utils/utils";
import { useTranslations } from "next-intl";

const HowItWorks = () => {
  const t = useTranslations("HowItWorks");
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  const STEPS = useMemo(
    () => [
      {
        id: "01",
        title: t("steps.step1.title"),
        shortDescription: t("steps.step1.shortDescription"),
        fullDescription: t("steps.step1.fullDescription"),
      },
      {
        id: "02",
        title: t("steps.step2.title"),
        shortDescription: t("steps.step2.shortDescription"),
        fullDescription: t("steps.step2.fullDescription"),
      },
      {
        id: "03",
        title: t("steps.step3.title"),
        shortDescription: t("steps.step3.shortDescription"),
        fullDescription: t("steps.step3.fullDescription"),
      },
      {
        id: "04",
        title: t("steps.step4.title"),
        shortDescription: t("steps.step4.shortDescription"),
        fullDescription: t("steps.step4.fullDescription"),
      },
      {
        id: "05",
        title: t("steps.step5.title"),
        shortDescription: t("steps.step5.shortDescription"),
        fullDescription: t("steps.step5.fullDescription"),
      },
      {
        id: "06",
        title: t("steps.step6.title"),
        shortDescription: t("steps.step6.shortDescription"),
        fullDescription: t("steps.step6.fullDescription"),
      },
    ],
    [t]
  );

  // Efecto para controlar la animación inicial
  useEffect(() => {
    setIsVisible(true);

    // Animación escalonada de los pasos
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(
              entry.target.getAttribute("data-step-index") || "0"
            );
            setVisibleSteps((prev) => [...prev, stepIndex]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const stepElements = document.querySelectorAll(".step-item");
    stepElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      stepElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  // Manejador para scroll suave con offset
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    scrollToElement(id);
  };

  return (
    <section
      id="howItWorks"
      className="py-16 md:py-20 text-black dark:text-white flex flex-col items-center z-0 
      mt-28 lg:mt-24"
    >
      <div className="container px-4 md:px-8 max-w-6xl mx-auto">
        <h2
          className={`text-4xl md:text-4xl font-bold mb-8 md:mb-10 text-center text-black dark:text-white
          transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {t("title")}
        </h2>{" "}
        <p
          className={`text-lg md:text-base text-center mb-4 max-w-3xl mx-auto text-black/80 dark:text-white/80
          transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {t("subtitle1")}
        </p>
        <p
          className={`text-lg md:text-base text-center mb-10 md:mb-14 max-w-3xl mx-auto text-black/80 dark:text-white/80
          transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {t("subtitle2")}
        </p>
        <div className="md:max-w-4xl md:mx-auto relative">
          {/* Mapeo de los pasos con animaciones */}
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`step-item mb-10 md:mb-14 relative
              transition-all duration-700 ${
                visibleSteps.includes(index)
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
              data-step-index={index}
            >
              {/* Línea vertical que conecta cada elemento hasta antes del paso 06 */}
              {index < STEPS.length - 1 && step.id !== "05" && (
                <div
                  className={`absolute left-[34px] top-[70px] h-full w-[2px] bg-accent opacity-50 z-0
                transition-all duration-1000 origin-top ${
                  visibleSteps.includes(index) ? "scale-y-100" : "scale-y-0"
                }`}
                ></div>
              )}
              <div className="flex items-start">
                {step.id === "06" && (
                  <div className="col-auto flex-shrink-0 flex items-center justify-center">
                    <Image
                      src="/assets/cycle.png"
                      alt={t("cycleProcessAlt")}
                      width={70}
                      height={70}
                      className={`hover:rotate-180 transition-all duration-1000 cursor-pointer`}
                    />
                  </div>
                )}
                {step.id !== "06" && (
                  <div
                    className={`col-auto flex-shrink-0 w-[70px] h-[70px] bg-accent text-black dark:text-black 
                      hover:bg-primary hover:text-dark
                    rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg hover:bg-transparent hover:text-accent
                    transition-all duration-300 cursor-pointer group z-10 relative ${
                      visibleSteps.includes(index) ? "animate-fadeIn" : ""
                    }`}
                  >
                    <span className="text-2xl font-bold group-hover:drop-shadow-[0_0_8px_var(--tw-shadow-color)] group-hover:shadow-accent transition-all duration-300">
                      {step.id}
                    </span>
                  </div>
                )}

                <div className="ml-6 md:ml-8">
                  <h3
                    className={`text-xl md:text-2xl font-bold mb-2 text-black dark:text-white
                    transition-all duration-500 ${
                      visibleSteps.includes(index) ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${300 + index * 150}ms` }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-base md:text-lg max-w-2xl md:hidden text-black/80 dark:text-white/80
                    transition-all duration-500 ${
                      visibleSteps.includes(index) ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${400 + index * 150}ms` }}
                  >
                    {step.shortDescription}
                  </p>
                  <p
                    className={`text-base md:text-lg max-w-2xl hidden md:block text-black/80 dark:text-white/80
                    transition-all duration-500 ${
                      visibleSteps.includes(index) ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${400 + index * 150}ms` }}
                  >
                    {step.fullDescription}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`flex justify-center mt-12 md:mt-16
          transition-all duration-1000 delay-[1200ms] ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-5 scale-90"
          }`}
        >
          <a
            href="#calendly"
            onClick={(e) => handleSmoothScroll(e, "calendly")}
            className="px-6 py-3 
              border
              bg-transparent
               dark:border-accent dark:text-accent dark:hover:bg-accent dark:hover:text-white
               border-black text-black hover:bg-accent hover:border-accent hover:text-white
              font-semibold text-lg rounded-lg shadow-lg transition duration-300 hover:scale-105"
          >
            {t("ctaButton")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
