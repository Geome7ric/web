import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

// Define the message structure type
interface Messages {
  SEO: {
    title: string;
    description: string;
  };
  [key: string]: unknown;
}

// Define the supported locales
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Properly await the params object before using it
  const { locale } = await params;

  // Get messages for metadata based on locale
  const messages = (await getMessages({ locale })) as Messages;

  // Access SEO translations
  const title = messages.SEO.title;
  const description = messages.SEO.description;

  return {
    title,
    description,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  // Properly await the params object before accessing its properties
  const { locale } = await params;

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
