import { permanentRedirect } from 'next/navigation';
import { getAppRouteAliasTarget } from '@/src/modules/navigation/domain/appRoute';

export default function FoundationsRoutePage() {
  permanentRedirect(getAppRouteAliasTarget('foundations'));
}
