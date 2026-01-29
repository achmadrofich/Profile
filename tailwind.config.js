/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2DD4BF', // Teal-400 equivalent from the site
        dark: '#0B0E14',     // Background color
      }
    },
  },
  plugins: [],
}
