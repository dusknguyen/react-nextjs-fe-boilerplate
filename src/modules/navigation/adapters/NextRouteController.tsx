'use client';

import type { AppRouteId } from '../domain/appRoute';
import { routeScreenRegistry } from '../composition/navigationModule';
import { RouteScreenController } from '../presentation/RouteScreenController';
import { useNextAppNavigation } from './useNextAppNavigation';

export function NextRouteController({ route }: { route: AppRouteId }) {
  const navigation = useNextAppNavigation();
  return <RouteScreenController navigation={navigation} screen={routeScreenRegistry.get(route)} />;
}
