'use client';

import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import {
  Alert,
  Badge,
  Button,
  Chip,
  Progress,
  SectionHeading,
  Surface,
  TextField,
} from '@/src/components';
import type { PageNavigationPort } from '@/src/modules/navigation/ports/navigation';
import { AppPageShell } from '@/src/views/layout/AppPageShell';

type DemoPageProps = {
  navigation: PageNavigationPort;
};

type Message = {
  id: number;
  initials: string;
  name: string;
  preview: string;
  time: string;
  unread: boolean;
};

const initialMessages: Message[] = [
  { id: 1, initials: 'MC', name: 'Mina - Focus coach', preview: 'Your weekly review is ready. I highlighted two patterns worth keeping.', time: '09:42', unread: true },
  { id: 2, initials: 'AP', name: 'Accountability partner', preview: 'Can we move our check-in to Thursday afternoon?', time: 'Yesterday', unread: true },
  { id: 3, initials: 'WT', name: 'Wellbeing team', preview: 'A new recovery guide was added to your shared resources.', time: 'Mon', unread: false },
  { id: 4, initials: 'ME', name: 'Message to self', preview: 'Remember: fewer priorities, clearer definition of done.', time: 'Fri', unread: false },
];

const filters = ['All', 'Unread', 'Saved'] as const;
type InboxFilter = (typeof filters)[number];

export function InboxPageView({ navigation }: DemoPageProps) {
  const [filter, setFilter] = useState<InboxFilter>('All');
  const [messages, setMessages] = useState(initialMessages);
  const [selectedId, setSelectedId] = useState(initialMessages[0].id);
  const [composeOpen, setComposeOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [sent, setSent] = useState(false);

  const visibleMessages = useMemo(
    () => filter === 'Unread' ? messages.filter((message) => message.unread) : messages,
    [filter, messages],
  );
  const selected = messages.find((message) => message.id === selectedId) ?? messages[0];

  const openMessage = (id: number) => {
    setSelectedId(id);
    setMessages((current) => current.map((message) => message.id === id ? { ...message, unread: false } : message));
  };

  return (
    <AppPageShell activeRoute="inbox" eyebrow="Workspace pattern" keyboardShouldPersistTaps="handled" navigation={navigation}>
      <View className="gap-6 lg:flex-row">
        <Surface className="lg:w-[42%]">
          <View className="mb-5 gap-4 sm:flex-row sm:items-center sm:justify-between">
            <View>
              <Text className="text-xl font-black text-slate-950 dark:text-white">Conversations</Text>
              <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">{messages.filter((item) => item.unread).length} unread</Text>
            </View>
            <Button onPress={() => { setComposeOpen(true); setSent(false); }} size="small">Compose</Button>
          </View>

          <View className="mb-4 flex-row flex-wrap gap-2">
            {filters.map((item) => (
              <Chip key={item} label={item} onPress={() => setFilter(item)} selected={filter === item} />
            ))}
          </View>

          <View className="gap-2">
            {visibleMessages.map((message) => {
              const active = message.id === selectedId;
              return (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  className={`flex-row rounded-2xl border p-4 active:opacity-75 web:cursor-pointer ${active ? 'border-brand-300 bg-brand-50 dark:border-brand-700 dark:bg-brand-950' : 'border-transparent bg-slate-50 web:hover:border-slate-200 dark:bg-slate-800 dark:web:hover:border-slate-700'}`}
                  key={message.id}
                  onPress={() => openMessage(message.id)}
                >
                  <View className="mr-3 h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 dark:bg-white">
                    <Text className="text-xs font-black text-white dark:text-slate-950">{message.initials}</Text>
                  </View>
                  <View className="min-w-0 flex-1">
                    <View className="flex-row items-center">
                      <Text className="min-w-0 flex-1 font-bold text-slate-950 dark:text-white" numberOfLines={1}>{message.name}</Text>
                      <Text className="ml-2 text-[11px] font-semibold text-slate-400">{message.time}</Text>
                    </View>
                    <Text className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400" numberOfLines={2}>{message.preview}</Text>
                  </View>
                  {message.unread ? <View className="ml-2 mt-1 h-2.5 w-2.5 rounded-full bg-brand-500" /> : null}
                </Pressable>
              );
            })}
          </View>
        </Surface>

        <Surface className="flex-1">
          {composeOpen ? (
            <View>
              <SectionHeading eyebrow="New message" title="Start a conversation" description="This local demo keeps input state inside the shared view." />
              <TextField className="mb-4" label="To" placeholder="Coach or support circle" value="Mina - Focus coach" editable={false} />
              <TextField className="mb-4" label="Subject" placeholder="What would you like to discuss?" />
              <TextField label="Message" multiline onChangeText={setDraft} placeholder="Write a thoughtful update..." value={draft} />
              <View className="mt-5 flex-row flex-wrap gap-3">
                <Button disabled={!draft.trim()} onPress={() => { setSent(true); setDraft(''); }}>Send message</Button>
                <Button onPress={() => setComposeOpen(false)} variant="outline">Cancel</Button>
              </View>
              {sent ? <Alert className="mt-5" tone="success"><Text className="font-bold text-emerald-700 dark:text-emerald-200">Message sent in demo mode.</Text></Alert> : null}
            </View>
          ) : (
            <View>
              <View className="mb-6 flex-row items-start justify-between gap-4">
                <View className="min-w-0 flex-1">
                  <Badge tone={selected.unread ? 'brand' : 'neutral'}>{selected.unread ? 'New message' : 'Conversation'}</Badge>
                  <Text className="mt-4 text-2xl font-black text-slate-950 dark:text-white">{selected.name}</Text>
                  <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">Coaching workspace - {selected.time}</Text>
                </View>
                <Button onPress={() => setComposeOpen(true)} size="small" variant="outline">Reply</Button>
              </View>
              <View className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-800 sm:p-6">
                <Text className="text-base leading-7 text-slate-700 dark:text-slate-200">{selected.preview}</Text>
                <Text className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200">The strongest days started with one explicit outcome and a protected first focus block. Keep that pattern, and leave the afternoon flexible for collaboration.</Text>
              </View>
              <View className="mt-6 rounded-3xl border border-dashed border-brand-300 p-5 dark:border-brand-700">
                <Text className="font-black text-slate-950 dark:text-white">Suggested next step</Text>
                <Text className="mt-2 leading-6 text-slate-600 dark:text-slate-300">Write one must-finish outcome for the next day before ending today.</Text>
                <Button className="mt-4 self-start" size="small" variant="outline">Add to tasks</Button>
              </View>
            </View>
          )}
        </Surface>
      </View>
    </AppPageShell>
  );
}

const journalPrompts = [
  'What gave me energy today?',
  'Which decision deserves more patience?',
  'What can I make easier tomorrow?',
] as const;
type JournalPrompt = (typeof journalPrompts)[number];

const journalEntries = [
  { day: 'Today', title: 'Clarity before speed', excerpt: 'I made the most progress after narrowing the goal to one visible outcome.', mood: 'Focused', tone: 'success' as const },
  { day: 'Yesterday', title: 'Protect the recovery window', excerpt: 'The afternoon felt lighter after I moved one meeting and took a real break.', mood: 'Calm', tone: 'info' as const },
  { day: 'Friday', title: 'A useful constraint', excerpt: 'Limiting the task list helped me finish instead of continuously reorganizing.', mood: 'Proud', tone: 'brand' as const },
];

export function JournalPageView({ navigation }: DemoPageProps) {
  const [activePrompt, setActivePrompt] = useState<JournalPrompt>(journalPrompts[0]);
  const [entry, setEntry] = useState('');
  const [saved, setSaved] = useState(false);

  return (
    <AppPageShell activeRoute="journal" eyebrow="Reflection pattern" keyboardShouldPersistTaps="handled" navigation={navigation}>
      <View className="gap-6 xl:flex-row">
        <View className="flex-[3] gap-6">
          <Surface className="overflow-hidden border-0 bg-brand-700 dark:bg-brand-800">
            <View className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
            <Text className="text-xs font-black uppercase tracking-[2px] text-brand-100">Daily reflection</Text>
            <Text className="mt-3 max-w-2xl text-3xl font-black leading-10 text-white">Turn experience into a small, useful insight.</Text>
            <Text className="mt-3 max-w-2xl leading-6 text-brand-100">Choose a prompt, write without editing, then save the one sentence you want to remember.</Text>
          </Surface>

          <Surface>
            <SectionHeading eyebrow="Guided editor" title="Write today's note" />
            <View className="mb-5 flex-row flex-wrap gap-2">
              {journalPrompts.map((prompt) => (
                <Chip key={prompt} label={prompt} onPress={() => { setActivePrompt(prompt); setSaved(false); }} selected={activePrompt === prompt} />
              ))}
            </View>
            <TextField label={activePrompt} multiline onChangeText={(value) => { setEntry(value); setSaved(false); }} placeholder="Start with the first honest thought..." value={entry} />
            <View className="mt-5 gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Text className="text-sm font-semibold text-slate-400">{entry.length} characters - stored locally for this demo</Text>
              <Button disabled={!entry.trim()} onPress={() => setSaved(true)}>Save reflection</Button>
            </View>
            {saved ? <Alert className="mt-5" tone="success"><Text className="font-bold text-emerald-700 dark:text-emerald-200">Reflection saved.</Text></Alert> : null}
          </Surface>
        </View>

        <Surface className="xl:w-80">
          <SectionHeading eyebrow="Consistency" title="This month" description="Nine reflections across twelve active days." />
          <View className="mb-4 flex-row items-end justify-between">
            <Text className="text-4xl font-black text-slate-950 dark:text-white">75%</Text>
            <Badge tone="success">+12%</Badge>
          </View>
          <Progress value={75} />
          <View className="mt-6 gap-3">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <View className="flex-row items-center" key={day}>
                <Text className="w-10 text-xs font-bold text-slate-400">{day}</Text>
                <View className={`h-8 flex-1 rounded-xl ${index === 5 ? 'bg-slate-100 dark:bg-slate-800' : 'bg-brand-100 dark:bg-brand-900'}`} />
              </View>
            ))}
          </View>
        </Surface>
      </View>

      <View className="mt-6 gap-4 md:flex-row">
        {journalEntries.map((item) => (
          <Surface className="flex-1" key={item.title}>
            <View className="flex-row items-center justify-between gap-3">
              <Text className="text-xs font-black uppercase tracking-[1.5px] text-slate-400">{item.day}</Text>
              <Badge tone={item.tone}>{item.mood}</Badge>
            </View>
            <Text className="mt-5 text-lg font-black text-slate-950 dark:text-white">{item.title}</Text>
            <Text className="mt-2 leading-6 text-slate-600 dark:text-slate-300">{item.excerpt}</Text>
            <Button className="mt-5 self-start" size="small" variant="ghost">Read entry</Button>
          </Surface>
        ))}
      </View>
    </AppPageShell>
  );
}

const invoiceRows = [
  { label: 'Personal coaching plan', detail: 'Monthly membership', amount: '$24.00' },
  { label: 'Extra focus session', detail: 'One 30-minute session', amount: '$12.00' },
  { label: 'Tax', detail: 'Calculated for demo', amount: '$3.60' },
] as const;

export function BillingPageView({ navigation }: DemoPageProps) {
  const [cycle, setCycle] = useState<'Monthly' | 'Yearly'>('Monthly');
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Wallet'>('Card');
  const [updated, setUpdated] = useState(false);

  return (
    <AppPageShell activeRoute="billing" eyebrow="Commerce pattern" navigation={navigation}>
      <View className="gap-6 lg:flex-row">
        <View className="flex-[2] gap-6">
          <Surface className="border-brand-200 bg-brand-50 dark:border-brand-800 dark:bg-brand-950">
            <View className="gap-5 sm:flex-row sm:items-center sm:justify-between">
              <View className="min-w-0 flex-1">
                <Badge>Active plan</Badge>
                <Text className="mt-4 text-2xl font-black text-slate-950 dark:text-white">Personal coaching</Text>
                <Text className="mt-2 leading-6 text-slate-600 dark:text-slate-300">Unlimited AI check-ins, weekly review and two live sessions.</Text>
              </View>
              <View className="sm:items-end">
                <Text className="text-3xl font-black text-brand-700 dark:text-brand-200">{cycle === 'Monthly' ? '$24' : '$228'}</Text>
                <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400">per {cycle === 'Monthly' ? 'month' : 'year'}</Text>
              </View>
            </View>
            <View className="mt-6 flex-row flex-wrap gap-2">
              {(['Monthly', 'Yearly'] as const).map((item) => (
                <Chip key={item} label={item} onPress={() => { setCycle(item); setUpdated(false); }} selected={cycle === item} />
              ))}
              {cycle === 'Yearly' ? <Badge tone="success">Save $60</Badge> : null}
            </View>
          </Surface>

          <Surface>
            <SectionHeading eyebrow="Payment" title="Payment method" description="A platform-safe selector without browser-only form controls." />
            <View className="gap-3 sm:flex-row">
              {(['Card', 'Wallet'] as const).map((method) => {
                const selected = paymentMethod === method;
                return (
                  <Pressable
                    accessibilityRole="radio"
                    accessibilityState={{ checked: selected }}
                    className={`flex-1 flex-row items-center rounded-2xl border p-4 active:opacity-75 web:cursor-pointer ${selected ? 'border-brand-500 bg-brand-50 dark:bg-brand-950' : 'border-slate-200 dark:border-slate-700'}`}
                    key={method}
                    onPress={() => { setPaymentMethod(method); setUpdated(false); }}
                  >
                    <View className={`mr-3 h-5 w-5 items-center justify-center rounded-full border-2 ${selected ? 'border-brand-600' : 'border-slate-300 dark:border-slate-600'}`}>
                      {selected ? <View className="h-2.5 w-2.5 rounded-full bg-brand-600" /> : null}
                    </View>
                    <View>
                      <Text className="font-black text-slate-950 dark:text-white">{method}</Text>
                      <Text className="mt-1 text-xs text-slate-500 dark:text-slate-400">{method === 'Card' ? 'Visa ending in 4242' : 'Device wallet'}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
            <View className="mt-5 gap-4 sm:flex-row">
              <TextField className="flex-1" label="Billing email" value="alex@example.com" />
              <TextField className="sm:w-40" label="Postal code" value="700000" />
            </View>
            <Button className="mt-5 self-start" onPress={() => setUpdated(true)}>Update billing</Button>
            {updated ? <Alert className="mt-5" tone="success"><Text className="font-bold text-emerald-700 dark:text-emerald-200">Billing preference updated.</Text></Alert> : null}
          </Surface>
        </View>

        <Surface className="lg:w-[360px]">
          <SectionHeading eyebrow="Invoice preview" title="Order summary" description="Invoice #LC-2026-0817" />
          <View className="gap-4">
            {invoiceRows.map((row) => (
              <View className="flex-row items-start" key={row.label}>
                <View className="min-w-0 flex-1 pr-4">
                  <Text className="font-bold text-slate-900 dark:text-white">{row.label}</Text>
                  <Text className="mt-1 text-xs text-slate-500 dark:text-slate-400">{row.detail}</Text>
                </View>
                <Text className="font-black text-slate-950 dark:text-white">{row.amount}</Text>
              </View>
            ))}
          </View>
          <View className="my-6 h-px bg-slate-200 dark:bg-slate-700" />
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-black text-slate-950 dark:text-white">Total</Text>
            <Text className="text-2xl font-black text-brand-700 dark:text-brand-200">$39.60</Text>
          </View>
          <Alert className="mt-6" tone="info"><Text className="leading-5 text-sky-700 dark:text-sky-200">This invoice is a visual demo. No payment is processed.</Text></Alert>
          <Button className="mt-5" disabled>Pay invoice</Button>
        </Surface>
      </View>
    </AppPageShell>
  );
}
