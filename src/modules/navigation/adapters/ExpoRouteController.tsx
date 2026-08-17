import type { AppRouteId } from '../domain/appRoute';
import { routeScreenRegistry } from '../composition/navigationModule';
import { RouteScreenController } from '../presentation/RouteScreenController';
import { useExpoAppNavigation } from './useExpoAppNavigation';

export function ExpoRouteController({ route }: { route: AppRouteId }) {
  const navigation = useExpoAppNavigation();
  return <RouteScreenController navigation={navigation} screen={routeScreenRegistry.get(route)} />;
}
