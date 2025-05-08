import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ModalProvider from "@/components/ModalProvider";
import BackgroundGradients from "@/components/BackgroundGradient";

// Can be imported from a shared config
const locales = ["en", "es"];

export const metadata = {
  title: "Geome7ric",
  description: "Soluciones digitales profesionales",
};

export default async function RootLayout({
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
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error("Error loading messages:", error);
    notFound();
  }

  return (
    <html lang={locale} className="overflow-x-hidden">
      <body className="relative min-h-screen grid grid-rows-[auto,1fr,auto] max-w-[100vw] overflow-x-hidden">
        <BackgroundGradients className="" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ModalProvider>
            <Header />
            <main className="relative z-0">{children}</main>
            <Footer />
          </ModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
