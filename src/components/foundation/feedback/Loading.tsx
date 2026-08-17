import type { InheritedComponentProps } from '../../types'; import { ActivityIndicator, View } from 'react-native'; import { cn } from '../../core/cn';
import type { UniversalProps } from '../contracts';
/** Props for a centered activity indicator. */ export type LoadingProps = InheritedComponentProps<UniversalProps & { size?: 'large' | 'small' }>;
/** Renders a platform-native activity indicator with library defaults. */ export function Loading({ className, size = 'small' }: LoadingProps) {
  return <View className={cn('items-center justify-center p-3', className)}><ActivityIndicator color="#5B5CE2" size={size}/></View>;
}
