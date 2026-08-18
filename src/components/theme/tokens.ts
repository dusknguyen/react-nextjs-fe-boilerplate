/** Color roles consumed by semantic UI components. */
export interface UIColorTokens {
  canvas: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  overlay: string;
  focus: string;
}

/** Spacing scale expressed in React Native density-independent pixels. */
export interface UISpacingTokens {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
}

/** Corner-radius scale used by surfaces and controls. */
export interface UIRadiusTokens {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

/** Typography scale shared by native and web renderers. */
export interface UITypographyTokens {
  fontFamily?: string;
  monoFontFamily?: string;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  lineHeightTight: number;
  lineHeightNormal: number;
  lineHeightRelaxed: number;
}

/** Motion durations used by library animation recipes. */
export interface UIMotionTokens {
  instant: number;
  fast: number;
  normal: number;
  slow: number;
}

/** Elevation values mapped to React Native elevation where supported. */
export interface UIElevationTokens {
  none: number;
  sm: number;
  md: number;
  lg: number;
}

/** Breakpoints used by adaptive layout hooks. */
export interface UIBreakpointTokens {
  compact: number;
  medium: number;
  expanded: number;
  wide: number;
}

/** Complete design-token contract of the framework. */
export interface UITokens {
  spacing: UISpacingTokens;
  radius: UIRadiusTokens;
  typography: UITypographyTokens;
  motion: UIMotionTokens;
  elevation: UIElevationTokens;
  breakpoints: UIBreakpointTokens;
}

/** Default non-color design tokens. */
export const defaultUITokens: UITokens = {
  spacing: { none: 0, xs: 4, sm: 8, md: 12, lg: 16, xl: 24, '2xl': 32, '3xl': 48 },
  radius: { none: 0, sm: 6, md: 10, lg: 14, xl: 20, full: 9999 },
  typography: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    lineHeightTight: 1.2,
    lineHeightNormal: 1.45,
    lineHeightRelaxed: 1.65,
  },
  motion: { instant: 0, fast: 140, normal: 220, slow: 360 },
  elevation: { none: 0, sm: 2, md: 6, lg: 12 },
  breakpoints: { compact: 0, medium: 600, expanded: 840, wide: 1200 },
};

/** Default light semantic colors. */
export const defaultLightColors: UIColorTokens = {
  canvas: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceMuted: '#F1F5F9',
  text: '#0F172A',
  textMuted: '#64748B',
  border: '#CBD5E1',
  primary: '#4F46E5',
  primaryForeground: '#FFFFFF',
  secondary: '#E2E8F0',
  secondaryForeground: '#0F172A',
  success: '#15803D',
  warning: '#B45309',
  danger: '#BE123C',
  info: '#0369A1',
  overlay: 'rgba(15, 23, 42, 0.48)',
  focus: '#6366F1',
};

/** Default dark semantic colors. */
export const defaultDarkColors: UIColorTokens = {
  canvas: '#020617',
  surface: '#0F172A',
  surfaceMuted: '#1E293B',
  text: '#F8FAFC',
  textMuted: '#94A3B8',
  border: '#334155',
  primary: '#818CF8',
  primaryForeground: '#0F172A',
  secondary: '#334155',
  secondaryForeground: '#F8FAFC',
  success: '#4ADE80',
  warning: '#FBBF24',
  danger: '#FB7185',
  info: '#38BDF8',
  overlay: 'rgba(2, 6, 23, 0.68)',
  focus: '#A5B4FC',
};
