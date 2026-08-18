import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { Badge } from '@/src/components';

import type { DemoSection } from './catalog';

export function DemoSectionPanel({
  children,
  section,
}: {
  children: ReactNode;
  section: DemoSection;
}) {
  return (
    <View className="relative mt-8 rounded-[32px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <View className="rounded-t-[31px] border-b border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950 sm:p-6">
        <View className="gap-4 sm:flex-row sm:items-start sm:justify-between">
          <View className="flex-1">
            <Text className="text-xs font-black uppercase tracking-[2px] text-brand-600 dark:text-brand-300">
              NativeWind library
            </Text>
            <Text className="mt-2 text-2xl font-black text-slate-950 dark:text-white">{section.label}</Text>
            <Text className="mt-2 max-w-2xl leading-6 text-slate-600 dark:text-slate-300">
              {section.description}
            </Text>
          </View>
          <Badge tone="brand">{section.names.length} components</Badge>
        </View>
        <View className="mt-5 flex-row flex-wrap gap-2">
          {section.names.map((name) => <Badge key={name} tone="neutral">{name}</Badge>)}
        </View>
      </View>
      <View className="gap-6 p-5 sm:p-6">{children}</View>
    </View>
  );
}
