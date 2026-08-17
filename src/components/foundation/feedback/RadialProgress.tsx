import type { InheritedComponentProps } from '../../types'; import { Text, View } from 'react-native'; import { cn } from '../../core/cn';
import type { UniversalProps } from '../contracts'; import { clampPercentage } from './clampPercentage';
/** Props for a radial percentage indicator. */ export type RadialProgressProps = InheritedComponentProps<UniversalProps & { value?: number }>;
/** Renders an accessible radial progress indicator with a numeric label. */ export function RadialProgress({ className, value = 0 }: RadialProgressProps) { const safeValue = clampPercentage(value);
  return <View accessibilityRole="progressbar" accessibilityValue={{ max: 100, min: 0, now: safeValue }} className={cn('h-28 w-28 items-center justify-center rounded-full border-[10px] border-brand-500 bg-brand-50 shadow-lg dark:bg-brand-950', className)}><View className="h-20 w-20 items-center justify-center rounded-full border border-brand-100 bg-white shadow-sm dark:border-brand-900 dark:bg-slate-900"><Text className="text-xl font-black tracking-tight text-slate-950 dark:text-white">{safeValue}%</Text></View></View>;
}
