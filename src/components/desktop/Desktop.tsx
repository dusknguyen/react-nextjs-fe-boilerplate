'use client';

import type { ReactNode } from 'react';
import { Pressable, ScrollView, Text, View, type PressableProps, type ViewProps } from 'react-native';

import { HoverScale } from '../animation/Animations';
import { cn } from '../core/cn';
import type { InheritedComponentProps } from '../types';

/** Props for a desktop-native or web application window shell. */
export type DesktopWindowProps = InheritedComponentProps<
  ViewProps & {
    children?: ReactNode;
    sidebar?: ReactNode;
    statusBar?: ReactNode;
    titleBar?: ReactNode;
    toolbar?: ReactNode;
  }
>;

/** Composes title bar, toolbar, sidebar, content, and status areas for Windows/macOS/web desktop apps. */
export function DesktopWindow({
  children,
  className,
  sidebar,
  statusBar,
  titleBar,
  toolbar,
  ...props
}: DesktopWindowProps) {
  return (
    <View className={cn('flex-1 bg-canvas-light dark:bg-canvas-dark', className)} {...props}>
      {titleBar}
      {toolbar}
      <View className="min-h-0 flex-1 flex-row">
        {sidebar}
        <View className="min-w-0 flex-1">{children}</View>
      </View>
      {statusBar}
    </View>
  );
}

/** Props for a desktop window title bar. */
export type WindowTitleBarProps = InheritedComponentProps<
  ViewProps & {
    actions?: ReactNode;
    subtitle?: string;
    title: string;
  }
>;

/** Provides a portable title-bar visual; native window dragging remains a host responsibility. */
export function WindowTitleBar({ actions, className, subtitle, title, ...props }: WindowTitleBarProps) {
  return (
    <View
      className={cn(
        'h-12 flex-row items-center justify-between border-b border-slate-200 bg-white px-3 dark:border-slate-800 dark:bg-slate-950',
        className,
      )}
      {...props}
    >
      <View className="min-w-0 flex-1">
        <Text className="text-sm font-semibold text-slate-950 dark:text-white" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text className="text-xs text-slate-500 dark:text-slate-400" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {actions ? <View className="ml-3 flex-row items-center gap-1">{actions}</View> : null}
    </View>
  );
}

/** Props for a desktop toolbar. */
export type ToolbarProps = InheritedComponentProps<
  ViewProps & {
    children?: ReactNode;
    leading?: ReactNode;
    trailing?: ReactNode;
  }
>;

/** Horizontal command surface suitable for desktop and large web viewports. */
export function Toolbar({ children, className, leading, trailing, ...props }: ToolbarProps) {
  return (
    <View
      accessibilityRole="toolbar"
      className={cn(
        'min-h-11 flex-row items-center gap-2 border-b border-slate-200 bg-slate-50 px-2 py-1 dark:border-slate-800 dark:bg-slate-900',
        className,
      )}
      {...props}
    >
      {leading}
      <View className="min-w-0 flex-1 flex-row items-center gap-1">{children}</View>
      {trailing}
    </View>
  );
}

/** Props for a button displayed inside a desktop toolbar. */
export type ToolbarButtonProps = InheritedComponentProps<
  PressableProps & {
    label: string;
    selected?: boolean;
  }
>;

/** Animated toolbar command with hover and selected-state affordances. */
export function ToolbarButton({ className, label, selected = false, ...props }: ToolbarButtonProps) {
  return (
    <HoverScale
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={cn(
        'rounded-lg px-3 py-2 web:hover:bg-slate-200 dark:web:hover:bg-slate-800',
        selected && 'bg-brand-100 dark:bg-brand-950',
        className,
      )}
      {...props}
    >
      <Text className="text-sm font-medium text-slate-800 dark:text-slate-100">{label}</Text>
    </HoverScale>
  );
}

/** Props for the navigation sidebar used on Windows, macOS, and wide web layouts. */
export type DesktopSidebarProps = InheritedComponentProps<
  ViewProps & {
    children?: ReactNode;
    footer?: ReactNode;
    header?: ReactNode;
    width?: number;
  }
>;

/** Scrollable desktop sidebar with explicit width and isolated footer. */
export function DesktopSidebar({
  children,
  className,
  footer,
  header,
  style,
  width = 280,
  ...props
}: DesktopSidebarProps) {
  return (
    <View
      className={cn('border-r border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950', className)}
      style={[{ width: Math.max(200, width) }, style]}
      {...props}
    >
      {header}
      <ScrollView className="min-h-0 flex-1" contentContainerClassName="p-2">
        {children}
      </ScrollView>
      {footer}
    </View>
  );
}

/** Props for an item inside DesktopSidebar. */
export type DesktopSidebarItemProps = InheritedComponentProps<
  PressableProps & {
    description?: string;
    icon?: ReactNode;
    label: string;
    selected?: boolean;
  }
>;

/** Sidebar navigation row with scale animation and pointer hover feedback. */
export function DesktopSidebarItem({
  className,
  description,
  icon,
  label,
  selected = false,
  ...props
}: DesktopSidebarItemProps) {
  return (
    <HoverScale
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={cn(
        'mb-1 flex-row items-center gap-3 rounded-xl px-3 py-2.5 web:hover:bg-slate-200 dark:web:hover:bg-slate-900',
        selected && 'bg-brand-100 dark:bg-brand-950',
        className,
      )}
      {...props}
    >
      {icon}
      <View className="min-w-0 flex-1">
        <Text className="text-sm font-semibold text-slate-900 dark:text-white" numberOfLines={1}>
          {label}
        </Text>
        {description ? (
          <Text className="text-xs text-slate-500 dark:text-slate-400" numberOfLines={1}>
            {description}
          </Text>
        ) : null}
      </View>
    </HoverScale>
  );
}

/** Props for a desktop status bar. */
export type DesktopStatusBarProps = InheritedComponentProps<
  ViewProps & {
    children?: ReactNode;
  }
>;

/** Bottom status strip for connection state, selection counts, zoom, and background activity. */
export function DesktopStatusBar({ children, className, ...props }: DesktopStatusBarProps) {
  return (
    <View
      className={cn(
        'min-h-7 flex-row items-center gap-3 border-t border-slate-200 bg-slate-50 px-3 py-1 dark:border-slate-800 dark:bg-slate-950',
        className,
      )}
      {...props}
    >
      {children}
    </View>
  );
}

/** Props for a desktop menu-bar command. */
export type MenuBarItemProps = InheritedComponentProps<
  PressableProps & {
    label: string;
  }
>;

/** Compact menu-bar command for File/Edit/View-style desktop menus. */
export function MenuBarItem({ className, label, ...props }: MenuBarItemProps) {
  return (
    <Pressable
      accessibilityRole="menuitem"
      className={cn('rounded-md px-2 py-1 web:cursor-pointer web:hover:bg-slate-200 dark:web:hover:bg-slate-800', className)}
      {...props}
    >
      <Text className="text-sm text-slate-800 dark:text-slate-100">{label}</Text>
    </Pressable>
  );
}

/** Props for a horizontal desktop menu bar. */
export type MenuBarProps = InheritedComponentProps<ViewProps & { children?: ReactNode }>;

/** Horizontal application menu suitable for Windows/macOS/web desktop shells. */
export function MenuBar({ children, className, ...props }: MenuBarProps) {
  return (
    <View accessibilityRole="menubar" className={cn('flex-row items-center gap-1 px-1 py-1', className)} {...props}>
      {children}
    </View>
  );
}
