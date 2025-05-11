"use client";

import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import CalendlyScheduler from "@/components/CalendlyScheduler";
import BrandScroller from "@/components/BrandScroller";

export default function Home() {
  return (
    <div
      className="font-[family-name:var(--font-geist-sans)]
        row-start-2 sm:items-start w-full max-w-full overflow-x-hidden relative"
    >
      <Hero />
      <BrandScroller />
      <HowItWorks />
      <Services />
      <CalendlyScheduler testEmail={false} />
      <Contact />
    </div>
  );
}
