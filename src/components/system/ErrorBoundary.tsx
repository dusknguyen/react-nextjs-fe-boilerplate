'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Text, View } from 'react-native';

import type { InheritedComponentProps } from '../types';

/** Props accepted by the reusable error boundary. */
export type ErrorBoundaryProps = InheritedComponentProps<{
  children?: ReactNode;
  fallback?: ReactNode | ((error: Error) => ReactNode);
  onError?: (error: Error, info: ErrorInfo) => void;
}>;

type ErrorBoundaryState = {
  error: Error | null;
};

/** Catches render errors below a component subtree and exposes an app-owned fallback. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  override render() {
    const { children, fallback } = this.props;
    const { error } = this.state;

    if (!error) return children;
    if (typeof fallback === 'function') return fallback(error);
    if (fallback) return fallback;

    return (
      <View className="rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900 dark:bg-rose-950">
        <Text className="font-black text-rose-800 dark:text-rose-100">
          Something went wrong
        </Text>
        <Text className="mt-1 text-sm text-rose-700 dark:text-rose-200">
          {error.message}
        </Text>
      </View>
    );
  }
}
