import { motion } from "framer-motion";

const TopBar = ({ hoveredObject, panelOpen }) => {
  return (
    <>
      {/* Main header */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 pointer-events-none"
      >
        {/* Logo / Name */}
        <div
          className="flex items-center gap-3 pointer-events-auto"
          style={{
            background: "rgba(5, 8, 22, 0.8)",
            backdropFilter: "blur(12px)",
            borderRadius: "50px",
            border: "1px solid rgba(145, 94, 255, 0.2)",
            padding: "8px 16px",
          }}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-purple-900 flex items-center justify-center">
            <span className="text-white font-bold text-xs">🎮</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">Việt Trần</p>
            <p className="text-primary text-xs">Product Engineering</p>
          </div>
        </div>



        {/* Status pill */}
        <div
          className="flex items-center gap-2 pointer-events-auto"
          style={{
            background: "rgba(5, 8, 22, 0.8)",
            backdropFilter: "blur(12px)",
            borderRadius: "50px",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            padding: "8px 14px",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-xs font-medium">Available for hire</span>
        </div>
      </motion.header>

      {/* Bottom control hints */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      >
        <div
          className="flex items-center gap-5 px-6 py-3 rounded-2xl text-xs text-white/50"
          style={{
            background: "rgba(5, 8, 22, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span className="flex items-center gap-1.5">🖱️ Drag <span className="text-white/30">to rotate</span></span>
          <span className="w-px h-4 bg-white/10" />
          <span className="flex items-center gap-1.5">🔍 Scroll <span className="text-white/30">to zoom</span></span>
          <span className="w-px h-4 bg-white/10" />
          <span className="flex items-center gap-1.5">👆 Click <span className="text-white/30">objects to explore</span></span>
        </div>
      </motion.div>

    </>
  );
};

export default TopBar;
