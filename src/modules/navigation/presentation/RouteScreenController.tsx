'use client';

import { Suspense } from 'react';

import { RouteLoadingView } from '@/src/views/system/RouteLoadingView';

import type { PageNavigationPort } from '../ports/navigation';
import type { RouteScreenComponent } from '../ports/routeScreen';

export function RouteScreenController({
  navigation,
  screen: Screen,
}: {
  navigation: PageNavigationPort;
  screen: RouteScreenComponent;
}) {
  return (
    <Suspense fallback={<RouteLoadingView />}>
      <Screen navigation={navigation} />
    </Suspense>
  );
}
