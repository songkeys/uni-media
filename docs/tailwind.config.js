const path = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(__dirname, './src/**/*.{vue,js,ts,jsx,tsx}'),
    path.join(__dirname, './.vitepress/**/*.{vue,js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['forest'],
  },
  plugins: [require('daisyui')],
  corePlugins: {
    preflight: false,
  },
}
