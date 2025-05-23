"use client";

import { HeaderProps } from "@/types/HeaderTypes";
import { scrollToElement } from "@/utils/utils";

const DesktopHeader = ({ links, handlePitchClick }: HeaderProps) => {
  const handleSmoothScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();

    // Determinar si es un enlace a una página o sección
    const isFullPageLink = targetId.startsWith("/");

    // Si es un enlace completo (como /blog, /portfolio, etc.)
    if (isFullPageLink) {
      // En caso de portfolio, mantener el comportamiento actual
      if (targetId === "/portfolio") {
        window.location.href = "es" + targetId;
        return;
      }

      // Para otros enlaces completos (/blog, /services, etc.)
      const locale = window.location.pathname.split("/")[1] || "es";
      window.location.href = `/${locale}${targetId}`;
      return;
    }

    // El código existente para secciones dentro de la página (servicios, contacto, etc.)
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
    <nav>
      {" "}
      <ul className="flex space-x-6 items-center">
        {links.map((link: { href: string; label: string }) => (
          <li key={`${link.href}${link.label}`}>
            <button
              className="text-black dark:text-white
              hover:text-primary
              dark:hover:text-accent transition-colors duration-300"
              onClick={(e) => handleSmoothScroll(e, link.href)}
            >
              {link.label}
            </button>
          </li>
        ))}

        <button
          onClick={handlePitchClick}
          className="px-4 py-2.5 backdrop-blur-sm
          dark:hover:text-white
          dark:bg-accent
           bg-accent/80 text-black dark:text-dark hover:bg-accent/90
            hover:text-white transition-colors duration-300 rounded-lg "
        >
          Conocenos
        </button>
      </ul>
    </nav>
  );
};

export default DesktopHeader;
