import { Redirect } from 'expo-router';
import { getAppRouteAliasTarget } from '@/src/modules/navigation/domain/appRoute';

export default function FoundationsRoute() {
  return <Redirect href={getAppRouteAliasTarget('foundations')} />;
}
