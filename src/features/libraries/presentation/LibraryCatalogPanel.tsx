'use client';

import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { FlashList } from '@shopify/flash-list';
import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import { SectionHeading, Surface } from '@/src/components';
import { libraryPackages, type LibraryCategory } from '@/src/modules/libraries/domain/library';

const filters = ['All', 'Data', 'Device', 'Media', 'Presentation', 'Workflow'] as const;

export function LibraryCatalogPanel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = filters[selectedIndex] ?? 'All';
  const packages = useMemo(
    () => selected === 'All' ? [...libraryPackages] : libraryPackages.filter((item) => item.category === selected as LibraryCategory),
    [selected],
  );

  return (
    <Surface>
      <SectionHeading
        description="Segmented Control filters a memoized catalog; FlashList recycles the horizontal package cards."
        eyebrow="Native control + virtual list"
        title="Library capability catalog"
      />
      <View className="overflow-hidden rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
        <SegmentedControl
          accessibilityLabel="Filter library packages"
          onChange={(event) => setSelectedIndex(event.nativeEvent.selectedSegmentIndex)}
          selectedIndex={selectedIndex}
          values={[...filters]}
        />
      </View>
      <View className="mt-5 h-44">
        <FlashList
          data={packages}
          horizontal
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View className="mr-3 w-64 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
              <View className="self-start rounded-full bg-brand-100 px-3 py-1.5 dark:bg-brand-950">
                <Text className="text-[10px] font-black uppercase tracking-[1px] text-brand-700 dark:text-brand-200">{item.category}</Text>
              </View>
              <Text className="mt-4 font-black text-slate-950 dark:text-white" numberOfLines={2}>{item.name}</Text>
              <Text className="mt-2 text-sm leading-5 text-slate-500 dark:text-slate-400" numberOfLines={3}>{item.capability}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Text className="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Showing {packages.length} of {libraryPackages.length} applied packages.</Text>
    </Surface>
  );
}
