import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F2FBF9",
        card: "#FFFFFF",
        ink: "#12213B",
        crate: {
          blue: "#2F6FED",
          orange: "#FF8A34",
          green: "#17B978",
          red: "#FF4E6A",
          yellow: "#FFC93C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        crate: "4px 4px 0 0 rgba(18,33,59,1)",
        "crate-sm": "2px 2px 0 0 rgba(18,33,59,1)",
      },
      borderRadius: {
        crate: "0.75rem",
      },
    },
  },
  plugins: [],
};
export default config;
