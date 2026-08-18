'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import type { ViewProps } from 'react-native';
import { Animated, Easing } from 'react-native';

import type { InheritedComponentProps } from '../types';
import { NativeWindAnimatedView } from './animated';
import { useReducedMotion } from './useReducedMotion';

/** Props for an entrance animation that honors reduced-motion preferences. */
export type MotionViewProps = InheritedComponentProps<
  ViewProps & {
    children?: ReactNode;
    delay?: number;
    distance?: number;
    duration?: number;
  }
>;

/** Props for an animated percentage-width indicator. */
export type MotionProgressProps = InheritedComponentProps<
  ViewProps & {
    duration?: number;
    value: number;
  }
>;

function clampPercentage(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

/** Reveals children with transform and opacity animations handled by the native driver. */
export function MotionView({
  children,
  delay = 0,
  distance = 12,
  duration = 280,
  style,
  ...props
}: MotionViewProps) {
  const reducedMotion = useReducedMotion();
  const [progress] = useState(() => new Animated.Value(reducedMotion ? 1 : 0));

  useEffect(() => {
    if (reducedMotion) {
      progress.stopAnimation();
      progress.setValue(1);
      return undefined;
    }

    progress.setValue(0);
    const animation = Animated.timing(progress, {
      delay,
      duration,
      easing: Easing.out(Easing.cubic),
      toValue: 1,
      useNativeDriver: true,
    });

    animation.start();
    return () => animation.stop();
  }, [delay, duration, progress, reducedMotion]);

  return (
    <NativeWindAnimatedView
      style={[
        {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [distance, 0],
              }),
            },
            {
              scale: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.985, 1],
              }),
            },
          ],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </NativeWindAnimatedView>
  );
}

/** Animates a progress width; width requires the JavaScript animation driver. */
export function MotionProgress({
  duration = 520,
  style,
  value,
  ...props
}: MotionProgressProps) {
  const reducedMotion = useReducedMotion();
  const [progress] = useState(() => new Animated.Value(clampPercentage(value)));

  useEffect(() => {
    const nextValue = clampPercentage(value);

    if (reducedMotion) {
      progress.stopAnimation();
      progress.setValue(nextValue);
      return undefined;
    }

    const animation = Animated.timing(progress, {
      duration,
      easing: Easing.out(Easing.cubic),
      toValue: nextValue,
      // Width is a layout property and cannot use the native Animated driver.
      useNativeDriver: false,
    });

    animation.start();
    return () => animation.stop();
  }, [duration, progress, reducedMotion, value]);

  return (
    <NativeWindAnimatedView
      style={[
        {
          width: progress.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
        },
        style,
      ]}
      {...props}
    />
  );
}
