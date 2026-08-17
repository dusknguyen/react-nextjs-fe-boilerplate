import { Stack, useRouter } from 'expo-router';

import NotFoundView from '@/src/views/system/NotFoundView';

export default function NotFoundRoute() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <NotFoundView onHome={() => router.replace('/')} />
    </>
  );
}
