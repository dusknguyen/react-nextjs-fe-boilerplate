import type { AppRouteId } from '../domain/appRoute';
import type { RoutePrefetchPolicyPort } from '../ports/navigation';

const DEFAULT_PREFETCH_TTL_MS = 30_000;

export function createTtlRoutePrefetchPolicy({
  now = Date.now,
  ttlMs = DEFAULT_PREFETCH_TTL_MS,
}: {
  now?: () => number;
  ttlMs?: number;
} = {}): RoutePrefetchPolicyPort {
  const timestamps = new Map<AppRouteId, number>();

  return {
    canPrefetch: (route) => {
      const timestamp = timestamps.get(route);
      return timestamp === undefined || now() - timestamp >= ttlMs;
    },
    recordPrefetch: (route) => {
      timestamps.set(route, now());
    },
  };
}

export const routePrefetchPolicy = createTtlRoutePrefetchPolicy();
