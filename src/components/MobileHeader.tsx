"use client";

import {
  useState,
  useEffect,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { Menu, X } from "lucide-react";
import { scrollToElement } from "@/utils/utils";
import { useRouter, usePathname } from "@/i18n/routing";
import { HeaderProps } from "@/types/HeaderTypes";

const MobileHeader = ({ links, handlePitchClick }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSmoothScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setMenuOpen(false); // Close menu on any link click

    if (targetId.startsWith("/")) {
      // Full page link like /portfolio
      router.push(targetId);
    } else if (targetId.startsWith("#")) {
      // Section link like #services
      const sectionId = targetId.substring(1);
      if (pathname === "/") {
        // We are on the main page
        scrollToElement(sectionId);
      } else {
        // Navigate to the main page (conceptual /) and then scroll to the section
        router.push(`/#${sectionId}`);
      }
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const menu = document.getElementById("mobile-menu");
      const button = document.getElementById("menu-button");

      // If clicking on the menu or the button that toggles the menu, do nothing
      if (menu?.contains(target) || button?.contains(target)) return;

      // Otherwise, close the menu
      setMenuOpen(false);
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="">
      <button
        id="menu-button"
        aria-expanded={menuOpen}
        aria-haspopup="true"
        className="text-2xl focus:outline-none p-2 rounded-md
         text-black dark:text-white transition-all duration-300"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute right-0 mt-2 w-24 rounded-md shadow-lg py-1 
             ring-1 ring-black ring-opacity-5 z-50
             bg-white dark:bg-dark
             "
        >
          {links.map(
            (link: {
              href: string;
              label:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }) => (
              <button
                key={`${link.href}${link.label}`}
                className="block w-full text-left px-4 py-2 text-sm 
              text-dark dark:text-white 
             "
                onClick={(e) => {
                  setMenuOpen(false);
                  handleSmoothScroll(e, link.href);
                }}
              >
                {link.label}
              </button>
            )
          )}
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => {
              setMenuOpen(false);
              handlePitchClick();
            }}
          >
            Ver Pitch
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
