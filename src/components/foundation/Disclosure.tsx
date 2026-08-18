'use client'; import type { InheritedComponentProps } from '../types';  import { createContext, useContext, useState, type ReactNode } from 'react'; import { Modal as NativeModal, Pressable, Text, View, type PressableProps } from 'react-native'; import { cn } from '../core/cn';
import { MotionView } from '../core/motion'; import { focusRingClassName } from '../core/styles'; import { Button } from './actions/Button'; import { createBox, createText } from './builders';
import { overlayStyles } from '../styling/overlayStyles';
import type { UniversalProps } from './contracts';
/** Props accepted by the accordion component. */
export type AccordionProps = InheritedComponentProps<UniversalProps & { defaultOpen?: boolean; title?: string; }>;
/** Renders the accordion component. */
export function Accordion({ children, className, defaultOpen = false, title = 'Details' }: AccordionProps) { const [open, setOpen] = useState(defaultOpen); return <View className={cn('overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm web:transition-shadow web:hover:shadow-md dark:border-slate-700 dark:bg-slate-900', className)}><Pressable accessibilityRole="button" accessibilityState={{ expanded: open }} className={cn('flex-row items-center justify-between p-4 web:cursor-pointer web:transition-colors web:hover:bg-brand-50 dark:web:hover:bg-brand-950', focusRingClassName)} onPress={() => setOpen((value) => !value)}><Text className="font-bold text-slate-950 dark:text-white">{title}</Text><View className={cn('h-8 w-8 items-center justify-center rounded-full web:transition-transform', open ? 'bg-brand-600' : 'bg-brand-50 dark:bg-brand-950')}><Text className={cn('font-black', open ? 'text-white' : 'text-brand-600 dark:text-brand-300')}>{open ? '−' : '+'}</Text></View></Pressable>{open ? <MotionView className="border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800" distance={6} duration={180}>{children}</MotionView> : null}</View>; }
/** Public collapse component or design-system primitive. */
export const Collapse = Accordion;

/** Public collapse title component or design-system primitive. */
export const CollapseTitle = createText('CollapseTitle', 'font-bold text-slate-950 dark:text-white');
/** Public collapse content component or design-system primitive. */
export const CollapseContent = createBox('CollapseContent', 'p-4');
/** Public collapse details component or design-system primitive. */
export const CollapseDetails = Collapse;
/** Props accepted by the dropdown component. */
export type DropdownProps = InheritedComponentProps<UniversalProps & { label?: string; }>;

const DropdownCloseContext = createContext<(() => void) | undefined>(undefined);

/** Renders the dropdown component. */
export function Dropdown({ children, className, label = 'Options' }: DropdownProps) { const [open, setOpen] = useState(false); return <DropdownCloseContext.Provider value={() => setOpen(false)}><View className={cn('relative self-start', open && 'z-50', className)}><Button accessibilityState={{ expanded: open }} onPress={() => setOpen((value) => !value)} variant="outline">{label}</Button>{open ? <MotionView accessibilityRole="menu" className="absolute left-0 top-full z-50 mt-2 min-w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900" distance={6} duration={180} style={overlayStyles.elevatedSurface}>{children}</MotionView> : null}</View></DropdownCloseContext.Provider>; }
/** Public dropdown details component or design-system primitive. */
export const DropdownDetails = Dropdown;
/** Public dropdown menu component or design-system primitive. */
export const DropdownMenu = createBox('DropdownMenu', 'gap-1');
/** Props accepted by an actionable dropdown menu item. */
export type DropdownItemProps = InheritedComponentProps<Omit<PressableProps, 'children'> & { children?: ReactNode; className?: string }>;

/** Actionable dropdown item that closes its owning menu after selection. */
export function DropdownItem({ children, className, onPress, ...props }: DropdownItemProps) { const close = useContext(DropdownCloseContext); return <Pressable accessibilityRole="menuitem" className={cn('min-h-10 justify-center rounded-xl px-3 py-2 web:cursor-pointer web:hover:bg-slate-100 dark:web:hover:bg-slate-800', focusRingClassName, className)} onPress={(event) => { onPress?.(event); close?.(); }} {...props}>{children}</Pressable>; }

/** Public dropdown toggle component or design-system primitive. */
export const DropdownToggle = Button;
/** Props accepted by the modal component. */
export type ModalProps = InheritedComponentProps<UniversalProps & { onClose?: () => void; visible?: boolean; }>;
/** Renders the modal component. */
export function Modal({ children, onClose, visible = false }: ModalProps) { return <NativeModal animationType="fade" onRequestClose={onClose} transparent visible={visible}><View className="items-center justify-center bg-slate-950/70 px-5" style={overlayStyles.backdrop}><Pressable accessibilityLabel="Close modal" accessibilityRole="button" onPress={onClose} style={overlayStyles.absoluteFill}/><MotionView className="w-full max-w-lg overflow-hidden rounded-[30px] border border-white/60 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900" style={overlayStyles.elevatedSurface}><View className="absolute left-6 right-6 top-0 h-1 rounded-b-full bg-brand-500"/>{children}</MotionView></View></NativeModal>; }
/** Public modal legacy component or design-system primitive. */
export const ModalLegacy = Modal;

/** Public modal header component or design-system primitive. */
export const ModalHeader = createText('ModalHeader', 'text-xl font-black text-slate-950 dark:text-white');
/** Public modal body component or design-system primitive. */
export const ModalBody = createBox('ModalBody', 'py-5');
/** Public modal actions component or design-system primitive. */
export const ModalActions = createBox('ModalActions', 'flex-row flex-wrap justify-end gap-3');
/** Props accepted by the rating component. */
export type RatingProps = InheritedComponentProps<UniversalProps & { onChange?: (value: number) => void; value?: number; }>;

/** Renders the rating component. */
export function Rating({ onChange, value = 0 }: RatingProps) { return <View className="flex-row gap-1">{[1, 2, 3, 4, 5].map((item) =><Pressable accessibilityLabel={String(item) + ' stars'} accessibilityRole="button" className={cn('rounded-lg p-1 active:scale-90 web:cursor-pointer web:transition-transform web:hover:scale-125', focusRingClassName)} key={item} onPress={() => onChange?.(item)}><Text className={cn('text-2xl', item <= value ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600')}>★</Text></Pressable>)}</View>; }
/** Public rating item component or design-system primitive. */
export const RatingItem = createBox('RatingItem', 'p-1');
/** Props accepted by the swap component. */
export type SwapProps = InheritedComponentProps<UniversalProps & { active?: boolean; off?: ReactNode; on?: ReactNode; onChange?: (active: boolean) => void; }>;
/** Renders the swap component. */
export function Swap({ active = false, className, off, on, onChange }: SwapProps) { return <Pressable accessibilityRole="button" className={cn('rounded-2xl p-3 web:cursor-pointer', className)} onPress={() => onChange?.(!active)}>{active ? on : off}</Pressable>; }

/** Props accepted by the tooltip component. */
export type TooltipProps = InheritedComponentProps<UniversalProps & { tip?: string; }>;
/** Renders the tooltip component. */
export function Tooltip({ children, className, tip = 'Helpful context' }: TooltipProps) { const [visible, setVisible] = useState(false); return <Pressable accessibilityRole="button" className={cn('relative self-start web:cursor-help', className)} onHoverIn={() => setVisible(true)} onHoverOut={() => setVisible(false)} onPress={() => setVisible((value) => !value)}>{children}{visible ? <View className="absolute bottom-full left-0 mb-2 min-w-32 rounded-xl bg-slate-950 px-3 py-2"><Text className="text-xs font-semibold text-white">{tip}</Text></View> : null}</Pressable>; }
/** Props accepted by the countdown component. */
export type CountdownProps = InheritedComponentProps<UniversalProps & { value?: number; }>;
/** Renders the countdown component. */
export function Countdown({ className, value = 0 }: CountdownProps) { return <Text className={cn('font-mono text-4xl font-black tabular-nums text-slate-950 dark:text-white', className)}>{String(value).padStart(2, '0')}</Text>; }

/** Public kbd component or design-system primitive. */
export const Kbd = createText('Kbd', 'self-start rounded-lg border border-b-4 border-slate-300 bg-slate-100 px-2 py-1 font-mono text-xs font-bold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200');
