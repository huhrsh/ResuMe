/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      transformOrigin: {
        'top-left': 'top left',
      },
    },
  },
  plugins: [],
}

