export const demoSectionIds = [
  'actions',
  'data',
  'navigation',
  'feedback',
  'input',
  'layout',
  'mockups',
  'universal',
] as const;

export type DemoSectionId = (typeof demoSectionIds)[number];
export type DemoCatalogFilter = 'all' | DemoSectionId;

export type DemoSection = {
  description: string;
  id: DemoSectionId;
  label: string;
  names: readonly string[];
};

export const demoSections: readonly DemoSection[] = [
  {
    id: 'actions',
    label: 'Actions',
    description: 'Buttons, menus and overlays for clear user decisions.',
    names: ['Button', 'Dropdown', 'Modal', 'Swap'],
  },
  {
    id: 'data',
    label: 'Data display',
    description: 'Cards, tables, timelines and conversational content.',
    names: ['Accordion', 'Avatar', 'Badge', 'Card', 'Carousel', 'ChatBubble', 'Collapse', 'Countdown', 'Diff', 'Kbd', 'Stats', 'Table', 'Timeline'],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    description: 'Wayfinding patterns from breadcrumbs to mobile docks.',
    names: ['Breadcrumbs', 'Dock', 'Link', 'Menu', 'Navbar', 'Pagination', 'Steps', 'Tabs'],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    description: 'Progress, loading, alerts and transient status patterns.',
    names: ['Alert', 'Loading', 'Progress', 'RadialProgress', 'Skeleton', 'Toast', 'Tooltip'],
  },
  {
    id: 'input',
    label: 'Data input',
    description: 'Accessible native controls with one shared state model.',
    names: ['Checkbox', 'FileInput', 'Form', 'Input', 'Radio', 'Range', 'Rating', 'Select', 'Textarea', 'Toggle'],
  },
  {
    id: 'layout',
    label: 'Layout',
    description: 'Composition primitives for responsive application shells.',
    names: ['Artboard', 'Divider', 'Drawer', 'Footer', 'Hero', 'Indicator', 'Join', 'Mask', 'Stack'],
  },
  {
    id: 'mockups',
    label: 'Mockups',
    description: 'Device previews, code surfaces and theme containers.',
    names: ['BrowserMockup', 'CodeMockup', 'PhoneMockup', 'Theme', 'WindowMockup'],
  },
  {
    id: 'universal',
    label: 'Universal toolkit',
    description: 'Semantic UI, motion, collections and adaptive mobile, desktop and web patterns.',
    names: [
      'UIAction', 'UICard', 'UISurface', 'UIText', 'UIFormField',
      'FadeIn', 'SlideIn', 'ScaleIn', 'Pulse', 'PressScale', 'CrossFade', 'HoverScale',
      'VirtualList', 'GridList', 'SectionedList',
      'MobileScreen', 'MobileAppBar', 'MobileBottomBar', 'MobileAction',
      'DesktopWindow', 'WindowTitleBar', 'Toolbar', 'DesktopSidebar', 'DesktopStatusBar',
      'PlatformSurface', 'PlatformHint', 'AdaptivePressable',
      'EmptyState', 'SettingsRow', 'KeyValueRow', 'MetricCard',
    ],
  },
] as const;

export const demoComponentCount = new Set(
  demoSections.flatMap((section) => section.names),
).size;

export function isDemoSectionId(value: string): value is DemoSectionId {
  return demoSectionIds.some((id) => id === value);
}
