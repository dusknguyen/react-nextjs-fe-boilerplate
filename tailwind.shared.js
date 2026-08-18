const defaultThemeVariables = {
  '--color-brand-50': '239 246 255',
  '--color-brand-100': '207 226 255',
  '--color-brand-200': '158 197 254',
  '--color-brand-300': '110 168 254',
  '--color-brand-400': '61 139 253',
  '--color-brand-500': '13 110 253',
  '--color-brand-600': '10 88 202',
  '--color-brand-700': '8 66 152',
  '--color-brand-800': '5 44 101',
  '--color-brand-900': '3 22 51',
  '--color-brand-950': '1 11 26',
  '--color-canvas-light': '248 249 250',
  '--color-canvas-dark': '33 37 41',
};

const variableColor = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;
const uiVariableColor = (name) => `rgb(var(--ui-${name}) / <alpha-value>)`;

// Shared semantic color scales for the same NativeWind API on native and web.
const colorPalette = {
  blue: { 100: '#cfe2ff', 200: '#9ec5fe', 300: '#6ea8fe', 400: '#3d8bfd', 500: '#0d6efd', 600: '#0a58ca', 700: '#084298', 800: '#052c65', 900: '#031633' },
  indigo: { 100: '#e0cffc', 200: '#c29ffa', 300: '#a370f7', 400: '#8540f5', 500: '#6610f2', 600: '#520dc2', 700: '#3d0a91', 800: '#290661', 900: '#140330' },
  purple: { 100: '#e2d9f3', 200: '#c5b3e6', 300: '#a98eda', 400: '#8c68cd', 500: '#6f42c1', 600: '#59359a', 700: '#432874', 800: '#2c1a4d', 900: '#160d27' },
  pink: { 100: '#f7d6e6', 200: '#efadce', 300: '#e685b5', 400: '#de5c9d', 500: '#d63384', 600: '#ab296a', 700: '#801f4f', 800: '#561435', 900: '#2b0a1a' },
  red: { 100: '#f8d7da', 200: '#f1aeb5', 300: '#ea868f', 400: '#e35d6a', 500: '#dc3545', 600: '#b02a37', 700: '#842029', 800: '#58151c', 900: '#2c0b0e' },
  orange: { 100: '#ffe5d0', 200: '#fecba1', 300: '#feb272', 400: '#fd9843', 500: '#fd7e14', 600: '#ca6510', 700: '#984c0c', 800: '#653208', 900: '#331904' },
  yellow: { 100: '#fff3cd', 200: '#ffe69c', 300: '#ffda6a', 400: '#ffcd39', 500: '#ffc107', 600: '#cc9a06', 700: '#997404', 800: '#664d03', 900: '#332701' },
  green: { 100: '#d1e7dd', 200: '#a3cfbb', 300: '#75b798', 400: '#479f76', 500: '#198754', 600: '#146c43', 700: '#0f5132', 800: '#0a3622', 900: '#051b11' },
  teal: { 100: '#d2f4ea', 200: '#a6e9d5', 300: '#79dfc1', 400: '#4dd4ac', 500: '#20c997', 600: '#1aa179', 700: '#13795b', 800: '#0d503c', 900: '#06281e' },
  cyan: { 100: '#cff4fc', 200: '#9eeaf9', 300: '#6edff6', 400: '#3dd5f3', 500: '#0dcaf0', 600: '#0aa2c0', 700: '#087990', 800: '#055160', 900: '#032830' },
  gray: { 100: '#f8f9fa', 200: '#e9ecef', 300: '#dee2e6', 400: '#ced4da', 500: '#adb5bd', 600: '#6c757d', 700: '#495057', 800: '#343a40', 900: '#212529' },
};

const withDefault = (scale, value) => ({ ...scale, DEFAULT: value });

/** @type {import('tailwindcss').Config['theme']} */
const theme = {
  screens: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  extend: {
    colors: {
      brand: {
        50: variableColor('brand-50'),
        100: variableColor('brand-100'),
        200: variableColor('brand-200'),
        300: variableColor('brand-300'),
        400: variableColor('brand-400'),
        500: variableColor('brand-500'),
        600: variableColor('brand-600'),
        700: variableColor('brand-700'),
        800: variableColor('brand-800'),
        900: variableColor('brand-900'),
        950: variableColor('brand-950'),
      },
      canvas: {
        light: variableColor('canvas-light'),
        dark: variableColor('canvas-dark'),
      },
      ui: {
        canvas: uiVariableColor('canvas'),
        surface: uiVariableColor('surface'),
        'surface-muted': uiVariableColor('surface-muted'),
        text: uiVariableColor('text'),
        'text-muted': uiVariableColor('text-muted'),
        border: uiVariableColor('border'),
        primary: uiVariableColor('primary'),
        'primary-foreground': uiVariableColor('primary-foreground'),
        secondary: uiVariableColor('secondary'),
        'secondary-foreground': uiVariableColor('secondary-foreground'),
        success: uiVariableColor('success'),
        warning: uiVariableColor('warning'),
        danger: uiVariableColor('danger'),
        info: uiVariableColor('info'),
        focus: uiVariableColor('focus'),
      },
      blue: colorPalette.blue,
      indigo: colorPalette.indigo,
      purple: colorPalette.purple,
      pink: colorPalette.pink,
      red: colorPalette.red,
      orange: colorPalette.orange,
      yellow: colorPalette.yellow,
      green: colorPalette.green,
      teal: colorPalette.teal,
      cyan: colorPalette.cyan,
      gray: colorPalette.gray,
      primary: withDefault(colorPalette.blue, colorPalette.blue[500]),
      secondary: withDefault(colorPalette.gray, colorPalette.gray[600]),
      success: withDefault(colorPalette.green, colorPalette.green[500]),
      info: withDefault(colorPalette.cyan, colorPalette.cyan[500]),
      warning: withDefault(colorPalette.yellow, colorPalette.yellow[500]),
      danger: withDefault(colorPalette.red, colorPalette.red[500]),
      light: withDefault(colorPalette.gray, colorPalette.gray[100]),
      dark: withDefault(colorPalette.gray, colorPalette.gray[900]),
    },
    spacing: {
      'ui-xs': 'var(--ui-space-xs)',
      'ui-sm': 'var(--ui-space-sm)',
      'ui-md': 'var(--ui-space-md)',
      'ui-lg': 'var(--ui-space-lg)',
      'ui-xl': 'var(--ui-space-xl)',
      'ui-2xl': 'var(--ui-space-2xl)',
      'ui-3xl': 'var(--ui-space-3xl)',
    },
    borderRadius: {
      'ui-sm': 'var(--ui-radius-sm)',
      'ui-md': 'var(--ui-radius-md)',
      'ui-lg': 'var(--ui-radius-lg)',
      'ui-xl': 'var(--ui-radius-xl)',
    },
    fontSize: {
      'ui-xs': 'var(--ui-font-xs)',
      'ui-sm': 'var(--ui-font-sm)',
      'ui-md': 'var(--ui-font-md)',
      'ui-lg': 'var(--ui-font-lg)',
      'ui-xl': 'var(--ui-font-xl)',
      'ui-2xl': 'var(--ui-font-2xl)',
      'ui-3xl': 'var(--ui-font-3xl)',
    },
  },
};

function themeVariablesPlugin({ addBase }) {
  addBase({ ':root': defaultThemeVariables });
}

module.exports = { colorPalette, defaultThemeVariables, theme, themeVariablesPlugin };
