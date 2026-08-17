'use client';

import { useState } from 'react';
import { Text, View } from 'react-native';

import * as UI from '@/src/components';
import type { SwatchColor, TransferItem } from '@/src/components';
import type { PageNavigationPort } from '@/src/modules/navigation/ports/navigation';
import { AppPageShell } from '@/src/views/layout/AppPageShell';

import { componentCount, componentGroups } from '@/src/features/patterns/componentCatalog';

const coachingOptions = [
  { label: 'Accountability', value: 'accountability' },
  { label: 'Career clarity', value: 'career' },
  { label: 'Mindful energy', value: 'energy' },
  { label: 'Relationship health', value: 'relationships' },
] as const;

const gridRows = [
  { id: '1', goal: 'Morning reset', owner: 'Maya', progress: 84, status: 'On track' },
  { id: '2', goal: 'Deep work', owner: 'Noah', progress: 72, status: 'On track' },
  { id: '3', goal: 'Recovery walk', owner: 'Ari', progress: 45, status: 'Review' },
  { id: '4', goal: 'Weekly reflection', owner: 'Lina', progress: 91, status: 'Strong' },
  { id: '5', goal: 'Sleep routine', owner: 'Kai', progress: 63, status: 'Review' },
  { id: '6', goal: 'Digital sunset', owner: 'Zoe', progress: 78, status: 'On track' },
];

const treeNodes = [
  {
    id: 'workspace',
    label: 'Coaching workspace',
    note: 'Shared tree/navigation pattern',
    children: [
      { id: 'plans', label: 'Plans', children: [{ id: 'active', label: 'Active plans' }, { id: 'archive', label: 'Archive' }] },
      { id: 'resources', label: 'Resources', children: [{ id: 'journal', label: 'Journal' }, { id: 'library', label: 'Library' }] },
    ],
  },
] as const;

const initialTransferItems: TransferItem[] = [
  { id: 'sleep', label: 'Sleep quality' },
  { id: 'focus', label: 'Focus time' },
  { id: 'mood', label: 'Mood check-in' },
  { id: 'movement', label: 'Daily movement' },
];

function LabSection({ children, description, eyebrow, title }: { children: React.ReactNode; description: string; eyebrow: string; title: string }) {
  return (
    <View className="mt-8 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <View className="border-b border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950 sm:p-6">
        <Text className="text-xs font-black uppercase tracking-[2px] text-brand-600 dark:text-brand-300">{eyebrow}</Text>
        <Text className="mt-2 text-2xl font-black text-slate-950 dark:text-white">{title}</Text>
        <Text className="mt-2 max-w-3xl leading-6 text-slate-600 dark:text-slate-300">{description}</Text>
      </View>
      <View className="gap-6 p-5 sm:p-6">{children}</View>
    </View>
  );
}

export default function AdvancedComponentsPageView({ navigation }: { navigation: PageNavigationPort }) {
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [autocomplete, setAutocomplete] = useState('');
  const [blocked, setBlocked] = useState(false);
  const [chips, setChips] = useState(['NativeWind', 'Expo']);
  const [color, setColor] = useState<SwatchColor>('indigo');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [date, setDate] = useState('Mon 17');
  const [infiniteItems, setInfiniteItems] = useState<TransferItem[]>(initialTransferItems.slice(0, 2));
  const [mention, setMention] = useState('Thanks @');
  const [multiSelect, setMultiSelect] = useState<string[]>(['energy', 'career']);
  const [number, setNumber] = useState(3);
  const [otp, setOtp] = useState('42');
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [reorderItems, setReorderItems] = useState(initialTransferItems);
  const [segment, setSegment] = useState('grid');
  const [selectedTransfer, setSelectedTransfer] = useState<string[]>(['mood']);
  const [status, setStatus] = useState('Ready');
  const [time, setTime] = useState('09:30');
  const [triState, setTriState] = useState<boolean | null>(null);

  return (
    <AppPageShell
      activeRoute="advancedComponents"
      description="One universal NativeWind capability layer for advanced inputs, data, overlays, mobile interactions and responsive composition."
      eyebrow="Advanced component system"
      navigation={navigation}
      title="Advanced patterns, one universal API"
    >
      <View className="gap-4 md:flex-row">
        {componentGroups.slice(0, 3).map((group) => (
          <View className="flex-1 rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900" key={group.category}>
            <Text className="text-xs font-black uppercase tracking-[1.5px] text-brand-600 dark:text-brand-300">Capability</Text>
            <Text className="mt-3 text-xl font-black text-slate-950 dark:text-white">{group.category}</Text>
            <Text className="mt-2 text-3xl font-black text-brand-600 dark:text-brand-300">{group.components.length}</Text>
            <Text className="text-sm text-slate-500 dark:text-slate-400">unified components</Text>
          </View>
        ))}
      </View>

      <UI.Alert className="mt-5" tone="info">
        <Text className="font-bold text-sky-800 dark:text-sky-100">Equivalent capability, universal API.</Text>
        <Text className="mt-1 leading-6 text-sky-700 dark:text-sky-200">Overlapping controls are implemented once with React Native primitives and NativeWind, then extended through typed props and composition.</Text>
      </UI.Alert>

      <LabSection description="Autocomplete, OTP, numeric stepping, password visibility, multi-selection, segmented choice, tri-state selection, chips, mentions, color and date/time selection." eyebrow="Inputs" title="Advanced selection and entry">
        <View className="gap-5 md:flex-row">
          <View className="flex-1 gap-4">
            <View><UI.Label>Autocomplete</UI.Label><UI.AutoComplete onChange={setAutocomplete} options={[...coachingOptions]} value={autocomplete} /></View>
            <View><UI.Label>Search bar</UI.Label><UI.SearchBar onChangeText={setAutocomplete} placeholder="Search goals" value={autocomplete} /></View>
            <View><UI.Label>Password</UI.Label><UI.PasswordField defaultValue="universal-ui" placeholder="Password" /></View>
            <View><UI.Label>OTP / verification code</UI.Label><UI.OtpInput onChange={setOtp} value={otp} /></View>
            <UI.NumberField label="Sessions per week" max={7} min={1} onChange={setNumber} value={number} />
          </View>
          <View className="flex-1 gap-5">
            <View><UI.Label>MultiSelect / ListBox</UI.Label><UI.MultiSelect onChange={setMultiSelect} options={[...coachingOptions]} values={multiSelect} /></View>
            <View><UI.Label>Segment / SelectButton / ToggleButton</UI.Label><UI.SegmentedControl onChange={setSegment} options={[{ label: 'Grid', value: 'grid' }, { label: 'List', value: 'list' }, { label: 'Focus', value: 'focus' }]} value={segment} /></View>
            <UI.TriStateCheckbox label={`Tri-state: ${String(triState)}`} onChange={setTriState} value={triState} />
            <View><UI.Label>Chips input</UI.Label><UI.ChipsInput onChange={setChips} values={chips} /></View>
            <View><UI.Label>Mention</UI.Label><UI.MentionInput mentions={['aiko', 'maya', 'noah', 'coach']} onChange={setMention} value={mention} /></View>
            <View><UI.Label>Color picker</UI.Label><UI.ColorPicker onChange={setColor} value={color} /></View>
          </View>
        </View>
        <UI.DateTimePicker dates={['Mon 17', 'Tue 18', 'Wed 19', 'Thu 20']} onDateChange={setDate} onTimeChange={setTime} selectedDate={date} selectedTime={time} times={['08:00', '09:30', '13:00', '16:30']} />
      </LabSection>

      <LabSection description="A React Native data grid with quick filtering, sortable columns and pagination, plus tree, chart, transfer and ordering patterns." eyebrow="Data intelligence" title="Data Grid, charts and hierarchical content">
        <UI.DataGrid columns={[{ key: 'goal', label: 'Goal', sortable: true }, { key: 'owner', label: 'Owner', sortable: true }, { key: 'progress', label: 'Progress', numeric: true, sortable: true }, { key: 'status', label: 'Status', sortable: true }]} rows={gridRows} />
        <View className="gap-5 lg:flex-row">
          <View className="flex-1"><UI.Label>Tree / TreeTable / navigation tree</UI.Label><UI.TreeView nodes={[...treeNodes]} /></View>
          <View className="flex-1"><UI.Label>Charts / MeterGroup</UI.Label><UI.BarChart data={[{ label: 'Focus', value: 82 }, { label: 'Energy', value: 64 }, { label: 'Recovery', value: 73 }, { label: 'Connection', value: 48 }]} /></View>
        </View>
        <View><UI.Label>PickList / Transfer List</UI.Label><UI.TransferList available={initialTransferItems} onChange={setSelectedTransfer} selected={selectedTransfer} /></View>
        <View className="gap-5 lg:flex-row"><View className="flex-1"><UI.Label>OrderList / Reorder</UI.Label><UI.ReorderList items={reorderItems} onChange={setReorderItems} /></View><View className="flex-1"><UI.Label>Image List / Masonry / Galleria</UI.Label><UI.ImageList items={[{ title: 'Reset', caption: '5 minutes' }, { title: 'Reflect', caption: 'Journal' }, { title: 'Recover', caption: 'Breathing' }, { title: 'Plan', caption: 'Weekly' }]} /></View></View>
        <View><UI.Label>Progress aggregation / MeterGroup</UI.Label><UI.MeterGroup meters={[{ label: 'Plan completion', value: 84 }, { label: 'Habit consistency', tone: 'success', value: 72 }, { label: 'Recovery balance', tone: 'warning', value: 56 }]} /></View>
      </LabSection>

      <LabSection description="Touch-first interactions that remain fully functional on React Native Web." eyebrow="Mobile patterns" title="Toolbar, split pane, refresh, infinite and sliding rows">
        <UI.Toolbar actions={<UI.Badge tone="success">Online</UI.Badge>} leading={<UI.Avatar initials="AI" className="h-10 w-10" />} subtitle="Universal navigation chrome" title="Coach workspace" />
        <UI.SplitPane side={<View><Text className="font-black text-slate-950 dark:text-white">Split pane</Text><Text className="mt-2 text-sm text-slate-500 dark:text-slate-400">Collapses naturally on smaller widths.</Text></View>} content={<View><Text className="text-xl font-black text-slate-950 dark:text-white">Primary content</Text><Text className="mt-2 leading-6 text-slate-600 dark:text-slate-300">The same responsive shell works on native and web.</Text></View>} />
        <UI.SlidingItem actions={<><UI.Button onPress={() => setStatus('Archived')} variant="outline">Archive</UI.Button><UI.Button onPress={() => setStatus('Deleted')} tone="error">Delete</UI.Button></>}><Text className="font-bold text-slate-800 dark:text-slate-100">Press this row to reveal item actions · {status}</Text></UI.SlidingItem>
        <UI.Masonry><UI.Thumbnail label="AV" size="large" /><UI.Thumbnail label="IMG" /><UI.Thumbnail label="XS" size="small" /><UI.RippleButton onPress={() => setStatus('Ripple action')}>Native ripple action</UI.RippleButton></UI.Masonry>
        <View className="gap-5 md:flex-row"><View className="flex-1"><UI.Label>Infinite scroll</UI.Label><UI.InfiniteList items={infiniteItems} onLoadMore={() => setInfiniteItems((items) => items.length >= initialTransferItems.length ? items : [...items, initialTransferItems[items.length]!])} /></View><View className="flex-1"><UI.Label>Pull-to-refresh</UI.Label><UI.RefreshableContent onRefresh={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 650); }} refreshing={refreshing}><Text className="leading-6 text-slate-600 dark:text-slate-300">On native, pull this panel down. On web, the same content remains scrollable and accessible.</Text></UI.RefreshableContent></View></View>
        <UI.Fieldset legend="Panel + Fieldset"><UI.Panel collapsible title="Expandable content"><Text className="leading-6 text-slate-600 dark:text-slate-300">Disclosure behavior is expressed with one reusable NativeWind surface.</Text></UI.Panel></UI.Fieldset>
      </LabSection>

      <LabSection description="React Native Modal and layered NativeWind surfaces provide action sheets, confirmation, popover, context menu, overlay and blocked states." eyebrow="Overlay" title="Temporary UI and focused actions">
        <View className="flex-row flex-wrap gap-3"><UI.Button onPress={() => setActionSheetOpen(true)}>Action sheet</UI.Button><UI.Button onPress={() => setConfirmOpen(true)} variant="outline">Confirm dialog</UI.Button><UI.Button onPress={() => setBlocked((current) => !current)} variant="ghost">Toggle BlockUI</UI.Button><UI.Button onPress={() => setOverlayOpen((current) => !current)} variant="outline">Overlay panel</UI.Button><UI.Popover content={<Text className="leading-6 text-slate-600 dark:text-slate-300">Popover content stays anchored without a DOM-only package.</Text>}><UI.Badge>Open popover</UI.Badge></UI.Popover></View>
        <UI.OverlayPanel onClose={() => setOverlayOpen(false)} open={overlayOpen} title="OverlayPanel"><Text className="leading-6 text-slate-600 dark:text-slate-300">A composable layered surface for filters, menus and contextual tools.</Text></UI.OverlayPanel>
        <UI.ContextMenu items={[{ label: 'Duplicate', onPress: () => setStatus('Duplicated') }, { label: 'Archive', onPress: () => setStatus('Archived') }, { destructive: true, label: 'Delete', onPress: () => setStatus('Deleted') }]}><View className="rounded-2xl border border-dashed border-slate-300 p-5 dark:border-slate-600"><Text className="font-bold text-slate-700 dark:text-slate-200">Press or long-press for ContextMenu · {status}</Text></View></UI.ContextMenu>
        <UI.BlockUI blocked={blocked}><UI.ImageList items={[{ title: 'Protected content' }, { title: 'Async surface' }]} /></UI.BlockUI>
        <UI.ActionSheet actions={[{ label: 'Start focus session', onPress: () => setStatus('Focus started') }, { label: 'Schedule reminder', onPress: () => setStatus('Reminder scheduled') }, { destructive: true, label: 'Remove plan', onPress: () => setStatus('Plan removed') }]} message="Choose one action for the current coaching plan." onClose={() => setActionSheetOpen(false)} open={actionSheetOpen} title="Plan actions" />
        <UI.ConfirmDialog message="One universal modal handles confirmation consistently on native and web." onCancel={() => setConfirmOpen(false)} onConfirm={() => { setStatus('Confirmed'); setConfirmOpen(false); }} open={confirmOpen} title="Confirm this action?" />
      </LabSection>

      <LabSection description={`${componentCount} public components are grouped only by capability. Each name resolves to the same shared NativeWind framework on native and web.`} eyebrow="Component catalog" title="One framework, capability-based organization">
        <View className="gap-4">{componentGroups.map((group) => <View className="rounded-3xl border border-slate-200 p-5 dark:border-slate-700" key={group.category}><View className="gap-2 sm:flex-row sm:items-start sm:justify-between"><View><Text className="text-lg font-black text-slate-950 dark:text-white">{group.category}</Text><Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">{group.description}</Text></View><UI.Badge tone="brand">{group.components.length} components</UI.Badge></View><View className="mt-4 flex-row flex-wrap gap-2">{group.components.map((component) => <UI.Badge key={component} tone="neutral">{component}</UI.Badge>)}</View></View>)}</View>
      </LabSection>
    </AppPageShell>
  );
}
