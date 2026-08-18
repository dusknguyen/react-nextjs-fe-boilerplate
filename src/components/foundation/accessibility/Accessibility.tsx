'use client';

import type { ReactNode } from 'react';
import {
  AccessibilityInfo,
  StyleSheet,
  Text,
  View,
  type TextProps,
  type ViewProps,
} from 'react-native';

import { cn } from '../../core/cn';
import type { InheritedComponentProps } from '../../types';

const styles = StyleSheet.create({
  visuallyHidden: {
    height: 1,
    left: -10_000,
    overflow: 'hidden',
    position: 'absolute',
    top: -10_000,
    width: 1,
  },
});

/** Props for content available to assistive technology without visual layout cost. */
export type ScreenReaderOnlyProps = InheritedComponentProps<
  TextProps & {
    children?: ReactNode;
  }
>;

/** Keeps descriptive content available to screen readers while hiding it visually. */
export function ScreenReaderOnly({
  children,
  style,
  ...props
}: ScreenReaderOnlyProps) {
  return (
    <Text style={StyleSheet.compose(styles.visuallyHidden, style)} {...props}>
      {children}
    </Text>
  );
}

/** Props for content whose changes should be announced by assistive technology. */
export type LiveRegionProps = InheritedComponentProps<
  TextProps & {
    assertive?: boolean;
    children?: ReactNode;
    className?: string;
  }
>;

/** Announces changing status text without coupling callers to platform-specific APIs. */
export function LiveRegion({
  assertive = false,
  children,
  className,
  ...props
}: LiveRegionProps) {
  return (
    <Text
      accessibilityLiveRegion={assertive ? 'assertive' : 'polite'}
      className={cn('text-sm text-slate-700 dark:text-slate-200', className)}
      {...props}
    >
      {children}
    </Text>
  );
}

/** Props for grouping related controls into one accessible semantic region. */
export type AccessibleGroupProps = InheritedComponentProps<
  ViewProps & {
    children?: ReactNode;
    className?: string;
    label: string;
  }
>;

/** Groups related controls and exposes one concise accessibility label. */
export function AccessibleGroup({
  children,
  className,
  label,
  ...props
}: AccessibleGroupProps) {
  return (
    <View accessibilityLabel={label} className={className} {...props}>
      {children}
    </View>
  );
}

/** Announces an imperative message for flows that cannot use a live region. */
export function announceForAccessibility(message: string): void {
  const normalized = message.trim();
  if (!normalized) return;
  AccessibilityInfo.announceForAccessibility(normalized);
}
