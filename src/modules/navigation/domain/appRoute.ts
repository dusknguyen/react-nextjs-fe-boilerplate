export const appRoutes = [
  {
    id: 'home',
    path: '/',
    title: 'Dashboard',
    shortTitle: 'Home',
    description: 'Your daily coaching overview and universal route directory.',
    group: 'Overview',
    symbol: '01',
  },
  {
    id: 'insights',
    path: '/insights',
    title: 'Insights',
    shortTitle: 'Insights',
    description: 'Wellbeing metrics, trends and coaching activity.',
    group: 'Coach',
    symbol: '02',
  },
  {
    id: 'tasks',
    path: '/tasks',
    title: 'Focus tasks',
    shortTitle: 'Tasks',
    description: 'Priorities, habits and focused work management.',
    group: 'Coach',
    symbol: '03',
  },
  {
    id: 'calendar',
    path: '/calendar',
    title: 'Calendar',
    shortTitle: 'Calendar',
    description: 'A balanced weekly schedule and session planner.',
    group: 'Coach',
    symbol: '04',
  },
  {
    id: 'chat',
    path: '/chat',
    title: 'Coach chat',
    shortTitle: 'Chat',
    description: 'A shared conversational coaching experience.',
    group: 'Coach',
    symbol: '05',
  },
  {
    id: 'files',
    path: '/files',
    title: 'Resources',
    shortTitle: 'Files',
    description: 'Coaching files, folders and storage overview.',
    group: 'Coach',
    symbol: '06',
  },
  {
    id: 'profile',
    path: '/profile',
    title: 'People',
    shortTitle: 'Profile',
    description: 'Profiles and the people in your support circle.',
    group: 'Coach',
    symbol: '07',
  },
  {
    id: 'inbox',
    path: '/inbox',
    title: 'Coach inbox',
    shortTitle: 'Inbox',
    description: 'Messages, follow-ups and a focused compose workflow.',
    group: 'Workspace',
    symbol: '08',
  },
  {
    id: 'journal',
    path: '/journal',
    title: 'Reflection journal',
    shortTitle: 'Journal',
    description: 'Guided entries, personal notes and progress over time.',
    group: 'Workspace',
    symbol: '09',
  },
  {
    id: 'billing',
    path: '/billing',
    title: 'Plan and billing',
    shortTitle: 'Billing',
    description: 'Subscription, payment method and invoice patterns.',
    group: 'Workspace',
    symbol: '10',
  },
  {
    id: 'components',
    path: '/ui',
    title: 'UI components',
    shortTitle: 'Components',
    description: 'The complete universal NativeWind component catalog.',
    group: 'Design system',
    symbol: '11',
  },
  {
    id: 'foundations',
    path: '/ui/foundations',
    title: 'UI foundations',
    shortTitle: 'Foundations',
    description: 'Inputs, feedback, surfaces, navigation and layout built with NativeWind.',
    group: 'Design system',
    symbol: 'M3',
  },
  {
    id: 'advancedComponents',
    path: '/ui/advanced',
    title: 'Advanced components',
    shortTitle: 'Advanced',
    description: 'Advanced data, input, overlay and mobile interaction patterns.',
    group: 'Design system',
    symbol: 'UI',
  },
  {
    id: 'showcase',
    path: '/ui/showcase',
    title: 'Universal showcase',
    shortTitle: 'Showcase',
    description: 'Cross-platform controls, themes and responsive patterns.',
    group: 'Design system',
    symbol: '12',
  },
  {
    id: 'libraries',
    path: '/ui/libraries',
    title: 'Libraries lab',
    shortTitle: 'Libraries',
    description: 'Maintained Android and Web packages demonstrated behind application ports.',
    group: 'Design system',
    symbol: 'LIB',
  },
  {
    id: 'plans',
    path: '/plans',
    title: 'Coaching plans',
    shortTitle: 'Plans',
    description: 'Responsive plan comparison and checkout patterns.',
    group: 'Resources',
    symbol: '13',
  },
  {
    id: 'faq',
    path: '/faq',
    title: 'Help center',
    shortTitle: 'FAQ',
    description: 'Searchable help topics and common questions.',
    group: 'Resources',
    symbol: '14',
  },
  {
    id: 'contact',
    path: '/contact',
    title: 'Contact',
    shortTitle: 'Contact',
    description: 'A validated, universal support request flow.',
    group: 'Resources',
    symbol: '15',
  },
  {
    id: 'login',
    path: '/login',
    title: 'Sign in',
    shortTitle: 'Login',
    description: 'Authentication form and responsive split layout.',
    group: 'Account',
    symbol: '16',
  },
] as const;

export type AppRoute = (typeof appRoutes)[number];
export type AppRouteId = AppRoute['id'];
export type AppRoutePath = AppRoute['path'];
export type AppRouteGroup = AppRoute['group'];

export const appRouteGroups = [...new Set(appRoutes.map((route) => route.group))] as AppRouteGroup[];

const routesById = new Map<AppRouteId, AppRoute>(appRoutes.map((route) => [route.id, route]));
const routesByGroup = new Map<AppRouteGroup, AppRoute[]>(
  appRouteGroups.map((group) => [group, appRoutes.filter((route) => route.group === group)]),
);
const adjacentRoutesById = new Map<AppRouteId, { next: AppRoute | null; previous: AppRoute | null }>(
  appRoutes.map((route, index) => [
    route.id,
    {
      previous: index > 0 ? (appRoutes[index - 1] ?? null) : null,
      next: index < appRoutes.length - 1 ? (appRoutes[index + 1] ?? null) : null,
    },
  ]),
);

export function getAppRoute(id: AppRouteId): AppRoute {
  const route = routesById.get(id);
  if (!route) throw new Error(`Unknown app route: ${id}`);
  return route;
}

export function getRoutesInGroup(group: AppRouteGroup): AppRoute[] {
  return routesByGroup.get(group) ?? [];
}

export function getAdjacentRoutes(id: AppRouteId): { next: AppRoute | null; previous: AppRoute | null } {
  return adjacentRoutesById.get(id) ?? { next: null, previous: null };
}
