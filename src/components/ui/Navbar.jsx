import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../../constants";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActive(id);
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-3 group"
          onClick={() => { setActive(""); window.scrollTo(0, 0); }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-900 flex items-center justify-center shadow-neon group-hover:shadow-lg transition-all duration-300">
            <span className="text-white font-bold text-lg font-mono">&lt;/&gt;</span>
          </div>
          <span className="text-white font-bold text-xl hidden sm:block">
            Viet<span className="text-primary">.</span>dev
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className={`relative text-sm font-medium transition-all duration-300 group ${
                  active === link.id ? "text-primary" : "text-white/70 hover:text-white"
                }`}
              >
                {link.title}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300 rounded-full ${
                    active === link.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <motion.a
            href="mailto:viet.tran@dev.io"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-sm py-2 px-5 inline-flex items-center gap-2"
          >
            <span>Hire Me</span>
            <span>✨</span>
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-0.5 w-6 bg-white rounded"
              animate={
                mobileOpen
                  ? i === 0
                    ? { rotate: 45, y: 8 }
                    : i === 1
                    ? { opacity: 0 }
                    : { rotate: -45, y: -8 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.3 }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`w-full text-left text-base font-medium transition-colors duration-200 ${
                      active === link.id ? "text-primary" : "text-white/70"
                    }`}
                  >
                    {link.title}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="mailto:viet.tran@dev.io"
                  className="btn-primary text-sm py-2 px-5 inline-flex items-center gap-2 mt-2"
                >
                  <span>Hire Me ✨</span>
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
