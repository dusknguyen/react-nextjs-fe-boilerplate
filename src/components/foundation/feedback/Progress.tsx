import type { InheritedComponentProps } from '../../types'; import { View } from 'react-native'; import { cn } from '../../core/cn'; import { MotionProgress } from '../../core/motion';
import type { UniversalProps } from '../contracts'; import { clampPercentage } from './clampPercentage';
/** Props for a linear percentage indicator. */ export type ProgressProps = InheritedComponentProps<UniversalProps & { value?: number }>;
/** Renders an accessible, animated linear progress indicator. */ export function Progress({ className, value = 0 }: ProgressProps) { const safeValue = clampPercentage(value);
  return <View accessibilityRole="progressbar" accessibilityValue={{ max: 100, min: 0, now: safeValue }} className={cn('h-3 overflow-hidden rounded-full border border-slate-200/80 bg-slate-100 web:shadow-inner dark:border-slate-700 dark:bg-slate-800', className)}><MotionProgress className="h-full rounded-full bg-brand-600 shadow-sm" value={safeValue}/></View>;
}
