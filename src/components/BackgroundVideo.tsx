"use client";

import { useRef } from "react";

interface BackgroundVideoProps {
  videoSrc: string;
}

const BackgroundVideo = ({ videoSrc }: BackgroundVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-[-1]">
      <div className="video-container relative w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          className="absolute w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-white/70 dark:bg-black/70 backdrop-blur-sm"></div>
    </div>
  );
};

export default BackgroundVideo;
