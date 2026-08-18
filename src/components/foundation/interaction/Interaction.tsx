'use client';

import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  type Insets,
  type PressableProps,
  type ViewStyle,
} from 'react-native';

import { cn } from '../../core/cn';
import { focusRingClassName, interactiveClassName } from '../../core/styles';
import type { InheritedComponentProps } from '../../types';

const DEFAULT_HIT_SLOP: Insets = { bottom: 4, left: 4, right: 4, top: 4 };

const styles = StyleSheet.create({
  minimumTouchTarget: {
    minHeight: 44,
    minWidth: 44,
  },
});

/** Props for a reusable accessible press target. */
export type PressableSurfaceProps = InheritedComponentProps<
  PressableProps & {
    busy?: boolean;
    children?: ReactNode;
    className?: string;
    enforceMinimumTouchTarget?: boolean;
    selected?: boolean;
  }
>;

/**
 * Accessible Pressable wrapper for buttons, cards, rows, and icon controls.
 * Keeps static styles in NativeWind and runtime state in React Native props/style.
 */
export function PressableSurface({
  accessibilityRole = 'button',
  accessibilityState,
  busy = false,
  children,
  className,
  disabled,
  enforceMinimumTouchTarget = true,
  hitSlop = DEFAULT_HIT_SLOP,
  selected,
  style,
  ...props
}: PressableSurfaceProps) {
  const runtimeStyle: ViewStyle | undefined = enforceMinimumTouchTarget
    ? styles.minimumTouchTarget
    : undefined;

  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      accessibilityState={{
        ...accessibilityState,
        busy: accessibilityState?.busy ?? busy,
        disabled: accessibilityState?.disabled ?? Boolean(disabled),
        selected: accessibilityState?.selected ?? selected,
      }}
      className={cn(interactiveClassName, focusRingClassName, className)}
      disabled={disabled}
      hitSlop={hitSlop}
      style={
        typeof style === 'function'
          ? (state) => [runtimeStyle, style(state)]
          : StyleSheet.compose(runtimeStyle, style)
      }
      {...props}
    >
      {children}
    </Pressable>
  );
}

/** Props for an interaction that deliberately distinguishes tap from long press. */
export type LongPressSurfaceProps = PressableSurfaceProps & {
  longPressDelayMs?: number;
};

/** Press target with an explicit long-press delay and accessibility hint support. */
export function LongPressSurface({
  delayLongPress,
  longPressDelayMs = 500,
  ...props
}: LongPressSurfaceProps) {
  return (
    <PressableSurface
      delayLongPress={delayLongPress ?? longPressDelayMs}
      {...props}
    />
  );
}
