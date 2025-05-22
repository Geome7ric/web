"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const AboutUs = () => {
  const t = useTranslations("AboutUs");

  return (
    <section
      id="about-us"
      className="py-16 md:py-20 text-black dark:text-white flex flex-col items-center z-0 
       lg:mt-24"
    >
      <div className="container px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Left column: Title and descriptions */}
          <div className="flex-1 w-full">
            <h2 className="text-subtitle mb-4 text-black dark:text-white">
              {t("title")}
            </h2>
            <div className="max-w-2xl">
              <p className="text-lg md:text-base text-black/80 dark:text-white/80 mb-6">
                {t("description1")}
              </p>
              <p className="text-lg md:text-base text-black/80 dark:text-white/80 mb-8">
                {t("description2")}
              </p>
            </div>{" "}
          </div>{" "}
          {/* Right column: Asset */}
          <div className="flex-1 w-full flex justify-center">
            <div className="">
              {" "}
              <h3 className="text-2xl mb-4 ">{t("whyChooseUs")}</h3>
              <ul className="text-start space-y-6 max-w-2xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
                {" "}
                <li className="flex items-start gap-3">
                  <div className="w-16 h-16 mt-1 flex-shrink-0">
                    <Image
                      src="/assets/aboutus/perfect-fit.webp"
                      alt=""
                      width={64}
                      height={64}
                      className="rounded-sm"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-black dark:text-white">
                      {t("reasons.reason1.title")}
                    </div>
                    <p className="mt-1 text-sm">
                      {t("reasons.reason1.description")}
                    </p>
                  </div>
                </li>{" "}
                <li className="flex items-start gap-3">
                  <div className="w-16 h-16 mt-1 flex-shrink-0">
                    <Image
                      src="/assets/aboutus/communication.webp"
                      alt=""
                      width={64}
                      height={64}
                      className="rounded-sm"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-black dark:text-white">
                      {t("reasons.reason2.title")}
                    </div>
                    <p className="mt-1 text-sm">
                      {t("reasons.reason2.description")}
                    </p>
                  </div>
                </li>{" "}
                <li className="flex items-start gap-3">
                  <div className="w-16 h-16 mt-1 flex-shrink-0">
                    <Image
                      src="/assets/aboutus/transparency.webp"
                      alt=""
                      width={64}
                      height={64}
                      className="rounded-sm"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-black dark:text-white">
                      {t("reasons.reason3.title")}
                    </div>
                    <p className="mt-1 text-sm">
                      {t("reasons.reason3.description")}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
