import type { InheritedComponentProps } from '../../types'; import { forwardRef } from 'react'; import { View } from 'react-native';
import { cn } from '../../core/cn'; import type { UniversalProps } from '../contracts'; import { toneClasses } from '../contracts';
/** Props for a semantic alert surface. */ export type AlertProps = InheritedComponentProps<UniversalProps>;
/** Renders content in an accessible status-toned alert container. */ export const Alert = forwardRef<View, AlertProps>(function Alert({ children, className, tone = 'info', ...props }, ref) {
  return <View accessibilityRole="alert" className={cn('overflow-hidden rounded-2xl border border-l-4 p-4 shadow-sm web:transition-all web:duration-200 web:hover:-translate-y-0.5 web:hover:shadow-md web:motion-reduce:transform-none', toneClasses[tone], className)} ref={ref} {...props}>{children}</View>;
});
