'use client';

import type { ReactElement, ReactNode } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  type ImageBackgroundProps,
  type ImageProps,
  type ImageSourcePropType,
  type ViewProps,
} from 'react-native';

import { cn } from '../core/cn';
import type { InheritedComponentProps } from '../types';

/** Props accepted by the responsive image component. */
export type ResponsiveImageProps = InheritedComponentProps<
  Omit<ImageProps, 'source'> & {
    alt?: string;
    aspectRatio?: number;
    className?: string;
    source?: ImageSourcePropType;
    src?: string;
  }
>;

/**
 * Cross-platform image with URI shorthand, explicit accessibility semantics,
 * and an optional runtime aspect ratio for remote images.
 */
export function ResponsiveImage({
  accessible,
  alt = '',
  aspectRatio,
  className,
  resizeMode = 'cover',
  source,
  src,
  style,
  ...props
}: ResponsiveImageProps) {
  const imageSource = source ?? (src ? { uri: src } : undefined);
  if (!imageSource) return null;

  const ratioStyle =
    typeof aspectRatio === 'number' && Number.isFinite(aspectRatio)
      ? { aspectRatio: Math.max(0.01, aspectRatio) }
      : undefined;

  return (
    <Image
      accessibilityLabel={alt || undefined}
      accessibilityRole={alt ? 'image' : undefined}
      accessible={accessible ?? Boolean(alt)}
      className={cn('h-full w-full', className)}
      resizeMode={resizeMode}
      source={imageSource}
      style={StyleSheet.compose(ratioStyle, style)}
      {...props}
    />
  );
}

/** Props accepted by the image-background surface. */
export type ImageBackgroundSurfaceProps = InheritedComponentProps<
  Omit<ImageBackgroundProps, 'source'> & {
    alt?: string;
    className?: string;
    source?: ImageSourcePropType;
    src?: string;
  }
>;

/** Background image surface for cards, heroes, and banners. */
export function ImageBackgroundSurface({
  alt = '',
  children,
  className,
  source,
  src,
  ...props
}: ImageBackgroundSurfaceProps) {
  const imageSource = source ?? (src ? { uri: src } : undefined);
  if (!imageSource) return <View className={className}>{children}</View>;

  return (
    <ImageBackground
      accessibilityLabel={alt || undefined}
      accessibilityRole={alt ? 'image' : undefined}
      accessible={Boolean(alt)}
      className={className}
      source={imageSource}
      {...props}
    >
      {children}
    </ImageBackground>
  );
}

/** Media kinds supported by an injected renderer adapter. */
export type MediaKind = 'audio' | 'document' | 'video';

/** Framework-neutral playback state passed to a media renderer adapter. */
export type MediaRenderState = {
  autoplay?: boolean;
  controls?: boolean;
  kind: MediaKind;
  loop?: boolean;
  muted?: boolean;
  poster?: ImageSourcePropType;
  source: string;
};

/** Port implemented by an app-specific video/audio/document library adapter. */
export interface MediaRendererPort {
  renderMedia(state: MediaRenderState): ReactElement | null;
}

/** Props accepted by the media-player boundary. */
export type MediaPlayerProps = InheritedComponentProps<
  MediaRenderState & {
    className?: string;
    fallback?: ReactNode;
    renderer?: MediaRendererPort;
  }
>;

/** Media boundary that avoids a hard dependency on a player package. */
export function MediaPlayer({
  className,
  fallback,
  renderer,
  ...state
}: MediaPlayerProps) {
  const rendered = renderer?.renderMedia(state);

  return (
    <View
      className={cn(
        'min-h-40 overflow-hidden rounded-2xl bg-slate-950',
        className,
      )}
    >
      {rendered ??
        fallback ?? (
          <View className="flex-1 items-center justify-center p-5">
            <Text className="text-center text-sm font-semibold text-slate-300">
              Media renderer not configured
            </Text>
          </View>
        )}
    </View>
  );
}

/** Item accepted by the media gallery. */
export type MediaGalleryItem = {
  alt?: string;
  id: string;
  source?: ImageSourcePropType;
  src?: string;
};

/** Props accepted by the horizontal media gallery. */
export type MediaGalleryProps = InheritedComponentProps<
  ViewProps & {
    className?: string;
    itemClassName?: string;
    items: readonly MediaGalleryItem[];
  }
>;

/** Horizontally virtualized image gallery for mobile and web. */
export function MediaGallery({
  className,
  itemClassName,
  items,
  ...props
}: MediaGalleryProps) {
  return (
    <View className={className} {...props}>
      <FlatList
        contentContainerClassName="gap-3 pr-4"
        data={[...items]}
        horizontal
        keyExtractor={(item) => item.id}
        removeClippedSubviews
        renderItem={({ item }) => (
          <View
            className={cn(
              'h-44 w-64 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800',
              itemClassName,
            )}
          >
            <ResponsiveImage alt={item.alt} source={item.source} src={item.src} />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
