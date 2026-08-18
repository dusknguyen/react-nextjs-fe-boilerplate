import type { InheritedComponentProps } from '../types'; import { Text, View } from 'react-native';
type SectionHeadingProps = InheritedComponentProps<{ eyebrow: string; title: string; description?: string; }>;

/** Renders the section heading component. */
export function SectionHeading({ description, eyebrow, title }: SectionHeadingProps) { return (<View className="mb-7 max-w-3xl"><View className="mb-3 flex-row items-center gap-2"><View className="h-2 w-2 rounded-full bg-brand-500 shadow-sm"/><View className="h-px w-5 bg-brand-300 dark:bg-brand-700"/><Text className="text-[11px] font-black uppercase tracking-[2.5px] text-brand-700 dark:text-brand-300"> {eyebrow} </Text></View><Text className="text-2xl font-black leading-tight tracking-[-0.8px] text-slate-950 dark:text-white sm:text-3xl"> {title} </Text>{description ? (<Text className="mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300"> {description} </Text>) : null}</View>); }
