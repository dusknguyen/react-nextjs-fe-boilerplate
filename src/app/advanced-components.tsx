import { Redirect } from 'expo-router';
import { getAppRouteAliasTarget } from '@/src/modules/navigation/domain/appRoute';

export default function AdvancedComponentsRoute() {
  return <Redirect href={getAppRouteAliasTarget('advancedComponents')} />;
}
