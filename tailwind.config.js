/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Jura: ["Jura", "sans-serif"],
      },
      colors: {
        basicRed: "#D9280D",
        red800: "#a71c07",
        basicBlack: "#303030",
        darkRed: "#873926",
        darkRed500: "#943e29",
        dark800: "#0a0301",
        darkLight: "#f2f2f2",
      },
    },
  },
  plugins: [],
};
