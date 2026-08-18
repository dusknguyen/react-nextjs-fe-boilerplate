'use client';

import { cssInterop } from 'nativewind';
import { Animated } from 'react-native';

/** NativeWind-aware Animated.View used by every shared animation primitive. */
export const NativeWindAnimatedView = cssInterop(Animated.View, {
  className: 'style',
});
