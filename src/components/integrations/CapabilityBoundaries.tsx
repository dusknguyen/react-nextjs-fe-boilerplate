'use client';

import type { ReactElement, ReactNode } from 'react';
import { Text, View, type ViewProps } from 'react-native';

import { cn } from '../core/cn';
import type { InheritedComponentProps } from '../types';

/** Minimal adapter contract used for optional native or web capabilities. */
export interface ComponentRendererPort<Props> {
  render(props: Props): ReactElement | null;
}

/** Props shared by optional-capability boundaries. */
export type CapabilityBoundaryProps<Props> = InheritedComponentProps<
  ViewProps & {
    adapter?: ComponentRendererPort<Props>;
    adapterProps: Props;
    className?: string;
    fallback?: ReactNode;
    unavailableLabel?: string;
  }
>;

/**
 * Renders an injected platform capability without importing the implementation.
 * This is the Hexagonal Architecture boundary for package-specific native widgets.
 */
export function CapabilityBoundary<Props>({
  adapter,
  adapterProps,
  className,
  fallback,
  unavailableLabel = 'Capability adapter not configured',
  ...props
}: CapabilityBoundaryProps<Props>) {
  const rendered = adapter?.render(adapterProps);

  return (
    <View className={cn('min-h-24', className)} {...props}>
      {rendered ??
        fallback ?? (
          <View className="flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-300 p-5 dark:border-slate-700">
            <Text className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400">
              {unavailableLabel}
            </Text>
          </View>
        )}
    </View>
  );
}

/** Host data passed to a map adapter. */
export type MapAdapterProps = {
  latitude?: number;
  longitude?: number;
  markers?: readonly {
    id: string;
    latitude: number;
    longitude: number;
    title?: string;
  }[];
  zoom?: number;
};

/** Map component boundary for react-native-maps or another host implementation. */
export function MapBoundary(props: CapabilityBoundaryProps<MapAdapterProps>) {
  return <CapabilityBoundary unavailableLabel="Map adapter not configured" {...props} />;
}

/** Host data passed to a camera adapter. */
export type CameraAdapterProps = {
  active?: boolean;
  facing?: 'back' | 'front';
  onCapture?: (uri: string) => void;
};

/** Camera component boundary for Expo Camera or another host implementation. */
export function CameraBoundary(
  props: CapabilityBoundaryProps<CameraAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Camera adapter not configured" {...props} />;
}

/** Host data passed to a barcode/QR scanner adapter. */
export type ScannerAdapterProps = {
  active?: boolean;
  formats?: readonly string[];
  onDetected?: (value: string, format?: string) => void;
};

/** Barcode and QR scanner boundary. */
export function ScannerBoundary(
  props: CapabilityBoundaryProps<ScannerAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Scanner adapter not configured" {...props} />;
}

/** Host data passed to a web-content adapter. */
export type WebContentAdapterProps = {
  html?: string;
  uri?: string;
};

/** WebView-like boundary without a direct react-native-webview dependency. */
export function WebContentBoundary(
  props: CapabilityBoundaryProps<WebContentAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Web content adapter not configured" {...props} />;
}

/** Host data passed to a document viewer adapter. */
export type DocumentViewerAdapterProps = {
  mimeType?: string;
  source: string;
};

/** PDF/document viewer boundary without package lock-in. */
export function DocumentViewerBoundary(
  props: CapabilityBoundaryProps<DocumentViewerAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Document viewer adapter not configured" {...props} />;
}

/** Host data passed to a rich-text editor adapter. */
export type RichTextEditorAdapterProps = {
  editable?: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
  value: string;
};

/** Rich-text editor boundary without a direct editor dependency. */
export function RichTextEditorBoundary(
  props: CapabilityBoundaryProps<RichTextEditorAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Rich-text adapter not configured" {...props} />;
}

/** Host data passed to a bottom-sheet adapter. */
export type BottomSheetAdapterProps = {
  children?: ReactNode;
  onClose?: () => void;
  open: boolean;
  snapPoints?: readonly number[];
};

/** Bottom-sheet boundary for native or web sheet implementations. */
export function BottomSheetBoundary(
  props: CapabilityBoundaryProps<BottomSheetAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Bottom-sheet adapter not configured" {...props} />;
}

/** Host data passed to an SVG/vector adapter. */
export type VectorGraphicAdapterProps = {
  accessibilityLabel?: string;
  height?: number;
  source: string;
  width?: number;
};

/** SVG/vector boundary without a direct react-native-svg dependency. */
export function VectorGraphicBoundary(
  props: CapabilityBoundaryProps<VectorGraphicAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Vector adapter not configured" {...props} />;
}

/** Host data passed to a declarative animation adapter. */
export type AnimationAdapterProps = {
  autoplay?: boolean;
  loop?: boolean;
  progress?: number;
  source: string | Readonly<Record<string, unknown>>;
};

/** Lottie/Rive-like animation boundary without package lock-in. */
export function AnimationBoundary(
  props: CapabilityBoundaryProps<AnimationAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Animation adapter not configured" {...props} />;
}

/** Host data passed to a date/time picker adapter. */
export type DateTimePickerAdapterProps = {
  maximumDate?: Date;
  minimumDate?: Date;
  mode?: 'date' | 'datetime' | 'time';
  onChange?: (value: Date) => void;
  value: Date;
};

/** Native/web date-time picker boundary. */
export function DateTimePickerBoundary(
  props: CapabilityBoundaryProps<DateTimePickerAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Date-time adapter not configured" {...props} />;
}

/** Host data passed to a device image/document picker adapter. */
export type AssetPickerAdapterProps = {
  allowsMultiple?: boolean;
  mediaTypes?: readonly ('document' | 'image' | 'video')[];
  onPicked?: (assets: readonly { name?: string; type?: string; uri: string }[]) => void;
};

/** Device asset-picker boundary. */
export function AssetPickerBoundary(
  props: CapabilityBoundaryProps<AssetPickerAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Asset-picker adapter not configured" {...props} />;
}

/** Host data passed to a gesture-library adapter. */
export type GestureAdapterProps = {
  children?: ReactNode;
  enabled?: boolean;
  onGestureEnd?: (payload: unknown) => void;
};

/** Gesture-library boundary for interactions beyond core Pressable/Responder needs. */
export function GestureBoundary(
  props: CapabilityBoundaryProps<GestureAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Gesture adapter not configured" {...props} />;
}


/** Host data passed to a pager/view-pager adapter. */
export type PagerAdapterProps = {
  children?: ReactNode;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  page?: number;
};

/** Pager boundary for native pager engines while keeping a stable component API. */
export function PagerBoundary(
  props: CapabilityBoundaryProps<PagerAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Pager adapter not configured" {...props} />;
}

/** Host data passed to an optimized image renderer adapter. */
export type ImageRendererAdapterProps = {
  accessibilityLabel?: string;
  contentFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  height?: number;
  source: string;
  width?: number;
};

/** Optimized/cached image boundary for host-selected image engines. */
export function ImageRendererBoundary(
  props: CapabilityBoundaryProps<ImageRendererAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Image renderer adapter not configured" {...props} />;
}

/** Host data passed to an icon renderer adapter. */
export type IconAdapterProps = {
  accessibilityLabel?: string;
  color?: string;
  name: string;
  size?: number;
};

/** Icon boundary without coupling the module to an icon-font or SVG package. */
export function IconBoundary(
  props: CapabilityBoundaryProps<IconAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Icon adapter not configured" {...props} />;
}

/** Host data passed to an advanced chart renderer adapter. */
export type ChartRendererAdapterProps = {
  accessibilityLabel?: string;
  data: readonly unknown[];
  height?: number;
  type?: string;
};

/** Advanced chart boundary for host-selected SVG/canvas/chart engines. */
export function ChartRendererBoundary(
  props: CapabilityBoundaryProps<ChartRendererAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Chart renderer adapter not configured" {...props} />;
}

/** Host data passed to a keyboard-controller adapter. */
export type KeyboardControllerAdapterProps = {
  children?: ReactNode;
  enabled?: boolean;
  offset?: number;
};

/** Advanced keyboard-management boundary beyond core KeyboardAvoidingView needs. */
export function KeyboardControllerBoundary(
  props: CapabilityBoundaryProps<KeyboardControllerAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Keyboard controller adapter not configured" {...props} />;
}

/** Host data passed to a keyboard-shortcut adapter. */
export type KeyboardShortcutAdapterProps = {
  enabled?: boolean;
  shortcuts: readonly {
    id: string;
    keys: readonly string[];
    onInvoke: () => void;
  }[];
};

/** Keyboard-shortcut boundary for Windows, macOS, and web productivity apps. */
export function KeyboardShortcutBoundary(
  props: CapabilityBoundaryProps<KeyboardShortcutAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Keyboard shortcut adapter not configured" {...props} />;
}

/** Host data passed to a native application-menu adapter. */
export type NativeMenuAdapterProps = {
  items: readonly {
    disabled?: boolean;
    id: string;
    label: string;
    onPress?: () => void;
  }[];
};

/** Native menu boundary for macOS menu bars and Windows application menus. */
export function NativeMenuBoundary(
  props: CapabilityBoundaryProps<NativeMenuAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Native menu adapter not configured" {...props} />;
}

/** Host data passed to a window-chrome adapter. */
export type WindowChromeAdapterProps = {
  fullScreen?: boolean;
  maximizable?: boolean;
  minimizable?: boolean;
  title?: string;
};

/** Native window-chrome boundary for desktop-only title bar/window operations. */
export function WindowChromeBoundary(
  props: CapabilityBoundaryProps<WindowChromeAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Window chrome adapter not configured" {...props} />;
}

/** Host data passed to a drag-and-drop adapter. */
export type DragDropAdapterProps = {
  children?: ReactNode;
  disabled?: boolean;
  onDrop?: (items: readonly { name?: string; uri?: string }[]) => void;
};

/** Drag-and-drop boundary for desktop-native and web file/data drops. */
export function DragDropBoundary(
  props: CapabilityBoundaryProps<DragDropAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Drag-and-drop adapter not configured" {...props} />;
}

/** Host data passed to a clipboard adapter. */
export type ClipboardAdapterProps = {
  onRead?: (text: string) => void;
  text?: string;
};

/** Clipboard UI boundary without coupling to a clipboard package or browser global. */
export function ClipboardBoundary(
  props: CapabilityBoundaryProps<ClipboardAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Clipboard adapter not configured" {...props} />;
}

/** Host data passed to a share adapter. */
export type ShareAdapterProps = {
  message?: string;
  title?: string;
  url?: string;
};

/** Share boundary for mobile system sheets, desktop sharing, or Web Share API adapters. */
export function ShareBoundary(
  props: CapabilityBoundaryProps<ShareAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Share adapter not configured" {...props} />;
}

/** Host data passed to haptic-feedback adapters. */
export type HapticsAdapterProps = {
  intensity?: 'heavy' | 'light' | 'medium';
  trigger?: string | number | boolean;
};

/** Haptic-feedback boundary for Android/iOS while remaining harmless on desktop/web. */
export function HapticsBoundary(
  props: CapabilityBoundaryProps<HapticsAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Haptics adapter not configured" {...props} />;
}

/** Host data passed to biometric-authentication adapters. */
export type BiometricAdapterProps = {
  onResult?: (success: boolean) => void;
  prompt: string;
};

/** Biometric authentication boundary for device-specific secure confirmation flows. */
export function BiometricBoundary(
  props: CapabilityBoundaryProps<BiometricAdapterProps>,
) {
  return <CapabilityBoundary unavailableLabel="Biometric adapter not configured" {...props} />;
}
