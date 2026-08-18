import { View } from 'react-native';

export function DemoSectionLoading() {
  return (
    <View
      accessibilityLabel="Loading component examples"
      className="mt-8 gap-4 rounded-[32px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
    >
      <View className="h-4 w-36 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
      <View className="h-8 w-64 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
      <View className="h-32 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
    </View>
  );
}
