"use client";

import { HeaderProps } from "@/types/HeaderTypes";
import { scrollToElement } from "@/utils/utils";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const DesktopHeader = ({ links, handlePitchClick }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const handleSmoothScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();

    if (targetId.startsWith("/")) {
      router.push(targetId as string);
    } else if (targetId.startsWith("#")) {
      const sectionId = targetId.substring(1);

      if (pathname === "/") {
        scrollToElement(sectionId);
      } else {
        router.push(`/#${sectionId}`);
      }
    }
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
          {t("AboutUs.meetTeam")}
        </button>
      </ul>
    </nav>
  );
};

export default DesktopHeader;
