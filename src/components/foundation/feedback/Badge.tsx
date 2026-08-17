import type { InheritedComponentProps } from '../../types'; import { Text, View } from 'react-native';
import { cn } from '../../core/cn'; import type { UniversalProps } from '../contracts'; import { toneClasses, toneTextClasses } from '../contracts';
/** Props for a compact semantic status label. */ export type BadgeProps = InheritedComponentProps<UniversalProps>;
/** Renders a compact, tone-aware status label. */ export function Badge({ children, className, tone = 'brand' }: BadgeProps) {
  return <View className={cn('self-start rounded-full border px-3 py-1.5 shadow-sm web:transition-transform web:duration-200 web:hover:scale-[1.03] web:motion-reduce:transform-none', toneClasses[tone], className)}><Text className={cn('text-xs font-black tracking-[0.3px]', toneTextClasses[tone])}>{children}</Text></View>;
}
