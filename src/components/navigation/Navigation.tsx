'use client'; import type { InheritedComponentProps } from '../types';  import type { ReactNode } from 'react';
import { useState } from 'react'; import type { PressableProps, ViewProps } from 'react-native';
import { Pressable, Text, View } from 'react-native'; import { cn } from '../core/cn';
import { Fab, IconButton } from '../forms/ActionControls'; 
/** Renders the list component. */
export function List({ children, className, ...props }: InheritedComponentProps<ViewProps & { children?: ReactNode; }>) { return (<View className={cn('overflow-hidden rounded-3xl bg-white dark:bg-slate-900', className)} {...props}>{children}</View>); }

/** Props accepted by the list item component. */
export type ListItemProps = InheritedComponentProps<Omit<PressableProps, 'children'> & { leading?: ReactNode; primary: string; secondary?: string; selected?: boolean; trailing?: ReactNode; }>; 
/** Renders the list item component. */
export function ListItem({ leading, primary, secondary, selected, trailing, ...props }: ListItemProps) { return (<Pressable accessibilityRole={props.onPress ? 'button' : undefined} className={cn('min-h-16 flex-row items-center border-b border-slate-100 px-4 py-3 active:opacity-70 dark:border-slate-800', props.onPress && 'web:cursor-pointer web:hover:bg-slate-50 dark:web:hover:bg-slate-800', selected && 'bg-brand-50 dark:bg-brand-950')} {...props}>{leading ? <View className="mr-4">{leading}</View> : null}<View className="min-w-0 flex-1"><Text className="font-bold text-slate-950 dark:text-white" numberOfLines={1}>{primary}</Text>{secondary ? <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400" numberOfLines={2}>{secondary}</Text> : null}</View>{trailing ? <View className="ml-4">{trailing}</View> : null}</Pressable>); }

/** Public contract for bottom navigation action. */
export type BottomNavigationAction = { icon: ReactNode; label: string; value: string; }; 
/** Renders the bottom navigation component. */
export function BottomNavigation({ actions, onChange, value, }: InheritedComponentProps<{ actions: BottomNavigationAction[]; onChange?: (value: string) => void; value?: string; }>) { return (<View className="flex-row items-center justify-around rounded-3xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900">{actions.map((action) => { const active = value === action.value; return (<Pressable accessibilityRole="tab" accessibilityState={{ selected: active }} className={cn('min-w-16 flex-1 items-center rounded-2xl px-2 py-2 web:cursor-pointer', active && 'bg-brand-50 dark:bg-brand-950')} key={action.value} onPress={() => onChange?.(action.value)}><View className="h-7 items-center justify-center">{action.icon}</View><Text className={cn('mt-1 text-[10px] font-bold', active ? 'text-brand-700 dark:text-brand-200' : 'text-slate-500 dark:text-slate-400')}> {action.label} </Text></Pressable>); })}</View>); }

/** Public contract for speed dial action. */
export type SpeedDialAction = { icon: ReactNode; label: string; onPress: () => void; }; 
/** Renders the speed dial component. */
export function SpeedDial({ actions, className }: InheritedComponentProps<{ actions: SpeedDialAction[]; className?: string; }>) { const [open, setOpen] = useState(false); const visibleActions = actions.slice(0, 6); return (<View className={cn('items-end gap-3', className)}>{open ? (<View accessibilityRole="menu" className="items-end gap-2">{visibleActions.map((action) => (<View className="flex-row items-center gap-2" key={action.label}><View className="rounded-xl bg-slate-950 px-3 py-2"><Text className="text-xs font-bold text-white">{action.label}</Text></View><IconButton accessibilityLabel={action.label} className="bg-white shadow-md dark:bg-slate-800" onPress={() => { action.onPress(); setOpen(false); }}>{action.icon}</IconButton></View>))}</View>) : null}<Fab accessibilityLabel={open ? 'Close actions' : 'Open actions'} onPress={() => setOpen((value) => !value)}>{open ? '×' : '+'}</Fab></View>); }
