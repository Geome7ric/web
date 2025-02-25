import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Geome7ric",
    description: "Geome7ric is a design and development studio.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  await params;

  const locale = params.locale as string;

  // Obtener los mensajes para la internacionalización
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <GoogleAnalytics gaId="G-C6QCHW5EQH" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
