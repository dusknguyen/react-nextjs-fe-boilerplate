'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { createAppNavigation } from '../application/createAppNavigation';
import { routePrefetchPolicy, routeScreenRegistry } from '../composition/navigationModule';

export function useNextAppNavigation() {
  const router = useRouter();

  return useMemo(
    () =>
      createAppNavigation(
        {
          back: () => router.back(),
          navigate: (path) => router.push(path),
          prefetch: (path) => router.prefetch(path),
          replace: (path) => router.replace(path),
        },
        routeScreenRegistry,
        routePrefetchPolicy,
      ),
    [router],
  );
}
