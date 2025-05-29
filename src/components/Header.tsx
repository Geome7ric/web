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
  const { openModal } = useModal(); // Use modal context

  const pitchUrl =
    "https://www.canva.com/design/DAGkRFTMSxI/gLiKreZyhmJ-dW05UVXlkQ/view?utm_content=DAGkRFTMSxI&utm_campaign=designshare&utm_medium=embeds&utm_source=link";
  const links: LinkType[] = [
    {
      href: "#services",
      label: t("common.services"),
    },
    {
      href: "#about-us",
      label: t("AboutUs.title"),
    },
    {
      href: "#howItWorks",
      label: t("common.howItWorks"),
    },
    {
      href: "#contact",
      label: t("common.contact"),
    },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    // Check initial dark mode
    const checkDarkMode = () => {
      if (document.documentElement.classList.contains("dark")) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    };

    checkDarkMode();

    // Create mutation observer to detect changes in 'dark' class
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

    // Start observing the HTML element with the established configuration
    observer.observe(document.documentElement, { attributes: true });

    const handleScroll = () => {
      if (window.scrollY > 10) {
        // Decreased to 10 to detect scroll earlier
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
      // Open in new tab
      window.open(pitchUrl, "_blank");
    } else {
      // Simply open modal using context
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
