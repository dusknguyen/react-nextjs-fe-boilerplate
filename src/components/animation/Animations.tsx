'use client';

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  type PressableProps,
  type ViewProps,
} from 'react-native';

import { cn } from '../core/cn';
import { NativeWindAnimatedView } from '../core/animated';
import { useReducedMotion } from '../core/useReducedMotion';
import type { InheritedComponentProps } from '../types';

type Direction = 'down' | 'left' | 'right' | 'up';

/** Shared props for entrance animation primitives. */
export type EnterMotionProps = InheritedComponentProps<
  ViewProps & {
    children?: ReactNode;
    delay?: number;
    duration?: number;
  }
>;

/** Props for directional slide-in animation. */
export type SlideInProps = EnterMotionProps & {
  direction?: Direction;
  distance?: number;
};

/** Fades content into view and respects the OS reduced-motion preference. */
export function FadeIn({ children, delay = 0, duration = 220, style, ...props }: EnterMotionProps) {
  const reducedMotion = useReducedMotion();
  const [value] = useState(() => new Animated.Value(reducedMotion ? 1 : 0));

  useEffect(() => {
    if (reducedMotion) {
      value.stopAnimation();
      value.setValue(1);
      return undefined;
    }
    value.setValue(0);
    const animation = Animated.timing(value, {
      delay,
      duration,
      easing: Easing.out(Easing.cubic),
      toValue: 1,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [delay, duration, reducedMotion, value]);

  return (
    <NativeWindAnimatedView {...props} style={[{ opacity: value }, style]}>
      {children}
    </NativeWindAnimatedView>
  );
}

function slideTransform(direction: Direction, value: Animated.Value, distance: number) {
  const outputRange = direction === 'left' || direction === 'up' ? [-distance, 0] : [distance, 0];
  const translated = value.interpolate({ inputRange: [0, 1], outputRange });
  if (direction === 'left' || direction === 'right') return [{ translateX: translated }];
  return [{ translateY: translated }];
}

/** Slides content into place while also fading it in. */
export function SlideIn({
  children,
  delay = 0,
  direction = 'up',
  distance = 18,
  duration = 260,
  style,
  ...props
}: SlideInProps) {
  const reducedMotion = useReducedMotion();
  const [value] = useState(() => new Animated.Value(reducedMotion ? 1 : 0));

  useEffect(() => {
    if (reducedMotion) {
      value.stopAnimation();
      value.setValue(1);
      return undefined;
    }
    value.setValue(0);
    const animation = Animated.timing(value, {
      delay,
      duration,
      easing: Easing.out(Easing.cubic),
      toValue: 1,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [delay, duration, reducedMotion, value]);

  return (
    <NativeWindAnimatedView
      {...props}
      style={[
        {
          opacity: value,
          transform: slideTransform(direction, value, Math.max(0, distance)),
        },
        style,
      ]}
    >
      {children}
    </NativeWindAnimatedView>
  );
}

/** Scales content from a compact state into its resting size. */
export function ScaleIn({ children, delay = 0, duration = 220, style, ...props }: EnterMotionProps) {
  const reducedMotion = useReducedMotion();
  const [value] = useState(() => new Animated.Value(reducedMotion ? 1 : 0));

  useEffect(() => {
    if (reducedMotion) {
      value.stopAnimation();
      value.setValue(1);
      return undefined;
    }
    value.setValue(0);
    const animation = Animated.timing(value, {
      delay,
      duration,
      easing: Easing.out(Easing.back(1.1)),
      toValue: 1,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [delay, duration, reducedMotion, value]);

  return (
    <NativeWindAnimatedView
      {...props}
      style={[
        {
          opacity: value,
          transform: [
            {
              scale: value.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1] }),
            },
          ],
        },
        style,
      ]}
    >
      {children}
    </NativeWindAnimatedView>
  );
}

/** Props for a repeating pulse animation. */
export type PulseProps = EnterMotionProps & {
  active?: boolean;
  minimumOpacity?: number;
};

/** Repeats a subtle opacity pulse for live or loading indicators. */
export function Pulse({
  active = true,
  children,
  duration = 900,
  minimumOpacity = 0.5,
  style,
  ...props
}: PulseProps) {
  const reducedMotion = useReducedMotion();
  const [value] = useState(() => new Animated.Value(1));

  useEffect(() => {
    value.stopAnimation();
    value.setValue(1);
    if (!active || reducedMotion) return undefined;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(value, {
          duration,
          easing: Easing.inOut(Easing.quad),
          toValue: Math.max(0, Math.min(1, minimumOpacity)),
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          duration,
          easing: Easing.inOut(Easing.quad),
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [active, duration, minimumOpacity, reducedMotion, value]);

  return (
    <NativeWindAnimatedView {...props} style={[{ opacity: value }, style]}>
      {children}
    </NativeWindAnimatedView>
  );
}

/** Props for an endlessly rotating progress affordance. */
export type SpinProps = EnterMotionProps & {
  active?: boolean;
};

/** Rotates content continuously using transform-only native-driver animation. */
export function Spin({ active = true, children, duration = 800, style, ...props }: SpinProps) {
  const reducedMotion = useReducedMotion();
  const [value] = useState(() => new Animated.Value(0));

  useEffect(() => {
    value.stopAnimation();
    value.setValue(0);
    if (!active || reducedMotion) return undefined;

    const animation = Animated.loop(
      Animated.timing(value, {
        duration,
        easing: Easing.linear,
        toValue: 1,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [active, duration, reducedMotion, value]);

  return (
    <NativeWindAnimatedView
      {...props}
      style={[
        {
          transform: [
            {
              rotate: value.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }),
            },
          ],
        },
        style,
      ]}
    >
      {children}
    </NativeWindAnimatedView>
  );
}

/** Props for a transient shake animation, commonly used for validation errors. */
export type ShakeProps = EnterMotionProps & {
  trigger: string | number | boolean;
};

/** Shakes content horizontally whenever `trigger` changes. */
export function Shake({ children, duration = 360, style, trigger, ...props }: ShakeProps) {
  const reducedMotion = useReducedMotion();
  const [value] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (reducedMotion) return undefined;
    value.setValue(0);
    const animation = Animated.sequence([
      Animated.timing(value, { duration: duration * 0.2, toValue: -1, useNativeDriver: true }),
      Animated.timing(value, { duration: duration * 0.2, toValue: 1, useNativeDriver: true }),
      Animated.timing(value, { duration: duration * 0.2, toValue: -0.7, useNativeDriver: true }),
      Animated.timing(value, { duration: duration * 0.2, toValue: 0.7, useNativeDriver: true }),
      Animated.timing(value, { duration: duration * 0.2, toValue: 0, useNativeDriver: true }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [duration, reducedMotion, trigger, value]);

  return (
    <NativeWindAnimatedView
      {...props}
      style={[
        {
          transform: [
            {
              translateX: value.interpolate({ inputRange: [-1, 1], outputRange: [-8, 8] }),
            },
          ],
        },
        style,
      ]}
    >
      {children}
    </NativeWindAnimatedView>
  );
}

/** Props for a press interaction that scales content without external gesture dependencies. */
export type PressScaleProps = InheritedComponentProps<
  PressableProps & {
    asChild?: boolean;
    children?: ReactNode;
    pressedScale?: number;
  }
>;

type PressScaleChildProps = PressableProps & { className?: string };

/**
 * Adds tactile scale feedback to a press target. Use `asChild` when decorating an
 * existing button so React Native Web keeps a single valid interactive element.
 */
export function PressScale({
  accessibilityRole,
  asChild = false,
  children,
  className,
  onPressIn,
  onPressOut,
  pressedScale = 0.97,
  ...props
}: PressScaleProps) {
  const reducedMotion = useReducedMotion();
  const [value] = useState(() => new Animated.Value(1));

  const animate = (toValue: number) => {
    if (reducedMotion) {
      value.setValue(1);
      return;
    }
    Animated.spring(value, {
      damping: 18,
      mass: 0.6,
      stiffness: 260,
      toValue,
      useNativeDriver: true,
    }).start();
  };

  const handlePressIn: NonNullable<PressableProps['onPressIn']> = (event) => {
    animate(Math.max(0.8, Math.min(1, pressedScale)));
    onPressIn?.(event);
  };

  const handlePressOut: NonNullable<PressableProps['onPressOut']> = (event) => {
    animate(1);
    onPressOut?.(event);
  };

  const animatedStyle = { transform: [{ scale: value }] };

  if (asChild) {
    if (!isValidElement<PressScaleChildProps>(children)) {
      throw new Error('PressScale with asChild requires exactly one pressable React element.');
    }

    const child = cloneElement(children, {
      ...props,
      accessibilityRole: accessibilityRole ?? children.props.accessibilityRole ?? 'button',
      className: cn('web:cursor-pointer', children.props.className, className),
      onPressIn: (event) => {
        animate(Math.max(0.8, Math.min(1, pressedScale)));
        children.props.onPressIn?.(event);
        onPressIn?.(event);
      },
      onPressOut: (event) => {
        animate(1);
        children.props.onPressOut?.(event);
        onPressOut?.(event);
      },
    });

    return <NativeWindAnimatedView style={animatedStyle}>{child}</NativeWindAnimatedView>;
  }

  return (
    <Pressable
      accessibilityRole={accessibilityRole ?? 'button'}
      className={cn('web:cursor-pointer', className)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      <NativeWindAnimatedView style={animatedStyle}>{children}</NativeWindAnimatedView>
    </Pressable>
  );
}

/** Props for a sequence that adds an incremental entrance delay to child elements. */
export type StaggerProps = InheritedComponentProps<{
  children?: ReactNode;
  delayStep?: number;
  initialDelay?: number;
}>;

/** Applies a consistent staggered fade/slide entrance to a collection of children. */
export function Stagger({ children, delayStep = 45, initialDelay = 0 }: StaggerProps) {
  return (
    <>
      {Children.toArray(children).map((child, index) => (
        <SlideIn delay={initialDelay + Math.max(0, delayStep) * index} key={index}>
          {child}
        </SlideIn>
      ))}
    </>
  );
}

/** Props for swapping two keyed views with a simple cross-fade. */
export type CrossFadeProps = InheritedComponentProps<
  ViewProps & {
    children: ReactElement;
    duration?: number;
    transitionKey: string | number;
  }
>;

/** Replays a fade whenever the caller-provided transition key changes. */
export function CrossFade({ children, duration = 180, transitionKey, ...props }: CrossFadeProps) {
  const keyedChild = useMemo(
    () => (isValidElement(children) ? cloneElement(children, { key: transitionKey }) : children),
    [children, transitionKey],
  );
  return (
    <FadeIn duration={duration} key={transitionKey} {...props}>
      {keyedChild}
    </FadeIn>
  );
}

/** Props for pointer-aware hover and press scale animation on desktop/web targets. */
export type HoverScaleProps = InheritedComponentProps<
  PressableProps & {
    children?: ReactNode;
    hoverScale?: number;
    pressedScale?: number;
  }
>;

/** Adds native Pressable hover feedback for Windows/macOS and browser hover feedback for Web. */
export function HoverScale({
  accessibilityRole = 'button',
  children,
  className,
  hoverScale = 1.015,
  onHoverIn,
  onHoverOut,
  onPressIn,
  onPressOut,
  pressedScale = 0.985,
  ...props
}: HoverScaleProps) {
  const reducedMotion = useReducedMotion();
  const [value] = useState(() => new Animated.Value(1));

  const animate = (toValue: number) => {
    if (reducedMotion) {
      value.setValue(1);
      return;
    }
    Animated.spring(value, {
      damping: 20,
      mass: 0.55,
      stiffness: 240,
      toValue,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      className={cn('web:cursor-pointer', className)}
      onHoverIn={(event) => {
        animate(Math.max(1, Math.min(1.08, hoverScale)));
        onHoverIn?.(event);
      }}
      onHoverOut={(event) => {
        animate(1);
        onHoverOut?.(event);
      }}
      onPressIn={(event) => {
        animate(Math.max(0.8, Math.min(1, pressedScale)));
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        animate(1);
        onPressOut?.(event);
      }}
      {...props}
    >
      <NativeWindAnimatedView style={{ transform: [{ scale: value }] }}>{children}</NativeWindAnimatedView>
    </Pressable>
  );
}
