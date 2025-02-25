import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Geome7ric",
  description: "Geome7ric is a design and development studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={` antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-C6QCHW5EQH" />
    </html>
  );
}
