/** @type {import('tailwindcss').Config} */
import tailwindScrollbarHide from 'tailwind-scrollbar-hide'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rye: ['Rye', 'sans-serif'],
        orbitron: ["Orbitron", 'sans-serif']
      },
      screens: {
        'xs': '420px',
        'xxs': '370px',
      },
    },
  },
  plugins: [
    tailwindScrollbarHide
  ],
}