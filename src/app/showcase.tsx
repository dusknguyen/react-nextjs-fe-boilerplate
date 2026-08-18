import { Redirect } from 'expo-router';
import { getAppRouteAliasTarget } from '@/src/modules/navigation/domain/appRoute';

export default function ShowcaseRoute() {
  return <Redirect href={getAppRouteAliasTarget('showcase')} />;
}
