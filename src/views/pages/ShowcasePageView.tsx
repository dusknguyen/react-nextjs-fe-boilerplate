'use client';

import { useState } from 'react';
import { Platform, Switch, Text, TextInput, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { useColorScheme } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SectionHeading, Surface } from '@/src/components';
import type { PageNavigationPort } from '@/src/modules/navigation/ports/navigation';
import { AppPageShell } from '@/src/views/layout/AppPageShell';

type ShowcasePageViewProps = {
  navigation: PageNavigationPort;
};

const packages = [
  { name: 'NativeWind', detail: 'Utility styles compiled for native and CSS on web' },
  { name: 'Safe Area Context', detail: 'Insets for notches, browser viewport and device chrome' },
  { name: 'Zustand + MMKV', detail: 'Shared state with a native-first persistence adapter' },
  { name: 'Picker + Slider', detail: 'Community controls selected for cross-platform support' },
] as const;

const semanticColors = [
  { className: 'bg-primary', foreground: 'text-white', label: 'Primary', value: '#0d6efd' },
  { className: 'bg-secondary', foreground: 'text-white', label: 'Secondary', value: '#6c757d' },
  { className: 'bg-success', foreground: 'text-white', label: 'Success', value: '#198754' },
  { className: 'bg-info', foreground: 'text-dark', label: 'Info', value: '#0dcaf0' },
  { className: 'bg-warning', foreground: 'text-dark', label: 'Warning', value: '#ffc107' },
  { className: 'bg-danger', foreground: 'text-white', label: 'Danger', value: '#dc3545' },
  { className: 'bg-light', foreground: 'text-dark', label: 'Light', value: '#f8f9fa' },
  { className: 'bg-dark', foreground: 'text-white', label: 'Dark', value: '#212529' },
] as const;

const spectrumColors = [
  { className: 'bg-blue-500', label: 'Blue' },
  { className: 'bg-indigo-500', label: 'Indigo' },
  { className: 'bg-purple-500', label: 'Purple' },
  { className: 'bg-pink-500', label: 'Pink' },
  { className: 'bg-red-500', label: 'Red' },
  { className: 'bg-orange-500', label: 'Orange' },
  { className: 'bg-yellow-500', label: 'Yellow' },
  { className: 'bg-green-500', label: 'Green' },
  { className: 'bg-teal-500', label: 'Teal' },
  { className: 'bg-cyan-500', label: 'Cyan' },
] as const;

function CheckIcon() {
  return (
    <View accessibilityLabel="Supported" accessibilityRole="image" className="h-[22px] w-[22px] items-center justify-center rounded-full bg-emerald-500">
      <Text className="text-xs font-black text-white">✓</Text>
    </View>
  );
}

function DemoLabel({ children }: { children: string }) {
  return <Text className="mb-2 text-sm font-bold text-slate-800 dark:text-slate-100">{children}</Text>;
}

export default function ShowcasePageView({ navigation }: ShowcasePageViewProps) {
  const [energy, setEnergy] = useState(68);
  const [notifications, setNotifications] = useState(true);
  const [coachStyle, setCoachStyle] = useState('balanced');
  const [intention, setIntention] = useState('Finish one meaningful task');
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const platform = Platform.select({ ios: 'iOS', android: 'Android', web: 'Web', default: Platform.OS });

  return (
    <AppPageShell
      activeRoute="showcase"
      keyboardShouldPersistTaps="handled"
      navigation={navigation}
      showHeading={false}
    >
          <View className="mb-7 overflow-hidden rounded-[32px] bg-slate-950 p-6 sm:p-9">
            <View className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-brand-500/30" />
            <Text className="mb-3 text-xs font-bold uppercase tracking-[2px] text-brand-300">Universal foundation</Text>
            <Text className="max-w-3xl text-3xl font-black tracking-tight text-white sm:text-5xl">
              Native-first UI, without giving up the web.
            </Text>
            <Text className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Every interactive block below is the same TypeScript component rendered by Expo React Native and Next.js.
            </Text>
            <View className="mt-6 flex-row flex-wrap gap-2">
              <View className="rounded-full bg-emerald-500/20 px-3 py-2">
                <Text className="text-xs font-bold text-emerald-200">Running on {platform}</Text>
              </View>
              {['Expo Router', 'React Native Web', 'Next App Router', 'NativeWind v4'].map((item) => (
                <View key={item} className="rounded-full border border-white/15 bg-white/10 px-3 py-2">
                  <Text className="text-xs font-bold text-white">{item}</Text>
                </View>
              ))}
            </View>
          </View>

          <Surface className="mb-6">
            <SectionHeading
              eyebrow="Shared design tokens"
              title="Semantic color system"
              description="Semantic color roles and 100–900 scales are exposed as NativeWind utilities for the same Expo and Next.js components."
            />
            <View className="flex-row flex-wrap gap-3">
              {semanticColors.map((color) => (
                <View className={`min-w-32 flex-1 rounded-2xl p-4 ${color.className}`} key={color.label}>
                  <Text className={`font-black ${color.foreground}`}>{color.label}</Text>
                  <Text className={`mt-1 text-xs ${color.foreground}`}>{color.value}</Text>
                </View>
              ))}
            </View>
            <View className="mt-5 flex-row flex-wrap gap-2">
              {spectrumColors.map((color) => (
                <View className="min-w-20 items-center" key={color.label}>
                  <View className={`h-12 w-full rounded-xl ${color.className}`} />
                  <Text className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">{color.label}</Text>
                </View>
              ))}
            </View>
            <Text className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Color never carries meaning alone: labels remain visible and foreground colors are chosen for contrast.
            </Text>
          </Surface>

          <View className="gap-6 lg:flex-row">
            <View className="gap-6 lg:flex-[1.15]">
              <Surface>
                <SectionHeading
                  eyebrow="NativeWind"
                  title="Responsive + interaction states"
                  description="Resize the web window. The same flex layout adapts from a mobile stack to a wider row."
                />
                <View className="gap-3 sm:flex-row">
                  {[
                    ['Mobile first', 'Base utilities target phones first.'],
                    ['Responsive', 'sm:, md: and lg: progressively enhance.'],
                    ['Interactive', 'active:, focus: and web:hover: stay declarative.'],
                  ].map(([title, detail], index) => (
                    <View
                      key={title}
                      className={`flex-1 rounded-2xl border p-4 ${
                        index === 0
                          ? 'border-brand-200 bg-brand-50 dark:border-brand-900 dark:bg-brand-950'
                          : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
                      }`}
                    >
                      <Text className="font-bold text-slate-950 dark:text-white">{title}</Text>
                      <Text className="mt-2 text-sm leading-5 text-slate-600 dark:text-slate-300">{detail}</Text>
                    </View>
                  ))}
                </View>
                <View className="mt-4 native:bg-emerald-50 web:bg-sky-50 rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:native:bg-emerald-950 dark:web:bg-sky-950">
                  <Text className="font-bold text-slate-900 dark:text-white">Platform variant</Text>
                  <Text className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    This card uses {Platform.OS === 'web' ? 'web:' : 'native:'} classes without branching the component tree.
                  </Text>
                </View>
              </Surface>

              <Surface>
                <SectionHeading
                  eyebrow="React Native controls"
                  title="A real cross-platform form"
                  description="TextInput, Switch, community Slider and Picker share one state model."
                />

                <View className="gap-5">
                  <View>
                    <DemoLabel>Today&apos;s intention</DemoLabel>
                    <TextInput
                      accessibilityLabel="Today's intention"
                      className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-950 web:outline-none web:focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      onChangeText={setIntention}
                      placeholder="What matters most today?"
                      placeholderTextColor="#94A3B8"
                      value={intention}
                    />
                  </View>

                  <View>
                    <View className="mb-1 flex-row items-center justify-between">
                      <DemoLabel>Energy level</DemoLabel>
                      <Text className="font-black text-brand-600 dark:text-brand-300">{Math.round(energy)}%</Text>
                    </View>
                    <Slider
                      accessibilityLabel="Energy level"
                      maximumTrackTintColor="#CBD5E1"
                      maximumValue={100}
                      minimumTrackTintColor="#5B5CE2"
                      minimumValue={0}
                      onValueChange={setEnergy}
                      step={1}
                      thumbTintColor="#5B5CE2"
                      value={energy}
                    />
                  </View>

                  <View className="gap-3 sm:flex-row">
                    <View className="flex-1">
                      <DemoLabel>Coach style</DemoLabel>
                      <View className="min-h-12 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                        <Picker
                          accessibilityLabel="Coach style"
                          onValueChange={(value) => setCoachStyle(String(value))}
                          selectedValue={coachStyle}
                        >
                          <Picker.Item color={colorScheme === 'dark' ? '#F8FAFC' : '#0F172A'} label="Gentle" value="gentle" />
                          <Picker.Item color={colorScheme === 'dark' ? '#F8FAFC' : '#0F172A'} label="Balanced" value="balanced" />
                          <Picker.Item color={colorScheme === 'dark' ? '#F8FAFC' : '#0F172A'} label="Direct" value="direct" />
                        </Picker>
                      </View>
                    </View>

                    <View className="flex-1 flex-row items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800 sm:mt-7">
                      <View className="mr-3 flex-1">
                        <Text className="font-bold text-slate-900 dark:text-white">Daily reminder</Text>
                        <Text className="mt-1 text-xs text-slate-500 dark:text-slate-400">Accessible native switch</Text>
                      </View>
                      <Switch
                        accessibilityLabel="Daily reminder"
                        onValueChange={setNotifications}
                        trackColor={{ false: '#CBD5E1', true: '#A5B4FC' }}
                        thumbColor={notifications ? '#5B5CE2' : '#F8FAFC'}
                        value={notifications}
                      />
                    </View>
                  </View>
                </View>
              </Surface>
            </View>

            <View className="gap-6 lg:flex-1">
              <Surface>
                <SectionHeading
                  eyebrow="Runtime"
                  title="Platform-aware, not platform-bound"
                  description="Branch only when behavior truly differs. Keep layout and business logic shared."
                />
                <View className="gap-3">
                  <View className="flex-row justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                    <Text className="text-slate-500 dark:text-slate-400">Platform</Text>
                    <Text className="font-bold text-slate-900 dark:text-white">{platform}</Text>
                  </View>
                  <View className="flex-row justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                    <Text className="text-slate-500 dark:text-slate-400">Color scheme</Text>
                    <Text className="font-bold capitalize text-slate-900 dark:text-white">{colorScheme ?? 'system'}</Text>
                  </View>
                  <View className="flex-row justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                    <Text className="text-slate-500 dark:text-slate-400">Safe-area top</Text>
                    <Text className="font-bold text-slate-900 dark:text-white">{Math.round(insets.top)} dp</Text>
                  </View>
                </View>
              </Surface>

              <Surface>
                <SectionHeading
                  eyebrow="Compatible stack"
                  title="Packages used by the demo"
                  description="Prefer libraries that explicitly support Android, iOS and web."
                />
                <View className="gap-3">
                  {packages.map((item) => (
                    <View key={item.name} className="flex-row items-start rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                      <View className="mr-3 mt-0.5">
                        <CheckIcon />
                      </View>
                      <View className="flex-1">
                        <Text className="font-bold text-slate-900 dark:text-white">{item.name}</Text>
                        <Text className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">{item.detail}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </Surface>

              <View className="rounded-3xl bg-brand-600 p-6">
                <Text className="text-xs font-bold uppercase tracking-[2px] text-brand-100">Architecture rule</Text>
                <Text className="mt-2 text-xl font-black text-white">Share features. Adapt boundaries.</Text>
                <Text className="mt-2 leading-6 text-brand-100">
                  Expo and Next route files remain tiny; navigation and server-only behavior stay at their respective edges.
                </Text>
              </View>
            </View>
          </View>
    </AppPageShell>
  );
}
