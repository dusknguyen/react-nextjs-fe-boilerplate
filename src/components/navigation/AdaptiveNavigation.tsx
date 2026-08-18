'use client';

import type { ReactNode } from 'react';
import { Text, View, type ViewProps } from 'react-native';

import { PressScale, SlideIn } from '../animation/Animations';
import { cn } from '../core/cn';
import { useAdaptiveLayout } from '../layout/AdaptiveLayout';
import type { InheritedComponentProps } from '../types';

/** One item rendered by adaptive navigation components. */
export type AdaptiveNavigationItem = {
  badge?: string | number;
  icon?: ReactNode;
  id: string;
  label: string;
};

/** Props shared by adaptive navigation bars and rails. */
export type AdaptiveNavigationProps = InheritedComponentProps<
  ViewProps & {
    items: readonly AdaptiveNavigationItem[];
    onSelect: (id: string) => void;
    selectedId?: string;
  }
>;

type NavigationItemProps = InheritedComponentProps<{
  item: AdaptiveNavigationItem;
  onSelect: (id: string) => void;
  selected: boolean;
  vertical: boolean;
}>;

function NavigationItem({
  item,
  onSelect,
  selected,
  vertical,
}: NavigationItemProps) {
  return (
    <PressScale
      accessibilityLabel={item.label}
      accessibilityRole="tab"
      accessibilityState={{ selected }}
      className={cn(
        'min-h-11 items-center justify-center rounded-xl px-3 py-2',
        vertical ? 'mb-1 w-full' : 'flex-1',
        selected && 'bg-brand-100 dark:bg-brand-950',
      )}
      onPress={() => onSelect(item.id)}
      pressedScale={0.95}
    >
      {item.icon}
      <View className={cn('items-center', vertical && 'mt-1')}>
        <Text
          className={cn(
            'text-xs font-semibold text-slate-600 dark:text-slate-300',
            selected && 'text-brand-700 dark:text-brand-200',
          )}
          numberOfLines={1}
        >
          {item.label}
        </Text>
        {item.badge !== undefined ? (
          <Text className="mt-0.5 text-[10px] font-bold text-brand-700 dark:text-brand-200">
            {String(item.badge)}
          </Text>
        ) : null}
      </View>
    </PressScale>
  );
}

/** Bottom navigation optimized for compact Android/iOS screens. */
export function AdaptiveBottomNavigation({
  className,
  items,
  onSelect,
  selectedId,
  ...props
}: AdaptiveNavigationProps) {
  return (
    <View
      accessibilityRole="tablist"
      className={cn(
        'flex-row items-center border-t border-slate-200 bg-white px-2 py-2 dark:border-slate-800 dark:bg-slate-950',
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <NavigationItem
          item={item}
          key={item.id}
          onSelect={onSelect}
          selected={item.id === selectedId}
          vertical={false}
        />
      ))}
    </View>
  );
}

/** Vertical navigation rail optimized for tablet, desktop, and wide web layouts. */
export function AdaptiveNavigationRail({
  className,
  items,
  onSelect,
  selectedId,
  ...props
}: AdaptiveNavigationProps) {
  return (
    <SlideIn direction="left" distance={12}>
      <View
        accessibilityRole="tablist"
        className={cn(
          'w-24 border-r border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-950',
          className,
        )}
        {...props}
      >
        {items.map((item) => (
          <NavigationItem
            item={item}
            key={item.id}
            onSelect={onSelect}
            selected={item.id === selectedId}
            vertical
          />
        ))}
      </View>
    </SlideIn>
  );
}

/** Automatically switches between bottom navigation and a side rail at the compact breakpoint. */
export function AutoNavigation(props: AdaptiveNavigationProps) {
  const { isCompact } = useAdaptiveLayout();
  return isCompact ? <AdaptiveBottomNavigation {...props} /> : <AdaptiveNavigationRail {...props} />;
}
