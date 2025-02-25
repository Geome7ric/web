"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const links = [
    // {
    //   href: "/portfolio",
    //   label: "Casos de éxito",
    //   className: "text-accent  hover:text-accent",
    // },
    // { href: "services", label: "Servicios" },
    { href: "contact", label: "Contacto" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [state, setState] = useState({
    isScrolled: false,
    mobileView: false,
    menuOpen: false,
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      mobileView: window.innerWidth < 768,
    }));

    const handleScroll = () => {
      if (window.scrollY > 50) {
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
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const menu = document.getElementById("menu");
      if (menu?.contains(target)) return;

      // si esta abierto cierro el menu
      setState((prevState) => ({ ...prevState, menuOpen: false }));
      if (state.menuOpen) {
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [state.menuOpen]);

  return (
    <header
      className={`sticky  w-full top-0 z-10 p-4 transition-colors duration-300 ${
        isScrolled ? "bg-white/1 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl">
          <Link href="/">
            <Image
              src="/assets/Geome7ric-Horizontal-Color2.svg"
              alt="Logo"
              width={164}
              height={32}
            />
          </Link>
        </h1>
        {state.mobileView ? (
          // menu desplegable
          <div>
            <Button
              id="menu"
              icon={state.menuOpen ? X : Menu}
              // icono de hamburguesa
              className="text-2xl focus:outline-none text-primary transition-all duration-1000"
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  menuOpen: !prevState.menuOpen,
                }))
              }
            >
              {state.menuOpen ? "" : ""}
            </Button>
            {state.menuOpen && (
              <nav
                className={`absolute top-16 
                  bg-dark right-1 backdrop-blur-md 
                  p-4 rounded-md shadow-lg`}
              >
                <ul className="flex flex-col space-y-4">
                  {links.map(({ href, label }) => (
                    <li
                      key={`${href}${label}`}
                      className={`hover:text-primary`}
                    >
                      <Button
                        className={` hover:text-primary`}
                        onClick={(e) => {
                          // quiero que funcione como un scroll si estoy en la home
                          e.preventDefault();

                          setState((prevState) => ({
                            ...prevState,
                            menuOpen: false,
                          }));

                          // si apreto casos de exito ir siempre
                          const hrefIsPortfolio = href === "/portfolio";
                          if (hrefIsPortfolio) {
                            window.location.href = href;
                            return;
                          }

                          const inHome = window.location.pathname === "/";

                          if (inHome) {
                            const section = document.getElementById(href);
                            section?.scrollIntoView({ behavior: "smooth" });
                            return;
                          }

                          // entonces quiero iur a home diciendole scroll hasta la section href
                          window.location.href = `/#${href}`;
                        }}
                      >
                        {label}
                      </Button>
                    </li>
                  ))}
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
                    className={`   hover:text-primary`}
                    onClick={(e) => {
                      // quiero que funcione como un scroll si estoy en la home
                      e.preventDefault();

                      // si apreto casos de exito ir siempre
                      const hrefIsPortfolio = href === "/portfolio";
                      if (hrefIsPortfolio) {
                        window.location.href = href;
                        return;
                      }

                      const inHome = window.location.pathname === "/";

                      if (inHome) {
                        const section = document.getElementById(href);
                        section?.scrollIntoView({ behavior: "smooth" });
                        return;
                      }

                      // entonces quiero iur a home diciendole scroll hasta la section href
                      window.location.href = `/#${href}`;
                    }}
                  >
                    {label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
