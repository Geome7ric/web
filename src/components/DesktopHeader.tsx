"use client";

import Button from "./Button";
import { HeaderProps } from "@/types/HeaderTypes";
import { scrollToElement } from "@/utils/utils";

const DesktopHeader = ({ links, handlePitchClick }: HeaderProps) => {
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
    <nav>
      {" "}
      <ul className="flex space-x-6">
        {links.map((link: { href: string; label: string }) => (
          <li key={`${link.href}${link.label}`}>
            <Button
              className="text-black dark:text-white hover:text-accent transition-colors duration-300"
              onClick={(e) => handleSmoothScroll(e, link.href)}
            >
              {link.label}
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
  );
};

export default DesktopHeader;
