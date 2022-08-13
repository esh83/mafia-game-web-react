/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "primary-1": "#264653",
      "primary-2": "#2A9D8F",
      "secondary-1": "#E9C46A",
      "secondary-2": "#F4A261",
      "dark-color" : "#2a2b2e" ,
      "transparent" : "transparent",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red : colors.red
    },
  },
  plugins: [],
};
