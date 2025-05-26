import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "../../globals.css";
import ModalProvider from "@/components/ModalProvider";
import BackgroundGradients from "@/components/BackgroundGradient";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";

// Can be imported from a shared config
const locales = ["en", "es"];

export const metadata = {
  title: "Propuesta de Servicios - Geome7ric",
  description: "Propuesta personalizada de servicios digitales",
};

export default async function BudgetLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Extraer locale después de recibir params completo
  const locale = params.locale;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  let messages;
  try {
    messages = (await import(`../../../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error("Error loading messages:", error);
    notFound();
  }
  return (
    <div className="relative min-h-screen grid grid-rows-[1fr,auto] max-w-[100vw] overflow-x-hidden">
      <BackgroundGradients className="" />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ModalProvider>
          <main className="relative z-0">{children}</main>
          <FirebaseAnalytics />
        </ModalProvider>
      </NextIntlClientProvider>
    </div>
  );
}
