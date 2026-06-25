import { useState, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { INTERACTIVE_OBJECTS } from "./data/roomObjects";
import RoomScene from "./components/scene/RoomScene";
import InfoPanel from "./components/ui/InfoPanel";
import TopBar from "./components/ui/TopBar";
import LoadingScreen from "./components/ui/LoadingScreen";
import MusicPlayer from "./components/ui/MusicPlayer";
import Clock from "./components/ui/Clock";
import { useProgress } from "@react-three/drei";

// Loading gate that uses drei's useProgress
const LoadingGate = ({ children }) => {
  const { progress, active } = useProgress();

  return (
    <>
      <AnimatePresence>
        {active && <LoadingScreen progress={progress / 100} />}
      </AnimatePresence>
      {children}
    </>
  );
};

// Animated Pokéball Icon Component
const PokeballIcon = ({ isOpen }) => {
  return (
    <div style={{
      position: "relative",
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Top half */}
      <motion.div
        animate={{ y: isOpen ? -9 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "36px",
          height: "18px",
          background: "linear-gradient(to bottom, #EF4444, #C82525)",
          border: "3px solid #000000",
          borderBottom: "none",
          borderTopLeftRadius: "18px",
          borderTopRightRadius: "18px",
          zIndex: 2,
        }}
      />
      
      {/* Middle horizontal line */}
      <motion.div
        animate={{ opacity: isOpen ? 0 : 1, scaleY: isOpen ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        style={{
          position: "absolute",
          top: "16px",
          left: 0,
          width: "36px",
          height: "4px",
          background: "#000000",
          zIndex: 3,
        }}
      />

      {/* Center button */}
      <motion.div
        animate={{ 
          scale: isOpen ? 0 : 1,
          opacity: isOpen ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          width: "16px",
          height: "16px",
          background: "#ffffff",
          border: "3px solid #000000",
          borderRadius: "50%",
          zIndex: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Inner dot with subtle blue glow */}
        <div style={{
          width: "4px",
          height: "4px",
          background: "#ffffff",
          borderRadius: "50%",
          boxShadow: "0 0 4px #3b82f6",
        }} />
      </motion.div>

      {/* Bottom half */}
      <motion.div
        animate={{ y: isOpen ? 9 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "36px",
          height: "18px",
          background: "linear-gradient(to bottom, #FFFFFF, #E2E8F0)",
          border: "3px solid #000000",
          borderTop: "none",
          borderBottomLeftRadius: "18px",
          borderBottomRightRadius: "18px",
          zIndex: 2,
        }}
      />

      {/* Inner Pokémon release blue energy glow */}
      {isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.8, 0], opacity: [0, 0.9, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.4 }}
          style={{
            position: "absolute",
            width: "16px",
            height: "16px",
            background: "radial-gradient(circle, #60A5FA 0%, rgba(96,165,250,0) 75%)",
            borderRadius: "50%",
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};

// Explore Menu - shows list of interactive objects
const ExploreMenu = ({ onSelect, selectedId }) => {
  const [open, setOpen] = useState(false);
  const objects = Object.values(INTERACTIVE_OBJECTS);

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
      {/* Object list */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass-card rounded-2xl p-3 flex flex-col gap-2 mb-1"
            style={{ minWidth: "180px" }}
          >
            <p className="text-white/40 text-xs uppercase tracking-widest px-2 py-1">
              Explore Room
            </p>
            {objects.map((obj) => (
              <button
                key={obj.id}
                onClick={() => {
                  onSelect(obj);
                  setOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-left transition-all duration-200 hover:bg-white/5"
                style={
                  selectedId === obj.id
                    ? { background: `${obj.color}15`, border: `1px solid ${obj.color}33` }
                    : {}
                }
              >
                <span>{obj.emoji}</span>
                <span className={selectedId === obj.id ? "text-white font-medium" : "text-white/70"}>
                  {obj.title}
                </span>
                {selectedId === obj.id && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: obj.color }} />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pokéball Toggle button */}
      <motion.button
        whileHover={open ? { scale: 1.05 } : { 
          scale: 1.05,
          rotate: [0, -10, 10, -10, 10, 0],
          transition: { duration: 0.4 }
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="pointer-events-auto cursor-pointer select-none bg-transparent border-none flex items-center justify-center p-0"
        style={{
          width: "48px",
          height: "48px",
          filter: "drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.45))",
          outline: "none",
        }}
        title={open ? "Close Menu" : "Explore Room"}
      >
        <PokeballIcon isOpen={open} />
      </motion.button>
    </div>
  );
};

function App() {
  const [selectedObject, setSelectedObject] = useState(null);
  const [hoveredObject, setHoveredObject] = useState(null);

  const handleObjectClick = useCallback((obj) => {
    setSelectedObject((prev) => (prev?.id === obj.id ? null : obj));
  }, []);

  const handleObjectHover = useCallback((objId) => {
    if (!objId) {
      setHoveredObject(null);
    } else {
      setHoveredObject(INTERACTIVE_OBJECTS[objId] || null);
    }
  }, []);

  const handleClose = useCallback(() => {
    setSelectedObject(null);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#050816] relative">
      {/* 3D Canvas - full screen */}
      <LoadingGate>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [12, 10, 16], fov: 46, near: 0.1, far: 150 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          style={{ position: "absolute", inset: 0, cursor: "grab" }}
        >
          <Suspense fallback={null}>
            <RoomScene
              onObjectClick={handleObjectClick}
              onObjectHover={handleObjectHover}
            />
          </Suspense>
        </Canvas>
      </LoadingGate>

      {/* UI Overlays */}
      <TopBar
        hoveredObject={hoveredObject}
        panelOpen={!!selectedObject}
      />

      {/* Side info panel */}
      <InfoPanel
        selectedObject={selectedObject}
        onClose={handleClose}
      />

      {/* Explore menu */}
      <ExploreMenu
        onSelect={handleObjectClick}
        selectedId={selectedObject?.id}
      />

      {/* Retro Music Player */}
      <MusicPlayer />

      {/* Retro System Clock */}
      <Clock />

      {/* Dim overlay when panel is open on mobile */}
      <AnimatePresence>
        {selectedObject && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-30 bg-black/20 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Hover zone indicator — shows at top center when hovering a 3D area */}
      <AnimatePresence>
        {hoveredObject && (
          <motion.div
            key={hoveredObject.id}
            initial={{ opacity: 0, y: -12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.92 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: "24px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 40,
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `2px solid ${hoveredObject.color}`,
              borderRadius: "999px",
              padding: "8px 20px 8px 14px",
              boxShadow: `0 0 18px ${hoveredObject.color}55, 0 4px 24px rgba(0,0,0,0.5)`,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "9px",
              color: "#ffffff",
              whiteSpace: "nowrap",
            }}
          >
            {/* Pulsing color dot */}
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: hoveredObject.color,
                boxShadow: `0 0 8px ${hoveredObject.color}`,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "16px" }}>{hoveredObject.emoji}</span>
            <span style={{ color: hoveredObject.color }}>{hoveredObject.title}</span>
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "8px" }}>· Click to explore</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
