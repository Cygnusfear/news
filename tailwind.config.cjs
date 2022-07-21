/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "index.html"],
  theme: {
    extend: {
      colors: {
        salomie: {
          50: "#fffaeb",
          100: "#fff0c6",
          200: "#ffe08a",
          300: "#ffc94a",
          400: "#ffb320",
          500: "#f98f07",
          600: "#dd6902",
          700: "#b74806",
          800: "#94360c",
          900: "#7a2d0d",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  important: true,
};
