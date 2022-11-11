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
        primary: "#A81DE4",
        secondary: "#CDF71F",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin"), require("@tailwindcss/forms")],
};
