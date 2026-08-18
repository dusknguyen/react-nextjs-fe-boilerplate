'use client';

import type { ReactNode } from 'react';
import { Text, View, type ViewProps } from 'react-native';
import { cn } from '../core/cn';

/** Props for UIFormField. */
export interface UIFormFieldProps extends ViewProps {
  children?: ReactNode;
  description?: string;
  error?: string;
  label?: string;
  required?: boolean;
}

/** Provides consistent label, help text and error semantics around any input control. */
export function UIFormField({
  children,
  className,
  description,
  error,
  label,
  required = false,
  ...props
}: UIFormFieldProps) {
  return (
    <View className={cn('gap-ui-xs', className)} {...props}>
      {label ? (
        <Text className="text-sm font-medium text-ui-text">
          {label}{required ? ' *' : ''}
        </Text>
      ) : null}
      {children}
      {error ? (
        <Text accessibilityLiveRegion="polite" className="text-xs text-ui-danger">{error}</Text>
      ) : description ? (
        <Text className="text-xs text-ui-text-muted">{description}</Text>
      ) : null}
    </View>
  );
}
