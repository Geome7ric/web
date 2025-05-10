"use client";
import { sendEmail } from "@/app/api";
import { useNotyf } from "@/app/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface ContactProps {
  subject?: string;
  message?: string;
}

const Contact = ({ subject = "", message = "" }: ContactProps) => {
  const notyf = useNotyf();
  const t = useTranslations("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject,
    message,
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSending(true);
    const { name } = formData;
    e.preventDefault();
    
    sendEmail(formData)
      .then(() => {
        const message = t("Contact.form.success", { name });
        notyf!.success(message);

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      })
      .catch(() => {
        notyf!.error(t("Contact.form.error"));
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section
      id="contact"
      className="w-full px-4 sm:px-6 lg:px-8 mt-8 md:mt-4 lg:mt-16 xl:mt-32"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-16">
          {/* Columna izquierda: Texto */}
          <div className="w-full lg:w-1/2 flex items-center">
            <h2 className="text-black dark:text-white text-title font-bold leading-tight transition-all duration-1000 text-center lg:text-left">
              {t("Contact.title.p1") + " "}
              <span className="text-accent">{t("Contact.title.p2")}</span>
            </h2>
          </div>

          {/* Columna derecha: Formulario */}
          <div className="w-full lg:w-1/2">
            <form
              className="space-y-6 w-full"
              onSubmit={handleSubmit}
            >
              <div className="rounded-md shadow-sm -space-y-px border-none">
                <div className="py-1">
                  <label className="text-base md:text-sm text-black dark:text-white">
                    {t("common.name")} *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 border mt-2
                      py-2 rounded-t-md 
                      text-black bg-white/80 border-black/40 focus:border-accent 
                      dark:text-white dark:bg-black/20 dark:border-white/15 dark:focus:border-accent
                      focus:outline-none focus:ring-accent focus:z-10 sm:text-sm"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="py-1">
                  <label className="text-base md:text-sm text-black dark:text-white">
                    {t("common.email")} *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-md relative 
                    block w-full px-3 py-2 border
                    text-black bg-white/80 border-black/40 focus:border-accent
                    dark:text-white dark:bg-black/20 dark:border-white/15 dark:focus:border-accent
                    focus:outline-none mt-2
                    focus:ring-accent focus:z-10 sm:text-sm"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="py-1">
                  <label className="text-black dark:text-white">
                    {t("common.subject")}
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className="appearance-none rounded-md relative 
                    block w-full px-3 py-2 border 
                    mt-2
                    text-black bg-white/80 border-black/40 focus:border-accent
                    dark:text-white dark:bg-black/20 dark:border-white/15 dark:focus:border-accent
                    focus:outline-none
                    focus:ring-accent focus:z-10 sm:text-sm"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="py-1">
                  <label className="text-black dark:text-white">
                    {t("Contact.form.message")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="appearance-none rounded-md relative block w-full mt-2 
                    px-3 py-2 border 
                    text-black bg-white/80 border-black/40 focus:border-accent
                    dark:text-white dark:bg-black/20 dark:border-white/15 dark:focus:border-accent
                    focus:outline-none focus:ring-accent
                    focus:z-10 sm:text-sm"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-start">
                <button
                  type="submit"
                  className={` 
                    group relative
                    flex justify-center 
                    py-2 px-4 border 
                    rounded-md
                    bg-white/60 text-black border-black/60
                    dark:bg-accent dark:text-white dark:border-accent
                    hover:bg-accent hover:border-accent hover:text-white
                    dark:hover:bg-accent/80
                    text-bold  
                    focus:outline-none focus:ring-2 
                    focus:ring-offset-2
                    w-full sm:w-72
                    focus:ring-accent
                    transition-all duration-300
                    ${isSending ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
                  `}
                  disabled={isSending}
                >
                  {isSending ? t("common.sending") : t("common.send")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
