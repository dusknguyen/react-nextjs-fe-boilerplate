'use client';

import { Pressable, Text, View } from 'react-native';

export type AppErrorViewProps = {
  error: Error & { digest?: string };
  onRetry: () => void;
};

export function AppErrorView({ error, onRetry }: AppErrorViewProps) {
  return (
    <View className="min-h-screen items-center justify-center bg-slate-50 px-6 py-12 dark:bg-slate-950">
      <View className="w-full max-w-xl rounded-[32px] border border-danger-200 bg-white p-7 shadow-xl dark:border-danger-800 dark:bg-slate-900">
        <Text className="text-xs font-black uppercase tracking-[2px] text-danger-600 dark:text-danger-300">
          Application error
        </Text>
        <Text className="mt-3 text-3xl font-black tracking-tight text-dark dark:text-white">
          Something interrupted this view.
        </Text>
        <Text className="mt-3 text-sm leading-6 text-secondary-700 dark:text-secondary-300">
          Retry the current route without reloading the whole application.
        </Text>
        {error.digest ? (
          <Text className="mt-3 text-sm leading-6 text-secondary-700 dark:text-secondary-300">
            Reference: {error.digest}
          </Text>
        ) : null}
        <Pressable
          accessibilityRole="button"
          className="mt-6 min-h-12 items-center justify-center rounded-2xl bg-primary px-5 py-3 active:opacity-70 web:cursor-pointer web:hover:bg-primary-600"
          onPress={onRetry}
        >
          <Text className="font-black text-white">Try again</Text>
        </Pressable>
      </View>
    </View>
  );
}
