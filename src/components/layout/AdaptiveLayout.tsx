'use client';

import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { ScrollView, View, useWindowDimensions, type ViewProps } from 'react-native';

import { cn } from '../core/cn';
import { getRuntimePlatform, isDesktopPlatform } from '../core/platform';
import type { InheritedComponentProps } from '../types';

/** Named layout density derived from available viewport width. */
export type AdaptiveSize = 'compact' | 'expanded' | 'medium';

/** Width thresholds used by adaptive layouts. */
export type AdaptiveBreakpoints = {
  compactMax?: number;
  mediumMax?: number;
};

/** Resolves an adaptive size from the current viewport width. */
export function resolveAdaptiveSize(
  width: number,
  { compactMax = 719, mediumMax = 1199 }: AdaptiveBreakpoints = {},
): AdaptiveSize {
  if (width <= compactMax) return 'compact';
  if (width <= mediumMax) return 'medium';
  return 'expanded';
}

/** Returns viewport-driven adaptive layout metadata. */
export function useAdaptiveLayout(breakpoints?: AdaptiveBreakpoints) {
  const { height, width } = useWindowDimensions();
  const platform = getRuntimePlatform();
  const size = resolveAdaptiveSize(width, breakpoints);
  return {
    height,
    isCompact: size === 'compact',
    isDesktopNative: isDesktopPlatform(platform),
    isExpanded: size === 'expanded',
    isMedium: size === 'medium',
    platform,
    size,
    width,
  } as const;
}

/** Props for conditionally rendering content by viewport class. */
export type AdaptiveVisibilityProps = InheritedComponentProps<{
  children?: ReactNode;
  compact?: boolean;
  expanded?: boolean;
  fallback?: ReactNode;
  medium?: boolean;
}>;

/** Renders content only for the requested adaptive viewport classes. */
export function AdaptiveVisibility({
  children,
  compact = false,
  expanded = false,
  fallback = null,
  medium = false,
}: AdaptiveVisibilityProps) {
  const { size } = useAdaptiveLayout();
  const visible =
    (size === 'compact' && compact) ||
    (size === 'medium' && medium) ||
    (size === 'expanded' && expanded);
  return <>{visible ? children : fallback}</>;
}

/** Props for the universal application scaffold. */
export type AdaptiveScaffoldProps = InheritedComponentProps<
  ViewProps & {
    bottomBar?: ReactNode;
    children?: ReactNode;
    contentClassName?: string;
    header?: ReactNode;
    rail?: ReactNode;
    sidebar?: ReactNode;
  }
>;

/**
 * Arranges the same screen for phones, tablets, desktop-native apps, and web.
 * Compact mode keeps navigation below content; larger modes place navigation beside content.
 */
export function AdaptiveScaffold({
  bottomBar,
  children,
  className,
  contentClassName,
  header,
  rail,
  sidebar,
  ...props
}: AdaptiveScaffoldProps) {
  const { isCompact, isExpanded } = useAdaptiveLayout();
  const sideContent = isExpanded ? sidebar ?? rail : rail;

  return (
    <View className={cn('flex-1 bg-canvas-light dark:bg-canvas-dark', className)} {...props}>
      {header}
      <View className="min-h-0 flex-1 flex-row">
        {!isCompact ? sideContent : null}
        <ScrollView
          className="min-w-0 flex-1"
          contentContainerClassName={cn('grow p-4 md:p-6', contentClassName)}
        >
          {children}
        </ScrollView>
      </View>
      {isCompact ? bottomBar : null}
    </View>
  );
}

/** Props for an adaptive master-detail layout. */
export type MasterDetailProps = InheritedComponentProps<
  ViewProps & {
    detail: ReactNode;
    master: ReactNode;
    masterWidth?: number;
    selected?: boolean;
  }
>;

/** Shows a two-pane desktop/tablet layout and a single active pane on compact screens. */
export function MasterDetail({
  className,
  detail,
  master,
  masterWidth = 340,
  selected = false,
  ...props
}: MasterDetailProps) {
  const { isCompact } = useAdaptiveLayout();
  const safeMasterWidth = useMemo(() => Math.max(220, masterWidth), [masterWidth]);

  if (isCompact) {
    return (
      <View className={cn('min-h-0 flex-1', className)} {...props}>
        {selected ? detail : master}
      </View>
    );
  }

  return (
    <View className={cn('min-h-0 flex-1 flex-row', className)} {...props}>
      <View
        className="border-r border-slate-200 dark:border-slate-800"
        style={{ width: safeMasterWidth }}
      >
        {master}
      </View>
      <View className="min-w-0 flex-1">{detail}</View>
    </View>
  );
}
