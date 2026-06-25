import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="loader-bg">
      <div className="flex flex-col items-center gap-8">
        {/* Animated Logo */}
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          {/* Outer ring */}
          <div className="w-20 h-20 rounded-full border-2 border-transparent"
            style={{
              background: "linear-gradient(#050816, #050816) padding-box, linear-gradient(135deg, #915EFF, #00D9FF, #FF6B9D) border-box"
            }}
          />
        </motion.div>

        {/* Inner pulsing dot */}
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-primary"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-white/60 text-sm font-mono tracking-widest uppercase">
            Loading Experience
          </p>
          <div className="flex justify-center gap-1 mt-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
