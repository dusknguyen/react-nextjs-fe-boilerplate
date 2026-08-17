'use client';

import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { AppButton, SectionHeading, Surface } from '@/src/components';
import type { AppRouteId } from '@/src/modules/navigation/domain/appRoute';
import type { PageNavigationPort } from '@/src/modules/navigation/ports/navigation';
import { AppPageShell } from '@/src/views/layout/AppPageShell';

export type DemoPageProps = {
  navigation: PageNavigationPort;
};

type DemoPageShellProps = DemoPageProps & {
  activeRoute: AppRouteId;
  children: ReactNode;
  eyebrow: string;
  title: string;
};

export function DemoPageShell({ activeRoute, children, eyebrow, navigation, title }: DemoPageShellProps) {
  return (
    <AppPageShell
      activeRoute={activeRoute}
      eyebrow={eyebrow}
      keyboardShouldPersistTaps="handled"
      maxWidthClassName="max-w-5xl"
      navigation={navigation}
      title={title}
    >
      {children}
    </AppPageShell>
  );
}

export function LoginPageView({ navigation }: DemoPageProps) {
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState('');

  return (
    <DemoPageShell activeRoute="login" eyebrow="Auth pattern" navigation={navigation} title="Welcome back">
      <View className="overflow-hidden rounded-[32px] bg-brand-700 p-5 sm:p-8 md:flex-row md:items-stretch md:gap-8">
        <View className="relative mb-6 min-h-64 flex-1 justify-end overflow-hidden rounded-3xl bg-brand-600 p-6 md:mb-0">
          <View className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-cyan-300/20" />
          <View className="absolute left-8 top-8 h-24 w-24 rounded-full bg-white/10" />
          <Text className="text-xs font-bold uppercase tracking-[2px] text-brand-100">expo-nextjs-boilerplate</Text>
          <Text className="mt-3 text-3xl font-black leading-10 text-white">A calmer day starts with one clear intention.</Text>
          <Text className="mt-3 leading-6 text-brand-100">A responsive sign-in layout inspired by the reference template and rebuilt for native controls.</Text>
        </View>

        <Surface className="flex-1 border-0 md:max-w-md">
          <SectionHeading eyebrow="Sign in" title="Continue your journey" description="This is a UI demo; no credentials are submitted." />
          <Text className="mb-2 text-sm font-bold text-slate-700 dark:text-slate-200">Email</Text>
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 web:outline-none web:focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor="#94A3B8"
            value={email}
          />
          <Text className="mb-2 mt-4 text-sm font-bold text-slate-700 dark:text-slate-200">Password</Text>
          <TextInput
            autoComplete="current-password"
            className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 web:outline-none web:focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            value={password}
          />
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: remember }}
            className="my-5 flex-row items-center self-start web:cursor-pointer"
            onPress={() => setRemember((value) => !value)}
          >
            <View className={`mr-3 h-6 w-6 items-center justify-center rounded-lg border-2 ${remember ? 'border-brand-600 bg-brand-600' : 'border-slate-300 dark:border-slate-600'}`}>
              {remember ? <Text className="font-black text-white">✓</Text> : null}
            </View>
            <Text className="font-semibold text-slate-600 dark:text-slate-300">Remember me</Text>
          </Pressable>
          <AppButton onPress={() => setMessage(email && password ? 'Demo sign-in complete.' : 'Enter an email and password to continue.')}>
            Sign in
          </AppButton>
          {message ? <Text accessibilityRole="alert" className="mt-4 text-center text-sm font-semibold text-brand-700 dark:text-brand-200">{message}</Text> : null}
        </Surface>
      </View>
    </DemoPageShell>
  );
}

const insightBars = [
  { day: 'M', height: 'h-16', tone: 'bg-brand-300' },
  { day: 'T', height: 'h-24', tone: 'bg-brand-400' },
  { day: 'W', height: 'h-20', tone: 'bg-brand-300' },
  { day: 'T', height: 'h-32', tone: 'bg-brand-600' },
  { day: 'F', height: 'h-28', tone: 'bg-brand-500' },
  { day: 'S', height: 'h-14', tone: 'bg-brand-200' },
  { day: 'S', height: 'h-20', tone: 'bg-brand-300' },
] as const;

const sessions = [
  { title: 'Deep work', detail: '42 min · Today', status: 'Completed', statusClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' },
  { title: 'Evening reflection', detail: '10 min · Today', status: 'Upcoming', statusClass: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
  { title: 'Weekly review', detail: '25 min · Sunday', status: 'Planned', statusClass: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300' },
] as const;

export function InsightsPageView({ navigation }: DemoPageProps) {
  return (
    <DemoPageShell activeRoute="insights" eyebrow="Dashboard pattern" navigation={navigation} title="Your wellbeing insights">
      <View className="gap-4 sm:flex-row">
        {[
          ['12', 'Mindful sessions', '+3 this week'],
          ['78%', 'Goal completion', '+8% vs last week'],
          ['6 days', 'Current streak', 'Personal best: 14'],
        ].map(([value, label, detail]) => (
          <Surface className="flex-1" key={label}>
            <Text className="text-3xl font-black text-slate-950 dark:text-white">{value}</Text>
            <Text className="mt-2 font-bold text-slate-700 dark:text-slate-200">{label}</Text>
            <Text className="mt-1 text-sm text-emerald-600 dark:text-emerald-300">{detail}</Text>
          </Surface>
        ))}
      </View>

      <View className="mt-6 gap-6 md:flex-row">
        <Surface className="flex-[2]">
          <SectionHeading eyebrow="Focus rhythm" title="Minutes by day" description="A dependency-free chart composed from React Native views." />
          <View className="h-44 flex-row items-end justify-between gap-2 rounded-2xl bg-slate-50 px-4 pt-4 dark:bg-slate-800">
            {insightBars.map((bar, index) => (
              <View className="flex-1 items-center justify-end" key={`${bar.day}-${index}`}>
                <View className={`w-full max-w-10 rounded-t-xl ${bar.height} ${bar.tone}`} />
                <Text className="py-3 text-xs font-bold text-slate-500 dark:text-slate-400">{bar.day}</Text>
              </View>
            ))}
          </View>
        </Surface>

        <Surface className="flex-1">
          <SectionHeading eyebrow="Balance" title="Energy budget" />
          <View className="items-center py-2">
            <View className="h-36 w-36 items-center justify-center rounded-full border-[18px] border-brand-500">
              <Text className="text-3xl font-black text-slate-950 dark:text-white">68%</Text>
              <Text className="text-xs font-semibold text-slate-500 dark:text-slate-400">available</Text>
            </View>
          </View>
          <Text className="mt-4 text-center leading-6 text-slate-600 dark:text-slate-300">Schedule one recovery block before your next demanding task.</Text>
        </Surface>
      </View>

      <Surface className="mt-6">
        <SectionHeading eyebrow="Schedule" title="Coach sessions" />
        <View className="gap-3">
          {sessions.map((session) => (
            <View className="gap-3 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center dark:bg-slate-800" key={session.title}>
              <View className="flex-1">
                <Text className="font-bold text-slate-950 dark:text-white">{session.title}</Text>
                <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">{session.detail}</Text>
              </View>
              <View className={`self-start rounded-full px-3 py-2 sm:self-auto ${session.statusClass.split(' ').filter((item) => item.startsWith('bg-') || item.startsWith('dark:bg-')).join(' ')}`}>
                <Text className={`text-xs font-bold ${session.statusClass.split(' ').filter((item) => item.startsWith('text-') || item.startsWith('dark:text-')).join(' ')}`}>{session.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </Surface>
    </DemoPageShell>
  );
}

type FocusTask = {
  completed: boolean;
  id: number;
  title: string;
};

const starterTasks: FocusTask[] = [
  { id: 1, title: 'Write the top priority for today', completed: true },
  { id: 2, title: 'Complete a 25-minute focus block', completed: false },
  { id: 3, title: 'Take a screen-free lunch break', completed: false },
  { id: 4, title: 'Capture one thing that went well', completed: false },
];

export function TasksPageView({ navigation }: DemoPageProps) {
  const [tasks, setTasks] = useState(starterTasks);
  const [draft, setDraft] = useState('');
  const completed = tasks.filter((task) => task.completed).length;

  const addTask = () => {
    const title = draft.trim();
    if (!title) return;
    setTasks((current) => [...current, { completed: false, id: Date.now(), title }]);
    setDraft('');
  };

  return (
    <DemoPageShell activeRoute="tasks" eyebrow="Task pattern" navigation={navigation} title="Focus task list">
      <View className="gap-6 md:flex-row">
        <Surface className="flex-[2]">
          <View className="gap-3 sm:flex-row">
            <TextInput
              className="min-h-12 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 web:outline-none web:focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              onChangeText={setDraft}
              onSubmitEditing={addTask}
              placeholder="Add a meaningful next step"
              placeholderTextColor="#94A3B8"
              returnKeyType="done"
              value={draft}
            />
            <AppButton onPress={addTask}>Add task</AppButton>
          </View>
          <View className="mt-6 gap-3">
            {tasks.map((task) => (
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: task.completed }}
                className="flex-row items-center rounded-2xl bg-slate-50 p-4 active:opacity-70 web:cursor-pointer web:hover:bg-slate-100 dark:bg-slate-800 dark:web:hover:bg-slate-700"
                key={task.id}
                onPress={() => setTasks((current) => current.map((item) => item.id === task.id ? { ...item, completed: !item.completed } : item))}
              >
                <View className={`mr-4 h-7 w-7 items-center justify-center rounded-full border-2 ${task.completed ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 dark:border-slate-600'}`}>
                  {task.completed ? <Text className="font-black text-white">✓</Text> : null}
                </View>
                <Text className={`flex-1 font-semibold ${task.completed ? 'text-slate-400 line-through' : 'text-slate-900 dark:text-white'}`}>{task.title}</Text>
              </Pressable>
            ))}
          </View>
        </Surface>

        <Surface className="md:w-72">
          <SectionHeading eyebrow="Progress" title={`${completed}/${tasks.length} complete`} />
          <View className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <View
              className={completed === tasks.length ? 'h-full w-full bg-emerald-500' : completed >= tasks.length / 2 ? 'h-full w-1/2 bg-brand-500' : 'h-full w-1/4 bg-brand-400'}
            />
          </View>
          <Text className="mt-5 leading-6 text-slate-600 dark:text-slate-300">Keep the list intentionally short. Completion creates momentum; volume creates noise.</Text>
        </Surface>
      </View>
    </DemoPageShell>
  );
}

const people = [
  { initials: 'MP', name: 'Mai Pham', role: 'Mindfulness coach', activity: '92%', tone: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300' },
  { initials: 'DK', name: 'Duy Khang', role: 'Accountability partner', activity: '78%', tone: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300' },
  { initials: 'AN', name: 'An Nguyen', role: 'Wellbeing mentor', activity: '65%', tone: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
  { initials: 'LT', name: 'Linh Tran', role: 'Career coach', activity: '84%', tone: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' },
] as const;

export function ProfilePageView({ navigation }: DemoPageProps) {
  const [query, setQuery] = useState('');
  const filteredPeople = useMemo(
    () => people.filter((person) => `${person.name} ${person.role}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <DemoPageShell activeRoute="profile" eyebrow="Profile pattern" navigation={navigation} title="People in your circle">
      <Surface>
        <View className="gap-4 sm:flex-row sm:items-center">
          <TextInput
            accessibilityLabel="Search people"
            className="min-h-12 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 web:outline-none web:focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            onChangeText={setQuery}
            placeholder="Search by name or role"
            placeholderTextColor="#94A3B8"
            value={query}
          />
          <AppButton variant="secondary">Invite person</AppButton>
        </View>

        <View className="mt-6 gap-4 sm:flex-row sm:flex-wrap">
          {filteredPeople.map((person) => {
            const toneParts = person.tone.split(' ');
            return (
              <View className="rounded-3xl border border-slate-200 p-5 sm:w-[48%] dark:border-slate-700" key={person.name}>
                <View className="flex-row items-center">
                  <View className={`mr-4 h-12 w-12 items-center justify-center rounded-2xl ${toneParts.filter((item) => item.startsWith('bg-') || item.startsWith('dark:bg-')).join(' ')}`}>
                    <Text className={`font-black ${toneParts.filter((item) => item.startsWith('text-') || item.startsWith('dark:text-')).join(' ')}`}>{person.initials}</Text>
                  </View>
                  <View className="min-w-0 flex-1">
                    <Text className="font-bold text-slate-950 dark:text-white">{person.name}</Text>
                    <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">{person.role}</Text>
                  </View>
                  <Text className="font-black text-brand-600 dark:text-brand-300">{person.activity}</Text>
                </View>
                <View className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <View className={person.activity === '92%' ? 'h-full w-[92%] bg-brand-500' : person.activity === '84%' ? 'h-full w-[84%] bg-brand-500' : person.activity === '78%' ? 'h-full w-[78%] bg-brand-400' : 'h-full w-[65%] bg-brand-300'} />
                </View>
              </View>
            );
          })}
        </View>
        {filteredPeople.length === 0 ? <Text className="py-12 text-center text-slate-500 dark:text-slate-400">No matching people.</Text> : null}
      </Surface>
    </DemoPageShell>
  );
}
