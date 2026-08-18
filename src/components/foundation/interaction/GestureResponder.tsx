'use client';

import { useMemo, type ReactNode } from 'react';
import {
  PanResponder,
  View,
  type GestureResponderEvent,
  type PanResponderGestureState,
  type ViewProps,
} from 'react-native';

import type { InheritedComponentProps } from '../../types';

/** Normalized gesture information exposed without leaking responder setup details. */
export type GestureSnapshot = Readonly<{
  dx: number;
  dy: number;
  moveX: number;
  moveY: number;
  numberActiveTouches: number;
  stateID: number;
  velocityX: number;
  velocityY: number;
  x0: number;
  y0: number;
}>;

/** Props for the dependency-free responder primitive. */
export type GestureResponderProps = InheritedComponentProps<
  ViewProps & {
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    minimumDistance?: number;
    onGestureGrant?: (snapshot: GestureSnapshot, event: GestureResponderEvent) => void;
    onGestureMove?: (snapshot: GestureSnapshot, event: GestureResponderEvent) => void;
    onGestureRelease?: (snapshot: GestureSnapshot, event: GestureResponderEvent) => void;
    onGestureTerminate?: (snapshot: GestureSnapshot, event: GestureResponderEvent) => void;
  }
>;

/** Converts React Native's mutable responder state into an immutable public snapshot. */
function toSnapshot(state: PanResponderGestureState): GestureSnapshot {
  return {
    dx: state.dx,
    dy: state.dy,
    moveX: state.moveX,
    moveY: state.moveY,
    numberActiveTouches: state.numberActiveTouches,
    stateID: state.stateID,
    velocityX: state.vx,
    velocityY: state.vy,
    x0: state.x0,
    y0: state.y0,
  };
}

/**
 * Dependency-free drag/swipe responder for simple interactions.
 * Complex gestures remain replaceable through GestureBoundary adapters.
 */
export function GestureResponder({
  children,
  disabled = false,
  minimumDistance = 6,
  onGestureGrant,
  onGestureMove,
  onGestureRelease,
  onGestureTerminate,
  ...props
}: GestureResponderProps) {
  const threshold = Number.isFinite(minimumDistance)
    ? Math.max(0, minimumDistance)
    : 6;
  const responder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_event, state) =>
          !disabled && Math.hypot(state.dx, state.dy) >= threshold,
        onPanResponderGrant: (event, state) =>
          onGestureGrant?.(toSnapshot(state), event),
        onPanResponderMove: (event, state) =>
          onGestureMove?.(toSnapshot(state), event),
        onPanResponderRelease: (event, state) =>
          onGestureRelease?.(toSnapshot(state), event),
        onPanResponderTerminate: (event, state) =>
          onGestureTerminate?.(toSnapshot(state), event),
      }),
    [
      disabled,
      onGestureGrant,
      onGestureMove,
      onGestureRelease,
      onGestureTerminate,
      threshold,
    ],
  );

  return (
    <View {...responder.panHandlers} {...props}>
      {children}
    </View>
  );
}
