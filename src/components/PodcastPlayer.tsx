"use client";

import { useState, useRef, useEffect, useCallback } from "react";

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
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [volume, setVolume] = useState(1); // Valor entre 0 y 1
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const speedOptionsRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLDivElement>(null);
  // Volume slider styling is handled via inline styles and className

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

  // Swipe gesture handling for mobile
  const touchStartRef = useRef<number>(0);
  const touchMoveRef = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchMoveRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const touchStart = touchStartRef.current;
    const touchMove = touchMoveRef.current;
    const diff = touchStart - touchMove;

    // Minimum swipe distance before registering
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe up - expand
        if (isMinimized) toggleMinimized();
      } else {
        // Swipe down - minimize
        if (!isMinimized) toggleMinimized();
      }
    }
  };

  // Format time in MM:SS format
  const formatTime = (time: number): string => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  // Handle play/pause toggle
  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);
  // Toggle mute/unmute
  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  // Change volume and apply to audio element
  const changeVolume = useCallback(
    (newVolume: number) => {
      setVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.volume = newVolume;
        // If setting volume above 0, ensure it's not muted
        if (newVolume > 0 && isMuted) {
          audioRef.current.muted = false;
          setIsMuted(false);
        }
        // If setting volume to 0, mute the audio
        if (newVolume === 0 && !isMuted) {
          setIsMuted(true);
        }
      }
    },
    [isMuted]
  );

  // Toggle volume slider visibility
  const toggleVolumeSlider = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from bubbling to parent
    setShowVolumeSlider(!showVolumeSlider);
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
  }; // Toggle minimized state
  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };
  // Add double tap support for play/pause
  const lastTapRef = useRef<number>(0);

  const handleTap = (e: React.MouseEvent) => {
    // Prevent double-counting on mobile touch events
    if (e.type === "click" && e.detail > 1) {
      return;
    }

    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; // ms

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap - toggle play
      togglePlay();
      lastTapRef.current = 0;
    } else {
      // Potential single tap
      lastTapRef.current = now;
      // Use setTimeout to distinguish from double tap
      setTimeout(() => {
        if (Date.now() - lastTapRef.current >= DOUBLE_TAP_DELAY) {
          // If enough time passed and no second tap, it's a single tap
          // Single taps handled by other buttons, so no action needed here
        }
      }, DOUBLE_TAP_DELAY);
    }
  };

  // Ensure duration is set correctly
  useEffect(() => {
    if (audioRef.current && audioRef.current.readyState > 0 && duration === 0) {
      setDuration(audioRef.current.duration);
    }
  }, [audioRef.current?.readyState, duration]); // Detect if device is mobile using window width
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device on client side
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []); // Effect to handle clicks outside the player component
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Close the player if expanded and clicked outside
      if (
        playerRef.current &&
        !playerRef.current.contains(e.target as Node) &&
        !isMinimized
      ) {
        setIsMinimized(true);
      }

      // Close speed options if clicked outside of speed options menu
      if (
        speedOptionsRef.current &&
        !speedOptionsRef.current.contains(e.target as Node) &&
        showSpeedOptions
      ) {
        setShowSpeedOptions(false);
      }

      // Close volume slider if clicked outside of volume slider
      if (
        volumeSliderRef.current &&
        !volumeSliderRef.current.contains(e.target as Node) &&
        showVolumeSlider
      ) {
        setShowVolumeSlider(false);
      }
    };

    // Add event listener to document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMinimized, showSpeedOptions, showVolumeSlider]);

  // Change playback rate and apply to audio element
  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
    setShowSpeedOptions(false);
  };

  // Toggle speed options visibility
  const toggleSpeedOptions = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from bubbling to parent
    setShowSpeedOptions(!showSpeedOptions);
  };
  // Handle skipping forward/backward
  const skipTime = useCallback(
    (seconds: number) => {
      if (audioRef.current) {
        // Calculate new time
        const newTime = audioRef.current.currentTime + seconds;

        // Ensure the new time is within bounds (0 to duration)
        const boundedTime = Math.max(0, Math.min(newTime, duration));

        // Update audio element and state
        audioRef.current.currentTime = boundedTime;
        setCurrentTime(boundedTime);
      }
    },
    [duration]
  );
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only respond if the player is focused or expanded
      if (!playerRef.current || document.activeElement?.tagName === "INPUT")
        return;

      switch (e.key) {
        case " ": // Space bar
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft": // Left arrow - rewind
          e.preventDefault();
          skipTime(-10);
          break;
        case "ArrowRight": // Right arrow - forward
          e.preventDefault();
          skipTime(10);
          break;
        case "ArrowUp": // Up arrow - increase volume
          e.preventDefault();
          changeVolume(Math.min(volume + 0.1, 1));
          break;
        case "ArrowDown": // Down arrow - decrease volume
          e.preventDefault();
          changeVolume(Math.max(volume - 0.1, 0));
          break;
        case "m": // M key - toggle mute
          e.preventDefault();
          toggleMute();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isPlaying,
    volume,
    isMuted,
    duration,
    changeVolume,
    skipTime,
    toggleMute,
    togglePlay,
  ]);

  return (
    <div
      className={`fixed ${isMobile ? "bottom-0 right-0 left-0" : "bottom-5 right-5"} z-50 transition-all duration-300 ${
        isMinimized
          ? isMobile
            ? "w-full"
            : "w-64"
          : isMobile
            ? "w-full"
            : "w-80"
      }`}
    >
      {" "}
      {/* Custom styling for the volume slider is applied via the volume-slider class */}
      <div
        ref={playerRef}
        className={`bg-white/95 dark:bg-slate-800/95 backdrop-blur-md ${
          isMobile
            ? isMinimized
              ? "rounded-t-xl"
              : "rounded-t-xl"
            : "rounded-xl"
        } shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700/50 transition-all ${
          !isMinimized ? "" : ""
        }`}
        style={!isMinimized && isMounted ? glowStyle : {}}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleTap}
      >
        {" "}
        {/* Header with podcast icon, title and minimize/maximize button */}{" "}
        <div
          className={`
                bg-accent bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 primary:from-accent/80 primary:to-dark/80
        
         ${isMobile ? "p-2" : "p-3"} flex justify-between items-center
         z-10
         `}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${isMobile ? "h-4.5 w-4.5" : "h-3.5 w-3.5"} text-dark`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
              </svg>
            </div>{" "}
            <h3
              className={`${isMobile ? "text-xs" : "text-sm"} text-dark font-medium truncate`}
            >
              {title}
            </h3>
          </div>{" "}
          <button
            onClick={toggleMinimized}
            className={`${isMobile ? "p-2" : "p-1"} 
            text-white/80 hover:text-white
            
            hover:bg-white/20 rounded-full transition-colors`}
            aria-label={isMinimized ? "Expandir" : "Minimizar"}
          >
            {isMinimized ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${isMobile ? "h-5 w-5" : "h-3.5 w-3.5"}`}
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
                className={`${isMobile ? "h-5 w-5" : "h-3.5 w-3.5"}`}
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
        {/* Player body with frosted glass effect */}{" "}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isMinimized
              ? isMobile
                ? "max-h-12"
                : "max-h-16"
              : isMobile
                ? "max-h-36"
                : "max-h-44"
          }`}
        >
          {" "}
          {/* Description text */}{" "}
          <p
            className={`${isMobile ? "text-xs" : "text-xs"} text-slate-700 dark:text-slate-200 ${isMobile ? "p-2 pb-1" : "p-3 pb-1 font-medium"} `}
          >
            {description}
          </p>
          {/* Audio waveform visualization (simplified) */}{" "}
          <div
            className={`px-3 ${isMobile ? "h-8" : "h-6"} flex items-end gap-[1px] mb-1`}
          >
            {[...Array(isMobile ? 40 : 30)].map((_, i) => (
              <div
                key={i}
                className={`${isMobile ? "w-1.5" : "w-1"} rounded-sm bg-gradient-to-t from-accent to-accent dark:from-accent dark:to-accent`}
                style={{
                  height: isPlaying
                    ? `${Math.floor(Math.sin(i / 2) * (isMobile ? 12 : 8) + Math.random() * (isMobile ? 8 : 6)) + (isMobile ? 3 : 2)}px`
                    : isMobile
                      ? "3px"
                      : "2px",
                  opacity: isPlaying ? 0.6 + Math.random() * 0.4 : 0.4,
                  transition: `height ${Math.random() * 0.3 + 0.2}s ease-in-out`,
                }}
              />
            ))}
          </div>{" "}
          {/* Audio controls */}
          <div className={`${isMobile ? "p-2 pt-1" : "p-3 pt-1"}`}>
            {" "}
            {/* Progress bar */}
            <div
              className={`relative w-full h-2 bg-gray-200/70 dark:bg-gray-700/70 rounded-full overflow-hidden ${isMobile ? "mb-1" : "mb-2"}`}
            >
              <div
                className="h-full 
                bg-gradient-to-r from-accent to-primary dark:from-accent dark:to-primary 
                relative"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm"></div>
              </div>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
                aria-label="Seek audio position"
                aria-valuemin={0}
                aria-valuemax={duration || 0}
                aria-valuenow={currentTime}
                aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
              />
            </div>{" "}
            <div className="flex items-center justify-between">
              {" "}
              {/* Playback control buttons group */}
              <div
                className={`flex items-center ${isMobile ? "gap-1" : "gap-2"}`}
              >
                {/* Rewind 10s button */}{" "}
                <button
                  onClick={() => skipTime(-10)}
                  className={`flex items-center justify-center ${
                    isMobile ? "w-7 h-7" : "w-7 h-7"
                  } bg-gray-100 dark:bg-gray-700 text-accent hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-all`}
                  aria-label="Retroceder 10 segundos"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${isMobile ? "h-4 w-4" : "h-3.5 w-3.5"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                    />
                  </svg>
                </button>
                {/* Play/Pause button */}{" "}
                <button
                  onClick={togglePlay}
                  className={`flex items-center justify-center ${
                    isMobile ? "w-10 h-10" : "w-9 h-9"
                  } bg-accent hover:bg-green-700 text-dark rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105`}
                  aria-label={isPlaying ? "Pausar" : "Reproducir"}
                >
                  {isPlaying ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${isMobile ? "h-5 w-5" : "h-4 w-4"}`}
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
                      className={`${isMobile ? "h-5 w-5 ml-0.5" : "h-4 w-4 ml-0.5"}`}
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
                {/* Forward 10s button */}{" "}
                <button
                  onClick={() => skipTime(10)}
                  className={`flex items-center justify-center ${
                    isMobile ? "w-7 h-7" : "w-7 h-7"
                  } bg-gray-100 dark:bg-gray-700 text-accent hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-all`}
                  aria-label="Avanzar 10 segundos"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${isMobile ? "h-4 w-4" : "h-3.5 w-3.5"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                    />
                  </svg>
                </button>
              </div>
              {/* Time display */}
              <div className="flex items-center gap-1">
                {" "}
                <div
                  className={`${isMobile ? "text-xs" : "text-xs"} font-medium text-accent dark:text-accent`}
                >
                  {formatTime(currentTime)}
                </div>{" "}
                <div
                  className={`${isMobile ? "text-xs" : "text-xs"} text-slate-500 dark:text-slate-400`}
                >
                  / {formatTime(duration)}
                </div>
              </div>{" "}
              {/* Volume icon (with mute functionality) */}
              <div className="relative z-100">
                {" "}
                <button
                  onClick={(e) => {
                    toggleVolumeSlider(e);
                  }}
                  className={`flex items-center justify-center ${isMobile ? "h-8 w-8" : "w-7 h-7"} 
                    ${showVolumeSlider ? "bg-accent/10 dark:bg-accent/20" : ""}
                    ${isMuted ? "text-slate-500" : "text-accent"}
                    hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors`}
                  aria-label="Ajustar volumen"
                  aria-expanded={showVolumeSlider}
                  aria-haspopup="true"
                >
                  {isMuted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={isMobile ? "h-4.5 w-4.5" : "h-3.5 w-3.5"}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={isMobile ? "h-4.5 w-4.5" : "h-3.5 w-3.5"}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                    </svg>
                  )}
                </button>{" "}
                {/* Horizontal volume slider - without box */}{" "}
                <div
                  ref={volumeSliderRef}
                  className={`absolute bottom-full right-0 mb-[-32] transition-all 
                    bg-white dark:bg-slate-800 rounded-lg shadow-lg p-2
                    
                    ${
                      showVolumeSlider
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  style={{
                    transitionProperty: "opacity, transform",
                    transitionDuration: "200ms",
                  }}
                >
                  <div className="flex items-center ">
                    {/* Horizontal slider control with integrated mute button */}
                    <div className="flex items-center ">
                      {/* Mute button */}
                      <button
                        className={`${isMobile ? "p-1.5" : "p-1"} 
                          ${isMuted ? "text-slate-500" : "text-accent"} 
                          hover:text-accent/80
                          transition-colors
                          mr-1.5 flex items-center justify-center`}
                        onClick={toggleMute}
                        aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                      >
                        {isMuted ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M3 9v6h4l5 5V4L7 9H3zm7-.17v6.34L7.83 13H5v-2h2.83L10 8.83zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                          </svg>
                        )}
                      </button>

                      {/* Simple horizontal slider */}
                      <div className="relative w-28 h-6">
                        {/* Track background */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                          {/* Volume level indicator */}
                          <div
                            className="absolute top-0 left-0 bottom-0 
                            bg-gradient-to-r from-accent to-primary dark:from-accent dark:to-primary
                             rounded-full transition-all duration-150"
                            style={{
                              width: `${isMuted ? 0 : volume * 100}%`,
                            }}
                          ></div>
                        </div>

                        {/* Actual slider input */}
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={(e) =>
                            changeVolume(parseFloat(e.target.value))
                          }
                          className="absolute h-5 w-full appearance-none bg-transparent cursor-pointer"
                          style={{
                            WebkitAppearance: "none",
                            background: "transparent",
                            position: "absolute",
                            top: "50%",
                            left: 1,
                            transform: "translateY(-50%)",
                            zIndex: 20,
                          }}
                          aria-label="Ajustar volumen"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Playback speed control */}
              <div className="relative z-100">
                {" "}
                <button
                  onClick={toggleSpeedOptions}
                  className={`flex items-center justify-center ${isMobile ? "h-8 w-8" : "p-1.5"} hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors ml-1`}
                  aria-label="Cambiar velocidad de reproducción"
                  aria-expanded={showSpeedOptions}
                  aria-haspopup="true"
                >
                  {" "}
                  <div
                    className={`${isMobile ? "text-xs" : "text-xs"} font-medium ${showSpeedOptions ? "text-accent" : "text-gray-600 dark:text-gray-300"}`}
                  >
                    {playbackRate}x
                  </div>
                </button>{" "}
                {/* Speed options dropdown - animated */}{" "}
                <div
                  ref={speedOptionsRef}
                  className={`absolute bottom-full 
                    right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg
                    border border-gray-200 dark:border-gray-700 overflow-hidden
                    transition-all ${
                      showSpeedOptions
                        ? "opacity-100 max-h-48 translate-y-0"
                        : "opacity-0 max-h-0 translate-y-2 pointer-events-none"
                    }`}
                  style={{
                    transitionProperty: "opacity, max-height, transform",
                    transitionDuration: "300ms",
                  }}
                >
                  {" "}
                  <div className="p-1">
                    {" "}
                    {[1, 1.5].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => changePlaybackRate(rate)}
                        className={`block w-full text-left px-4 py-2 ${isMobile ? "text-xs" : "text-xs"} ${
                          playbackRate === rate
                            ? "bg-accent/10 text-accent font-medium"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        } rounded transition-colors`}
                        aria-label={`Velocidad ${rate}x`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>{" "}
        {/* Watermark - Simple and discrete - */}
        <div
          className={`absolute bottom-1.5 right-1.5 flex items-center gap-1 opacity-20 hover:opacity-100 transition-all duration-300`}
        >
          {/* Simplified Geome7ric text logo */}
          <div className="text-[8px] font-semibold text-slate-500 dark:text-slate-600 tracking-tight">
            <span className="hover:text-primary/70 dark:hover:text-accent/70">
              Geome7ric with
            </span>
          </div>

          {/* IA Logo */}
          <div className="relative group">
            <div className="w-4 h-4 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
              <span className="text-[6px] font-bold text-white">IA</span>
            </div>

            {/* Simple tooltip */}
            <div className="absolute bottom-full right-0 mb-1 px-1.5 py-0.5 bg-black/80 text-white text-[9px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Podcast y reproductor creados con IA
            </div>
          </div>
        </div>
      </div>
      {/* Hidden audio element */}{" "}
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        // Set playback rate and volume on initial render and after any changes
        onCanPlay={() => {
          if (audioRef.current) {
            audioRef.current.playbackRate = playbackRate;
            audioRef.current.volume = volume;
            audioRef.current.muted = isMuted;
          }
        }}
        onVolumeChange={() => {
          // Actualiza el estado cuando el volumen cambia por medios externos
          if (audioRef.current && !isMuted) {
            setVolume(audioRef.current.volume);
          }
        }}
      />
    </div>
  );
};

export default PodcastPlayer;
