'use client';

import type { ReactNode } from 'react';
import { Text, View, type ViewProps } from 'react-native';

import { FadeIn, PressScale } from '../animation/Animations';
import { cn } from '../core/cn';
import type { InheritedComponentProps } from '../types';

/** Props for an empty/error/no-results state. */
export type EmptyStateProps = InheritedComponentProps<
  ViewProps & {
    action?: ReactNode;
    description?: string;
    icon?: ReactNode;
    title: string;
  }
>;

/** Explains an empty state and optionally presents a recovery action. */
export function EmptyState({ action, className, description, icon, title, ...props }: EmptyStateProps) {
  return (
    <FadeIn>
      <View className={cn('items-center justify-center px-5 py-12', className)} {...props}>
        {icon}
        <Text className="mt-3 text-center text-lg font-black text-slate-950 dark:text-white">{title}</Text>
        {description ? (
          <Text className="mt-2 max-w-xl text-center text-sm leading-6 text-slate-500 dark:text-slate-400">
            {description}
          </Text>
        ) : null}
        {action ? <View className="mt-5">{action}</View> : null}
      </View>
    </FadeIn>
  );
}

/** Props for a reusable settings/property row. */
export type SettingsRowProps = InheritedComponentProps<{
  description?: string;
  disabled?: boolean;
  icon?: ReactNode;
  label: string;
  onPress?: () => void;
  trailing?: ReactNode;
}>;

/** Touch/pointer-friendly settings row used across mobile, desktop, and web preference screens. */
export function SettingsRow({
  description,
  disabled = false,
  icon,
  label,
  onPress,
  trailing,
}: SettingsRowProps) {
  return (
    <PressScale
      accessibilityLabel={label}
      accessibilityRole={onPress ? 'button' : 'text'}
      className={cn(
        'min-h-14 flex-row items-center gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800',
        onPress && 'web:hover:bg-slate-50 dark:web:hover:bg-slate-900',
        disabled && 'opacity-40',
      )}
      disabled={disabled || !onPress}
      onPress={onPress}
      pressedScale={0.995}
    >
      {icon}
      <View className="min-w-0 flex-1">
        <Text className="text-sm font-semibold text-slate-900 dark:text-white">{label}</Text>
        {description ? (
          <Text className="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">{description}</Text>
        ) : null}
      </View>
      {trailing}
    </PressScale>
  );
}

/** Props for a label/value inspector row. */
export type KeyValueRowProps = InheritedComponentProps<
  ViewProps & {
    label: string;
    value?: ReactNode;
  }
>;

/** Displays metadata in inspectors, details views, admin apps, and desktop property panels. */
export function KeyValueRow({ className, label, value, ...props }: KeyValueRowProps) {
  return (
    <View className={cn('flex-row gap-4 border-b border-slate-100 px-3 py-2 dark:border-slate-800', className)} {...props}>
      <Text className="w-32 shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</Text>
      <View className="min-w-0 flex-1 items-end">{typeof value === 'string' || typeof value === 'number' ? <Text className="text-sm text-slate-900 dark:text-white">{String(value)}</Text> : value}</View>
    </View>
  );
}

/** Props for a compact metric card. */
export type MetricCardProps = InheritedComponentProps<
  ViewProps & {
    caption?: string;
    label: string;
    trend?: ReactNode;
    value: string | number;
  }
>;

/** Animated summary metric for dashboards across native desktop, mobile, and web. */
export function MetricCard({ caption, className, label, trend, value, ...props }: MetricCardProps) {
  return (
    <FadeIn>
      <View className={cn('rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950', className)} {...props}>
        <Text className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</Text>
        <View className="mt-2 flex-row items-end justify-between gap-3">
          <Text className="text-2xl font-black text-slate-950 dark:text-white">{String(value)}</Text>
          {trend}
        </View>
        {caption ? <Text className="mt-2 text-xs text-slate-500 dark:text-slate-400">{caption}</Text> : null}
      </View>
    </FadeIn>
  );
}
