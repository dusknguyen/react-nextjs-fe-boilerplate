'use client';

import { Children, isValidElement, useState, type ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type KeyboardAvoidingViewProps,
  type LayoutChangeEvent,
  type ScrollViewProps,
  type TextProps,
  type ViewProps,
} from 'react-native';

import { cn } from '../core/cn';
import { ScreenReaderOnly } from './accessibility/Accessibility';
import type { InheritedComponentProps } from '../types';

/** Props accepted by row, column, and center layout primitives. */
export type FlexPrimitiveProps = InheritedComponentProps<
  ViewProps & {
    children?: ReactNode;
    className?: string;
  }
>;

/** Horizontal flex layout with explicit cross-platform direction. */
export function Row({ children, className, ...props }: FlexPrimitiveProps) {
  return (
    <View className={cn('flex-row', className)} {...props}>
      {children}
    </View>
  );
}

/** Vertical flex layout with explicit cross-platform direction. */
export function Column({ children, className, ...props }: FlexPrimitiveProps) {
  return (
    <View className={cn('flex-col', className)} {...props}>
      {children}
    </View>
  );
}

/** Centers content on both layout axes. */
export function Center({ children, className, ...props }: FlexPrimitiveProps) {
  return (
    <View className={cn('items-center justify-center', className)} {...props}>
      {children}
    </View>
  );
}

/** Props accepted by the aspect-ratio primitive. */
export type AspectRatioProps = InheritedComponentProps<
  ViewProps & {
    children?: ReactNode;
    className?: string;
    ratio?: number;
  }
>;

/** Maintains a width-to-height ratio without a third-party package. */
export function AspectRatio({
  children,
  className,
  ratio = 16 / 9,
  style,
  ...props
}: AspectRatioProps) {
  return (
    <View
      className={className}
      style={StyleSheet.compose({ aspectRatio: Math.max(0.01, ratio) }, style)}
      {...props}
    >
      {children}
    </View>
  );
}

/** Props accepted by the spacer primitive. */
export type SpacerProps = InheritedComponentProps<{
  axis?: 'horizontal' | 'vertical';
  size?: number;
}>;

/** Inserts predictable layout space using a runtime style value. */
export function Spacer({ axis = 'vertical', size = 16 }: SpacerProps) {
  const safeSize = Math.max(0, size);
  return <View style={axis === 'vertical' ? { height: safeSize } : { width: safeSize }} />;
}

/** Props accepted by the container-aware responsive grid. */
export type ResponsiveGridProps = InheritedComponentProps<
  ViewProps & {
    children?: ReactNode;
    className?: string;
    gap?: number;
    maxColumns?: number;
    minItemWidth?: number;
  }
>;

/**
 * Computes columns from the measured container instead of assuming screen width.
 * Runtime dimensions stay in `style`; static layout semantics stay in NativeWind.
 */
export function ResponsiveGrid({
  children,
  className,
  gap = 16,
  maxColumns = 4,
  minItemWidth = 240,
  onLayout,
  style,
  ...props
}: ResponsiveGridProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const safeGap = Number.isFinite(gap) ? Math.max(0, gap) : 16;
  const safeMaxColumns = Number.isFinite(maxColumns)
    ? Math.max(1, Math.floor(maxColumns))
    : 4;
  const safeMinItemWidth = Number.isFinite(minItemWidth)
    ? Math.max(1, minItemWidth)
    : 240;
  const columns = Math.max(
    1,
    Math.min(
      safeMaxColumns,
      Math.floor((containerWidth + safeGap) / (safeMinItemWidth + safeGap)) || 1,
    ),
  );
  const itemWidth =
    containerWidth > 0
      ? Math.max(0, (containerWidth - safeGap * (columns - 1)) / columns)
      : undefined;

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
    onLayout?.(event);
  };

  return (
    <View
      className={cn('flex-row flex-wrap', className)}
      onLayout={handleLayout}
      style={StyleSheet.compose({ gap: safeGap }, style)}
      {...props}
    >
      {Children.toArray(children).map((child, index) => (
        <View
          key={isValidElement(child) && child.key !== null ? child.key : index}
          className="min-w-0"
          style={itemWidth === undefined ? undefined : { width: itemWidth }}
        >
          {child}
        </View>
      ))}
    </View>
  );
}

/** Props accepted by the scroll-area primitive. */
export type ScrollAreaProps = InheritedComponentProps<
  ScrollViewProps & {
    children?: ReactNode;
    className?: string;
    contentClassName?: string;
  }
>;

/** Cross-platform scroll container with separate viewport and content classes. */
export function ScrollArea({
  children,
  className,
  contentClassName,
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollView
      className={className}
      contentContainerClassName={contentClassName}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

/** Props accepted by the keyboard-avoiding container. */
export type KeyboardAvoidingContainerProps = InheritedComponentProps<
  KeyboardAvoidingViewProps & {
    children?: ReactNode;
    className?: string;
  }
>;

/** Keyboard-aware layout with sensible iOS/native defaults. */
export function KeyboardAvoidingContainer({
  behavior = Platform.OS === 'ios' ? 'padding' : Platform.OS === 'android' ? 'height' : undefined,
  children,
  className,
  ...props
}: KeyboardAvoidingContainerProps) {
  return (
    <KeyboardAvoidingView behavior={behavior} className={className} {...props}>
      {children}
    </KeyboardAvoidingView>
  );
}

/** Platform selector accepted by PlatformOnly. */
export type PlatformTarget = 'android' | 'ios' | 'macos' | 'native' | 'web' | 'windows';

/** Props accepted by the platform-only primitive. */
export type PlatformOnlyProps = InheritedComponentProps<{
  children?: ReactNode;
  fallback?: ReactNode;
  platform: PlatformTarget | readonly PlatformTarget[];
}>;

/** Renders content only on selected runtime platforms. */
export function PlatformOnly({
  children,
  fallback = null,
  platform,
}: PlatformOnlyProps) {
  const targets: readonly PlatformTarget[] = Array.isArray(platform)
    ? platform
    : [platform];
  const matches = targets.some(
    (target) =>
      target === Platform.OS || (target === 'native' && Platform.OS !== 'web'),
  );

  return <>{matches ? children : fallback}</>;
}

/** Props accepted by heading, paragraph, caption, and hidden text primitives. */
export type TextPrimitiveProps = InheritedComponentProps<
  TextProps & {
    children?: ReactNode;
    className?: string;
  }
>;

/** High-emphasis heading text. */
export function Heading({ children, className, ...props }: TextPrimitiveProps) {
  return (
    <Text
      className={cn('text-2xl font-black text-slate-950 dark:text-white', className)}
      {...props}
    >
      {children}
    </Text>
  );
}

/** Default body text. */
export function Paragraph({ children, className, ...props }: TextPrimitiveProps) {
  return (
    <Text
      className={cn('text-base leading-6 text-slate-700 dark:text-slate-200', className)}
      {...props}
    >
      {children}
    </Text>
  );
}

/** Low-emphasis supporting text. */
export function Caption({ children, className, ...props }: TextPrimitiveProps) {
  return (
    <Text
      className={cn('text-xs text-slate-500 dark:text-slate-400', className)}
      {...props}
    >
      {children}
    </Text>
  );
}

/** Screen-reader-only content for labels and announcements. */
export function VisuallyHidden({ children, ...props }: TextPrimitiveProps) {
  return <ScreenReaderOnly {...props}>{children}</ScreenReaderOnly>;
}
