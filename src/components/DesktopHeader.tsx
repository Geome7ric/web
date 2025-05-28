"use client";

import { HeaderProps } from "@/types/HeaderTypes";
import { Link } from "@/i18n/routing";

const DesktopHeader = ({ links, handlePitchClick }: HeaderProps) => {
  return (
    <nav>
      {" "}
      <ul className="flex space-x-6 items-center">
        {links.map((link: { href: string; label: string }) => (
          <li key={`${link.href}${link.label}`}>
            <Link
              href={link.href}
              className="text-black dark:text-white
              hover:text-primary
              dark:hover:text-accent transition-colors duration-300"
            >
              {link.label}
            </Link>
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
