'use client';

import type { ReactNode } from 'react';
import { ScrollView, Text, View, type ViewProps } from 'react-native';

import { PressScale, SlideIn } from '../animation/Animations';
import { cn } from '../core/cn';
import type { InheritedComponentProps } from '../types';

/** Props for a standard mobile application screen scaffold. */
export type MobileScreenProps = InheritedComponentProps<
  ViewProps & {
    bottomBar?: ReactNode;
    children?: ReactNode;
    contentClassName?: string;
    floatingAction?: ReactNode;
    header?: ReactNode;
    scrollable?: boolean;
  }
>;

/** Provides the common top/content/bottom/floating structure for Android and iOS screens. */
export function MobileScreen({
  bottomBar,
  children,
  className,
  contentClassName,
  floatingAction,
  header,
  scrollable = true,
  ...props
}: MobileScreenProps) {
  const content = scrollable ? (
    <ScrollView className="min-h-0 flex-1" contentContainerClassName={cn('grow', contentClassName)}>
      {children}
    </ScrollView>
  ) : (
    <View className={cn('min-h-0 flex-1', contentClassName)}>{children}</View>
  );

  return (
    <View className={cn('flex-1 bg-canvas-light dark:bg-canvas-dark', className)} {...props}>
      {header}
      {content}
      {bottomBar}
      {floatingAction ? (
        <SlideIn className="absolute bottom-5 right-5" direction="up">
          {floatingAction}
        </SlideIn>
      ) : null}
    </View>
  );
}

/** Props for a mobile top application bar. */
export type MobileAppBarProps = InheritedComponentProps<
  ViewProps & {
    leading?: ReactNode;
    subtitle?: string;
    title: string;
    trailing?: ReactNode;
  }
>;

/** Compact app bar suitable for Android and iOS navigation stacks. */
export function MobileAppBar({ className, leading, subtitle, title, trailing, ...props }: MobileAppBarProps) {
  return (
    <View
      className={cn(
        'min-h-14 flex-row items-center gap-3 border-b border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-950',
        className,
      )}
      {...props}
    >
      {leading}
      <View className="min-w-0 flex-1">
        <Text className="text-base font-bold text-slate-950 dark:text-white" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text className="text-xs text-slate-500 dark:text-slate-400" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {trailing}
    </View>
  );
}

/** Props for a large touch target used in bottom app actions. */
export type MobileActionProps = InheritedComponentProps<{
  icon?: ReactNode;
  label: string;
  onPress?: () => void;
  selected?: boolean;
}>;

/** Animated bottom-navigation action with a mobile-friendly minimum touch target. */
export function MobileAction({ icon, label, onPress, selected = false }: MobileActionProps) {
  return (
    <PressScale
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={cn(
        'min-h-12 flex-1 items-center justify-center rounded-xl px-2 py-2',
        selected && 'bg-brand-100 dark:bg-brand-950',
      )}
      onPress={onPress}
      pressedScale={0.94}
    >
      {icon}
      <Text
        className={cn(
          'mt-1 text-xs font-medium text-slate-600 dark:text-slate-300',
          selected && 'text-brand-700 dark:text-brand-300',
        )}
      >
        {label}
      </Text>
    </PressScale>
  );
}

/** Props for the bottom action/navigation bar. */
export type MobileBottomBarProps = InheritedComponentProps<ViewProps & { children?: ReactNode }>;

/** Bottom bar with safe, large interaction regions for Android/iOS navigation and actions. */
export function MobileBottomBar({ children, className, ...props }: MobileBottomBarProps) {
  return (
    <View
      className={cn(
        'flex-row items-center gap-1 border-t border-slate-200 bg-white px-2 py-2 dark:border-slate-800 dark:bg-slate-950',
        className,
      )}
      {...props}
    >
      {children}
    </View>
  );
}

/** Props for the visual grabber used by modal sheets. */
export type SheetHandleProps = InheritedComponentProps<ViewProps>;

/** Dependency-free bottom-sheet grabber visual that can be composed with a host sheet adapter. */
export function SheetHandle({ className, ...props }: SheetHandleProps) {
  return (
    <View className={cn('items-center py-2', className)} {...props}>
      <View className="h-1.5 w-10 rounded-full bg-slate-300 dark:bg-slate-600" />
    </View>
  );
}
