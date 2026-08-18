import type { InheritedComponentProps } from '../types'; import type { ReactNode } from 'react'; import { ScrollView, View } from 'react-native'; import { cn } from '../core/cn'; import { createBox, createText } from './builders';
import type { UniversalProps } from './contracts'; 
/** Public stat component or design-system primitive. */
export const Stat = createBox('Stat', 'flex-1 rounded-2xl border border-slate-200/70 bg-slate-50 p-4 shadow-sm web:transition-all web:hover:border-brand-200 web:hover:bg-brand-50 web:hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:web:hover:border-brand-800 dark:web:hover:bg-brand-950'); 
/** Public stat section component or design-system primitive. */
export const StatSection = createBox('StatSection', 'flex-row flex-wrap gap-3'); const StatsRoot = createBox('Stats', 'flex-row flex-wrap gap-3');

/** Public stats component or design-system primitive. */
export const Stats = Object.assign(StatsRoot, { Stat, Section: StatSection }); 
/** Public table head component or design-system primitive. */
export const TableHead = createBox('TableHead', 'flex-row border-b border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800'); 
/** Public table row component or design-system primitive. */
export const TableRow = createBox('TableRow', 'min-w-[520px] flex-row border-b border-slate-100 px-4 py-3 dark:border-slate-800'); 
/** Public table body component or design-system primitive. */
export const TableBody = createBox('TableBody', '');

/** Public table footer component or design-system primitive. */
export const TableFooter = createBox('TableFooter', 'flex-row bg-slate-50 px-4 py-3 dark:bg-slate-800'); 
/** Renders the table component. */
export function Table({ children, className }: UniversalProps) { return <ScrollView className={cn('rounded-2xl border border-slate-200 dark:border-slate-700', className)} horizontal>{children}</ScrollView>; } Object.assign(Table, { Body: TableBody, Footer: TableFooter, Head: TableHead, Row: TableRow }); 
/** Public divider component or design-system primitive. */
export const Divider = createBox('Divider', 'my-4 h-px w-full bg-slate-200 dark:bg-slate-700');

/** Public hero content component or design-system primitive. */
export const HeroContent = createBox('HeroContent', 'relative z-10 max-w-2xl items-start gap-4 p-7 sm:p-10'); 
/** Public hero overlay component or design-system primitive. */
export const HeroOverlay = createBox('HeroOverlay', 'absolute inset-0 bg-slate-950/40'); const HeroRoot = createBox('Hero', 'relative min-h-72 justify-center overflow-hidden rounded-[32px] border border-brand-400 bg-brand-600 shadow-xl web:transition-shadow web:hover:shadow-2xl dark:border-brand-700'); 
/** Public hero component or design-system primitive. */
export const Hero = Object.assign(HeroRoot, { Content: HeroContent, Overlay: HeroOverlay });

/** Public join component or design-system primitive. */
export const Join = createBox('Join', 'flex-row flex-wrap items-center'); 
/** Public stack component or design-system primitive. */
export const Stack = createBox('Stack', 'gap-3'); 
/** Public mask component or design-system primitive. */
export const Mask = createBox('Mask', 'overflow-hidden rounded-[32px]'); 
/** Public indicator item component or design-system primitive. */
export const IndicatorItem = createBox('IndicatorItem', 'absolute -right-2 -top-2 z-10 rounded-full bg-rose-500 px-2 py-1');
const IndicatorRoot = createBox('Indicator', 'relative self-start'); 
/** Public indicator component or design-system primitive. */
export const Indicator = Object.assign(IndicatorRoot, { Item: IndicatorItem }); 
/** Props accepted by the drawer component. */
export type DrawerProps = InheritedComponentProps<UniversalProps & { content?: ReactNode; open?: boolean; side?: ReactNode; }>; 
/** Renders the drawer component. */
export function Drawer({ children, className, content, open = true, side }: DrawerProps) { return <View className={cn('overflow-hidden rounded-3xl border border-slate-200 md:flex-row dark:border-slate-800', className)}>{open && side ? <View className="border-b border-slate-200 bg-slate-100 p-4 md:w-64 md:border-b-0 md:border-r dark:border-slate-700 dark:bg-slate-800">{side}</View> : null}<View className="flex-1 bg-white p-5 dark:bg-slate-900">{content ?? children}</View></View>; }

/** Public diff component or design-system primitive. */
export const Diff = createBox('Diff', 'flex-row overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700'); 
/** Public code mockup line component or design-system primitive. */
export const CodeMockupLine = createText('CodeMockupLine', 'font-mono text-sm leading-6 text-emerald-300'); const CodeMockupRoot = createBox('CodeMockup', 'gap-1 rounded-3xl bg-slate-950 p-5'); 
/** Public code mockup component or design-system primitive. */
export const CodeMockup = Object.assign(CodeMockupRoot, { Line: CodeMockupLine });
