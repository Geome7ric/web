"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const t = useTranslations("Hero");

  return (
    <section
      className="py-16 
       my-32 md:my-48 lg:my-28 xl:my-32 2xl:my-48
       gap-4
       relative flex flex-col items-center z-0
       justify-center text-center text-secondary dark:text-white px-6 w-full"
    >
      <h1
        className={`text-hero font-extrabold 
          leading-tight transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        {t("title.p1")}
        <br className="hidden md:block" />
        &nbsp;{t("title.p2")}{" "}
        <span className="text-accent">{t("title.p3")}</span>
      </h1>

      <p
        className={`mt-4 w-full
          text-hero-sub
          text-dark-300
        dark:text-gray-300 max-w-2xl transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        {t("subtitle")}
      </p>

      <div
        className={`mt-8 w-full flex flex-col items-center  md:flex-row gap-4 justify-center 
          transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
      >
        <div className=" flex flex-center items-center">
          <Link className="" href="/#calendly">
            <div
              className="px-6 py-3 
              border
              glassmorphism
              dark:bg-transparent  dark:border-accent dark:text-accent dark:hover:bg-accent dark:hover:text-dark
              bg-primary border-secondary text-secondary hover:bg-secondary hover:text-primary
              font-semibold text-lg rounded-lg shadow-lg transition duration-300 relative"
            >
              {t("actions.contact")}
              <span className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-accent  "></span>
              <span className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-accent animate-ping "></span>
            </div>
          </Link>
        </div>

        <div className=" items-center">
          <Link href="/#services">
            <div
              className="px-6 py-3 border 
              glassmorphism
              dark:border-gray-400 dark:text-gray-200 
              border-secondary text-secondary-400 
              font-semibold text-lg rounded-lg transition duration-300"
            >
              {t("actions.services")}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
