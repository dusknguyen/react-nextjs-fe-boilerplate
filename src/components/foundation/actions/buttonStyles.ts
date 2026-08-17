import { cn } from '../../core/cn'; import type { ComponentTone } from '../contracts'; import { solidToneClasses } from '../contracts';
/** Supported button corner treatments. */ export type ButtonShape = 'pill' | 'rounded'; /** Supported button control sizes. */ export type ButtonSize = 'large' | 'medium' | 'small'; /** Supported button surface treatments. */ export type ButtonVariant = 'ghost' | 'outline' | 'solid';
const base = 'relative flex-row items-center justify-center gap-2 overflow-hidden border web:transition-all web:duration-200 web:hover:-translate-y-0.5';
const sizes: Record<ButtonSize, string> = { large: 'min-h-[52px] px-6 py-3.5', medium: 'min-h-11 px-4 py-3', small: 'min-h-9 px-3 py-2' };
const shapes: Record<ButtonShape, string> = { pill: 'rounded-full', rounded: 'rounded-2xl' };
const variants: Record<Exclude<ButtonVariant, 'solid'>, string> = { ghost: 'border-transparent bg-transparent web:hover:bg-slate-100 dark:web:hover:bg-slate-800', outline: 'border-slate-300 bg-white shadow-sm web:hover:border-brand-300 web:hover:bg-brand-50 web:hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:web:hover:border-brand-700 dark:web:hover:bg-brand-950' };
/** Resolves button design tokens from an extensible set of style maps. */ export function buttonClassName(options: { className?: string; disabled?: boolean | null; shape: ButtonShape; size: ButtonSize; tone: ComponentTone; variant: ButtonVariant }) { const { className, disabled, shape, size, tone, variant } = options;
  return cn(base, sizes[size], shapes[shape], variant === 'solid' ? cn(solidToneClasses[tone], 'shadow-md web:hover:brightness-105 web:hover:shadow-lg') : variants[variant], disabled && 'opacity-40 web:hover:translate-y-0 web:hover:shadow-none', className);
}
