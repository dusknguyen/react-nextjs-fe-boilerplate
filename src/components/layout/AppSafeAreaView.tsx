import type { InheritedComponentProps } from '../types'; import type { ComponentProps } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/** Props shared by the native and web safe-area adapters. */ export type AppSafeAreaViewProps = InheritedComponentProps<ComponentProps<typeof View>>;

/** Native adapter: delegates inset handling to react-native-safe-area-context. */
export function AppSafeAreaView(props: AppSafeAreaViewProps) {
  return <SafeAreaView {...props} />;
}
