'use client';

import { Text, View } from 'react-native';

import { AppButton, AppSafeAreaView } from '@/src/components';

export default function NotFoundView({ onHome }: { onHome: () => void }) {
  return (
    <AppSafeAreaView className="flex-1 bg-canvas-light dark:bg-canvas-dark">
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-xl items-center rounded-[32px] border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 sm:p-12">
          <View className="mb-5 h-16 w-16 items-center justify-center rounded-3xl bg-brand-100 dark:bg-brand-950">
            <Text className="text-2xl font-black text-brand-700 dark:text-brand-200">404</Text>
          </View>
          <Text className="text-center text-2xl font-black text-slate-950 dark:text-white sm:text-3xl">
            This page is taking a mindful break.
          </Text>
          <Text className="mb-6 mt-3 text-center leading-6 text-slate-500 dark:text-slate-400">
            The route does not exist on Expo or Next.js.
          </Text>
          <AppButton onPress={onHome}>Return to dashboard</AppButton>
        </View>
      </View>
    </AppSafeAreaView>
  );
}
