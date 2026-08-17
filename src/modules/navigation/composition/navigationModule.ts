import { MemoryAsyncCache } from '@/src/shared/infrastructure/cache/MemoryAsyncCache';

import type { AppRouteId } from '../domain/appRoute';
import {
  createLazyRouteScreenRegistry,
  type RouteScreenModule,
} from '../infrastructure/lazyRouteScreenRegistry';
import { routePrefetchPolicy } from '../infrastructure/ttlRoutePrefetchPolicy';

const routeModuleCache = new MemoryAsyncCache<AppRouteId, RouteScreenModule>();

export const routeScreenRegistry = createLazyRouteScreenRegistry(routeModuleCache);
export { routePrefetchPolicy };
