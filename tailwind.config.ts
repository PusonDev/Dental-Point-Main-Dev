import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A8A",
          light: "#2563EB",
          dark: "#1E3166",
        },
        accent: "#38BDF8",
        "light-bg": "#F0F4FF",
        "dark-text": "#0F172A",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        float: "float 20s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,255,255,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255,255,255,0.6)" },
        },
        float: {
          "0%": { transform: "translateY(100vh) rotate(0deg)" },
          "100%": { transform: "translateY(-100vh) rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
