"use client";

import { useState, useRef, useEffect } from "react";

interface PodcastPlayerProps {
  audioSrc: string;
  title?: string; // Hago el título opcional
  description?: string;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
  audioSrc,
  title = "Nuestro podcast", // Valor predeterminado
  description = "Escucha este podcast para saber más sobre nuestros servicios",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Detect dark mode and mount status (similar to Hero.tsx)
  useEffect(() => {
    // Mark component as mounted (client-side only)
    setIsMounted(true);

    // Check for dark mode
    if (typeof window !== "undefined") {
      // Verify dark mode with media query
      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkMode(darkModeQuery.matches);

      // Update if mode changes
      const handleDarkModeChange = (e: MediaQueryListEvent) => {
        setIsDarkMode(e.matches);
      };

      darkModeQuery.addEventListener("change", handleDarkModeChange);
      return () =>
        darkModeQuery.removeEventListener("change", handleDarkModeChange);
    }
  }, []);

  // Define glow style based on dark/light mode
  const glowStyle = isMounted
    ? {
        boxShadow: isDarkMode
          ? "0 0 170px 1px var(--accent-shadow)" // Más difuminada y extendida en dark mode
          : "0 0 15px var(--primary-shadow)",
      }
    : {};

  // Format time in MM:SS format
  const formatTime = (time: number): string => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle play/pause toggle
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Update progress bar and current time
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Set duration when metadata is loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle seeking in the audio
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  // Handle audio ending
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  // Toggle minimized state
  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  // Ensure duration is set correctly
  useEffect(() => {
    if (audioRef.current && audioRef.current.readyState > 0 && duration === 0) {
      setDuration(audioRef.current.duration);
    }
  }, [audioRef.current?.readyState, duration]);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ${
        isMinimized ? "w-64" : "w-80"
      }`}
    >
      <div
        className={`bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700/50 transition-all ${
          !isMinimized ? "" : ""
        }`}
        style={!isMinimized && isMounted ? glowStyle : {}}
      >
        {/* Header with podcast icon, title and minimize/maximize button */}
        <div className="bg-gradient-to-r from-accent/50 to-accent/95 dark:from-accent dark:to-accent p-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 text-dark"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
              </svg>
            </div>{" "}
            <h3 className="text-dark font-medium truncate text-sm">{title}</h3>
          </div>{" "}
          <button
            onClick={toggleMinimized}
            className="text-dark/80 hover:text-dark hover:bg-white/20 p-1 rounded-full transition-colors"
            aria-label={isMinimized ? "Expandir" : "Minimizar"}
          >
            {isMinimized ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Player body with frosted glass effect */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isMinimized ? "max-h-16" : "max-h-44"
          }`}
        >
          {/* Description text */}
          <p className="text-xs text-slate-700 dark:text-slate-200 p-3 pb-1 font-medium">
            {description}
          </p>
          {/* Audio waveform visualization (simplified) */}
          <div className="px-3 h-6 flex items-end gap-[1px] mb-1">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="w-1 rounded-sm bg-gradient-to-t from-accent to-accent dark:from-accent dark:to-accent"
                style={{
                  height: isPlaying
                    ? `${Math.floor(Math.sin(i / 2) * 8 + Math.random() * 6) + 2}px`
                    : "2px",
                  opacity: isPlaying ? 0.6 + Math.random() * 0.4 : 0.4,
                  transition: `height ${Math.random() * 0.3 + 0.2}s ease-in-out`,
                }}
              />
            ))}
          </div>

          {/* Audio controls */}
          <div className="p-3 pt-1">
            {/* Progress bar */}
            <div className="relative w-full h-1.5 bg-gray-200/70 dark:bg-gray-700/70 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-accent to-accent dark:from-accent dark:to-accent relative"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
              </div>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              {/* Play/Pause button */}
              <button
                onClick={togglePlay}
                className="flex items-center justify-center w-9 h-9 bg-accent hover:bg-green-700 text-dark rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105"
                aria-label={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-0.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>

              {/* Time display */}
              <div className="flex items-center gap-1">
                <div className="text-xs font-medium text-accent dark:text-accent">
                  {formatTime(currentTime)}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  / {formatTime(duration)}
                </div>
              </div>

              {/* Volume icon (with mute functionality) */}
              <button
                onClick={toggleMute}
                className="flex items-center hover:bg-gray-100 dark:hover:bg-slate-700 p-1 rounded-full transition-colors"
                aria-label={isMuted ? "Activar sonido" : "Silenciar"}
              >
                {isMuted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 text-slate-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 text-accent dark:text-accent"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
    </div>
  );
};

export default PodcastPlayer;
