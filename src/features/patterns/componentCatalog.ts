export type ComponentGroup = {
  category: string;
  components: readonly string[];
  description: string;
};

export const componentGroups: readonly ComponentGroup[] = [
  {
    category: 'Foundation',
    description: 'Core actions, content, media and composition primitives.',
    components: ['Accordion', 'Alert', 'Avatar', 'Badge', 'Button', 'Card', 'Checkbox', 'Chip', 'Divider', 'Dropdown', 'FileInput', 'Input', 'Link', 'Modal', 'Progress', 'Radio', 'Range', 'Rating', 'Select', 'Skeleton', 'Tabs', 'Textarea', 'Toggle', 'Tooltip'],
  },
  {
    category: 'Forms',
    description: 'Text entry, structured selection and validation-ready controls.',
    components: ['AutoComplete', 'ChipsInput', 'ColorPicker', 'DateTimePicker', 'MentionInput', 'MultiSelect', 'NumberField', 'OtpInput', 'PasswordField', 'SearchBar', 'SegmentedControl', 'TextField', 'TriStateCheckbox'],
  },
  {
    category: 'Data display',
    description: 'Dense, hierarchical, visual and progressively loaded data.',
    components: ['BarChart', 'DataGrid', 'ImageList', 'InfiniteList', 'MeterGroup', 'RefreshableContent', 'ReorderList', 'Table', 'Timeline', 'TransferList', 'TreeView'],
  },
  {
    category: 'Feedback',
    description: 'Persistent and temporary application status.',
    components: ['Backdrop', 'Dialog', 'Loading', 'RadialProgress', 'Snackbar', 'Toast'],
  },
  {
    category: 'Overlays',
    description: 'Focused actions and contextual layered content.',
    components: ['ActionSheet', 'BlockUI', 'ConfirmDialog', 'ContextMenu', 'OverlayPanel', 'Popover'],
  },
  {
    category: 'Layout',
    description: 'Responsive screen structure and content hierarchy.',
    components: ['Artboard', 'Box', 'Container', 'Fieldset', 'Grid', 'GridItem', 'Hero', 'Masonry', 'Panel', 'Paper', 'SlidingItem', 'SplitPane', 'Stack', 'Surface', 'Thumbnail', 'Toolbar', 'Typography'],
  },
  {
    category: 'Navigation',
    description: 'Top-level, peer, sequential and contextual navigation.',
    components: ['BottomNavigation', 'Breadcrumbs', 'Dock', 'Drawer', 'List', 'ListItem', 'Menu', 'Navbar', 'Pagination', 'SpeedDial', 'Steps'],
  },
  {
    category: 'Presentation',
    description: 'Reusable display patterns and device previews.',
    components: ['BrowserMockup', 'Carousel', 'ChatBubble', 'CodeMockup', 'Countdown', 'Diff', 'Indicator', 'Kbd', 'Mask', 'PhoneMockup', 'Stats', 'WindowMockup'],
  },
];

export const componentCount = new Set(componentGroups.flatMap((group) => group.components)).size;
