"use client";

import React from "react";
import InfiniteScroll from "./InfiniteScroll";
import { useEffect, useState } from "react";

interface BrandScrollerProps {
  className?: string;
  sectionTitle?: string;
}

const BrandScroller: React.FC<BrandScrollerProps> = ({ className = "" }) => {
  // use effect para determinar si estamos en modo claro o modo oscuro
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  const assetPrefix = isDarkMode ? "dark" : "light";
  // Define the assets to be displayed in the scroller
  const brandAssets = [
    {
      id: "calendar",
      src: `/assets/views/${assetPrefix}/calendar.webp`,
      alt: "Calendar logo",
      width: 180,
      height: 60,
    },
    {
      id: "app",
      src: `/assets/views/${assetPrefix}/app.webp`,
      alt: "App logo",
      width: 200,
      height: 70,
    },
    {
      id: "calendar-extended",
      src: `/assets/views/${assetPrefix}/calendar-extended.webp`,
      alt: "Calendar extended logo",
      width: 220,
      height: 70,
    },
    {
      id: "two-apps",
      src: `/assets/views/${assetPrefix}/two-apps.webp`,
      alt: "Two apps logo",
      width: 220,
      height: 70,
    },
    {
      id: "tablet",
      src: `/assets/views/${assetPrefix}/tablet.webp`,
      alt: "Tablet logo",
      width: 220,
      height: 70,
    },
  ];

  // Create duplicate assets with unique IDs
  const allAssets = [
    ...brandAssets,
    ...brandAssets.map((asset) => ({
      ...asset,
      id: `${asset.id}-copy`,
    })),
  ];

  return (
    <section className={`w-full ${className}`} id="brand-scroller">
      <div className="flex flex-col gap-32 w-full">
        {/* First slider with ltr (left-to-right) direction */}
        <div className="min-h-[150px]">
          <InfiniteScroll assets={allAssets} />
        </div>
      </div>
    </section>
  );
};

export default BrandScroller;
