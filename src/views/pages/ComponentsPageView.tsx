'use client';

import { Text, View } from 'react-native';

import { NativeWindComponentCatalog } from '@/src/features/gallery/NativeWindComponentCatalog';
import { PrimitiveBoundaryShowcase } from '@/src/features/gallery/PrimitiveBoundaryShowcase';
import { demoComponentCount } from '@/src/features/gallery/component-demo/catalog';
import { appRoutes } from '@/src/modules/navigation/domain/appRoute';
import type { PageNavigationPort } from '@/src/modules/navigation/ports/navigation';
import { AppPageShell } from '@/src/views/layout/AppPageShell';

import { AppThemeSwitcher } from '@/src/features/gallery/AppThemeSwitcher';

type ComponentsPageViewProps = {
  navigation: PageNavigationPort;
};

const galleryStats = [
  { label: 'Interactive APIs', value: String(demoComponentCount) },
  { label: 'Shared routes', value: String(appRoutes.length) },
  { label: 'Appearance modes', value: '3' },
  { label: 'Accent palettes', value: '4' },
] as const;

function PreviewCard({ dark = false }: { dark?: boolean }) {
  return (
    <View className={dark ? 'flex-1 rounded-3xl bg-slate-950 p-5' : 'flex-1 rounded-3xl border border-slate-200 bg-white p-5'}>
      <View className="mb-6 flex-row items-center justify-between">
        <View className={dark ? 'h-11 w-11 items-center justify-center rounded-2xl bg-brand-950' : 'h-11 w-11 items-center justify-center rounded-2xl bg-brand-100'}>
          <Text className={dark ? 'font-black text-brand-200' : 'font-black text-brand-700'}>AI</Text>
        </View>
        <View className={dark ? 'rounded-full bg-emerald-950 px-3 py-1.5' : 'rounded-full bg-emerald-100 px-3 py-1.5'}>
          <Text className={dark ? 'text-xs font-bold text-emerald-300' : 'text-xs font-bold text-emerald-700'}>{dark ? 'Dark' : 'Light'}</Text>
        </View>
      </View>
      <Text className={dark ? 'text-xl font-black text-white' : 'text-xl font-black text-slate-950'}>Your next best step</Text>
      <Text className={dark ? 'mt-2 leading-6 text-slate-300' : 'mt-2 leading-6 text-slate-600'}>
        Protect one focused block, then take a real break.
      </Text>
      <View className={dark ? 'mt-5 h-3 overflow-hidden rounded-full bg-slate-800' : 'mt-5 h-3 overflow-hidden rounded-full bg-slate-100'}>
        <View className="h-full w-3/4 rounded-full bg-brand-500" />
      </View>
      <View className="mt-5 flex-row gap-3">
        <View className="rounded-xl bg-brand-600 px-4 py-3"><Text className="text-xs font-bold text-white">Continue</Text></View>
        <View className={dark ? 'rounded-xl border border-slate-700 px-4 py-3' : 'rounded-xl border border-slate-200 px-4 py-3'}>
          <Text className={dark ? 'text-xs font-bold text-slate-200' : 'text-xs font-bold text-slate-700'}>Details</Text>
        </View>
      </View>
    </View>
  );
}

export default function ComponentsPageView({ navigation }: ComponentsPageViewProps) {
  return (
    <AppPageShell activeRoute="components" navigation={navigation} showHeading={false}>
          <View className="relative overflow-hidden rounded-[40px] bg-slate-950 px-6 py-10 sm:px-10 sm:py-12">
            <View className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-500/30" />
            <View className="absolute -bottom-24 right-40 h-56 w-56 rounded-full bg-cyan-400/10" />
            <View className="relative max-w-3xl">
              <View className="mb-5 self-start rounded-full border border-white/15 bg-white/10 px-4 py-2">
                <Text className="text-xs font-black uppercase tracking-[2px] text-brand-200">Native-first design system</Text>
              </View>
              <Text className="text-4xl font-black leading-[46px] tracking-tight text-white sm:text-6xl sm:leading-[66px]">
                One beautiful UI system. Every screen. Every platform.
              </Text>
              <Text className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Explore every universal component, switch appearance instantly, and validate the same NativeWind experience on Expo and Next.js.
              </Text>
              <View className="mt-7 flex-row flex-wrap gap-2">
                {['React Native primitives', 'NativeWind v4', 'No DOM UI kit', 'Persistent theme'].map((item) => (
                  <View className="rounded-full bg-white/10 px-3 py-2" key={item}>
                    <Text className="text-xs font-bold text-white">{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View className="-mt-5 mx-4 flex-row flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-800 dark:bg-slate-900 sm:mx-8 sm:p-5">
            {galleryStats.map((stat) => (
              <View className="min-w-32 flex-1 px-3 py-2" key={stat.label}>
                <Text className="text-2xl font-black text-slate-950 dark:text-white">{stat.value}</Text>
                <Text className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{stat.label}</Text>
              </View>
            ))}
          </View>

          <View className="mt-10 gap-6 lg:flex-row">
            <AppThemeSwitcher className="lg:flex-1" />
            <View className="gap-4 lg:flex-[1.15]">
              <View>
                <Text className="text-xs font-black uppercase tracking-[2px] text-brand-600 dark:text-brand-300">Live contrast check</Text>
                <Text className="mt-2 text-2xl font-black text-slate-950 dark:text-white">Light and dark, side by side</Text>
                <Text className="mt-2 leading-6 text-slate-600 dark:text-slate-300">Both previews use the active accent palette, so contrast and hierarchy remain visible while you experiment.</Text>
              </View>
              <View className="gap-4 sm:flex-row">
                <PreviewCard />
                <PreviewCard dark />
              </View>
            </View>
          </View>

          <NativeWindComponentCatalog />
          <PrimitiveBoundaryShowcase />
    </AppPageShell>
  );
}
