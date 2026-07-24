import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          50: "#fdf6ec",
          100: "#faebd2",
          200: "#f3d5a3",
          300: "#eaba6d",
          400: "#dd9a42",
          500: "#c97f2b",
          600: "#ab6521",
          700: "#874f1f",
          800: "#6e421f",
          900: "#5c391d",
        },
      },
    },
  },
  plugins: [],
};

export default config;
