'use client';

import type { ReactElement } from 'react';
import {
  FlatList,
  SectionList,
  Text,
  View,
  type FlatListProps,
  type SectionListData,
  type SectionListProps,
} from 'react-native';

import { cn } from '../core/cn';
import type { InheritedComponentProps } from '../types';

/** Props accepted by the virtual-list component. */
export type VirtualListProps<Item> = InheritedComponentProps<
  FlatListProps<Item> & {
    className?: string;
    emptyLabel?: string;
  }
>;

/** Virtualized list wrapper for large native and web collections. */
export function VirtualList<Item>({
  className,
  contentContainerClassName,
  emptyLabel = 'No items',
  ListEmptyComponent,
  ...props
}: VirtualListProps<Item>) {
  return (
    <FlatList
      className={className}
      contentContainerClassName={cn('grow', contentContainerClassName)}
      ListEmptyComponent={
        ListEmptyComponent ?? (
          <View className="flex-1 items-center justify-center p-8">
            <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              {emptyLabel}
            </Text>
          </View>
        )
      }
      {...props}
    />
  );
}

/** Props accepted by the grid-list component. */
export type GridListProps<Item> = InheritedComponentProps<
  VirtualListProps<Item> & {
    columns?: number;
    gap?: number;
  }
>;

/** Virtualized responsive-style grid built on FlatList. */
export function GridList<Item>({
  columns = 2,
  columnWrapperStyle,
  gap = 12,
  ...props
}: GridListProps<Item>) {
  const safeColumns = Math.max(1, Math.floor(columns));
  return (
    <VirtualList
      columnWrapperStyle={
        safeColumns > 1 ? [{ gap }, columnWrapperStyle] : undefined
      }
      numColumns={safeColumns}
      {...props}
    />
  );
}

/** Props accepted by the sectioned-list component. */
export type SectionedListProps<Item, Section extends SectionListData<Item>> =
  InheritedComponentProps<
    SectionListProps<Item, Section> & {
      className?: string;
      renderDefaultSectionHeader?: (title: string) => ReactElement;
    }
  >;

/** Virtualized section list with an optional default title renderer. */
export function SectionedList<
  Item,
  Section extends SectionListData<Item>,
>({
  className,
  renderDefaultSectionHeader,
  renderSectionHeader,
  ...props
}: SectionedListProps<Item, Section>) {
  return (
    <SectionList
      className={className}
      renderSectionHeader={
        renderSectionHeader ??
        (({ section }) => {
          const title = String((section as Section & { title?: string }).title ?? '');
          return renderDefaultSectionHeader ? (
            renderDefaultSectionHeader(title)
          ) : (
            <View className="bg-slate-100 px-4 py-2 dark:bg-slate-800">
              <Text className="text-xs font-black uppercase tracking-[1px] text-slate-600 dark:text-slate-300">
                {title}
              </Text>
            </View>
          );
        })
      }
      {...props}
    />
  );
}
