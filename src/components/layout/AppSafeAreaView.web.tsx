import { View } from 'react-native';

import type { AppSafeAreaViewProps } from './AppSafeAreaView';

/** Web adapter: browser layout does not need the native inset context. */
export function AppSafeAreaView(props: AppSafeAreaViewProps) {
  return <View {...props} />;
}
