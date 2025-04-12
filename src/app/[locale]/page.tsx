import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div
      className="font-[family-name:var(--font-geist-sans)]
        row-start-2 sm:items-start"
    >
      <Hero />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}
