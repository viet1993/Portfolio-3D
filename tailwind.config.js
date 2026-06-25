/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#915EFF",
        secondary: "#00D9FF",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        "neon-violet": "#915EFF",
        "neon-cyan": "#00D9FF",
        "neon-pink": "#FF6B9D",
        "space-dark": "#050816",
        "card-dark": "#1d1836",
        "glass": "rgba(255,255,255,0.05)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        neon: "0 0 20px #915EFF, 0 0 40px #915EFF44",
        cyan: "0 0 20px #00D9FF, 0 0 40px #00D9FF44",
        pink: "0 0 20px #FF6B9D, 0 0 40px #FF6B9D44",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #915EFF, 0 0 10px #915EFF" },
          "100%": { boxShadow: "0 0 20px #915EFF, 0 0 40px #915EFF, 0 0 80px #915EFF" },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 5px #00D9FF44" },
          "50%": { boxShadow: "0 0 20px #00D9FF, 0 0 40px #00D9FF88" },
        },
      },
    },
  },
  plugins: [],
};
