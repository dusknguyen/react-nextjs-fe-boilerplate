'use client';

import { Text, View } from 'react-native';

import { Alert, Loading, Progress, RadialProgress, Skeleton, Toast, Tooltip } from '@/src/components';

export default function FeedbackDemo() {
  return (
    <>
      <Alert tone="success"><Text className="font-bold text-emerald-700 dark:text-emerald-200">Your progress was saved.</Text></Alert>
      <View className="flex-row flex-wrap items-center gap-6">
        <Loading size="large" />
        <RadialProgress value={75} />
        <View className="min-w-52 flex-1"><Text className="mb-2 font-bold text-slate-700 dark:text-slate-200">Weekly progress</Text><Progress value={75} /></View>
      </View>
      <Skeleton />
      <Toast><Text className="font-bold text-slate-900 dark:text-white">A compact cross-platform toast</Text></Toast>
      <Tooltip tip="Rendered without a DOM-only library"><Text className="font-bold text-brand-600 underline dark:text-brand-300">Press or hover for a tooltip</Text></Tooltip>
    </>
  );
}
