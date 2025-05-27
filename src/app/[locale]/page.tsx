"use client";

import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import CalendlyScheduler from "@/components/CalendlyScheduler";
import BrandScroller from "@/components/BrandScroller";
import AboutUs from "@/components/AboutUs";
import BlogPreview from "@/components/BlogPreview";
import PodcastPlayer from "@/components/PodcastPlayer";

export default function Home() {
  return (
    <div
      className="font-[family-name:var(--font-geist-sans)]
        row-start-2 sm:items-start w-full max-w-full overflow-x-hidden relative"
    >
      {" "}
      <Hero />
      <BrandScroller /> <HowItWorks />
      <Services />
      <AboutUs /> <BlogPreview />
      <CalendlyScheduler testEmail={false} />
      <Contact />{" "}
      <PodcastPlayer
        audioSrc="/podcast.wav"
        description="Te explicamos cómo transformamos tu negocio"
      />
    </div>
  );
}
