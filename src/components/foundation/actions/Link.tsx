import type { InheritedComponentProps } from '../../types'; import type { ReactNode } from 'react';
import { Pressable, Text, type PressableProps } from 'react-native'; import { cn } from '../../core/cn'; import { focusRingClassName } from '../../core/styles';
/** Props for a pressable, link-role text control. */ export type LinkProps = InheritedComponentProps<PressableProps & { children?: ReactNode; className?: string; onPress?: () => void }>;
/** Renders an accessible cross-platform link whose navigation is consumer-owned. */ export function Link({ children, className, ...props }: LinkProps) {
  return <Pressable accessibilityRole="link" className={cn('self-start web:cursor-pointer', focusRingClassName, className)} {...props}><Text className="font-bold text-brand-600 underline dark:text-brand-300">{children}</Text></Pressable>;
}
