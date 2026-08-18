'use client';

import type { ReactNode } from 'react';
import { Text, View, type PressableProps, type TextProps, type ViewProps } from 'react-native';

import { HoverScale, PressScale } from '../animation/Animations';
import { cn } from '../core/cn';
import {
  getRuntimePlatform,
  isDesktopPlatform,
  isMobilePlatform,
  isWebPlatform,
  type UniversalPlatform,
} from '../core/platform';
import type { InheritedComponentProps } from '../types';

/** Props for rendering only on selected universal platforms. */
export type UniversalPlatformOnlyProps = InheritedComponentProps<{
  children?: ReactNode;
  fallback?: ReactNode;
  platforms: UniversalPlatform | readonly UniversalPlatform[];
}>;

/** Supports Android, iOS, macOS, Windows, and Web without external platform packages. */
export function UniversalPlatformOnly({
  children,
  fallback = null,
  platforms,
}: UniversalPlatformOnlyProps) {
  const current = getRuntimePlatform();
  const allowed = Array.isArray(platforms) ? platforms : [platforms];
  return <>{allowed.includes(current) ? children : fallback}</>;
}

/** Props for a surface whose spacing adapts to the runtime platform family. */
export type PlatformSurfaceProps = InheritedComponentProps<ViewProps & { children?: ReactNode }>;

/** Applies compact mobile spacing and denser desktop/web spacing while keeping one component API. */
export function PlatformSurface({ children, className, ...props }: PlatformSurfaceProps) {
  const platform = getRuntimePlatform();
  return (
    <View
      className={cn(
        'rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950',
        isMobilePlatform(platform) && 'p-4',
        isDesktopPlatform(platform) && 'p-3',
        isWebPlatform(platform) && 'p-4 lg:p-5',
        className,
      )}
      {...props}
    >
      {children}
    </View>
  );
}

/** Props for platform-aware explanatory text. */
export type PlatformHintProps = InheritedComponentProps<
  TextProps & {
    android?: string;
    fallback?: string;
    ios?: string;
    macos?: string;
    web?: string;
    windows?: string;
  }
>;

/** Selects concise platform-specific helper copy without branching in application screens. */
export function PlatformHint({
  android,
  className,
  fallback = '',
  ios,
  macos,
  web,
  windows,
  ...props
}: PlatformHintProps) {
  const platform = getRuntimePlatform();
  const text =
    platform === 'android'
      ? android ?? fallback
      : platform === 'ios'
        ? ios ?? fallback
        : platform === 'macos'
          ? macos ?? fallback
          : platform === 'windows'
            ? windows ?? fallback
            : platform === 'web'
              ? web ?? fallback
              : fallback;

  return (
    <Text className={cn('text-xs text-slate-500 dark:text-slate-400', className)} {...props}>
      {text}
    </Text>
  );
}


/** Props for a platform-adaptive animated press target. */
export type AdaptivePressableProps = InheritedComponentProps<
  PressableProps & {
    children?: ReactNode;
  }
>;

/**
 * Uses Android ripple plus press scale on Android, press scale on iOS, and hover+press
 * scale on Windows/macOS/Web. This keeps interaction feedback appropriate per input model.
 */
export function AdaptivePressable({
  accessibilityRole = 'button',
  children,
  ...props
}: AdaptivePressableProps) {
  const platform = getRuntimePlatform();
  if (isDesktopPlatform(platform) || isWebPlatform(platform)) {
    return (
      <HoverScale accessibilityRole={accessibilityRole} {...props}>
        {children}
      </HoverScale>
    );
  }

  return (
    <PressScale
      accessibilityRole={accessibilityRole}
      android_ripple={platform === 'android' ? { color: 'rgba(15, 23, 42, 0.12)' } : undefined}
      {...props}
    >
      {children}
    </PressScale>
  );
}
