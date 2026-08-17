export type AccentTheme = 'grove' | 'ocean' | 'sunset' | 'violet';
export type AppearanceMode = 'dark' | 'light' | 'system';

type ThemeDefinition = {
  description: string;
  label: string;
  swatchClassName: string;
  variables: Record<string, string>;
};

export const accentThemes: Record<AccentTheme, ThemeDefinition> = {
  violet: {
    label: 'Violet',
    description: 'Expressive and focused',
    swatchClassName: 'bg-indigo-500',
    variables: {
      '--color-brand-50': '248 245 255', '--color-brand-100': '224 207 252',
      '--color-brand-200': '194 159 250', '--color-brand-300': '163 112 247',
      '--color-brand-400': '133 64 245', '--color-brand-500': '102 16 242',
      '--color-brand-600': '82 13 194', '--color-brand-700': '61 10 145',
      '--color-brand-800': '41 6 97', '--color-brand-900': '20 3 48',
      '--color-brand-950': '10 2 24', '--color-canvas-light': '250 248 252',
      '--color-canvas-dark': '24 20 31',
    },
  },
  ocean: {
    label: 'Ocean',
    description: 'Familiar and confident',
    swatchClassName: 'bg-blue-500',
    variables: {
      '--color-brand-50': '239 246 255', '--color-brand-100': '207 226 255',
      '--color-brand-200': '158 197 254', '--color-brand-300': '110 168 254',
      '--color-brand-400': '61 139 253', '--color-brand-500': '13 110 253',
      '--color-brand-600': '10 88 202', '--color-brand-700': '8 66 152',
      '--color-brand-800': '5 44 101', '--color-brand-900': '3 22 51',
      '--color-brand-950': '1 11 26', '--color-canvas-light': '248 249 250',
      '--color-canvas-dark': '33 37 41',
    },
  },
  grove: {
    label: 'Grove',
    description: 'Positive and grounded',
    swatchClassName: 'bg-green-500',
    variables: {
      '--color-brand-50': '242 250 246', '--color-brand-100': '209 231 221',
      '--color-brand-200': '163 207 187', '--color-brand-300': '117 183 152',
      '--color-brand-400': '71 159 118', '--color-brand-500': '25 135 84',
      '--color-brand-600': '20 108 67', '--color-brand-700': '15 81 50',
      '--color-brand-800': '10 54 34', '--color-brand-900': '5 27 17',
      '--color-brand-950': '3 14 9', '--color-canvas-light': '247 250 248',
      '--color-canvas-dark': '17 27 22',
    },
  },
  sunset: {
    label: 'Sunset',
    description: 'Warm and energetic',
    swatchClassName: 'bg-orange-500',
    variables: {
      '--color-brand-50': '255 248 242', '--color-brand-100': '255 229 208',
      '--color-brand-200': '254 203 161', '--color-brand-300': '254 178 114',
      '--color-brand-400': '253 152 67', '--color-brand-500': '253 126 20',
      '--color-brand-600': '202 101 16', '--color-brand-700': '152 76 12',
      '--color-brand-800': '101 50 8', '--color-brand-900': '51 25 4',
      '--color-brand-950': '26 13 2', '--color-canvas-light': '252 249 246',
      '--color-canvas-dark': '31 23 17',
    },
  },
};

export const accentThemeNames = Object.keys(accentThemes) as AccentTheme[];

export type ThemePreferences = {
  accent: AccentTheme;
  appearance: AppearanceMode;
};

export const initialThemePreferences: ThemePreferences = {
  accent: 'ocean',
  appearance: 'system',
};

export function selectAccent(preferences: ThemePreferences, accent: AccentTheme): ThemePreferences {
  return { ...preferences, accent };
}

export function selectAppearance(
  preferences: ThemePreferences,
  appearance: AppearanceMode,
): ThemePreferences {
  return { ...preferences, appearance };
}
