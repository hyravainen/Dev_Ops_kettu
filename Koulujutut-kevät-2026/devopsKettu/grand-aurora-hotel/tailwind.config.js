/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hotel: {
          50: '#f4f6f9',
          100: '#e5eaf2',
          500: '#3b5998',
          600: '#2d4373',
          700: '#1e2d4f',
          800: '#141e36',
          900: '#0a101f',
          gold: '#d4af37',
          'gold-light': '#f3e5ab'
        }
      }
    },
  },
  plugins: [],
}