/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      animation: {
        "ping-small": "ping-small 1s cubic-bezier(0, 0, 0.2, 1) infinite;",
        "toast-right": "2s linear toast-right",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        "ping-small": {
          "75%, 100%": {
            transform: "scale(1.3)",
            opacity: 0,
          },
        },
        "toast-right": {
          "0%": { transform: "translateX(0)", opacity: 0, right: 0 },
          "15%": { transform: "translateX(50%)", opacity: 1, right: "50%" },
          "85%": { transform: "translateX(50%)", opacity: 1, right: "50%" },
          "100%": { transform: "translateX(0)", opacity: 0, right: 0 },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      width: {
        "screen-scroll": "calc(100vw - 18px)",
      },
      fontFamily: {
        logo: ["lemon"],
        base: ["Oswold", "sans-serif"],
      },
      colors: {
        primary: {
          main: "#7151a1",
          50: "#f2eef6",
          100: "#e6deed",
          200: "#cdbddb",
          300: "#b49cc9",
          400: "#9b7bb7",
          500: "#825ba4",
          600: "#684884",
          700: "#4e3663",
          800: "#342442",
          900: "#1a1221",
        },
        secondary: {
          main: "#cad52a",
          50: "#fafbea",
          100: "#f5f7d4",
          200: "#ecefa9",
          300: "#e2e77e",
          400: "#d8df53",
          500: "#cfd728",
          600: "#a5ac20",
          700: "#7c8118",
          800: "#535610",
          900: "#292b08",
        },
        accent: {
          main: "#ec008b",
        },
      },
    },
  },

  plugins: [
    require("tw-elements/dist/plugin"),
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar-hide"),
  ],
};
