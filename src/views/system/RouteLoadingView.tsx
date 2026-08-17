import { View } from 'react-native';

import { AppSafeAreaView } from '@/src/components';

export function RouteLoadingView() {
  return (
    <AppSafeAreaView className="flex-1 bg-canvas-light dark:bg-canvas-dark">
      <View className="flex-1 lg:flex-row">
        <View className="hidden w-72 border-r border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 lg:flex">
          <View className="h-11 w-40 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <View className="mt-10 gap-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <View className="h-12 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900" key={item} />
            ))}
          </View>
        </View>
        <View className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
          <View className="h-5 w-40 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
          <View className="mt-7 h-12 w-3/4 max-w-xl animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <View className="mt-4 h-5 w-2/3 max-w-lg animate-pulse rounded-full bg-slate-100 dark:bg-slate-900" />
          <View className="mt-10 h-80 animate-pulse rounded-[32px] bg-white dark:bg-slate-900" />
        </View>
      </View>
    </AppSafeAreaView>
  );
}
