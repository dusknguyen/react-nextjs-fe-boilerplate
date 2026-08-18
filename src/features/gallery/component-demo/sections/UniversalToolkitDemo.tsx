'use client';

import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import {
  AdaptivePressable,
  Badge,
  Button,
  CrossFade,
  DesktopSidebar,
  DesktopSidebarItem,
  DesktopStatusBar,
  DesktopToolbar,
  DesktopToolbarButton,
  DesktopWindow,
  FadeIn,
  GridList,
  HoverScale,
  KeyValueRow,
  MenuBar,
  MenuBarItem,
  MetricCard,
  MobileAction,
  MobileAppBar,
  MobileBottomBar,
  PlatformHint,
  PlatformSurface,
  PressScale,
  Pulse,
  ScaleIn,
  SectionedList,
  SettingsRow,
  SlideIn,
  UIAction,
  UICard,
  UIFormField,
  UIProvider,
  UISurface,
  UIText,
  VirtualList,
  WindowTitleBar,
} from '@/src/components';

const collectionItems = [
  { id: 'focus', label: 'Focus', value: '42 min' },
  { id: 'energy', label: 'Energy', value: '78%' },
  { id: 'recovery', label: 'Recovery', value: 'Good' },
  { id: 'streak', label: 'Streak', value: '7 days' },
];

const sectionedItems = [
  { title: 'Today', data: ['Plan priorities', 'Focus session'] },
  { title: 'Later', data: ['Weekly reflection'] },
];

export default function UniversalToolkitDemo() {
  const [motionKey, setMotionKey] = useState('calm');
  const [selectedMobileAction, setSelectedMobileAction] = useState('Home');

  return (
    <UIProvider>
      <View className="gap-6">
        <View className="gap-4 lg:flex-row">
          <UISurface className="flex-1 gap-4 rounded-ui-xl p-ui-lg" elevated>
            <UIText className="text-ui-2xl font-black">Semantic UI primitives</UIText>
            <UIText tone="muted">These controls use theme tokens instead of palette-specific classes.</UIText>
            <UIFormField description="Shared validation and helper-text semantics." label="Workspace name" required>
              <TextInput className="min-h-11 rounded-ui-lg border border-ui-border bg-ui-surface-muted px-ui-md text-ui-text" defaultValue="Aiko workspace" />
            </UIFormField>
            <View className="flex-row flex-wrap gap-3">
              <UIAction label="Save changes" />
              <UIAction label="Preview" variant="outline" />
            </View>
          </UISurface>
          <UICard className="flex-1 gap-3" interactive>
            <UIText tone="primary">Interactive card</UIText>
            <UIText className="text-ui-xl font-black">One token-driven surface</UIText>
            <UIText tone="muted">Press feedback is shared across touch and pointer input.</UIText>
          </UICard>
        </View>

        <View>
          <Text className="mb-3 text-lg font-black text-slate-950 dark:text-white">Motion with reduced-motion support</Text>
          <View className="flex-row flex-wrap items-center gap-3">
            <FadeIn><Badge>FadeIn</Badge></FadeIn>
            <SlideIn direction="up"><Badge tone="success">SlideIn</Badge></SlideIn>
            <ScaleIn><Badge tone="warning">ScaleIn</Badge></ScaleIn>
            <Pulse><Badge tone="brand">Pulse</Badge></Pulse>
            <PressScale asChild><Button variant="outline">PressScale</Button></PressScale>
            <HoverScale><Badge tone="neutral">HoverScale</Badge></HoverScale>
            <AdaptivePressable className="rounded-xl bg-slate-100 px-4 py-3 dark:bg-slate-800" onPress={() => setMotionKey((key) => key === 'calm' ? 'focused' : 'calm')}>
              <CrossFade transitionKey={motionKey}><Text className="font-bold text-slate-800 dark:text-slate-100">{motionKey}</Text></CrossFade>
            </AdaptivePressable>
          </View>
        </View>

        <View className="gap-4 lg:flex-row">
          <View className="min-h-60 flex-1 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
            <Text className="p-4 text-lg font-black text-slate-950 dark:text-white">Virtualized collections</Text>
            <GridList
              columns={2}
              contentContainerClassName="gap-3 px-4 pb-4"
              data={collectionItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MetricCard className="flex-1" label={item.label} value={item.value} />}
              scrollEnabled={false}
            />
          </View>
          <View className="h-60 flex-1 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
            <SectionedList
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item }) => <Text className="border-b border-slate-100 px-4 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-200">{item}</Text>}
              sections={sectionedItems}
            />
          </View>
        </View>

        <View className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
          <DesktopWindow
            className="h-80"
            sidebar={<DesktopSidebar header={<Text className="p-4 font-black text-slate-950 dark:text-white">Navigation</Text>} width={220}><DesktopSidebarItem label="Dashboard" selected /><DesktopSidebarItem label="Components" /></DesktopSidebar>}
            statusBar={<DesktopStatusBar><Text className="text-xs text-slate-500 dark:text-slate-400">Ready · Universal shell</Text></DesktopStatusBar>}
            titleBar={<><MenuBar><MenuBarItem label="File" /><MenuBarItem label="View" /></MenuBar><WindowTitleBar subtitle="Desktop, native and web" title="Aiko UI" /></>}
            toolbar={<DesktopToolbar><DesktopToolbarButton label="Preview" selected /><DesktopToolbarButton label="Inspect" /></DesktopToolbar>}
          >
            <PlatformSurface className="m-4">
              <Text className="font-black text-slate-950 dark:text-white">Platform-aware content</Text>
              <PlatformHint android="Android ripple is enabled." ios="iOS press feedback is enabled." web="Hover and keyboard-friendly feedback are enabled." fallback="Native desktop feedback is enabled." />
              <SettingsRow description="Uses the same interaction contract on every platform." label="Universal setting" trailing={<Badge tone="success">On</Badge>} />
              <KeyValueRow label="Runtime" value="Auto-detected" />
            </PlatformSurface>
          </DesktopWindow>
        </View>

        <View className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950">
          <MobileAppBar subtitle="Touch-first composition" title="Mobile preview" trailing={<Badge tone="brand">Live</Badge>} />
          <VirtualList
            className="max-h-40"
            data={collectionItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <KeyValueRow label={item.label} value={item.value} />}
          />
          <MobileBottomBar>
            {['Home', 'Activity', 'Profile'].map((item) => <MobileAction icon={<Text>{item === 'Home' ? '⌂' : '○'}</Text>} key={item} label={item} onPress={() => setSelectedMobileAction(item)} selected={selectedMobileAction === item} />)}
          </MobileBottomBar>
        </View>
      </View>
    </UIProvider>
  );
}
