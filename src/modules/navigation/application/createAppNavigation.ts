import { getAppRoute } from '../domain/appRoute';
import type {
  AppNavigationPort,
  PathNavigationAdapter,
  RoutePrefetchPolicyPort,
} from '../ports/navigation';
import type { RouteScreenPreloadPort } from '../ports/routeScreen';

export function createAppNavigation(
  adapter: PathNavigationAdapter,
  screens?: RouteScreenPreloadPort,
  prefetchPolicy?: RoutePrefetchPolicyPort,
): AppNavigationPort {
  return {
    back: adapter.back,
    navigate: (route) => {
      screens?.preload(route);
      adapter.navigate(getAppRoute(route).path);
    },
    prefetch: (route) => {
      if (prefetchPolicy && !prefetchPolicy.canPrefetch(route)) return;
      screens?.preload(route);
      adapter.prefetch?.(getAppRoute(route).path);
      prefetchPolicy?.recordPrefetch(route);
    },
    replace: (route) => adapter.replace(getAppRoute(route).path),
  };
}
