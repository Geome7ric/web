import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ModalProvider from "@/components/ModalProvider";

// Can be imported from a shared config
const locales = ["en", "es"];

export const metadata = {
  title: "Geome7ric",
  description: "Soluciones digitales profesionales",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    notFound();
  }

  return (
    <html lang={locale} className="overflow-x-hidden">
      <body className="dark:bg-dark min-h-screen grid grid-rows-[auto,1fr,auto] max-w-[100vw] overflow-x-hidden">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ModalProvider>
            <Header />
            {children}
            <Footer />
          </ModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
