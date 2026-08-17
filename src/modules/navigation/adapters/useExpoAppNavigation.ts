import { useMemo } from 'react';
import { useRouter } from 'expo-router';

import { createAppNavigation } from '../application/createAppNavigation';
import { routePrefetchPolicy, routeScreenRegistry } from '../composition/navigationModule';

export function useExpoAppNavigation() {
  const router = useRouter();

  return useMemo(
    () =>
      createAppNavigation(
        {
          back: () => router.back(),
          navigate: (path) => router.navigate(path),
          prefetch: (path) => router.prefetch(path),
          replace: (path) => router.replace(path),
        },
        routeScreenRegistry,
        routePrefetchPolicy,
      ),
    [router],
  );
}
