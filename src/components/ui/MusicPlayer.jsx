import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const startAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn("Autoplay prevented, waiting for user interaction: ", err);
          });
      }
    };

    // Attempt to play immediately on mount
    startAudio();

    // Register interaction listener to trigger play on first interaction if blocked
    const handleInteraction = () => {
      startAudio();
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Play failed: ", err);
        });
    }
  };

  return (
    <div className="fixed bottom-6 z-30 flex items-center justify-center" style={{ right: "84px" }}>
      {/* Hidden audio element playing Pallet Town Lofi */}
      <audio
        ref={audioRef}
        src={import.meta.env.BASE_URL + "pallet-town-pokemon-red-amp-blue-lofi.mp3"}
        loop
        preload="auto"
      />

      {/* Retro style music button */}
      <motion.button
        whileHover={{ scale: 1.05, translateY: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="pointer-events-auto cursor-pointer select-none"
        style={{
          background: isPlaying ? "#10B981" : "#EF4444", // green when playing, red when muted
          border: "3px solid #000000",
          borderRadius: "0px", // sharp retro corners
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "4px 4px 0px #000000",
          color: "#ffffff",
          fontSize: "18px",
        }}
        title={isPlaying ? "Mute Music" : "Play Music"}
      >
        {isPlaying ? (
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            🎵
          </motion.span>
        ) : (
          <span>🔇</span>
        )}
      </motion.button>
    </div>
  );
};

export default MusicPlayer;
