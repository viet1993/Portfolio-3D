import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = ({ progress = 0 }) => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d.length >= 3 ? "." : d + ".")), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      key="loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "#050816" }}
    >
      {/* Pokéball Spinner */}
      <div className="relative w-28 h-28 mb-10">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-4 border-transparent"
          style={{
            background:
              "linear-gradient(#050816, #050816) padding-box, linear-gradient(135deg, #915EFF, #00D9FF, #FF6B9D) border-box",
          }}
        />

        {/* Pokéball */}
        <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-white/20">
          {/* Top half - red */}
          <div className="h-1/2 w-full bg-gradient-to-br from-red-500 to-red-700" />
          {/* Bottom half - white */}
          <div className="h-1/2 w-full bg-gradient-to-br from-gray-100 to-white" />
          {/* Center line */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gray-900" />
          {/* Center button */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-gray-900 z-10 shadow-lg"
          />
        </div>
      </div>

      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h1 className="text-white font-bold text-2xl mb-1">
          Pokémon Room <span className="gradient-text">3D</span>
        </h1>
        <p className="text-white/40 text-sm font-mono tracking-widest mb-6">
          Loading world{dots}
        </p>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto mb-3">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #915EFF, #00D9FF)",
            }}
            animate={{ width: `${Math.max(progress * 100, 5)}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
        <p className="text-white/20 text-xs">
          {Math.round(progress * 100)}% — Building your 3D world
        </p>
      </motion.div>

      {/* Tip */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 text-white/20 text-xs text-center px-4"
      >
        Tip: Click on objects to explore the room 🎮
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
