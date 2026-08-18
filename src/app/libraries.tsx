import { Redirect } from 'expo-router';
import { getAppRouteAliasTarget } from '@/src/modules/navigation/domain/appRoute';

export default function LibrariesRoute() {
  return <Redirect href={getAppRouteAliasTarget('libraries')} />;
}
