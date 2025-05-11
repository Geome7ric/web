"use client";

import React from "react";
import InfiniteScroll from "./InfiniteScroll";

// Define the assets to be displayed in the scroller
let BRAND_ASSETS = [
  {
    id: "calendar",
    src: "/assets/views/calendar.webp",
    alt: "Calendar logo",
    width: 180,
    height: 60,
  },
  {
    id: "app",
    src: "/assets/views/app.webp",
    alt: "App logo",
    width: 200,
    height: 70,
  },
  {
    id: "calendar-extended",
    src: "/assets/views/calendar-extended.webp",
    alt: "Calendar extended logo",
    width: 220,
    height: 70,
  },
  {
    id: "two-apps",
    src: "/assets/views/two-apps.webp",
    alt: "Two apps logo",
    width: 220,
    height: 70,
  },

  {
    id: "tablet",
    src: "/assets/views/tablet.webp",
    alt: "Tablet logo",
    width: 220,
    height: 70,
  },
];

BRAND_ASSETS = BRAND_ASSETS.concat(
  BRAND_ASSETS.map((asset) => ({
    ...asset,
    id: `${asset.id}-copy`,
  }))
);

interface BrandScrollerProps {
  className?: string;
  sectionTitle?: string;
}

const BrandScroller: React.FC<BrandScrollerProps> = ({ className = "" }) => {
  return (
    <section className={`w-full  ${className}`} id="brand-scroller">
      <div className=" flex flex-col gap-32 w-full">
        {/* First slider with ltr (left-to-right) direction */}
        <div className="min-h-[150px] ">
          <InfiniteScroll assets={BRAND_ASSETS} />
        </div>
      </div>
    </section>
  );
};

export default BrandScroller;
