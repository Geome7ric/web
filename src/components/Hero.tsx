"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { scrollToElement } from "../utils/utils";
import { trackEvent } from "../lib/firebase";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // First mark the component as mounted (client-side only)
    setIsMounted(true);
    setIsVisible(true);

    // Now that we're on the client, we can check for dark mode
    if (typeof window !== "undefined") {
      // Verify dark mode with media query
      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkMode(darkModeQuery.matches);

      // Update if mode changes
      const handleDarkModeChange = (e: MediaQueryListEvent) => {
        setIsDarkMode(e.matches);
      };

      darkModeQuery.addEventListener("change", handleDarkModeChange);
      return () =>
        darkModeQuery.removeEventListener("change", handleDarkModeChange);
    }
  }, []);

  const t = useTranslations("Hero");
  // Manejador para scroll suave con offset
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();

    // Registrar evento de clic en botones CTA
    if (id === "calendly") {
      trackEvent("calendly_button_click", {
        location: "hero_section",
        button_text: t("actions.contact"),
        device_type: window.innerWidth < 768 ? "mobile" : "desktop",
      });
    } else if (id === "howItWorks") {
      trackEvent("services_button_click", {
        location: "hero_section",
        button_text: t("actions.services"),
      });
    }

    scrollToElement(id);
  };

  // Solo mostrar la sombra de texto cuando el componente está montado en el cliente
  const textShadowStyle = isMounted
    ? {
        textShadow: isDarkMode
          ? "0 0 40px var(--accent-shadow)"
          : "0 0 40px var(--primary-shadow)",
      }
    : {};

  return (
    <section
      className="py-16 
       my-32 md:my-48 lg:my-28 xl:my-32 2xl:my-48
       gap-4
       relative flex flex-col items-center z-0
       justify-center text-center text-black dark:text-white px-6 w-full"
    >
      <h1
        className={`text-hero font-extrabold 
          leading-tight transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        {t("title.p1")}
        <br className="hidden md:block" />
        &nbsp;{t("title.p2")}{" "}
        <span
          className="dark:text-accent text-primary"
          style={isMounted ? textShadowStyle : {}}
        >
          {t("title.p3")}
        </span>
      </h1>

      <p
        className={`mt-4 w-full
          text-lg text-left
          text-black/80
        dark:text-white/80 max-w-2xl transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        {t("subtitle")}
      </p>

      <div
        className={`mt-8 w-full flex flex-col items-center  md:flex-row gap-4 justify-center 
          transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
      >
        <div className=" flex flex-center items-center">
          <a
            href="#calendly"
            onClick={(e) => handleSmoothScroll(e, "calendly")}
            className=""
          >
            <div
              className="px-6 py-3 
              border
              glassmorphism
              dark:bg-transparent dark:border-accent dark:text-accent dark:hover:bg-accent dark:hover:text-white
              bg-accent border-secondary text-secondary hover:bg-accent hover:border-accent hover:text-white
              font-semibold text-lg rounded-lg shadow-lg transition duration-300 relative"
            >
              {t("actions.contact")}
              <span className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-accent"></span>
              <span className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-accent animate-ping"></span>
            </div>
          </a>
        </div>

        <div className=" items-center">
          <a
            href="#howItWorks"
            onClick={(e) => handleSmoothScroll(e, "howItWorks")}
            className=""
          >
            <div
              className="px-6 py-3 border 
              glassmorphism
              shadow-lg
              dark:border-gray-400 dark:text-white/80 dark:hover:border-white dark:hover:text-white
              border-black/70 text-black/80 hover:border-black hover:text-black
              font-semibold text-lg rounded-lg transition duration-300"
            >
              {t("actions.services")}
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
