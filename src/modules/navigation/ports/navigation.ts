import type { AppRouteId, AppRoutePath } from '../domain/appRoute';

/** Minimal command port used by feature UI. */
export interface RouteNavigationPort {
  navigate(route: AppRouteId): void;
}

/** Optional read-ahead port; consumers that do not need it never depend on it. */
export interface RoutePrefetchPort {
  prefetch(route: AppRouteId): void;
}

/** Cache policy is independent from router and screen-loading implementations. */
export interface RoutePrefetchPolicyPort {
  canPrefetch(route: AppRouteId): boolean;
  recordPrefetch(route: AppRouteId): void;
}

/** History commands are segregated from normal navigation. */
export interface RouteHistoryPort {
  back(): void;
  replace(route: AppRouteId): void;
}

export type PageNavigationPort = RouteNavigationPort & RoutePrefetchPort;
export type AppNavigationPort = RouteNavigationPort & RoutePrefetchPort & RouteHistoryPort;

/** Framework-facing adapter. Next and Expo implement this boundary independently. */
export interface PathNavigationAdapter {
  back(): void;
  navigate(path: AppRoutePath): void;
  prefetch?(path: AppRoutePath): void;
  replace(path: AppRoutePath): void;
}
