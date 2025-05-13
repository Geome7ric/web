"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./Button";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useModal } from "@/app/hooks";
import { scrollToElement } from "@/utils/utils";

const Header = () => {
  const t = useTranslations();
  const { openModal } = useModal(); // Usamos el contexto del modal

  const pitchUrl =
    "https://www.canva.com/design/DAGkRFTMSxI/gLiKreZyhmJ-dW05UVXlkQ/view?utm_content=DAGkRFTMSxI&utm_campaign=designshare&utm_medium=embeds&utm_source=link";

  const links = [
    // {
    //   href: "/portfolio",
    //   label: "Casos de éxito",
    //   className: "text-accent  hover:text-accent",
    // },
    { href: "services", label: t("common.services") },
    { href: "contact", label: t("common.contact") },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [state, setState] = useState({
    isScrolled: false,
    mobileView: false,
    menuOpen: false,
  });
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

    setState((prevState) => ({
      ...prevState,
      mobileView: window.innerWidth < 768,
    }));

    const handleScroll = () => {
      if (window.scrollY > 10) {
        // Disminuido a 10 para detectar scroll más temprano
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setState((prevState) => ({ ...prevState, mobileView: true }));
      } else {
        setState((prevState) => ({ ...prevState, mobileView: false }));
      }
      setIsMobile(window.innerWidth <= 768);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const menu = document.getElementById("menu-container");
      if (menu?.contains(target)) return;

      // si esta abierto cierro el menu
      setState((prevState) => ({ ...prevState, menuOpen: false }));
    };

    handleResize(); // Check on initial render
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClickOutside);
      observer.disconnect();
    };
  }, [state.menuOpen]);

  const handlePitchClick = () => {
    if (isMobile) {
      // abrir en una nueva pestaña
      window.open(pitchUrl, "_blank");
    } else {
      // Simplemente abrimos el modal usando el contexto
      openModal();
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();

    // si apreto casos de exito ir siempre
    const hrefIsPortfolio = targetId === "/portfolio";
    if (hrefIsPortfolio) {
      window.location.href = targetId;
      return;
    }

    let pathname = window.location.pathname;
    // quitamos locale
    const locale = pathname.split("/")[1];
    pathname = pathname.substring(locale.length + 1);

    const inHome = pathname === "";

    if (inHome) {
      // Usar nuestra nueva función de scroll con offset
      scrollToElement(targetId);
      return;
    }

    // entonces quiero ir a home diciéndole scroll hasta la section href
    window.location.href = `/#${targetId}`;
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

        {state.mobileView ? (
          <div id="menu-container" className="flex items-center space-x-2">
            <button
              id="menu"
              className="text-2xl focus:outline-none
              animation-fadeIn
              animation-spin
              animation-fadeOut
               text-black dark:text-white transition-all duration-300"
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  menuOpen: !prevState.menuOpen,
                }))
              }
            >
              {state.menuOpen ? (
                <X
                  className="text-black dark:text-white
                  transition-all duration-1000"
                />
              ) : (
                <Menu className="text-black dark:text-white transition-all duration-300 " />
              )}
            </button>

            {state.menuOpen && (
              <nav
                className={`absolute top-16 
                  backdrop-blur-md 
                  bg-glassmorphism
                  right-1 p-4 rounded-md shadow-lg`}
              >
                <ul className="flex flex-col space-y-4">
                  {links.map(({ href, label }) => (
                    <li
                      key={`${href}${label}`}
                      className="text-black dark:text-white hover:text-accent"
                    >
                      <button
                        className="text-black dark:text-white hover:text-accent transition-colors duration-300"
                        onClick={(e) => {
                          setState((prevState) => ({
                            ...prevState,
                            menuOpen: false,
                          }));
                          handleSmoothScroll(e, href);
                        }}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                  <button
                    className="text-black dark:text-white hover:text-accent transition-colors duration-300"
                    onClick={handlePitchClick}
                  >
                    Ver Pitch
                  </button>
                </ul>
              </nav>
            )}
          </div>
        ) : (
          <nav>
            <ul className="flex space-x-6">
              {links.map(({ href, label }) => (
                <li key={`${href}${label}`}>
                  <Button
                    className="text-black dark:text-white hover:text-accent transition-colors duration-300"
                    onClick={(e) => handleSmoothScroll(e, href)}
                  >
                    {label}
                  </Button>
                </li>
              ))}

              <button
                onClick={handlePitchClick}
                className="ml-4 px-4 py-2 backdrop-blur-sm
                dark:hover:text-white
                dark:bg-accent
                 bg-accent/80 text-black dark:text-dark hover:bg-accent/90
                  hover:text-white  transition-colors duration-300 rounded-lg shadow-lg"
              >
                Conócenos
              </button>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
