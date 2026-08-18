import { Redirect } from 'expo-router';
import { getAppRouteAliasTarget } from '@/src/modules/navigation/domain/appRoute';

export default function ComponentsRoute() {
  return <Redirect href={getAppRouteAliasTarget('components')} />;
}
