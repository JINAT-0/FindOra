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
        brand: {
          navy: {
            DEFAULT: "#172B4D",
            light: "#213d6b",
            dark: "#0e1a2f",
            subtle: "#f0f4f9",
          },
          warm: {
            DEFAULT: "#F7F5F0",
            paper: "#FAF8F5",
            card: "#FFFFFF",
            border: "#E7E2DA",
          },
          amber: {
            DEFAULT: "#E9A23B",
            light: "#FDF4E6",
            dark: "#C27F1C",
          },
          forest: {
            DEFAULT: "#27866B",
            light: "#EAF6F2",
            dark: "#1B5D4A",
          },
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        "card-hover": "0 10px 25px -5px rgba(23, 43, 77, 0.08), 0 8px 10px -6px rgba(23, 43, 77, 0.04)",
        dropdown: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
