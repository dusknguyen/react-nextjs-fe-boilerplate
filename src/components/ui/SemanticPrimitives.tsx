'use client';

import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  type PressableProps,
  type TextProps,
  type ViewProps,
} from 'react-native';

import { PressScale } from '../animation/Animations';
import { cn } from '../core/cn';
import { createVariants } from '../styling/variants';

/** Props for UISurface. */
export interface UISurfaceProps extends ViewProps {
  children?: ReactNode;
  className?: string;
  elevated?: boolean;
}

/** Semantic surface driven by UI theme variables. */
export function UISurface({ children, className, elevated = false, style, ...props }: UISurfaceProps) {
  return (
    <View
      className={cn(
        'border border-ui-border bg-ui-surface',
        elevated && 'shadow-md',
        className,
      )}
      {...props}
      style={elevated ? [{ elevation: 6 }, style] : style}
    >
      {children}
    </View>
  );
}

/** Supported semantic text tones. */
export type UITextTone = 'danger' | 'default' | 'info' | 'muted' | 'primary' | 'success' | 'warning';

const textToneClasses: Record<UITextTone, string> = {
  danger: 'text-ui-danger',
  default: 'text-ui-text',
  info: 'text-ui-info',
  muted: 'text-ui-text-muted',
  primary: 'text-ui-primary',
  success: 'text-ui-success',
  warning: 'text-ui-warning',
};

/** Props for UIText. */
export interface UITextProps extends TextProps {
  children?: ReactNode;
  className?: string;
  tone?: UITextTone;
}

/** Semantic text primitive backed by theme variables. */
export function UIText({ children, className, tone = 'default', ...props }: UITextProps) {
  return <Text className={cn('text-base', textToneClasses[tone], className)} {...props}>{children}</Text>;
}

/** Supported UI action variants. */
export type UIActionVariant = 'danger' | 'ghost' | 'outline' | 'primary' | 'secondary';

/** Supported UI action sizes. */
export type UIActionSize = 'lg' | 'md' | 'sm';

const actionClasses = createVariants({
  base: 'min-h-11 flex-row items-center justify-center rounded-ui-lg border px-ui-lg',
  variants: {
    variant: {
      primary: 'border-ui-primary bg-ui-primary',
      secondary: 'border-ui-secondary bg-ui-secondary',
      outline: 'border-ui-border bg-transparent',
      ghost: 'border-transparent bg-transparent',
      danger: 'border-ui-danger bg-ui-danger',
    },
    size: {
      sm: 'min-h-9 px-ui-md',
      md: 'min-h-11 px-ui-lg',
      lg: 'min-h-13 px-ui-xl',
    },
  },
  defaults: { variant: 'primary', size: 'md' },
});

const actionTextClasses: Record<UIActionVariant, string> = {
  primary: 'text-ui-primary-foreground',
  secondary: 'text-ui-secondary-foreground',
  outline: 'text-ui-text',
  ghost: 'text-ui-text',
  danger: 'text-white',
};

/** Props for UIAction. */
export interface UIActionProps extends Omit<PressableProps, 'children'> {
  children?: ReactNode;
  className?: string;
  label?: string;
  loading?: boolean;
  size?: UIActionSize;
  variant?: UIActionVariant;
}

/** Theme-aware animated action primitive for buttons and command surfaces. */
export function UIAction({
  children,
  className,
  disabled,
  label,
  loading = false,
  size = 'md',
  variant = 'primary',
  ...props
}: UIActionProps) {
  const inactive = disabled || loading;
  return (
    <PressScale
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive, busy: loading }}
      className={cn(actionClasses({ size, variant }), inactive && 'opacity-50', className)}
      disabled={inactive}
      {...props}
    >
      {loading ? <ActivityIndicator className={actionTextClasses[variant]} /> : children ?? (
        <Text className={cn('font-semibold', actionTextClasses[variant])}>{label}</Text>
      )}
    </PressScale>
  );
}

/** Props for UICard. */
export interface UICardProps extends UISurfaceProps {
  interactive?: boolean;
  onPress?: PressableProps['onPress'];
}

/** Theme-aware card that can optionally behave as an animated button. */
export function UICard({ children, className, interactive = false, onPress, ...props }: UICardProps) {
  if (interactive || onPress) {
    return (
      <PressScale
        accessibilityRole="button"
        className={cn('rounded-ui-xl border border-ui-border bg-ui-surface p-ui-lg shadow-sm', className)}
        onPress={onPress}
      >
        {children}
      </PressScale>
    );
  }
  return <UISurface className={cn('rounded-ui-xl p-ui-lg', className)} {...props}>{children}</UISurface>;
}
