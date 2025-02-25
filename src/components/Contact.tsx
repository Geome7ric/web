"use client";
import { sendEmail } from "@/app/api";
import { useNotyf } from "@/app/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";

// que reciba como parametro un subject y un message

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
    // Aquí puedes agregar la lógica para enviar el formulario
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
    <div
      lang=""
      id="contact"
      className="relative flex flex-col items-center 
      mt-8 md:mt-4 lg:mt-16 xl:mt-32
      justify-center px-4 sm:px-6 lg:px-8 w-full"
    >
      <div
        className="max-w-6xl 
        w-full flex flex-col lg:flex-row items-center
        lg:items-start gap-2 lg:gap-16"
      >
        {/* Columna izquierda: Texto */}
        <div className="flex-1 flex flex-center items-center   h-96  p-10 ">
          <h2 className="text-title font-bold leading-tight transition-all duration-1000 text-center lg:text-left ">
            {t("Contact.title.p1") + " "}
            <span className="text-primary">{t("Contact.title.p2")}</span>
          </h2>
        </div>

        {/* Columna derecha: Formulario */}
        <div className="flex-1 w-full lg:max-w-none bg-dark/50 p-10 h-full ">
          <form
            className="space-y-6
            lg:max-w-xl xl:max-w-xl
            w-full
            flex-1 justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="rounded-md shadow-sm -space-y-px border-none">
              <div className="py-1">
                <label>{t("common.name")} *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 border border-white/15 mt-2
                    py-2 placeholder-gray-500 text-white rounded-t-md 
                    focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-dark"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="py-1">
                <label>{t("common.email")} *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-md relative 
                  block w-full px-3 py-2 border
                   border-gray-300 placeholder-gray-500 text-white focus:outline-none bg-dark border-white/15 mt-2
                    focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="py-1">
                <label>{t("common.subject")}</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="appearance-none rounded-md relative 
                  block w-full px-3 py-2 border bg-dark border-white/15 
                  mt-2
                   border-gray-300 placeholder-gray-500 text-white focus:outline-none
                    focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="py-1">
                <label>{t("Contact.form.message")} *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="appearance-none rounded-none relative block w-full bg-dark border-white/15 mt-2 
                  px-3 py-2 border border-gray-300 
                   text-white rounded-b-md focus:outline-none focus:ring-primary
                    focus:border-primary focus:z-10 sm:text-sm"
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
                  py-2 px-4 border border-transparent 
                  rounded-md
                bg-primary text-dark text-bold  
                  focus:outline-none focus:ring-2 
                  focus:ring-offset-2
                  w-72
                focus:ring-primary

                ${isSending ? "bg-gray-500" : "cursor-pointer"}
                 `}
                //  disable if is sending
                disabled={isSending}
              >
                {isSending ? t("common.sending") : t("common.send")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
