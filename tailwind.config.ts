import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        textDark: "#373745",
        textLight: "#fff",
        error: "#E93E3E",
        accent: "#60C2AA",
        accentDark: "#3BA189",
        pink: "#F3BBD0",
        lightGreen: "#A8D37F",
        lightRed: "#EC7777",
        lightBlue: "#87CAE8",
        bgGray: "#F6F6F6",
        placeholder: "#B1B1B7",
      },
      boxShadow: {
        main: "0px 2px 6px 0px rgba(44, 57, 121, 0.1)",
        container: "0px 4px 20px 0px rgba(44, 57, 121, 0.09)",
        fade: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
