const { theme, themeVariablesPlugin } = require('./tailwind.shared');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme,
  plugins: [themeVariablesPlugin],
};
