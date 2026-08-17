import { forwardRef } from 'react';
import { Text, View } from 'react-native';
import { cn } from '../core/cn';
import type { UniversalProps } from './contracts';
/** Builds a named View primitive from a single base style contract. */ export function createBox(displayName: string, baseClassName: string) { const Component = forwardRef<View, UniversalProps>(({ children, className, ...props }, ref) => (<View className={cn(baseClassName, className)} ref={ref} {...props}>{children}</View>)); Component.displayName = displayName; return Component; }
/** Builds a named Text primitive from a single base style contract. */ export function createText(displayName: string, baseClassName: string) { const Component = ({ children, className }: UniversalProps) => (<Text className={cn(baseClassName, className)}>{children}</Text>); Component.displayName = displayName; return Component; }
