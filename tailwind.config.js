/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#E5F2FF",
          200: "#3A97F7",
          300: "#1380F0",
          400: "#005CB9",
        },
      },
      fontFamily:{
        'inter': ['Inter' , 'sans-serif']
      }
    },
  },
  plugins: [],
}

