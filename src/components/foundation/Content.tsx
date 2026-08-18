import type { InheritedComponentProps } from '../types'; import { Image, ScrollView, Text, View } from 'react-native'; import type { ImageSourcePropType } from 'react-native'; import { cn } from '../core/cn';
import { createBox, createText } from './builders'; import type { UniversalProps } from './contracts'; 
/** Props accepted by the avatar component. */
export type AvatarProps = InheritedComponentProps<UniversalProps & { alt?: string; initials?: string; source?: ImageSourcePropType; src?: string; }>;

/** Renders the avatar component. */
export function Avatar({ alt, className, initials = 'AI', source, src }: AvatarProps) { const imageSource = source ?? (src ? { uri: src } : undefined); return <View className={cn('h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border-2 border-white bg-brand-100 shadow-md web:transition-all web:duration-200 web:hover:-translate-y-0.5 web:hover:scale-105 web:hover:shadow-lg web:motion-reduce:transform-none dark:border-slate-800 dark:bg-brand-950', className)}>{imageSource ? <Image accessibilityLabel={alt} accessibilityRole={alt ? 'image' : undefined} accessible={Boolean(alt)} className="h-full w-full" resizeMode="cover" source={imageSource}/> : <Text className="font-black tracking-tight text-brand-700 dark:text-brand-200">{initials}</Text>}</View>; } 
/** Public avatar group component or design-system primitive. */
export const AvatarGroup = createBox('AvatarGroup', 'flex-row items-center gap-2'); 
/** Public artboard component or design-system primitive. */
export const Artboard = createBox('Artboard', 'w-full max-w-sm overflow-hidden rounded-[32px] border border-slate-200/80 bg-white p-5 shadow-lg web:transition-all web:duration-300 web:ease-out web:hover:-translate-y-1 web:hover:border-brand-200 web:hover:shadow-xl web:motion-reduce:transform-none dark:border-slate-800 dark:bg-slate-900');

/** Public card actions component or design-system primitive. */
export const CardActions = createBox('CardActions', 'mt-5 flex-row flex-wrap justify-end gap-3'); 
/** Public card body component or design-system primitive. */
export const CardBody = createBox('CardBody', 'p-5 sm:p-6'); 
/** Public card title component or design-system primitive. */
export const CardTitle = createText('CardTitle', 'text-xl font-black text-slate-950 dark:text-white');

/** Props accepted by the card image component. */
export type CardImageProps = InheritedComponentProps<UniversalProps & { alt?: string; source?: ImageSourcePropType; src?: string; }>; 
/** Renders the card image component. */
export function CardImage({ alt, className, source, src }: CardImageProps) { const imageSource = source ?? (src ? { uri: src } : undefined); return imageSource ? <Image accessibilityLabel={alt} accessibilityRole={alt ? 'image' : undefined} accessible={Boolean(alt)} className={cn('h-44 w-full', className)} resizeMode="cover" source={imageSource}/> : <View className={cn('h-44 w-full bg-brand-100 dark:bg-brand-950', className)}/>; } const CardRoot = createBox('Card', 'overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-md web:transition-all web:duration-300 web:ease-out web:hover:-translate-y-1 web:hover:border-brand-200 web:hover:shadow-xl web:motion-reduce:transform-none web:motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-900 dark:web:hover:border-brand-800');

/** Public card component or design-system primitive. */
export const Card = Object.assign(CardRoot, { Actions: CardActions, Body: CardBody, Image: CardImage, Title: CardTitle }); 
/** Public carousel item component or design-system primitive. */
export const CarouselItem = createBox('CarouselItem', 'mr-4 w-72 shrink-0 rounded-[28px] border border-brand-100 bg-brand-50 p-5 shadow-sm web:transition-all web:duration-300 web:hover:-translate-y-1 web:hover:shadow-lg dark:border-brand-900 dark:bg-brand-950'); 
/** Renders the carousel component. */
export function Carousel({ children, className }: UniversalProps) { return <ScrollView className={className} contentContainerClassName="pr-4" horizontal showsHorizontalScrollIndicator={false}>{children}</ScrollView>; }

/** Public chat bubble avatar component or design-system primitive. */
export const ChatBubbleAvatar = Avatar; 
/** Public chat bubble header component or design-system primitive. */
export const ChatBubbleHeader = createText('ChatBubbleHeader', 'mb-1 text-xs font-bold text-slate-500 dark:text-slate-400'); 
/** Public chat bubble message component or design-system primitive. */
export const ChatBubbleMessage = createBox('ChatBubbleMessage', 'max-w-[85%] rounded-3xl rounded-bl-md bg-brand-600 px-4 py-3');

/** Public chat bubble time component or design-system primitive. */
export const ChatBubbleTime = createText('ChatBubbleTime', 'mt-1 text-[10px] font-semibold text-slate-400'); 
/** Public chat bubble footer component or design-system primitive. */
export const ChatBubbleFooter = createText('ChatBubbleFooter', 'mt-1 text-xs text-slate-500 dark:text-slate-400'); const ChatBubbleRoot = createBox('ChatBubble', 'gap-1');

/** Public chat bubble component or design-system primitive. */
export const ChatBubble = Object.assign(ChatBubbleRoot, { Avatar: ChatBubbleAvatar, Footer: ChatBubbleFooter, Header: ChatBubbleHeader, Message: ChatBubbleMessage, Time: ChatBubbleTime });
