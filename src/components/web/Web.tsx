'use client';

import type { ReactNode } from 'react';
import { ScrollView, Text, View, type ViewProps } from 'react-native';

import { FadeIn, PressScale } from '../animation/Animations';
import { cn } from '../core/cn';
import type { InheritedComponentProps } from '../types';

/** Props for a centered React Native Web page shell. */
export type WebPageProps = InheritedComponentProps<
  ViewProps & {
    children?: ReactNode;
    footer?: ReactNode;
    header?: ReactNode;
    maxWidth?: number;
  }
>;

/** Centered responsive page frame that stays valid when rendered on native targets. */
export function WebPage({ children, className, footer, header, maxWidth = 1440, style, ...props }: WebPageProps) {
  return (
    <View className={cn('min-h-full flex-1 bg-canvas-light dark:bg-canvas-dark', className)} {...props}>
      {header}
      <View className="w-full flex-1 self-center" style={[{ maxWidth: Math.max(320, maxWidth) }, style]}>
        {children}
      </View>
      {footer}
    </View>
  );
}

/** Props for a web dashboard shell with persistent side navigation. */
export type WebDashboardProps = InheritedComponentProps<
  ViewProps & {
    children?: ReactNode;
    sidebar?: ReactNode;
    topBar?: ReactNode;
  }
>;

/** Responsive dashboard composition for browser-based admin/productivity interfaces. */
export function WebDashboard({ children, className, sidebar, topBar, ...props }: WebDashboardProps) {
  return (
    <View className={cn('min-h-full flex-1 bg-canvas-light dark:bg-canvas-dark', className)} {...props}>
      {topBar}
      <View className="min-h-0 flex-1 flex-row">
        {sidebar}
        <ScrollView className="min-w-0 flex-1" contentContainerClassName="grow p-4 lg:p-6">
          {children}
        </ScrollView>
      </View>
    </View>
  );
}

/** Props for a hover-oriented information card on desktop web. */
export type HoverCardProps = InheritedComponentProps<
  ViewProps & {
    children?: ReactNode;
    title?: string;
  }
>;

/** Card with web hover affordances and a native-safe fade entrance. */
export function HoverCard({ children, className, title, ...props }: HoverCardProps) {
  return (
    <FadeIn>
      <View
        className={cn(
          'rounded-2xl border border-slate-200 bg-white p-4 web:transition-all web:hover:-translate-y-0.5 web:hover:shadow-lg dark:border-slate-800 dark:bg-slate-950',
          className,
        )}
        {...props}
      >
        {title ? <Text className="mb-2 text-base font-bold text-slate-950 dark:text-white">{title}</Text> : null}
        {children}
      </View>
    </FadeIn>
  );
}

/** Props for a prominent web call-to-action tile. */
export type WebActionTileProps = InheritedComponentProps<{
  children?: ReactNode;
  description?: string;
  label: string;
  onPress?: () => void;
}>;

/** Animated keyboard/pointer-friendly action tile for React Native Web. */
export function WebActionTile({ children, description, label, onPress }: WebActionTileProps) {
  return (
    <PressScale
      accessibilityRole="button"
      className="items-start rounded-2xl border border-slate-200 bg-white p-5 web:hover:border-brand-300 web:hover:shadow-lg dark:border-slate-800 dark:bg-slate-950"
      onPress={onPress}
      pressedScale={0.99}
    >
      {children}
      <Text className="mt-2 text-base font-bold text-slate-950 dark:text-white">{label}</Text>
      {description ? (
        <Text className="mt-1 text-sm text-slate-600 dark:text-slate-300">{description}</Text>
      ) : null}
    </PressScale>
  );
}
