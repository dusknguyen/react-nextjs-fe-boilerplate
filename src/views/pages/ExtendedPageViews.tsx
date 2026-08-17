'use client';

import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import {
  Accordion,
  Alert,
  Badge,
  Button,
  Card,
  ChatBubble,
  Checkbox,
  FileInput,
  Input,
  Progress,
  Select,
  Tab,
  Tabs,
  Textarea,
  SectionHeading,
  Surface,
} from '@/src/components';

import { DemoPageShell, type DemoPageProps } from './CorePageViews';

const weekDays = [
  { day: 'Mon', date: 17 },
  { day: 'Tue', date: 18 },
  { day: 'Wed', date: 19 },
  { day: 'Thu', date: 20 },
  { day: 'Fri', date: 21 },
  { day: 'Sat', date: 22 },
  { day: 'Sun', date: 23 },
] as const;

const initialEvents = [
  { id: 1, day: 17, time: '08:30', title: 'Morning intention', tone: 'bg-brand-100 dark:bg-brand-950' },
  { id: 2, day: 19, time: '14:00', title: 'Coach check-in', tone: 'bg-cyan-100 dark:bg-cyan-950' },
  { id: 3, day: 21, time: '16:30', title: 'Weekly reflection', tone: 'bg-amber-100 dark:bg-amber-950' },
] as const;

export function CalendarPageView({ navigation }: DemoPageProps) {
  const [selectedDay, setSelectedDay] = useState(17);
  const [draft, setDraft] = useState('');
  const [extraEvents, setExtraEvents] = useState<{ id: number; day: number; time: string; title: string; tone: string }[]>([]);
  const events = [...initialEvents, ...extraEvents].filter((event) => event.day === selectedDay);

  const addEvent = () => {
    const title = draft.trim();
    if (!title) return;
    setExtraEvents((current) => [
      ...current,
      { id: Date.now(), day: selectedDay, time: 'Next', title, tone: 'bg-emerald-100 dark:bg-emerald-950' },
    ]);
    setDraft('');
  };

  return (
    <DemoPageShell activeRoute="calendar" eyebrow="Calendar pattern" navigation={navigation} title="Plan a balanced week">
      <Surface>
        <View className="mb-5 gap-4 sm:flex-row sm:items-center sm:justify-between">
          <View>
            <Text className="text-lg font-black text-slate-950 dark:text-white">August 17 - 23</Text>
            <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">Three planned coaching moments</Text>
          </View>
          <Badge tone="success">Balanced week</Badge>
        </View>
        <View className="flex-row gap-2">
          {weekDays.map((item) => {
            const selected = item.date === selectedDay;
            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected }}
                className={`flex-1 items-center rounded-2xl px-1 py-3 web:cursor-pointer ${
                  selected ? 'bg-brand-600' : 'bg-slate-50 web:hover:bg-slate-100 dark:bg-slate-800'
                }`}
                key={item.date}
                onPress={() => setSelectedDay(item.date)}
              >
                <Text className={`text-[10px] font-bold uppercase ${selected ? 'text-brand-100' : 'text-slate-400'}`}>{item.day}</Text>
                <Text className={`mt-1 text-base font-black ${selected ? 'text-white' : 'text-slate-950 dark:text-white'}`}>{item.date}</Text>
              </Pressable>
            );
          })}
        </View>
      </Surface>

      <View className="mt-6 gap-6 md:flex-row">
        <Surface className="flex-[2]">
          <SectionHeading eyebrow={`Day ${selectedDay}`} title="Today's rhythm" />
          <View className="gap-3">
            {events.map((event) => (
              <View className={`flex-row items-center gap-4 rounded-2xl p-4 ${event.tone}`} key={event.id}>
                <Text className="w-12 text-xs font-black text-slate-500 dark:text-slate-300">{event.time}</Text>
                <View className="h-10 w-1 rounded-full bg-brand-500" />
                <Text className="flex-1 font-bold text-slate-950 dark:text-white">{event.title}</Text>
              </View>
            ))}
            {events.length === 0 ? (
              <View className="items-center rounded-2xl border border-dashed border-slate-300 px-5 py-10 dark:border-slate-700">
                <Text className="font-bold text-slate-700 dark:text-slate-200">This day is intentionally open.</Text>
                <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">Leave recovery space or add a small session.</Text>
              </View>
            ) : null}
          </View>
        </Surface>

        <Surface className="md:w-80">
          <SectionHeading eyebrow="Quick add" title="New session" description="Created locally for this UI demo." />
          <Input onChangeText={setDraft} onSubmitEditing={addEvent} placeholder="Session name" returnKeyType="done" value={draft} />
          <Button className="mt-3" onPress={addEvent}>Add to day {selectedDay}</Button>
          <Alert className="mt-4" tone="info">
            <Text className="text-sm leading-5 text-sky-700 dark:text-sky-200">Keep at least 15 minutes between focused sessions.</Text>
          </Alert>
        </Surface>
      </View>
    </DemoPageShell>
  );
}

type ChatMessage = { id: number; owner: 'coach' | 'me'; text: string; time: string };

const starterMessages: ChatMessage[] = [
  { id: 1, owner: 'coach', text: 'What would make today feel meaningful?', time: '09:20' },
  { id: 2, owner: 'me', text: 'Finishing the proposal without rushing.', time: '09:21' },
  { id: 3, owner: 'coach', text: 'Great. What is the smallest concrete first step?', time: '09:21' },
];

export function ChatPageView({ navigation }: DemoPageProps) {
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState(starterMessages);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((current) => [...current, { id: Date.now(), owner: 'me', text, time: 'Now' }]);
    setDraft('');
  };

  return (
    <DemoPageShell activeRoute="chat" eyebrow="Chat pattern" navigation={navigation} title="Talk with your AI coach">
      <View className="overflow-hidden rounded-[32px] border border-slate-200 bg-white md:flex-row dark:border-slate-800 dark:bg-slate-900">
        <View className="border-b border-slate-200 bg-slate-50 p-5 md:w-72 md:border-b-0 md:border-r dark:border-slate-800 dark:bg-slate-950">
          <View className="flex-row items-center gap-3">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-brand-600">
              <Text className="font-black text-white">AI</Text>
            </View>
            <View className="flex-1">
              <Text className="font-black text-slate-950 dark:text-white">Mira Coach</Text>
              <Text className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">Online now</Text>
            </View>
          </View>
          <View className="mt-6 gap-3">
            {['Daily check-in', 'Career clarity', 'Energy review'].map((topic, index) => (
              <Pressable className={`rounded-2xl p-3 web:cursor-pointer ${index === 0 ? 'bg-brand-100 dark:bg-brand-950' : 'web:hover:bg-slate-100 dark:web:hover:bg-slate-800'}`} key={topic}>
                <Text className="font-bold text-slate-800 dark:text-slate-100">{topic}</Text>
                <Text className="mt-1 text-xs text-slate-500 dark:text-slate-400">{index === 0 ? 'Active conversation' : 'Saved thread'}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="min-h-[520px] flex-1 p-5 sm:p-6">
          <View className="mb-5 flex-row items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <View>
              <Text className="font-black text-slate-950 dark:text-white">Daily check-in</Text>
              <Text className="mt-1 text-xs text-slate-500 dark:text-slate-400">Private and stored on this device</Text>
            </View>
            <Badge tone="brand">Coach</Badge>
          </View>
          <View className="flex-1 gap-5">
            {messages.map((message) => (
              <ChatBubble className={message.owner === 'me' ? 'items-end' : 'items-start'} key={message.id}>
                <ChatBubble.Header>{message.owner === 'me' ? 'You' : 'Mira'}</ChatBubble.Header>
                <ChatBubble.Message className={message.owner === 'me' ? 'rounded-bl-3xl rounded-br-md bg-slate-800 dark:bg-slate-700' : undefined}>
                  <Text className="leading-6 text-white">{message.text}</Text>
                </ChatBubble.Message>
                <ChatBubble.Time>{message.time}</ChatBubble.Time>
              </ChatBubble>
            ))}
          </View>
          <View className="mt-6 gap-3 sm:flex-row">
            <Input className="flex-1" onChangeText={setDraft} onSubmitEditing={send} placeholder="Write a thoughtful reply" returnKeyType="send" value={draft} />
            <Button onPress={send}>Send</Button>
          </View>
        </View>
      </View>
    </DemoPageShell>
  );
}

const resourceFiles = [
  { kind: 'PDF', name: 'Weekly reflection guide', size: '2.4 MB', updated: 'Today' },
  { kind: 'AUDIO', name: 'Ten-minute reset', size: '8.1 MB', updated: 'Yesterday' },
  { kind: 'NOTE', name: 'Career values worksheet', size: '480 KB', updated: 'Aug 14' },
] as const;

export function FilesPageView({ navigation }: DemoPageProps) {
  const [uploaded, setUploaded] = useState(false);

  return (
    <DemoPageShell activeRoute="files" eyebrow="File manager pattern" navigation={navigation} title="Your coaching resources">
      <View className="gap-4 sm:flex-row">
        {[
          ['12', 'Documents', 'bg-brand-100 dark:bg-brand-950'],
          ['4', 'Audio sessions', 'bg-cyan-100 dark:bg-cyan-950'],
          ['76%', 'Storage free', 'bg-emerald-100 dark:bg-emerald-950'],
        ].map(([value, label, tone]) => (
          <Surface className={`flex-1 ${tone}`} key={label}>
            <Text className="text-3xl font-black text-slate-950 dark:text-white">{value}</Text>
            <Text className="mt-2 font-semibold text-slate-600 dark:text-slate-300">{label}</Text>
          </Surface>
        ))}
      </View>

      <View className="mt-6 gap-6 md:flex-row">
        <Surface className="flex-[2]">
          <View className="gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SectionHeading eyebrow="Library" title="Recent files" description="Cross-platform cards replace the reference data table." />
            <FileInput fileName={uploaded ? 'resource-notes.txt' : 'Choose a file'} onPress={() => setUploaded(true)} />
          </View>
          {uploaded ? (
            <Alert className="mb-4" tone="success">
              <Text className="font-semibold text-emerald-700 dark:text-emerald-200">resource-notes.txt is ready to upload.</Text>
            </Alert>
          ) : null}
          <View className="gap-3">
            {resourceFiles.map((file) => (
              <View className="flex-row items-center gap-4 rounded-2xl border border-slate-100 p-4 dark:border-slate-800" key={file.name}>
                <View className="h-11 w-11 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-950">
                  <Text className="text-[10px] font-black text-brand-700 dark:text-brand-200">{file.kind}</Text>
                </View>
                <View className="min-w-0 flex-1">
                  <Text className="font-bold text-slate-950 dark:text-white">{file.name}</Text>
                  <Text className="mt-1 text-xs text-slate-500 dark:text-slate-400">{file.size} - {file.updated}</Text>
                </View>
                <Button variant="ghost">Open</Button>
              </View>
            ))}
          </View>
        </Surface>

        <Surface className="md:w-80">
          <SectionHeading eyebrow="Storage" title="2.4 GB of 10 GB" />
          <Progress value={24} />
          <View className="mt-6 gap-4">
            {[
              ['Documents', '1.2 GB', 'bg-brand-500'],
              ['Audio', '780 MB', 'bg-cyan-500'],
              ['Other', '420 MB', 'bg-amber-500'],
            ].map(([label, value, tone]) => (
              <View className="flex-row items-center" key={label}>
                <View className={`mr-3 h-3 w-3 rounded-full ${tone}`} />
                <Text className="flex-1 text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</Text>
                <Text className="text-sm font-black text-slate-950 dark:text-white">{value}</Text>
              </View>
            ))}
          </View>
        </Surface>
      </View>
    </DemoPageShell>
  );
}

const plans = [
  { id: 'starter', name: 'Starter', price: '$0', description: 'Daily check-ins and essential tools', tone: 'neutral' as const },
  { id: 'growth', name: 'Growth', price: '$12', description: 'Unlimited coaching and deeper insights', tone: 'brand' as const },
  { id: 'team', name: 'Team', price: '$29', description: 'Shared goals for up to five people', tone: 'info' as const },
] as const;

export function PlansPageView({ navigation }: DemoPageProps) {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState('growth');
  const selected = plans.find((plan) => plan.id === selectedPlan) ?? plans[1];

  return (
    <DemoPageShell activeRoute="plans" eyebrow="Commerce pattern" navigation={navigation} title="Choose your coaching plan">
      <View className="mb-6 items-center">
        <Tabs className="w-full max-w-sm">
          <Tab active={billing === 'monthly'} onPress={() => setBilling('monthly')}>Monthly</Tab>
          <Tab active={billing === 'yearly'} onPress={() => setBilling('yearly')}>Yearly - save 20%</Tab>
        </Tabs>
      </View>
      <View className="gap-4 md:flex-row">
        {plans.map((plan) => {
          const active = selectedPlan === plan.id;
          return (
            <Card className={`flex-1 ${active ? 'border-2 border-brand-500' : ''}`} key={plan.id}>
              <Card.Body>
                <View className="mb-4 flex-row items-center justify-between">
                  <Badge tone={plan.tone}>{plan.name}</Badge>
                  {plan.id === 'growth' ? <Text className="text-xs font-black text-brand-600 dark:text-brand-300">POPULAR</Text> : null}
                </View>
                <View className="flex-row items-end">
                  <Text className="text-4xl font-black text-slate-950 dark:text-white">{billing === 'yearly' && plan.price !== '$0' ? `$${Math.round(Number(plan.price.slice(1)) * 0.8)}` : plan.price}</Text>
                  <Text className="mb-1 ml-1 text-slate-500 dark:text-slate-400">/ month</Text>
                </View>
                <Text className="mt-3 min-h-12 leading-6 text-slate-600 dark:text-slate-300">{plan.description}</Text>
                <View className="my-5 gap-3">
                  {['Native and web access', 'Private progress history', plan.id === 'starter' ? '3 coach messages' : 'Unlimited coach messages'].map((feature) => (
                    <Text className="text-sm font-semibold text-slate-700 dark:text-slate-200" key={feature}>+ {feature}</Text>
                  ))}
                </View>
                <Button onPress={() => setSelectedPlan(plan.id)} variant={active ? 'solid' : 'outline'}>{active ? 'Selected' : `Choose ${plan.name}`}</Button>
              </Card.Body>
            </Card>
          );
        })}
      </View>

      <Surface className="mt-6">
        <View className="gap-5 md:flex-row md:items-center">
          <View className="flex-1">
            <SectionHeading eyebrow="Order summary" title={`${selected.name} plan`} description="Checkout UI only; no payment details are collected." />
            <Text className="font-semibold text-slate-600 dark:text-slate-300">Billing: {billing}</Text>
          </View>
          <View className="rounded-2xl bg-slate-50 p-5 md:w-72 dark:bg-slate-800">
            <View className="flex-row justify-between">
              <Text className="font-semibold text-slate-500 dark:text-slate-400">Total today</Text>
              <Text className="text-xl font-black text-slate-950 dark:text-white">{selected.price}</Text>
            </View>
            <Button className="mt-4">Continue securely</Button>
          </View>
        </View>
      </Surface>
    </DemoPageShell>
  );
}

const faqGroups = {
  General: [
    ['Can I use one account on native and web?', 'Yes. The UI and state contracts are shared; a real backend can synchronize the account across platforms.'],
    ['Is this medical advice?', 'No. This product demonstrates supportive coaching UI and does not replace professional medical care.'],
  ],
  Privacy: [
    ['Where is my journal stored?', 'This template uses a platform storage adapter: MMKV on native and localStorage on web.'],
    ['Can I export my data?', 'A production implementation can connect the file and profile patterns to an export service.'],
  ],
  Billing: [
    ['Can I change plans?', 'The plan selector demonstrates the interaction. Connect it to your universal billing adapter.'],
    ['Is yearly billing discounted?', 'The demo applies a 20 percent yearly discount to paid tiers.'],
  ],
} as const;

type FaqGroup = keyof typeof faqGroups;

export function FaqPageView({ navigation }: DemoPageProps) {
  const [category, setCategory] = useState<FaqGroup>('General');
  const [query, setQuery] = useState('');
  const questions = useMemo(
    () => faqGroups[category].filter(([question, answer]) => `${question} ${answer}`.toLowerCase().includes(query.toLowerCase())),
    [category, query],
  );

  return (
    <DemoPageShell activeRoute="faq" eyebrow="Help center pattern" navigation={navigation} title="How can we help?">
      <Surface className="mb-6 bg-brand-600 dark:bg-brand-700">
        <Text className="text-2xl font-black text-white">Find a clear answer quickly.</Text>
        <Text className="mb-5 mt-2 leading-6 text-brand-100">Search the active category or browse the common questions below.</Text>
        <Input className="bg-white dark:bg-slate-900" onChangeText={setQuery} placeholder="Search help articles" value={query} />
      </Surface>
      <View className="gap-6 md:flex-row">
        <Surface className="md:w-64">
          <SectionHeading eyebrow="Browse" title="Categories" />
          <View className="gap-2">
            {(Object.keys(faqGroups) as FaqGroup[]).map((item) => (
              <Pressable className={`rounded-2xl p-4 web:cursor-pointer ${category === item ? 'bg-brand-600' : 'bg-slate-50 web:hover:bg-slate-100 dark:bg-slate-800'}`} key={item} onPress={() => setCategory(item)}>
                <Text className={`font-bold ${category === item ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </Surface>
        <Surface className="flex-1">
          <SectionHeading eyebrow={category} title="Frequently asked questions" description={`${questions.length} answers in this category`} />
          <View className="gap-3">
            {questions.map(([question, answer], index) => (
              <Accordion defaultOpen={index === 0} key={question} title={question}>
                <Text className="leading-6 text-slate-600 dark:text-slate-300">{answer}</Text>
              </Accordion>
            ))}
            {questions.length === 0 ? <Alert tone="warning"><Text className="text-amber-700 dark:text-amber-200">No matching answer. Try another phrase or contact support.</Text></Alert> : null}
          </View>
        </Surface>
      </View>
    </DemoPageShell>
  );
}

export function ContactPageView({ navigation }: DemoPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('product');
  const [message, setMessage] = useState('');
  const [updates, setUpdates] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const valid = name.trim().length > 1 && email.includes('@') && message.trim().length > 9;

  return (
    <DemoPageShell activeRoute="contact" eyebrow="Contact pattern" navigation={navigation} title="Talk to a real person">
      <View className="gap-6 md:flex-row">
        <View className="gap-4 md:w-80">
          <Surface className="bg-brand-600 dark:bg-brand-700">
            <Text className="text-2xl font-black text-white">We are here to help.</Text>
            <Text className="mt-3 leading-6 text-brand-100">Share enough context and the right specialist can respond without asking you to repeat yourself.</Text>
          </Surface>
          {[
            ['Response time', 'Usually within one working day'],
            ['Product support', 'support@example.com'],
            ['Safety concern', 'Use your local emergency service'],
          ].map(([label, value]) => (
            <Surface key={label}>
              <Text className="text-xs font-black uppercase tracking-[2px] text-brand-600 dark:text-brand-300">{label}</Text>
              <Text className="mt-2 font-bold leading-6 text-slate-950 dark:text-white">{value}</Text>
            </Surface>
          ))}
        </View>

        <Surface className="flex-1">
          <SectionHeading eyebrow="Send a message" title="What can we solve together?" description="The form uses universal React Native controls and NativeWind validation states." />
          <View className="gap-4">
            <View>
              <Text className="mb-2 text-sm font-bold text-slate-700 dark:text-slate-200">Name</Text>
              <Input invalid={submitted && name.trim().length < 2} onChangeText={setName} placeholder="Your name" value={name} />
            </View>
            <View>
              <Text className="mb-2 text-sm font-bold text-slate-700 dark:text-slate-200">Email</Text>
              <Input autoCapitalize="none" invalid={submitted && !email.includes('@')} keyboardType="email-address" onChangeText={setEmail} placeholder="you@example.com" value={email} />
            </View>
            <View>
              <Text className="mb-2 text-sm font-bold text-slate-700 dark:text-slate-200">Topic</Text>
              <Select onValueChange={setTopic} options={[
                { label: 'Product question', value: 'product' },
                { label: 'Account help', value: 'account' },
                { label: 'Privacy request', value: 'privacy' },
              ]} selectedValue={topic} />
            </View>
            <View>
              <Text className="mb-2 text-sm font-bold text-slate-700 dark:text-slate-200">Message</Text>
              <Textarea invalid={submitted && message.trim().length < 10} onChangeText={setMessage} placeholder="Tell us what happened and what you expected" value={message} />
            </View>
            <Checkbox checked={updates} label="Send occasional product updates" onChange={setUpdates} />
            <Button onPress={() => setSubmitted(true)}>Send support request</Button>
            {submitted ? (
              <Alert tone={valid ? 'success' : 'error'}>
                <Text className={valid ? 'font-semibold text-emerald-700 dark:text-emerald-200' : 'font-semibold text-rose-700 dark:text-rose-200'}>
                  {valid ? 'Thanks. Your demo request is ready for a backend integration.' : 'Please enter a valid name, email, and a message of at least 10 characters.'}
                </Text>
              </Alert>
            ) : null}
          </View>
        </Surface>
      </View>
    </DemoPageShell>
  );
}
