'use client';

import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { defaultUITokens, type UIBreakpointTokens } from '../theme/tokens';

/** Semantic responsive size used by library layout. */
export type UIBreakpoint = 'compact' | 'medium' | 'expanded' | 'wide';

/** Resolves a semantic breakpoint from a width. */
export function resolveBreakpoint(
  width: number,
  breakpoints: UIBreakpointTokens = defaultUITokens.breakpoints,
): UIBreakpoint {
  if (width >= breakpoints.wide) return 'wide';
  if (width >= breakpoints.expanded) return 'expanded';
  if (width >= breakpoints.medium) return 'medium';
  return 'compact';
}

/** Observes window dimensions and returns the library breakpoint. */
export function useBreakpoint(breakpoints: UIBreakpointTokens = defaultUITokens.breakpoints) {
  const { width, height, fontScale, scale } = useWindowDimensions();
  const breakpoint = useMemo(() => resolveBreakpoint(width, breakpoints), [breakpoints, width]);
  return { breakpoint, width, height, fontScale, scale } as const;
}
