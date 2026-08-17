'use client';

import { useEffect } from 'react';

import type { AppRouteId } from '../domain/appRoute';
import type { RoutePrefetchPort } from '../ports/navigation';

type IdleRuntime = typeof globalThis & {
  cancelIdleCallback?: (handle: number) => void;
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
};

/**
 * Defers speculative work until after hydration/interaction work. Browsers use
 * idle time; native falls back to a short cancellable timer.
 */
export function useIdleRoutePrefetch(
  navigation: RoutePrefetchPort,
  previousRoute: AppRouteId | null,
  nextRoute: AppRouteId | null,
) {
  useEffect(() => {
    const prefetch = () => {
      if (nextRoute) navigation.prefetch(nextRoute);
      if (previousRoute) navigation.prefetch(previousRoute);
    };
    const runtime = globalThis as IdleRuntime;

    if (runtime.requestIdleCallback) {
      const handle = runtime.requestIdleCallback(prefetch, { timeout: 1_200 });
      return () => runtime.cancelIdleCallback?.(handle);
    }

    const handle = setTimeout(prefetch, 300);
    return () => clearTimeout(handle);
  }, [navigation, nextRoute, previousRoute]);
}
