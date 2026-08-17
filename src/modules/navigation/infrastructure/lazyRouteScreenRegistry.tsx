import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

import { createCacheAsideLoader } from '@/src/shared/application/cache/createCacheAsideLoader';
import type { AsyncCachePort } from '@/src/shared/ports/asyncCache';

import { appRoutes, type AppRouteId } from '../domain/appRoute';
import type {
  RouteScreenProps,
  RouteScreenRegistryPort,
} from '../ports/routeScreen';

export type RouteScreenModule = { default: ComponentType<RouteScreenProps> };
type RouteScreenLoader = () => Promise<RouteScreenModule>;

const screenLoaders = {
  home: () => import('@/src/views/routes/HomeView'),
  insights: () => import('@/src/views/routes/InsightsView'),
  tasks: () => import('@/src/views/routes/TasksView'),
  calendar: () => import('@/src/views/routes/CalendarView'),
  chat: () => import('@/src/views/routes/ChatView'),
  files: () => import('@/src/views/routes/FilesView'),
  profile: () => import('@/src/views/routes/ProfileView'),
  inbox: () => import('@/src/views/routes/InboxView'),
  journal: () => import('@/src/views/routes/JournalView'),
  billing: () => import('@/src/views/routes/BillingView'),
  components: () => import('@/src/views/routes/ComponentsView'),
  foundations: () => import('@/src/views/routes/FoundationsView'),
  advancedComponents: () => import('@/src/views/routes/AdvancedComponentsView'),
  showcase: () => import('@/src/views/routes/ShowcaseView'),
  libraries: () => import('@/src/views/routes/LibrariesView'),
  plans: () => import('@/src/views/routes/PlansView'),
  faq: () => import('@/src/views/routes/FaqView'),
  contact: () => import('@/src/views/routes/ContactView'),
  login: () => import('@/src/views/routes/LoginView'),
} satisfies Record<AppRouteId, RouteScreenLoader>;

export function createLazyRouteScreenRegistry(
  cache: AsyncCachePort<AppRouteId, RouteScreenModule>,
): RouteScreenRegistryPort {
  const modules = createCacheAsideLoader({
    cache,
    loadFromSource: (route: AppRouteId) => screenLoaders[route](),
  });
  const lazyScreens = Object.fromEntries(
    appRoutes.map((route) => [route.id, lazy(() => modules.load(route.id))]),
  ) as Record<AppRouteId, LazyExoticComponent<ComponentType<RouteScreenProps>>>;

  return {
    get: (route) => lazyScreens[route],
    preload: (route) => modules.preload(route),
  };
}
