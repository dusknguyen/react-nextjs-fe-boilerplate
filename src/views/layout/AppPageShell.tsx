'use client';

import type { ReactNode } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { AppSafeAreaView, cn, SectionHeading } from '@/src/components';
import {
  appRouteGroups,
  appRoutes,
  getAdjacentRoutes,
  getAppRoute,
  getRoutesInGroup,
  type AppRoute,
  type AppRouteId,
} from '@/src/modules/navigation/domain/appRoute';
import type { PageNavigationPort } from '@/src/modules/navigation/ports/navigation';
import { useIdleRoutePrefetch } from '@/src/modules/navigation/presentation/useIdleRoutePrefetch';
import { useThemePreferenceCommands } from '@/src/modules/theme/presentation/ThemePreferencesProvider';

type RouteActionProps = {
  activeRoute: AppRouteId;
  compact?: boolean;
  navigation: PageNavigationPort;
  route: AppRoute;
};

function RouteAction({ activeRoute, compact = false, navigation, route }: RouteActionProps) {
  const active = route.id === activeRoute;

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityState={{ selected: active }}
      className={cn(
        compact
          ? 'min-h-10 flex-row items-center rounded-xl px-3 py-2'
          : 'min-h-12 flex-row items-center rounded-2xl px-3 py-2.5',
        active
          ? 'bg-brand-600 shadow-sm'
          : 'web:hover:bg-slate-100 dark:web:hover:bg-slate-800',
        'active:opacity-70 web:cursor-pointer',
      )}
      onHoverIn={() => navigation.prefetch(route.id)}
      onPress={() => {
        if (!active) navigation.navigate(route.id);
      }}
    >
      <View
        className={cn(
          'mr-3 h-8 w-8 items-center justify-center rounded-xl',
          active ? 'bg-white/15' : 'bg-slate-100 dark:bg-slate-800',
        )}
      >
        <Text className={cn('text-[10px] font-black', active ? 'text-white' : 'text-slate-500 dark:text-slate-300')}>
          {route.symbol}
        </Text>
      </View>
      <Text
        className={cn(
          'font-bold',
          compact ? 'text-xs' : 'text-sm',
          active ? 'text-white' : 'text-slate-700 dark:text-slate-200',
        )}
      >
        {route.shortTitle}
      </Text>
    </Pressable>
  );
}

function Brand() {
  return (
    <View className="flex-row items-center">
      <View className="h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 dark:bg-white">
        <Text className="font-black text-white dark:text-slate-950">AI</Text>
      </View>
      <View className="ml-3">
        <Text className="text-sm font-black text-slate-950 dark:text-white">Life Coach</Text>
        <Text className="mt-0.5 text-[10px] font-bold uppercase tracking-[1.5px] text-brand-600 dark:text-brand-300">
          Expo + Next
        </Text>
      </View>
    </View>
  );
}

function AppearanceButton() {
  const { colorScheme } = useColorScheme();
  const { setAppearance } = useThemePreferenceCommands();
  const dark = colorScheme === 'dark';

  return (
    <Pressable
      accessibilityLabel={`Use ${dark ? 'light' : 'dark'} appearance`}
      accessibilityRole="button"
      className="h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white active:opacity-70 web:cursor-pointer web:hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900"
      onPress={() => setAppearance(dark ? 'light' : 'dark')}
    >
      <Text className="text-base font-black text-slate-700 dark:text-slate-200">{dark ? 'L' : 'D'}</Text>
    </Pressable>
  );
}

function DesktopSidebar({ activeRoute, navigation }: Pick<AppPageShellProps, 'activeRoute' | 'navigation'>) {
  return (
    <View className="hidden w-72 shrink-0 border-r border-slate-200 bg-white px-5 py-6 dark:border-slate-800 dark:bg-slate-950 lg:flex">
      <View className="mb-7 flex-row items-center justify-between">
        <Brand />
        <AppearanceButton />
      </View>

      <ScrollView className="flex-1" contentContainerClassName="pb-6" showsVerticalScrollIndicator={false}>
        {appRouteGroups.map((group) => (
          <View className="mb-5" key={group}>
            <Text className="mb-2 px-3 text-[10px] font-black uppercase tracking-[1.8px] text-slate-400">
              {group}
            </Text>
            <View className="gap-1">
              {getRoutesInGroup(group).map((route) => (
                <RouteAction
                  activeRoute={activeRoute}
                  key={route.id}
                  navigation={navigation}
                  route={route}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="rounded-3xl bg-brand-600 p-4">
        <Text className="text-[10px] font-black uppercase tracking-[1.5px] text-brand-100">Architecture</Text>
        <Text className="mt-2 font-black leading-5 text-white">Shared features. Thin router adapters.</Text>
      </View>
    </View>
  );
}

function MobileHeader({ activeRoute, navigation }: Pick<AppPageShellProps, 'activeRoute' | 'navigation'>) {
  return (
    <View className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:hidden">
      <View className="flex-row items-center justify-between px-4 py-4 sm:px-6">
        <Brand />
        <AppearanceButton />
      </View>
      <ScrollView
        contentContainerClassName="gap-2 px-4 pb-4 sm:px-6"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {appRoutes.map((route) => (
          <RouteAction
            activeRoute={activeRoute}
            compact
            key={route.id}
            navigation={navigation}
            route={route}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function PageStepper({ activeRoute, navigation }: Pick<AppPageShellProps, 'activeRoute' | 'navigation'>) {
  const { next, previous } = getAdjacentRoutes(activeRoute);

  return (
    <View className="mt-10 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row sm:gap-4">
      <View className="mb-3 flex-1 sm:mb-0">
        {previous ? (
          <Pressable
            accessibilityRole="link"
            className="min-h-24 flex-1 rounded-3xl border border-slate-200 bg-white p-5 active:opacity-70 web:cursor-pointer web:hover:border-brand-300 dark:border-slate-800 dark:bg-slate-900 dark:web:hover:border-brand-700"
            onHoverIn={() => navigation.prefetch(previous.id)}
            onPress={() => navigation.navigate(previous.id)}
          >
            <Text className="text-[10px] font-black uppercase tracking-[1.5px] text-slate-400">Previous page</Text>
            <Text className="mt-2 font-black text-slate-950 dark:text-white">← {previous.title}</Text>
          </Pressable>
        ) : null}
      </View>
      <View className="flex-1">
        {next ? (
          <Pressable
            accessibilityRole="link"
            className="min-h-24 flex-1 items-end rounded-3xl bg-slate-950 p-5 active:opacity-70 web:cursor-pointer web:hover:bg-brand-700 dark:bg-brand-600"
            onHoverIn={() => navigation.prefetch(next.id)}
            onPress={() => navigation.navigate(next.id)}
          >
            <Text className="text-[10px] font-black uppercase tracking-[1.5px] text-slate-400 dark:text-brand-100">Next page</Text>
            <Text className="mt-2 text-right font-black text-white">{next.title} →</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

export type AppPageShellProps = {
  activeRoute: AppRouteId;
  children: ReactNode;
  description?: string;
  eyebrow?: string;
  keyboardShouldPersistTaps?: 'always' | 'handled' | 'never';
  maxWidthClassName?: string;
  navigation: PageNavigationPort;
  showHeading?: boolean;
  title?: string;
};

export function AppPageShell({
  activeRoute,
  children,
  description,
  eyebrow = 'Universal route',
  keyboardShouldPersistTaps = 'never',
  maxWidthClassName = 'max-w-6xl',
  navigation,
  showHeading = true,
  title,
}: AppPageShellProps) {
  const route = getAppRoute(activeRoute);
  const { next, previous } = getAdjacentRoutes(activeRoute);

  useIdleRoutePrefetch(navigation, previous?.id ?? null, next?.id ?? null);

  return (
    <AppSafeAreaView className="flex-1 bg-canvas-light dark:bg-canvas-dark">
      <View className="flex-1 lg:flex-row">
        <DesktopSidebar activeRoute={activeRoute} navigation={navigation} />
        <View className="min-w-0 flex-1">
          <MobileHeader activeRoute={activeRoute} navigation={navigation} />
          <ScrollView
            className="flex-1"
            contentContainerClassName="grow items-center px-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:pt-8"
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            showsVerticalScrollIndicator={false}
          >
            <View className={cn('w-full', maxWidthClassName)}>
              <View className="mb-6 flex-row flex-wrap items-center justify-between gap-3">
                <View className="flex-row items-center">
                  <Pressable
                    accessibilityRole="link"
                    className="web:cursor-pointer"
                    onHoverIn={() => navigation.prefetch('home')}
                    onPress={() => navigation.navigate('home')}
                  >
                    <Text className="text-xs font-bold text-slate-400 web:hover:text-brand-600">Home</Text>
                  </Pressable>
                  {activeRoute !== 'home' ? (
                    <>
                      <Text className="mx-2 text-xs text-slate-300 dark:text-slate-700">/</Text>
                      <Text className="text-xs font-bold text-slate-700 dark:text-slate-200">{route.title}</Text>
                    </>
                  ) : null}
                </View>
                <View className="rounded-full border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
                  <Text className="text-[10px] font-black uppercase tracking-[1.2px] text-slate-500 dark:text-slate-400">
                    Page {appRoutes.indexOf(route) + 1} / {appRoutes.length}
                  </Text>
                </View>
              </View>

              {showHeading ? (
                <SectionHeading
                  description={description ?? route.description}
                  eyebrow={eyebrow}
                  title={title ?? route.title}
                />
              ) : null}

              {children}
              <PageStepper activeRoute={activeRoute} navigation={navigation} />
            </View>
          </ScrollView>
        </View>
      </View>
    </AppSafeAreaView>
  );
}
