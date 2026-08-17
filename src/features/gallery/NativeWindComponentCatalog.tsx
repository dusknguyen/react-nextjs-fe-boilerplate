'use client';

import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import * as UI from '@/src/components';

type CatalogSection = 'actions' | 'all' | 'data' | 'feedback' | 'input' | 'layout' | 'mockups' | 'navigation';

const catalogSections: { count: number; id: CatalogSection; label: string }[] = [
  { id: 'all', label: 'All components', count: 56 },
  { id: 'actions', label: 'Actions', count: 4 },
  { id: 'data', label: 'Data display', count: 13 },
  { id: 'navigation', label: 'Navigation', count: 8 },
  { id: 'feedback', label: 'Feedback', count: 7 },
  { id: 'input', label: 'Data input', count: 10 },
  { id: 'layout', label: 'Layout', count: 9 },
  { id: 'mockups', label: 'Mockups', count: 5 },
];

const sectionDescriptions: Record<Exclude<CatalogSection, 'all'>, string> = {
  actions: 'Buttons, menus and overlays for clear user decisions.',
  data: 'Cards, tables, timelines and conversational content.',
  feedback: 'Progress, loading, alerts and transient status patterns.',
  input: 'Accessible native controls with one shared state model.',
  layout: 'Composition primitives for responsive application shells.',
  mockups: 'Device previews, code surfaces and theme containers.',
  navigation: 'Wayfinding patterns from breadcrumbs to mobile docks.',
};

function DemoPanel({ activeSection, category, children, names, title }: {
  activeSection: CatalogSection;
  category: Exclude<CatalogSection, 'all'>;
  children: React.ReactNode;
  names: string[];
  title: string;
}) {
  if (activeSection !== 'all' && activeSection !== category) return null;

  return (
    <View className="mt-8 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <View className="border-b border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950 sm:p-6">
        <View className="gap-4 sm:flex-row sm:items-start sm:justify-between">
          <View className="flex-1">
            <Text className="text-xs font-black uppercase tracking-[2px] text-brand-600 dark:text-brand-300">NativeWind library</Text>
            <Text className="mt-2 text-2xl font-black text-slate-950 dark:text-white">{title}</Text>
            <Text className="mt-2 max-w-2xl leading-6 text-slate-600 dark:text-slate-300">{sectionDescriptions[category]}</Text>
          </View>
          <UI.Badge tone="brand">{names.length} groups</UI.Badge>
        </View>
        <View className="mt-5 flex-row flex-wrap gap-2">
          {names.map((name) => <UI.Badge key={name} tone="neutral">{name}</UI.Badge>)}
        </View>
      </View>
      <View className="gap-6 p-5 sm:p-6">{children}</View>
    </View>
  );
}

export function NativeWindComponentCatalog() {
  const [activeSection, setActiveSection] = useState<CatalogSection>('all');
  const [checked, setChecked] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState(2);
  const [radio, setRadio] = useState(true);
  const [range, setRange] = useState(68);
  const [rating, setRating] = useState(4);
  const [selected, setSelected] = useState('balanced');
  const [swapped, setSwapped] = useState(false);
  const [tab, setTab] = useState('Overview');
  const [toggle, setToggle] = useState(true);

  return (
    <View className="mt-8">
      <UI.SectionHeading
        eyebrow="Complete catalog"
        title="56 component groups, one universal implementation"
        description="Mọi facade cũ được giữ nguyên đường dẫn, nhưng render bằng React Native primitives và NativeWind."
      />

      <ScrollView contentContainerClassName="gap-3 pr-4" horizontal showsHorizontalScrollIndicator={false}>
        {catalogSections.map((section) => {
          const selectedSection = activeSection === section.id;
          return (
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: selectedSection }}
              className={selectedSection ? 'min-w-36 rounded-2xl bg-brand-600 px-4 py-3 web:cursor-pointer' : 'min-w-36 rounded-2xl border border-slate-200 bg-white px-4 py-3 web:cursor-pointer web:hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900'}
              key={section.id}
              onPress={() => setActiveSection(section.id)}
            >
              <Text className={selectedSection ? 'font-black text-white' : 'font-black text-slate-950 dark:text-white'}>{section.label}</Text>
              <Text className={selectedSection ? 'mt-1 text-xs font-semibold text-brand-100' : 'mt-1 text-xs font-semibold text-slate-400'}>{section.count} groups</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <DemoPanel activeSection={activeSection} category="actions" names={['Button', 'Dropdown', 'Modal', 'Swap']} title="Actions">
        <View className="flex-row flex-wrap gap-3">
          <UI.Button>Primary action</UI.Button>
          <UI.Button variant="outline">Outline</UI.Button>
          <UI.Dropdown label="Quick actions">
            <UI.DropdownItem><Text className="font-semibold text-slate-700 dark:text-slate-200">Start focus session</Text></UI.DropdownItem>
            <UI.DropdownItem><Text className="font-semibold text-slate-700 dark:text-slate-200">Schedule reminder</Text></UI.DropdownItem>
          </UI.Dropdown>
          <UI.Swap active={swapped} off={<UI.Badge tone="neutral">Offline</UI.Badge>} on={<UI.Badge tone="success">Online</UI.Badge>} onChange={setSwapped} />
          <UI.Button onPress={() => setModalVisible(true)} variant="ghost">Open modal</UI.Button>
        </View>
        <UI.Modal onClose={() => setModalVisible(false)} visible={modalVisible}>
          <UI.ModalHeader>Universal modal</UI.ModalHeader>
          <UI.ModalBody><Text className="leading-6 text-slate-600 dark:text-slate-300">Native Modal works on Android, iOS and web.</Text></UI.ModalBody>
          <UI.ModalActions><UI.Button onPress={() => setModalVisible(false)}>Done</UI.Button></UI.ModalActions>
        </UI.Modal>
      </DemoPanel>

      <DemoPanel activeSection={activeSection} category="data" names={['Accordion', 'Avatar', 'Badge', 'Card', 'Carousel', 'ChatBubble', 'Collapse', 'Countdown', 'Diff', 'Kbd', 'Stats', 'Table', 'Timeline']} title="Data display">
        <View className="flex-row flex-wrap items-center gap-3">
          <UI.Avatar initials="AK" />
          <UI.AvatarGroup><UI.Avatar initials="AI" /><UI.Avatar initials="UX" /><UI.Avatar initials="RN" /></UI.AvatarGroup>
          <UI.Badge>NativeWind</UI.Badge><UI.Badge tone="success">Universal</UI.Badge><UI.Kbd>⌘ K</UI.Kbd><UI.Countdown value={12} />
        </View>
        <UI.Card>
          <UI.CardImage />
          <UI.CardBody>
            <UI.CardTitle>Daily clarity card</UI.CardTitle>
            <Text className="mt-2 leading-6 text-slate-600 dark:text-slate-300">Cards, titles, media and actions share the same native layout model.</Text>
            <UI.CardActions><UI.Button>Continue</UI.Button></UI.CardActions>
          </UI.CardBody>
        </UI.Card>
        <UI.Carousel>
          {['Focus', 'Recover', 'Reflect'].map((item) => <UI.CarouselItem key={item}><Text className="text-lg font-black text-brand-800 dark:text-brand-100">{item}</Text><Text className="mt-2 text-brand-700 dark:text-brand-200">A horizontally scrollable native card.</Text></UI.CarouselItem>)}
        </UI.Carousel>
        <UI.ChatBubble>
          <UI.ChatBubbleHeader>Aiko · now</UI.ChatBubbleHeader>
          <UI.ChatBubbleMessage><Text className="font-semibold text-white">What is the smallest useful next step?</Text></UI.ChatBubbleMessage>
          <UI.ChatBubbleFooter>Delivered securely</UI.ChatBubbleFooter>
        </UI.ChatBubble>
        <View className="gap-3 md:flex-row">
          <UI.Accordion className="flex-1" title="Accordion"><Text className="text-slate-600 dark:text-slate-300">Press to reveal this content.</Text></UI.Accordion>
          <UI.Collapse className="flex-1" title="Collapse"><Text className="text-slate-600 dark:text-slate-300">The same accessible disclosure primitive.</Text></UI.Collapse>
        </View>
        <UI.Stats>
          <UI.Stat><Text className="text-2xl font-black text-slate-950 dark:text-white">84%</Text><Text className="text-slate-500 dark:text-slate-400">Energy</Text></UI.Stat>
          <UI.Stat><Text className="text-2xl font-black text-slate-950 dark:text-white">7</Text><Text className="text-slate-500 dark:text-slate-400">Day streak</Text></UI.Stat>
        </UI.Stats>
        <UI.Table>
          <View>
            <UI.TableHead><UI.TableRow><Text className="w-48 font-black text-slate-700 dark:text-slate-200">Habit</Text><Text className="w-32 font-black text-slate-700 dark:text-slate-200">Status</Text></UI.TableRow></UI.TableHead>
            <UI.TableBody><UI.TableRow><Text className="w-48 text-slate-600 dark:text-slate-300">Morning reset</Text><Text className="w-32 text-emerald-600">Complete</Text></UI.TableRow></UI.TableBody>
          </View>
        </UI.Table>
        <UI.Diff><View className="flex-1 bg-rose-50 p-4 dark:bg-rose-950"><Text className="font-bold text-rose-700 dark:text-rose-200">Before: scattered</Text></View><View className="flex-1 bg-emerald-50 p-4 dark:bg-emerald-950"><Text className="font-bold text-emerald-700 dark:text-emerald-200">After: focused</Text></View></UI.Diff>
        <UI.Timeline>
          <UI.TimelineItem><UI.TimelineStart><Text className="text-slate-500 dark:text-slate-400">08:00</Text></UI.TimelineStart><UI.TimelineMiddle /><UI.TimelineEnd><Text className="font-bold text-slate-900 dark:text-white">Plan the day</Text></UI.TimelineEnd></UI.TimelineItem>
          <UI.TimelineItem><UI.TimelineStart><Text className="text-slate-500 dark:text-slate-400">09:00</Text></UI.TimelineStart><UI.TimelineMiddle /><UI.TimelineEnd><Text className="font-bold text-slate-900 dark:text-white">Deep work</Text></UI.TimelineEnd></UI.TimelineItem>
        </UI.Timeline>
      </DemoPanel>

      <DemoPanel activeSection={activeSection} category="navigation" names={['Breadcrumbs', 'Dock', 'Link', 'Menu', 'Navbar', 'Pagination', 'Steps', 'Tabs']} title="Navigation">
        <UI.Navbar><UI.NavbarSection><UI.Avatar initials="AI" /><Text className="font-black text-slate-950 dark:text-white">Aiko</Text></UI.NavbarSection><UI.Link>Profile</UI.Link></UI.Navbar>
        <UI.Breadcrumbs><UI.BreadcrumbsItem>Home</UI.BreadcrumbsItem><Text className="text-slate-400">/</Text><UI.BreadcrumbsItem>Components</UI.BreadcrumbsItem></UI.Breadcrumbs>
        <UI.Tabs>{['Overview', 'Activity', 'Settings'].map((item) => <UI.Tab active={tab === item} key={item} onPress={() => setTab(item)}>{item}</UI.Tab>)}</UI.Tabs>
        <UI.Pagination onChange={setPage} page={page} total={4} />
        <UI.Steps><UI.Step><Text className="font-bold text-brand-700 dark:text-brand-200">Plan</Text></UI.Step><UI.Step><Text className="font-bold text-brand-700 dark:text-brand-200">Act</Text></UI.Step><UI.Step><Text className="font-bold text-brand-700 dark:text-brand-200">Reflect</Text></UI.Step></UI.Steps>
        <View className="gap-4 md:flex-row">
          <UI.Menu className="flex-1"><UI.MenuTitle>Workspace</UI.MenuTitle><UI.MenuItem><Text className="font-semibold text-slate-700 dark:text-slate-200">Dashboard</Text></UI.MenuItem><UI.MenuItem><Text className="font-semibold text-slate-700 dark:text-slate-200">Journal</Text></UI.MenuItem></UI.Menu>
          <UI.Dock className="flex-1"><UI.DockItem><Text className="text-xl">⌂</Text><UI.DockLabel>Home</UI.DockLabel></UI.DockItem><UI.DockItem><Text className="text-xl">◎</Text><UI.DockLabel>Coach</UI.DockLabel></UI.DockItem><UI.DockItem><Text className="text-xl">○</Text><UI.DockLabel>Profile</UI.DockLabel></UI.DockItem></UI.Dock>
        </View>
      </DemoPanel>

      <DemoPanel activeSection={activeSection} category="feedback" names={['Alert', 'Loading', 'Progress', 'RadialProgress', 'Skeleton', 'Toast', 'Tooltip']} title="Feedback">
        <UI.Alert tone="success"><Text className="font-bold text-emerald-700 dark:text-emerald-200">Your progress was saved.</Text></UI.Alert>
        <View className="flex-row flex-wrap items-center gap-6"><UI.Loading size="large" /><UI.RadialProgress value={75} /><View className="min-w-52 flex-1"><Text className="mb-2 font-bold text-slate-700 dark:text-slate-200">Weekly progress</Text><UI.Progress value={75} /></View></View>
        <UI.Skeleton /><UI.Toast><Text className="font-bold text-slate-900 dark:text-white">A compact cross-platform toast</Text></UI.Toast>
        <UI.Tooltip tip="Rendered without a DOM-only library"><Text className="font-bold text-brand-600 underline dark:text-brand-300">Press or hover for a tooltip</Text></UI.Tooltip>
      </DemoPanel>

      <DemoPanel activeSection={activeSection} category="input" names={['Checkbox', 'FileInput', 'Form', 'Input', 'Radio', 'Range', 'Rating', 'Select', 'Textarea', 'Toggle']} title="Data input">
        <UI.Form>
          <View><UI.Label>Goal name</UI.Label><UI.Input placeholder="Build a consistent morning routine" /></View>
          <View><UI.Label>Reflection</UI.Label><UI.Textarea placeholder="What would make today meaningful?" /></View>
          <View className="gap-4 sm:flex-row"><UI.Checkbox checked={checked} label="Daily reminder" onChange={setChecked} /><UI.Radio label="Balanced coaching" onChange={setRadio} selected={radio} /></View>
          <UI.Toggle label="Enable private insights" onValueChange={setToggle} value={toggle} />
          <View><UI.Label>Energy: {Math.round(range)}%</UI.Label><UI.Range maximumValue={100} onValueChange={setRange} value={range} /></View>
          <View><UI.Label>Session rating</UI.Label><UI.Rating onChange={setRating} value={rating} /></View>
          <UI.Select onValueChange={setSelected} options={[{ label: 'Gentle', value: 'gentle' }, { label: 'Balanced', value: 'balanced' }, { label: 'Direct', value: 'direct' }]} selectedValue={selected} />
          <UI.FileInput fileName="Attach journal entry" />
        </UI.Form>
      </DemoPanel>

      <DemoPanel activeSection={activeSection} category="layout" names={['Artboard', 'Divider', 'Drawer', 'Footer', 'Hero', 'Indicator', 'Join', 'Mask', 'Stack']} title="Layout">
        <UI.Hero><UI.HeroOverlay /><UI.HeroContent><UI.Badge tone="neutral">Daily reset</UI.Badge><Text className="text-3xl font-black text-white">Make space for what matters.</Text><UI.Button variant="outline">Start now</UI.Button></UI.HeroContent></UI.Hero>
        <UI.Drawer content={<Text className="text-slate-700 dark:text-slate-200">Responsive content panel</Text>} side={<Text className="font-black text-slate-900 dark:text-white">Drawer navigation</Text>} />
        <View className="gap-4 md:flex-row"><UI.Artboard className="flex-1"><Text className="font-black text-slate-950 dark:text-white">Artboard</Text><UI.Divider /><UI.Stack><UI.Badge>Stack item</UI.Badge><UI.Join><UI.Button>Left</UI.Button><UI.Button variant="outline">Right</UI.Button></UI.Join></UI.Stack></UI.Artboard><UI.Indicator><UI.IndicatorItem><Text className="text-xs font-black text-white">3</Text></UI.IndicatorItem><UI.Mask className="h-40 w-40 items-center justify-center bg-brand-100 dark:bg-brand-950"><Text className="font-black text-brand-700 dark:text-brand-200">Masked</Text></UI.Mask></UI.Indicator></View>
        <UI.Footer><View><UI.FooterTitle>Aiko UI</UI.FooterTitle><Text className="mt-2 text-slate-500 dark:text-slate-400">Universal by default.</Text></View><UI.Link>Documentation</UI.Link></UI.Footer>
      </DemoPanel>

      <DemoPanel activeSection={activeSection} category="mockups" names={['BrowserMockup', 'CodeMockup', 'PhoneMockup', 'Theme', 'WindowMockup']} title="Mockups & theme">
        <UI.CodeMockup><UI.CodeMockupLine>npm run check</UI.CodeMockupLine><UI.CodeMockupLine>NativeWind-only guard OK</UI.CodeMockupLine></UI.CodeMockup>
        <UI.BrowserMockup><Text className="font-black text-slate-950 dark:text-white">Browser mockup</Text><Text className="mt-2 text-slate-500 dark:text-slate-400">Responsive content on React Native Web.</Text></UI.BrowserMockup>
        <View className="gap-5 md:flex-row"><UI.PhoneMockup><Text className="font-black text-slate-950 dark:text-white">Phone mockup</Text><Text className="mt-2 text-slate-500 dark:text-slate-400">Native-first proportions.</Text></UI.PhoneMockup><UI.WindowMockup className="flex-1"><Text className="font-black text-slate-950 dark:text-white">Window mockup</Text><Text className="mt-2 text-slate-500 dark:text-slate-400">Desktop-friendly responsive shell.</Text></UI.WindowMockup></View>
        <UI.Theme><UI.ThemeItem><Text className="font-bold text-slate-950 dark:text-white">Theme follows the NativeWind color scheme</Text></UI.ThemeItem></UI.Theme>
      </DemoPanel>
    </View>
  );
}
