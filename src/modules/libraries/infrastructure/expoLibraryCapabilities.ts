import NetInfo from '@react-native-community/netinfo';
import * as Battery from 'expo-battery';
import * as Clipboard from 'expo-clipboard';
import * as Crypto from 'expo-crypto';
import * as Device from 'expo-device';
import * as DocumentPicker from 'expo-document-picker';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import * as Localization from 'expo-localization';
import * as Location from 'expo-location';
import * as Network from 'expo-network';
import * as Sharing from 'expo-sharing';
import * as Speech from 'expo-speech';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

import type {
  ContentSelectionPort,
  DeviceFeedbackPort,
  ExternalActionPort,
  LocationPort,
  RuntimeDiagnosticsPort,
} from '../ports/libraryCapabilities';

async function nullable<T>(operation: () => Promise<T>): Promise<T | null> {
  try {
    return await operation();
  } catch {
    return null;
  }
}

export const expoRuntimeDiagnostics: RuntimeDiagnosticsPort = {
  async read() {
    const [battery, expoNetwork, communityNetwork, fingerprint] = await Promise.all([
      nullable(() => Battery.getBatteryLevelAsync()),
      nullable(() => Network.getNetworkStateAsync()),
      nullable(() => NetInfo.fetch()),
      Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        `${Platform.OS}:${Device.modelName ?? 'unknown'}:${Localization.getLocales()[0]?.languageTag ?? 'unknown'}`,
      ),
    ]);

    return {
      batteryPercent: battery === null || battery < 0 ? null : Math.round(battery * 100),
      connectionType: communityNetwork?.type ?? 'unknown',
      deviceName: Device.deviceName ?? Device.modelName ?? 'Browser or simulator',
      internetReachable: communityNetwork?.isInternetReachable ?? expoNetwork?.isInternetReachable ?? null,
      locale: Localization.getLocales()[0]?.languageTag ?? 'unknown',
      networkType: expoNetwork?.type ?? 'UNKNOWN',
      osName: Device.osName ?? Platform.OS,
      sessionFingerprint: fingerprint.slice(0, 12),
    };
  },
};

export const expoContentSelection: ContentSelectionPort = {
  async pickDocument() {
    const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true, multiple: false });
    const asset = result.assets?.[0];
    return asset ? { kind: 'document', name: asset.name, uri: asset.uri } : null;
  },
  async pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      mediaTypes: ['images'],
      quality: 0.8,
    });
    const asset = result.assets?.[0];
    return asset ? { kind: 'image', name: asset.fileName ?? 'Selected image', uri: asset.uri } : null;
  },
};

export const expoDeviceFeedback: DeviceFeedbackPort = {
  async copy(text) {
    await Clipboard.setStringAsync(text);
  },
  async pulse() {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },
  speak(text) {
    Speech.speak(text, { language: 'en-US', pitch: 1, rate: 0.95 });
  },
};

export const expoLocation: LocationPort = {
  async locate() {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (!permission.granted) return null;
    const result = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
    return { latitude: result.coords.latitude, longitude: result.coords.longitude };
  },
};

export const expoExternalActions: ExternalActionPort = {
  canShare: () => Sharing.isAvailableAsync(),
  async open(url) {
    await WebBrowser.openBrowserAsync(url);
  },
  async share(asset) {
    if (Platform.OS === 'web') throw new Error('Local file sharing is not supported on web.');
    await Sharing.shareAsync(asset.uri, { dialogTitle: `Share ${asset.name}` });
  },
};
