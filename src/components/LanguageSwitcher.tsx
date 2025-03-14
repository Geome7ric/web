"use client"; // Asegurar que se ejecuta en el cliente

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1] as "en" | "es";
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (locale: string) => {
    if (locale === currentLocale) return; // Evitar cambios innecesarios

    const newPath = `/${locale}${pathname.substring(currentLocale.length + 1)}`;

    // Usamos startTransition para que Next.js maneje el cambio sin recargar
    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <div
      className="relative flex items-center
      p-1 border border-dark/15 dark:border-accent/15
          rounded-lg
    "
    >
      {/* Botones de idioma */}
      {routing.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => changeLanguage(locale)}
          className={`
            relative z-10 flex-1 px-2 py-2 text-sm 
            rounded-lg transition-colors duration-300 ease-in-out
            ${
              locale === currentLocale
                ? "bg-primary/50 dark:bg-accent/15 text-secondary dark:text-white text-opacity-90 "
                : "text-gray-400 hover:text-gray-500 dark:hover:text-gray-200 hover:scale-105"
            }
            ${isPending ? "cursor-not-allowed" : ""}
          `}
          disabled={isPending} // Evita múltiples clics mientras cambia
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
