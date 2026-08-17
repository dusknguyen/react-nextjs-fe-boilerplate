import type { ComponentType, LazyExoticComponent } from 'react';

import type { AppRouteId } from '../domain/appRoute';
import type { PageNavigationPort } from './navigation';

export type RouteScreenProps = {
  navigation: PageNavigationPort;
};

export type RouteScreenComponent = LazyExoticComponent<ComponentType<RouteScreenProps>>;

export interface RouteScreenPreloadPort {
  preload(route: AppRouteId): void;
}

export interface RouteScreenRegistryPort extends RouteScreenPreloadPort {
  get(route: AppRouteId): RouteScreenComponent;
}
