const { theme, themeVariablesPlugin } = require('./tailwind.shared');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  important: 'html',
  presets: [require('nativewind/preset')],
  theme,
  plugins: [themeVariablesPlugin],
};
