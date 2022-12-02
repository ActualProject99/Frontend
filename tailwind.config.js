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
        "toast-right": "1.5s linear toast-right",
        wiggle: "wiggle 1s ease-in-out infinite",
        "text-erase": "2s linear text-erase",
        pulsate: "pulsate 1s ease-in-out infinite alternate;",
        flicker: "flicker 1.5s infinite alternate;",
        "popup-right": "0.3s ease-in popup-right",
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
        "text-erase": {
          "0%": { width: "140px" },
          "100%": { width: 0 },
        },
        pulsate: {
          "100%": {
            /* Larger blur radius */ textShadow:
              "0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #f09, 0 0 80px #f09, 0 0 90px #f09, 0 0 100px #f09, 0 0 150px #f09;",
          },
          "0%": {
            /* A slightly smaller blur radius */ textShadow:
              "0 0 4px #fff, 0 0 10px #fff, 0 0 18px #fff, 0 0 38px #f09, 0 0 73px #f09, 0 0 80px #f09, 0 0 94px #f09, 0 0 140px #f09;",
          },
        },
        flicker: {
          "0%, 18%, 22%, 25%, 53%, 57%, 100% ": {
            textShadow: `0 0 4px #fff,
              0 0 11px #fff,
              0 0 19px #fff,
              0 0 40px #ec008b,
              0 0 80px #ec008b,
              0 0 90px #ec008b,
              0 0 100px #ec008b,
              0 0 150px #ec008b;`,
          },
          "20%, 24%, 55%": {
            textShadow: "none;",
          },
        },
        "popup-right": {
          "0%": { transform: "translateX(0)", opacity: 0, right: 0 },
          "100%": { transform: "translateX(50%)", opacity: 1, right: "50%" },
        },
      },
      width: {
        "screen-scroll": "calc(100vw - 18px)",
        "screen-scroll-double": "calc(100vw - 40px)",
      },
      backgroundImage: {
        radial:
          "radial-gradient(closest-side, rgba(0,0,0,0.90), rgba(0,0,0), #000);",
        "left-top-hall":
          "radial-gradient(ellipse at left top,rgba(0, 0, 0, 0) 20%,#ffffff 20%,#ffffff 100%,rgba(2, 0, 36, 1) 100%);",
        "center-top-hall":
          "radial-gradient(ellipse at center top,rgba(0, 0, 0, 0) 20%,#ffffff 20%,#ffffff 100%,rgba(2, 0, 36, 1) 100%);",
        "right-top-hall":
          "radial-gradient(ellipse at right top,rgba(0, 0, 0, 0) 20%,#ffffff 20%,#ffffff 100%,rgba(2, 0, 36, 1) 100%);",
        "left-center-hall":
          "radial-gradient(ellipse at left center,rgba(0, 0, 0, 0) 20%,#ffffff 20%,#ffffff 100%,rgba(2, 0, 36, 1) 100%);",
        "right-center-hall":
          "radial-gradient(ellipse at right center,rgba(0, 0, 0, 0) 20%,#ffffff 20%,#ffffff 100%,rgba(2, 0, 36, 1) 100%);",
      },
      fontFamily: {
        logo: ["lemon"],
        base: ["Oswold", "sans-serif"],
        neon: ["NEON"],
        NeonBines: ["NeonBines"],
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
