'use client';

import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { vars } from 'nativewind';

/** Sparse semantic color overrides for a nested UI scope. */
export interface UIScopeColors {
  primary?: string;
  primaryForeground?: string;
  surface?: string;
  text?: string;
  border?: string;
  overlay?: string;
}

/** Props for UIScope. */
export interface UIScopeProps extends Omit<ViewProps, 'children'> {
  children?: ReactNode;
  colors?: UIScopeColors;
}

function rgbChannels(color: string): string {
  const match = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(color.trim());
  if (!match) return color;
  return `${parseInt(match[1] ?? '00', 16)} ${parseInt(match[2] ?? '00', 16)} ${parseInt(match[3] ?? '00', 16)}`;
}

/** Overrides selected NativeWind semantic variables for one subtree. */
export function UIScope({ children, colors = {}, style, ...props }: UIScopeProps) {
  const values: Record<string, string> = {};
  if (colors.primary) values['--ui-primary'] = rgbChannels(colors.primary);
  if (colors.primaryForeground) values['--ui-primary-foreground'] = rgbChannels(colors.primaryForeground);
  if (colors.surface) values['--ui-surface'] = rgbChannels(colors.surface);
  if (colors.text) values['--ui-text'] = rgbChannels(colors.text);
  if (colors.border) values['--ui-border'] = rgbChannels(colors.border);
  if (colors.overlay) values['--ui-overlay'] = colors.overlay;
  return <View {...props} style={[vars(values), style]}>{children}</View>;
}
