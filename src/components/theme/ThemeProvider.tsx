'use client';

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { View, useColorScheme, type ViewProps } from 'react-native';
import { vars } from 'nativewind';

import { defaultUITheme, type UIResolvedThemeMode, type UITheme, type UIThemeMode } from './createTheme';
import type { UIColorTokens } from './tokens';

/** Value exposed by UIThemeProvider. */
export interface UIThemeContextValue {
  theme: UITheme;
  mode: UIThemeMode;
  resolvedMode: UIResolvedThemeMode;
  colors: UIColorTokens;
}

const ThemeContext = createContext<UIThemeContextValue | null>(null);

function hexToRgbChannels(color: string): string {
  const normalized = color.trim();
  const match = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(normalized);
  if (!match) return normalized;
  return `${Number.parseInt(match[1] ?? '00', 16)} ${Number.parseInt(match[2] ?? '00', 16)} ${Number.parseInt(match[3] ?? '00', 16)}`;
}

function themeVariables(theme: UITheme, colors: UIColorTokens) {
  const { radius, spacing, typography } = theme.tokens;
  return vars({
    '--ui-canvas': hexToRgbChannels(colors.canvas),
    '--ui-surface': hexToRgbChannels(colors.surface),
    '--ui-surface-muted': hexToRgbChannels(colors.surfaceMuted),
    '--ui-text': hexToRgbChannels(colors.text),
    '--ui-text-muted': hexToRgbChannels(colors.textMuted),
    '--ui-border': hexToRgbChannels(colors.border),
    '--ui-primary': hexToRgbChannels(colors.primary),
    '--ui-primary-foreground': hexToRgbChannels(colors.primaryForeground),
    '--ui-secondary': hexToRgbChannels(colors.secondary),
    '--ui-secondary-foreground': hexToRgbChannels(colors.secondaryForeground),
    '--ui-success': hexToRgbChannels(colors.success),
    '--ui-warning': hexToRgbChannels(colors.warning),
    '--ui-danger': hexToRgbChannels(colors.danger),
    '--ui-info': hexToRgbChannels(colors.info),
    '--ui-focus': hexToRgbChannels(colors.focus),
    '--ui-overlay': colors.overlay,
    '--ui-space-xs': `${spacing.xs}px`,
    '--ui-space-sm': `${spacing.sm}px`,
    '--ui-space-md': `${spacing.md}px`,
    '--ui-space-lg': `${spacing.lg}px`,
    '--ui-space-xl': `${spacing.xl}px`,
    '--ui-space-2xl': `${spacing['2xl']}px`,
    '--ui-space-3xl': `${spacing['3xl']}px`,
    '--ui-radius-sm': `${radius.sm}px`,
    '--ui-radius-md': `${radius.md}px`,
    '--ui-radius-lg': `${radius.lg}px`,
    '--ui-radius-xl': `${radius.xl}px`,
    '--ui-font-xs': `${typography.xs}px`,
    '--ui-font-sm': `${typography.sm}px`,
    '--ui-font-md': `${typography.md}px`,
    '--ui-font-lg': `${typography.lg}px`,
    '--ui-font-xl': `${typography.xl}px`,
    '--ui-font-2xl': `${typography['2xl']}px`,
    '--ui-font-3xl': `${typography['3xl']}px`,
  });
}

/** Props for the library theme provider. */
export interface UIThemeProviderProps extends Omit<ViewProps, 'children'> {
  children?: ReactNode;
  mode?: UIThemeMode;
  theme?: UITheme;
}

/** Provides design tokens, semantic colors and NativeWind CSS variables to descendants. */
export function UIThemeProvider({
  children,
  mode = 'system',
  theme = defaultUITheme,
  style,
  ...props
}: UIThemeProviderProps) {
  const systemScheme = useColorScheme();
  const resolvedMode: UIResolvedThemeMode = mode === 'system'
    ? systemScheme === 'dark' ? 'dark' : 'light'
    : mode;
  const colors = theme.colors[resolvedMode];

  const value = useMemo<UIThemeContextValue>(
    () => ({ colors, mode, resolvedMode, theme }),
    [colors, mode, resolvedMode, theme],
  );
  const variableStyle = useMemo(() => themeVariables(theme, colors), [colors, theme]);

  return (
    <ThemeContext.Provider value={value}>
      <View {...props} style={[{ flex: 1, backgroundColor: colors.canvas }, variableStyle, style]}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

/** Reads the nearest library theme; throws when the provider is missing. */
export function useUITheme(): UIThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useUITheme must be used inside UIThemeProvider.');
  return value;
}

/** Reads the nearest library theme or falls back to the default light theme. */
export function useOptionalUITheme(): UIThemeContextValue {
  const value = useContext(ThemeContext);
  if (value) return value;
  return {
    theme: defaultUITheme,
    mode: 'system',
    resolvedMode: 'light',
    colors: defaultUITheme.colors.light,
  };
}
