/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.{js,jsx,ts,tsx}",
    "app/**/*.{ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      green: "#1BD15D",
      light_green: "#E8FBED",
      dark_green: "#CFE4D4",
      grey: "#9B9B9B",
      white: "#FFFFFF",
      black: "#0A0909",
    },
    extend: {
      fontFamily: {
        ppr: "Poppins_400Regular",
        pps: "Poppins_600SemiBold",
        ppb: "Poppins_700Bold",
      },
    },
  },
  plugins: [],
};
