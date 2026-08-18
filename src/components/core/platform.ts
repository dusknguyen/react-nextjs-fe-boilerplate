import { Platform } from 'react-native';

/** Runtime platforms supported by the universal component package. */
export type UniversalPlatform =
  | 'android'
  | 'ios'
  | 'macos'
  | 'windows'
  | 'web'
  | 'unknown';

/** Returns a normalized runtime platform without assuming React Native core's narrower type union. */
export function getRuntimePlatform(): UniversalPlatform {
  const os = String(Platform.OS);
  if (os === 'android' || os === 'ios' || os === 'macos' || os === 'windows' || os === 'web') {
    return os;
  }
  return 'unknown';
}

/** Returns true for phone/tablet-oriented native targets. */
export function isMobilePlatform(platform: UniversalPlatform = getRuntimePlatform()): boolean {
  return platform === 'android' || platform === 'ios';
}

/** Returns true for desktop-native targets. */
export function isDesktopPlatform(platform: UniversalPlatform = getRuntimePlatform()): boolean {
  return platform === 'macos' || platform === 'windows';
}

/** Returns true when React Native is rendered through React Native Web. */
export function isWebPlatform(platform: UniversalPlatform = getRuntimePlatform()): boolean {
  return platform === 'web';
}

/** Returns true for targets where hover affordances are normally meaningful. */
export function supportsHover(platform: UniversalPlatform = getRuntimePlatform()): boolean {
  return platform === 'macos' || platform === 'windows' || platform === 'web';
}

/** Returns true for targets that normally have precise pointer input. */
export function supportsPrecisePointer(
  platform: UniversalPlatform = getRuntimePlatform(),
): boolean {
  return supportsHover(platform);
}
