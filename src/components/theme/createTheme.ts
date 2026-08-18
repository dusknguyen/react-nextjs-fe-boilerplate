import {
  defaultDarkColors,
  defaultLightColors,
  defaultUITokens,
  type UIColorTokens,
  type UITokens,
} from './tokens';

/** Active color mode requested by the application. */
export type UIThemeMode = 'dark' | 'light' | 'system';

/** Resolved theme mode after applying the system preference. */
export type UIResolvedThemeMode = 'dark' | 'light';

/** A library theme with light/dark semantic colors and shared design tokens. */
export interface UITheme {
  name: string;
  colors: {
    light: UIColorTokens;
    dark: UIColorTokens;
  };
  tokens: UITokens;
}

/** Partial theme input accepted by createUITheme. */
export interface UIThemeInput {
  name?: string;
  colors?: {
    light?: Partial<UIColorTokens>;
    dark?: Partial<UIColorTokens>;
  };
  tokens?: {
    spacing?: Partial<UITokens['spacing']>;
    radius?: Partial<UITokens['radius']>;
    typography?: Partial<UITokens['typography']>;
    motion?: Partial<UITokens['motion']>;
    elevation?: Partial<UITokens['elevation']>;
    breakpoints?: Partial<UITokens['breakpoints']>;
  };
}

/** Creates an immutable-by-convention library theme from sparse overrides. */
export function createUITheme(input: UIThemeInput = {}): UITheme {
  return {
    name: input.name ?? 'default',
    colors: {
      light: { ...defaultLightColors, ...input.colors?.light },
      dark: { ...defaultDarkColors, ...input.colors?.dark },
    },
    tokens: {
      spacing: { ...defaultUITokens.spacing, ...input.tokens?.spacing },
      radius: { ...defaultUITokens.radius, ...input.tokens?.radius },
      typography: { ...defaultUITokens.typography, ...input.tokens?.typography },
      motion: { ...defaultUITokens.motion, ...input.tokens?.motion },
      elevation: { ...defaultUITokens.elevation, ...input.tokens?.elevation },
      breakpoints: { ...defaultUITokens.breakpoints, ...input.tokens?.breakpoints },
    },
  };
}

/** Default library theme. */
export const defaultUITheme = createUITheme();
