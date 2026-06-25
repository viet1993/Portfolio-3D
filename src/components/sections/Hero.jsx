import { Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { heroData } from "../../constants";
import HeroCanvas from "../canvas/HeroCanvas";
import Stars from "../canvas/Stars";

const Typewriter = ({ words }) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const word = words[idx];
    let speed = isDeleting ? 60 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && charIdx < word.length) {
        setText(word.substring(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      } else if (isDeleting && charIdx > 0) {
        setText(word.substring(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      } else if (!isDeleting && charIdx === word.length) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && charIdx === 0) {
        setIsDeleting(false);
        setIdx((prev) => (prev + 1) % words.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, idx, words]);

  return (
    <span className="gradient-text">
      {text}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
};

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Starfield Background */}
      <Stars />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(145,94,255,0.12) 0%, transparent 60%), radial-gradient(ellipse at 30% 50%, rgba(0,217,255,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/70 text-sm">Available for work</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="section-title text-white mb-4"
            >
              Hi, I'm{" "}
              <span className="neon-text text-primary">{heroData.name}</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-2xl md:text-3xl font-semibold mb-6 min-h-[40px]"
            >
              <Typewriter words={heroData.roles} />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="text-white/60 text-base leading-relaxed mb-10 max-w-xl"
            >
              {heroData.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToProjects}
                className="btn-primary flex items-center gap-2 text-base"
              >
                View My Work
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline flex items-center gap-2 text-base"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social quick links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-5 mt-10"
            >
              {[
                { icon: "🐙", label: "GitHub", url: "https://github.com" },
                { icon: "💼", label: "LinkedIn", url: "https://linkedin.com" },
                { icon: "🐦", label: "Twitter", url: "https://twitter.com" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-white/40 hover:text-white transition-colors duration-200 text-xl"
                  title={s.label}
                >
                  {s.icon}
                </motion.a>
              ))}
              <div className="h-px flex-1 bg-white/10 max-w-[60px]" />
              <span className="text-white/30 text-xs">Follow me</span>
            </motion.div>
          </div>

          {/* Right: 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="w-full h-[500px] lg:h-[600px] relative"
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
              }
            >
              <HeroCanvas />
            </Suspense>

            {/* Floating stat cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 right-0 glass-card rounded-xl px-4 py-3 hidden lg:block"
            >
              <p className="text-2xl font-bold gradient-text-violet">50+</p>
              <p className="text-white/50 text-xs">Projects Done</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-16 left-0 glass-card rounded-xl px-4 py-3 hidden lg:block"
            >
              <p className="text-2xl font-bold text-secondary">3+</p>
              <p className="text-white/50 text-xs">Years Exp.</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-2 pb-8"
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
