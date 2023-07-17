/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#66cc8a",

          "secondary": "#FFA500",

          "accent": "#ea5234",

          "neutral": "#333c4d",

          "base-100": "#ffffff",

          "info": "#3abff8",

          "success": "#36d399",

          "warning": "#fbbd23",

          "error": "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

