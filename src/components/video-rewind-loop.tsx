import * as React from "react";

type VideoRewindLoopProps = {
  src: string;
  alt?: string;
  /**
   * Start playback from (in seconds). Default = 0.
   */
  startTime?: number;
};

export function VideoRewindLoop({
  src,
  alt,
  startTime = 1,
}: VideoRewindLoopProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  // Configuration for the rewind loop effect
  // We'll "rewind" (jump back & animate) briefly on loop
  const REWIND_MS = 600; // how far to rewind (in ms) for the quick reverse
  const REWIND_DURATION = 280; // ms: rewind animation length

  // Track if we're currently in rewind animation, to avoid loops triggering themselves
  const rewindTimeout = React.useRef<number | null>(null);
  const [isRewinding, setIsRewinding] = React.useState(false);

  // Set start time and play video on mount or src/startTime change
  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const setAndPlay = () => {
        // Clamp startTime to video duration if necessary
        const validTime =
          typeof startTime === "number" && !isNaN(startTime) && startTime >= 0
            ? Math.min(startTime, video.duration || startTime)
            : 0;
        video.currentTime = validTime;
        video.play().catch(() => {});
      };

      // If metadata is loaded, can directly set currentTime
      if (video.readyState >= 1) {
        setAndPlay();
      } else {
        // Wait until video metadata loaded
        const handleLoadedMetadata = () => {
          setAndPlay();
        };
        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        return () => {
          video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
      }
    }
    return () => {
      if (rewindTimeout.current) {
        window.clearTimeout(rewindTimeout.current);
      }
    };
    // Include startTime and src as dependencies
  }, [src, startTime]);

  // Handler for when video reaches the end
  const handleEnded = React.useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setIsRewinding(true);

    // Instantly jump to REWIND_MS before end for "rewind"
    v.currentTime = Math.max(0, v.duration - REWIND_MS / 1000);

    // Add a CSS reverse class to video for a "rewind" feel (reverse direction)
    v.classList.add("rewind");
    // After animation, reset and replay video
    rewindTimeout.current = window.setTimeout(() => {
      v.classList.remove("rewind");
      // Return to startTime (could be 0)
      v.currentTime =
        typeof startTime === "number" && !isNaN(startTime) && startTime >= 0
          ? Math.min(startTime, v.duration || startTime)
          : 0;
      v.play();
      setIsRewinding(false);
    }, REWIND_DURATION);
  }, [startTime]);

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden"
      tabIndex={-1}
      aria-label={alt}
      // Removed onMouseEnter and onMouseLeave
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain transition-all duration-300"
        loop={false}
        muted
        playsInline
        autoPlay
        aria-label={alt}
        tabIndex={-1}
        onEnded={handleEnded}
      />
      <style jsx>{`
        video.rewind {
          animation: rewind-effect ${REWIND_DURATION}ms linear;
        }
        @keyframes rewind-effect {
          from {
            filter: brightness(1) blur(0px);
            transform: scale(1) rotate(0deg);
          }
          60% {
            filter: brightness(1.13) blur(0.3px);
            transform: scale(1.04) rotate(-3deg);
          }
          to {
            filter: brightness(0.95) blur(0.5px);
            transform: scale(0.957) rotate(2deg);
          }
        }
      `}</style>
    </div>
  );
}
