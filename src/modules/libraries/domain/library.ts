export type LibraryCategory = 'Data' | 'Device' | 'Media' | 'Presentation' | 'Workflow';

export type LibraryPackage = {
  category: LibraryCategory;
  capability: string;
  name: string;
};

export type RuntimeDiagnostics = {
  batteryPercent: number | null;
  connectionType: string;
  deviceName: string;
  internetReachable: boolean | null;
  locale: string;
  networkType: string;
  osName: string;
  sessionFingerprint: string;
};

export type SelectedAsset = {
  kind: 'document' | 'image';
  name: string;
  uri: string;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export const libraryPackages: readonly LibraryPackage[] = [
  { category: 'Data', name: '@tanstack/react-query', capability: 'Async cache and request lifecycle' },
  { category: 'Data', name: 'date-fns', capability: 'Immutable date formatting' },
  { category: 'Data', name: 'zod', capability: 'Runtime schema validation' },
  { category: 'Data', name: 'zustand', capability: 'Application state adapters' },
  { category: 'Device', name: '@react-native-community/netinfo', capability: 'Detailed connectivity state' },
  { category: 'Device', name: 'expo-battery', capability: 'Battery diagnostics' },
  { category: 'Device', name: 'expo-clipboard', capability: 'Universal clipboard bridge' },
  { category: 'Device', name: 'expo-crypto', capability: 'Crypto digest and UUID primitives' },
  { category: 'Device', name: 'expo-device', capability: 'Runtime device metadata' },
  { category: 'Device', name: 'expo-haptics', capability: 'Native feedback with web-safe fallback' },
  { category: 'Device', name: 'expo-localization', capability: 'Locale and region discovery' },
  { category: 'Device', name: 'expo-location', capability: 'Permission-aware geolocation' },
  { category: 'Device', name: 'expo-network', capability: 'Universal network diagnostics' },
  { category: 'Device', name: 'expo-speech', capability: 'Text-to-speech output' },
  { category: 'Media', name: 'expo-document-picker', capability: 'System document selection' },
  { category: 'Media', name: 'expo-image', capability: 'Cached cross-platform images' },
  { category: 'Media', name: 'expo-image-picker', capability: 'Permission-aware media selection' },
  { category: 'Media', name: 'expo-sharing', capability: 'Native and Web Share capability' },
  { category: 'Media', name: 'expo-web-browser', capability: 'Secure external browser sessions' },
  { category: 'Presentation', name: '@react-native-segmented-control/segmented-control', capability: 'Native-style filters' },
  { category: 'Presentation', name: '@shopify/flash-list', capability: 'Recycled high-performance lists' },
  { category: 'Presentation', name: 'expo-blur', capability: 'Universal translucent surfaces' },
  { category: 'Presentation', name: 'expo-linear-gradient', capability: 'Cross-platform gradients' },
  { category: 'Presentation', name: 'moti', capability: 'Reanimated declarative motion' },
  { category: 'Presentation', name: 'react-native-calendars', capability: 'Interactive calendar views' },
  { category: 'Presentation', name: 'react-native-marked', capability: 'Markdown rendering' },
  { category: 'Presentation', name: 'react-native-qrcode-svg', capability: 'SVG QR generation' },
  { category: 'Presentation', name: 'react-native-svg', capability: 'Vector graphics and charts' },
  { category: 'Workflow', name: 'react-hook-form', capability: 'Performant form state' },
] as const;
