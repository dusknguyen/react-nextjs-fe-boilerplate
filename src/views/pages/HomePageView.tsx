'use client';

import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { AppButton, SectionHeading, Surface } from '@/src/components';
import { appRoutes } from '@/src/modules/navigation/domain/appRoute';
import type { PageNavigationPort } from '@/src/modules/navigation/ports/navigation';
import { AppPageShell } from '@/src/views/layout/AppPageShell';
import type { Mood } from '@/src/modules/coach/domain/coachDay';
import { useCoachDashboardModel } from '@/src/modules/coach/presentation/CoachDayProvider';

const moods: { id: Mood; symbol: string; label: string }[] = [
  { id: 'low', symbol: '1', label: 'Low' },
  { id: 'calm', symbol: '2', label: 'Calm' },
  { id: 'good', symbol: '3', label: 'Good' },
  { id: 'great', symbol: '4', label: 'Great' },
];

type HomePageViewProps = {
  navigation: PageNavigationPort;
};

const demoPages = appRoutes.filter(
  (route) => route.id !== 'home' && route.id !== 'components' && route.id !== 'showcase',
);

export default function HomePageView({ navigation }: HomePageViewProps) {
  const [showCoachPlan, setShowCoachPlan] = useState(false);
  const { completed, habits, mood, progress, setMood, streak, toggleHabit } = useCoachDashboardModel();

  return (
    <AppPageShell activeRoute="home" maxWidthClassName="max-w-5xl" navigation={navigation} showHeading={false}>
          <View className="mb-7 flex-row items-center justify-between gap-4">
            <View className="min-w-0 flex-1">
              <Text className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">Today · One step at a time</Text>
              <Text className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                Good morning, Alex
              </Text>
            </View>
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 dark:bg-brand-950">
              <Text className="text-xl font-black text-brand-700 dark:text-brand-200">AI</Text>
            </View>
          </View>

          <View className="relative mb-6 overflow-hidden rounded-[28px] bg-brand-600 p-6 shadow-sm sm:p-8">
            <View className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-brand-400/30" />
            <View className="absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-cyan-300/20" />
            <Text className="mb-3 text-xs font-bold uppercase tracking-[2px] text-brand-100">Your focus today</Text>
            <Text className="mb-3 max-w-2xl text-2xl font-bold leading-8 text-white sm:text-3xl">
              Protect your energy, then spend it on what matters.
            </Text>
            <Text className="mb-6 max-w-xl text-base leading-6 text-brand-100">
              Finish one focused block before opening your inbox. Small, intentional steps compound.
            </Text>
            <AppButton
              accessibilityState={{ expanded: showCoachPlan }}
              className="self-start bg-white web:hover:bg-brand-50"
              onPress={() => setShowCoachPlan((visible) => !visible)}
              textClassName="text-brand-700"
            >
              {showCoachPlan ? 'Hide my plan' : 'Plan with my coach →'}
            </AppButton>
          </View>

          {showCoachPlan ? (
            <View className="mb-6 rounded-3xl border border-brand-100 bg-brand-50 p-5 dark:border-brand-900 dark:bg-brand-950">
              <Text className="mb-2 font-bold text-brand-900 dark:text-brand-100">Your next best step</Text>
              <Text className="leading-6 text-brand-800 dark:text-brand-200">
                Put your phone away, choose the hardest small task, and give it 20 uninterrupted minutes.
              </Text>
            </View>
          ) : null}

          <View className="gap-6 md:flex-row">
            <Surface className="flex-1">
              <SectionHeading eyebrow="Check-in" title="How are you feeling?" />
              <View className="flex-row justify-between gap-2">
                {moods.map((item) => {
                  const selected = mood === item.id;
                  return (
                    <Pressable
                      key={item.id}
                      accessibilityLabel={`Mood: ${item.label}`}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      className={`flex-1 items-center rounded-2xl border px-2 py-3 active:scale-95 web:cursor-pointer ${
                        selected
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-950'
                          : 'border-slate-200 bg-slate-50 web:hover:border-brand-300 dark:border-slate-700 dark:bg-slate-800'
                      }`}
                      onPress={() => setMood(item.id)}
                    >
                      <View
                        className={`mb-2 h-8 w-8 items-center justify-center rounded-full ${
                          selected ? 'bg-brand-600' : 'bg-slate-200 dark:bg-slate-700'
                        }`}
                      >
                        <Text className={selected ? 'font-bold text-white' : 'font-bold text-slate-600 dark:text-slate-200'}>
                          {item.symbol}
                        </Text>
                      </View>
                      <Text
                        className={`text-xs font-semibold ${
                          selected ? 'text-brand-700 dark:text-brand-300' : 'text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </Surface>

            <Surface className="md:w-72">
              <SectionHeading eyebrow="Momentum" title="This week" />
              <View className="flex-row items-end justify-between">
                <View>
                  <Text className="text-4xl font-bold text-slate-950 dark:text-white">{streak}</Text>
                  <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">day streak</Text>
                </View>
                <View className="h-20 w-20 items-center justify-center rounded-full border-[7px] border-emerald-300 dark:border-emerald-500">
                  <Text className="text-lg font-bold text-slate-900 dark:text-white">{progress}%</Text>
                </View>
              </View>
            </Surface>
          </View>

          <Surface className="mt-6">
            <View className="flex-row items-end justify-between">
              <SectionHeading eyebrow="Daily rhythm" title="Small wins, real progress" />
              <Text className="mb-5 text-sm font-semibold text-slate-500 dark:text-slate-400">
                {completed}/{habits.length} done
              </Text>
            </View>
            <View className="gap-3">
              {habits.map((habit) => (
                <Pressable
                  key={habit.id}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: habit.completed }}
                  className="flex-row items-center rounded-2xl bg-slate-50 p-4 active:opacity-70 web:cursor-pointer web:hover:bg-slate-100 dark:bg-slate-800 dark:web:hover:bg-slate-700"
                  onPress={() => toggleHabit(habit.id)}
                >
                  <View
                    className={`mr-4 h-7 w-7 items-center justify-center rounded-full border-2 ${
                      habit.completed ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {habit.completed ? <Text className="font-bold text-white">✓</Text> : null}
                  </View>
                  <View className="flex-1">
                    <Text
                      className={`font-bold ${
                        habit.completed ? 'text-slate-400 line-through' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {habit.title}
                    </Text>
                    <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">{habit.detail}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </Surface>

          <Surface className="mt-6">
              <SectionHeading
                eyebrow="Template pages"
                title="Explore universal app patterns"
                description="Ten reference-inspired screens, rebuilt with React Native primitives and NativeWind."
              />
              <View className="gap-3 sm:flex-row sm:flex-wrap">
                {demoPages.map((page) => (
                  <Pressable
                    accessibilityRole="link"
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 active:opacity-70 sm:w-[48%] web:cursor-pointer web:hover:border-brand-300 dark:border-slate-700 dark:bg-slate-800 dark:web:hover:border-brand-700"
                    key={page.id}
                    onHoverIn={() => navigation.prefetch(page.id)}
                    onPress={() => navigation.navigate(page.id)}
                  >
                    <Text className="font-bold text-slate-950 dark:text-white">{page.title} →</Text>
                    <Text className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">{page.description}</Text>
                  </Pressable>
                ))}
              </View>
          </Surface>

          <View className="mt-6 gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Text className="max-w-xl leading-6 text-slate-500 dark:text-slate-400">
              One React Native screen, rendered by Expo on native and React Native Web inside Next.js.
            </Text>
            <View className="gap-3 sm:flex-row">
              <AppButton onPress={() => navigation.navigate('components')} variant="secondary">UI components</AppButton>
              <AppButton onPress={() => navigation.navigate('showcase')}>Universal showcase</AppButton>
            </View>
          </View>
    </AppPageShell>
  );
}
