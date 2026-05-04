/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./partials/*.html",
    "./js/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'blue-900': '#1e3a8a', // Asegurando que el azul del logo esté disponible
        'teal-400': '#2dd4bf', // Color secundario del proyecto
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
