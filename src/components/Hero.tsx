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
       mt-24
       md:mt-36
       gap-4
       relative flex flex-col items-center
       justify-center text-center  text-white px-6 w-full"
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
        <span className="text-primary">{t("title.p3")}</span>
      </h1>

      <p
        className={`mt-4 w-full
          text-hero-sub
        text-gray-300 max-w-2xl transition-all duration-1000 delay-200 ${
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
          <Link className="" href="/#contact">
            <div
              className="px-6 py-3 bg-dark border border-accent text-accent
              font-semibold text-lg rounded-lg shadow-lg hover:bg-accent hover:text-dark transition duration-300"
            >
              {t("actions.contact")}
            </div>
          </Link>
        </div>
        <div className=" items-center">
          <Link href="/#services">
            <div
              className="px-6 py-3 border border-gray-400 text-gray-200 
              font-semibold text-lg rounded-lg hover:bg-gray-700 transition duration-300"
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
