'use client'; import type { InheritedComponentProps } from '../types';  import type { ReactNode } from 'react'; import { Pressable, Text, type PressableProps } from 'react-native'; import { cn } from '../core/cn';
import { focusRingClassName } from '../core/styles'; import { createBox, createText } from './builders'; 
/** Public breadcrumbs item component or design-system primitive. */
export const BreadcrumbsItem = createText('BreadcrumbsItem', 'rounded-lg px-2 py-1 text-sm font-bold text-slate-600 web:transition-colors web:hover:bg-white web:hover:text-brand-700 dark:text-slate-300 dark:web:hover:bg-slate-800 dark:web:hover:text-brand-200'); const BreadcrumbsRoot = createBox('Breadcrumbs', 'flex-row flex-wrap items-center gap-1 rounded-2xl border border-slate-200/70 bg-slate-100/80 p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80');

/** Public breadcrumbs component or design-system primitive. */
export const Breadcrumbs = Object.assign(BreadcrumbsRoot, { Item: BreadcrumbsItem }); 
/** Public navbar section component or design-system primitive. */
export const NavbarSection = createBox('NavbarSection', 'flex-row items-center gap-3'); const NavbarRoot = createBox('Navbar', 'flex-row items-center justify-between gap-4 rounded-[28px] border border-slate-200/80 bg-white/95 px-5 py-4 shadow-md web:backdrop-blur-xl web:transition-shadow web:hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/95'); 
/** Public navbar component or design-system primitive. */
export const Navbar = Object.assign(NavbarRoot, { Section: NavbarSection });

/** Public menu title component or design-system primitive. */
export const MenuTitle = createText('MenuTitle', 'px-3 py-2 text-xs font-black uppercase tracking-[2px] text-slate-400'); 
/** Public menu item component or design-system primitive. */
export const MenuItem = createBox('MenuItem', 'rounded-xl px-3 py-3 web:hover:bg-slate-100 dark:web:hover:bg-slate-800'); 
/** Public menu dropdown component or design-system primitive. */
export const MenuDropdown = createBox('MenuDropdown', 'ml-3 gap-1 border-l border-slate-200 pl-3 dark:border-slate-700'); 
/** Public menu details component or design-system primitive. */
export const MenuDetails = createBox('MenuDetails', 'gap-1');
const MenuRoot = createBox('Menu', 'gap-1 rounded-2xl bg-white p-2 dark:bg-slate-900'); 
/** Public menu component or design-system primitive. */
export const Menu = Object.assign(MenuRoot, { Details: MenuDetails, Dropdown: MenuDropdown, Item: MenuItem, Title: MenuTitle }); 
/** Public tabs component or design-system primitive. */
export const Tabs = createBox('Tabs', 'flex-row rounded-2xl bg-slate-100 p-1 dark:bg-slate-800'); 
/** Props accepted by the tab component. */
export type TabProps = InheritedComponentProps<PressableProps & { active?: boolean; children?: ReactNode; className?: string; }>;

/** Renders the tab component. */
export function Tab({ active, children, className, ...props }: TabProps) { return <Pressable accessibilityRole="tab" accessibilityState={{ selected: active }} className={cn('flex-1 items-center rounded-xl px-4 py-3 active:scale-[0.98] web:cursor-pointer web:transition-all web:duration-200 web:hover:text-brand-600', focusRingClassName, active && 'bg-white shadow-md dark:bg-slate-700', className)} {...props}><Text className={active ? 'font-black text-brand-700 dark:text-brand-200' : 'font-semibold text-slate-500 dark:text-slate-400'}>{children}</Text></Pressable>; } 
/** Public radio tab component or design-system primitive. */
export const RadioTab = Tab; 
/** Public dock label component or design-system primitive. */
export const DockLabel = createText('DockLabel', 'text-[10px] font-bold text-slate-500 dark:text-slate-400'); 
/** Public dock item component or design-system primitive. */
export const DockItem = createBox('DockItem', 'min-w-16 items-center gap-1 rounded-2xl p-2');
const DockRoot = createBox('Dock', 'flex-row items-center justify-around rounded-[28px] border border-slate-200/80 bg-white/95 p-2 shadow-xl web:backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95'); 
/** Public dock component or design-system primitive. */
export const Dock = Object.assign(DockRoot, { Item: DockItem, Label: DockLabel }); 
/** Public step component or design-system primitive. */
export const Step = createBox('Step', 'flex-1 items-center border-t-4 border-brand-500 pt-3'); const StepsRoot = createBox('Steps', 'flex-row items-start gap-2');

/** Public steps component or design-system primitive. */
export const Steps = Object.assign(StepsRoot, { Step }); 
/** Public timeline start component or design-system primitive. */
export const TimelineStart = createBox('TimelineStart', 'flex-1 items-end pr-4'); 
/** Public timeline middle component or design-system primitive. */
export const TimelineMiddle = createBox('TimelineMiddle', 'h-4 w-4 rounded-full bg-brand-600'); 
/** Public timeline end component or design-system primitive. */
export const TimelineEnd = createBox('TimelineEnd', 'flex-1 pl-4');

/** Public timeline item component or design-system primitive. */
export const TimelineItem = createBox('TimelineItem', 'flex-row items-center py-3'); const TimelineRoot = createBox('Timeline', 'gap-1'); 
/** Public timeline component or design-system primitive. */
export const Timeline = Object.assign(TimelineRoot, { End: TimelineEnd, Item: TimelineItem, Middle: TimelineMiddle, Start: TimelineStart });
