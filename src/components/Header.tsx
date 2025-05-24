"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useModal } from "@/app/hooks";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import { LinkType } from "@/types/HeaderTypes";

const Header = () => {
  const t = useTranslations();
  const { openModal } = useModal(); // Usamos el contexto del modal

  const pitchUrl =
    "https://www.canva.com/design/DAGkRFTMSxI/gLiKreZyhmJ-dW05UVXlkQ/view?utm_content=DAGkRFTMSxI&utm_campaign=designshare&utm_medium=embeds&utm_source=link";
  const links: LinkType[] = [
    {
      href: "/portfolio",
      label: "Casos de éxito",
      className: "text-accent  hover:text-accent",
    },
    { href: "/services", label: t("common.services") },
    // { href: "/blog", label: t("common.blog") },
    // { href: "/about-us", label: t("AboutUs.title") },
    { href: "/contact", label: t("common.contact") },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

    // Iniciar la observación del elemento HTML con la configuración establecida
    observer.observe(document.documentElement, { attributes: true });

    const handleScroll = () => {
      if (window.scrollY > 10) {
        // Disminuido a 10 para detectar scroll más temprano
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on initial render
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  const handlePitchClick = () => {
    if (isMobile) {
      // abrir en una nueva pestaña
      window.open(pitchUrl, "_blank");
    } else {
      // Simplemente abrimos el modal usando el contexto
      openModal();
    }
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 p-4 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-md bg-white/5 dark:bg-black/5 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center overflow-hidden">
        <h1 className="text-xl">
          <Link href="/">
            <Image
              src={
                isDarkMode
                  ? "/assets/Geome7ric-Horizontal-Color-White.svg"
                  : "/assets/Geome7ric-Horizontal-Color.svg"
              }
              alt="Logo"
              width={164}
              height={32}
            />
          </Link>
        </h1>

        {isMobile ? (
          <MobileHeader
            links={links}
            isDarkMode={isDarkMode}
            isScrolled={isScrolled}
            pitchUrl={pitchUrl}
            handlePitchClick={handlePitchClick}
          />
        ) : (
          <DesktopHeader
            links={links}
            isDarkMode={isDarkMode}
            isScrolled={isScrolled}
            pitchUrl={pitchUrl}
            handlePitchClick={handlePitchClick}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
