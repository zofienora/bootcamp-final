/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'cycle-red': '#8B0000',
        'cycle-pink': '#FFB6C1',
        'cycle-purple': '#9370DB',
        'cycle-blue': '#4169E1',
      }
    },
  },
  plugins: [],
}
