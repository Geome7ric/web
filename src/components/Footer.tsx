"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("");
  const scrollToSection = (section: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (section === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="row-start-3 text-white py-10 mx-16">
      <div className="container mx-auto  md:px-12 lg:px-16 ">
        {/* Línea divisoria */}
        <div className="border-t border-gray-600/25 mt-8 pt-6 text-center text-gray-500 text-sm"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y Descripción */}
          <div>
            <Image
              src="/assets/Geome7ric-Horizontal-Color-White.svg"
              alt="Geome7ric"
              width={164}
              height={30}
              className="mb-4"
            ></Image>
            <p className="mt-3 text-secondary dark:text-gray-400">
              {t("Footer.message")}
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-lg font-medium mb-3">{t("common.links")}</h3>
            <ul className="space-y-2">
              <li>
                <Button
                  className="text-secondary hover:text-secondary dark:text-white dark:hover:text-primary"
                  onClick={scrollToSection("top")}
                >
                  {t("common.home")}
                </Button>
              </li>
              <li>
                <Button
                  className="text-secondary hover:text-secondary dark:text-white dark:hover:text-primary"
                  onClick={scrollToSection("contact")}
                >
                  {t("common.contact")}
                </Button>
              </li>
              <li>
                <Button
                  className="text-secondary hover:text-secondary dark:text-white dark:hover:text-primary"
                  onClick={scrollToSection("services")}
                >
                  {t("common.services")}
                </Button>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-secondary dark:text-white">
              {t("common.contact")}
            </h3>
            <p className=" text-secondary dark:text-gray-400">
              <Link
                href="mailto:geome7ric@gmail.com"
                target="_blank"
                className="text-secondary dark:text-gray-400 dark:hover:text-primary"
              >
                <span>
                  <span className="mr-2">📧</span>
                  geome7ric@gmail.com
                </span>
              </Link>
            </p>
            <p className="text-secondary dark:text-gray-400 mt-3">
              <Link
                href="https://wa.me/542916450794"
                className="hover:text-dark dark:hover:text-accent"
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
                className="text-secondary dark:text-gray-400 dark:hover:text-primary"
              >
                🔗 LinkedIn
              </Link>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-600/25 mt-8 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Geome7ric
        </div>
      </div>
    </footer>
  );
};

export default Footer;
