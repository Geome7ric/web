"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const Footer = () => {
  const t = useTranslations("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Comprueba el modo oscuro inicial
    const checkDarkMode = () => {
      if (document.documentElement.classList.contains("dark")) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    };

    checkDarkMode();

    // Crea un observador de mutaciones para detectar cambios en la clase 'dark'
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "class" &&
          mutation.target === document.documentElement
        ) {
          checkDarkMode();
        }
      });
    });

    // Iniciar la observación del elemento HTML
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (section: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (section === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="row-start-3 text-black dark:text-white py-10 mx-16 bg-transparent z-10">
      <div className="container mx-auto md:px-12 lg:px-16">
        {/* Línea divisoria */}
        <div className="border-t border-black/20 dark:border-white/20 mt-8 pt-6 text-center text-black/60 dark:text-white/60 text-sm"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y Descripción */}
          <div>
            <Image
              src={
                isDarkMode
                  ? "/assets/Geome7ric-Horizontal-Color-White.svg"
                  : "/assets/Geome7ric-Horizontal-Color.svg"
              }
              alt="Geome7ric"
              width={164}
              height={30}
              className="mb-4"
            />
            <p className="mt-3 text-black/70 dark:text-white/70">
              {t("Footer.message")}
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-black dark:text-white">
              {t("common.links")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  onClick={scrollToSection("top")}
                  className="text-black/80 hover:text-accent dark:text-white/80 dark:hover:text-accent"
                >
                  {t("common.home")}
                </a>
              </li>{" "}
              <li>
                <a
                  href="#about-us"
                  onClick={scrollToSection("about-us")}
                  className="text-black/80 hover:text-accent dark:text-white/80 dark:hover:text-accent"
                >
                  {t("AboutUs.title")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={scrollToSection("contact")}
                  className="text-black/80 hover:text-accent dark:text-white/80 dark:hover:text-accent"
                >
                  {t("common.contact")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={scrollToSection("services")}
                  className="text-black/80 hover:text-accent dark:text-white/80 dark:hover:text-accent"
                >
                  {t("common.services")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-black dark:text-white">
              {t("common.contact")}
            </h3>
            <p className="text-black/70 dark:text-white/70">
              <Link
                href="mailto:geome7ric@gmail.com"
                target="_blank"
                className="text-black/80 hover:text-accent dark:text-white/80 dark:hover:text-accent transition-colors duration-300"
              >
                <span>
                  <span className="mr-2">📧</span>
                  geome7ric@gmail.com
                </span>
              </Link>
            </p>
            <p className="text-black/70 dark:text-white/70 mt-3">
              <Link
                href="https://wa.me/542916450794"
                className="text-black/80 hover:text-accent dark:text-white/80 dark:hover:text-accent transition-colors duration-300"
              >
                <span>
                  <span className="mr-2">📞</span>
                  +54 291 6450794
                </span>
              </Link>
            </p>
            <div className="flex space-x-4 mt-3">
              <Link
                href="https://www.linkedin.com/company/geome7ric"
                target="_blank"
                className="text-black/80 hover:text-accent dark:text-white/80 dark:hover:text-accent transition-colors duration-300"
              >
                🔗 LinkedIn
              </Link>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-black/20 dark:border-white/20 mt-8 pt-6 text-center text-black/60 dark:text-white/60 text-sm">
          © {new Date().getFullYear()} Geome7ric
        </div>
      </div>
    </footer>
  );
};

export default Footer;
