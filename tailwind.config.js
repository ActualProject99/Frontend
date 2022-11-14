/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#A81DE4",
          50: "#f6e9fc",
          100: "#edd2f9",
          200: "#dca5f3",
          300: "#ca78ed",
          400: "#b84be7",
          500: "#A81DE4",
          600: "#8518b4",
          700: "#641287",
          800: "#430c5a",
          900: "#21062d",
        },
        secondary: {
          main: "#cdf71f",
          50: "#f9fee6",
          100: "#f3fdce",
          200: "#e7fb9d",
          300: "#daf96c",
          400: "#cef73b",
          500: "#c2f50a",
          600: "#9bc408",
          700: "#749306",
          800: "#4e6204",
          900: "#273102",
        },
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin"), require("@tailwindcss/forms")],
};
