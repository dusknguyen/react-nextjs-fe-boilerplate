'use client';

import { Suspense, useCallback, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { SectionHeading } from '@/src/components';

import {
  demoComponentCount,
  demoSections,
  type DemoCatalogFilter,
  type DemoSection,
  type DemoSectionId,
} from './component-demo/catalog';
import { DemoSectionLoading } from './component-demo/DemoSectionLoading';
import { DemoSectionPanel } from './component-demo/DemoSectionPanel';
import { demoSectionRegistry } from './component-demo/demoSectionRegistry';

const allFilter = {
  id: 'all' as const,
  label: 'All components',
  count: demoComponentCount,
};

function CatalogSection({ section }: { section: DemoSection }) {
  const Demo = demoSectionRegistry[section.id];
  return (
    <Suspense fallback={<DemoSectionLoading />}>
      <DemoSectionPanel section={section}><Demo /></DemoSectionPanel>
    </Suspense>
  );
}

export function NativeWindComponentCatalog() {
  const [activeFilter, setActiveFilter] = useState<DemoCatalogFilter>('actions');

  const selectFilter = useCallback((filter: DemoCatalogFilter) => {
    if (filter !== 'all') void demoSectionRegistry[filter].preload();
    setActiveFilter(filter);
  }, []);

  const visibleSections = activeFilter === 'all'
    ? demoSections
    : demoSections.filter((section) => section.id === activeFilter);

  return (
    <View className="mt-8">
      <SectionHeading
        eyebrow="Component demo"
        title={`${demoComponentCount} interactive APIs, loaded by capability`}
        description="Mỗi nhóm chỉ được tải khi cần, giữ state trong đúng demo và sử dụng API công khai của thư viện components."
      />

      <ScrollView
        accessibilityRole="tablist"
        contentContainerClassName="gap-3 pr-4"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {[allFilter, ...demoSections.map((section) => ({
          id: section.id,
          label: section.label,
          count: section.names.length,
        }))].map((filter) => {
          const selected = activeFilter === filter.id;
          return (
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              className={selected
                ? 'min-w-36 rounded-2xl bg-brand-600 px-4 py-3 web:cursor-pointer'
                : 'min-w-36 rounded-2xl border border-slate-200 bg-white px-4 py-3 web:cursor-pointer web:hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900'}
              key={filter.id}
              onHoverIn={() => filter.id !== 'all' && void demoSectionRegistry[filter.id as DemoSectionId].preload()}
              onPress={() => selectFilter(filter.id)}
            >
              <Text className={selected ? 'font-black text-white' : 'font-black text-slate-950 dark:text-white'}>{filter.label}</Text>
              <Text className={selected ? 'mt-1 text-xs font-semibold text-brand-100' : 'mt-1 text-xs font-semibold text-slate-400'}>{filter.count} components</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {visibleSections.map((section) => <CatalogSection key={section.id} section={section} />)}
    </View>
  );
}
