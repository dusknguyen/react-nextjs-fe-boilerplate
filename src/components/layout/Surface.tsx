import type { InheritedComponentProps } from '../types'; import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import { cn } from '../core/cn';
import { elevatedSurfaceClassName } from '../core/styles';
type SurfaceProps = InheritedComponentProps<ViewProps & { children: ReactNode; className?: string; }>;
export function Surface({ children, className, ...props }: SurfaceProps) { return (<View className={cn('relative overflow-hidden rounded-[28px] p-5 sm:p-6', elevatedSurfaceClassName, className)} {...props}>{children}</View>); }
