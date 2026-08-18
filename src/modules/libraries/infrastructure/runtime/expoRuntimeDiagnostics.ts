import NetInfo from '@react-native-community/netinfo';
import * as Battery from 'expo-battery';
import * as Crypto from 'expo-crypto';
import * as Device from 'expo-device';
import * as Localization from 'expo-localization';
import * as Network from 'expo-network';
import { Platform } from 'react-native';

import type { RuntimeDiagnosticsPort } from '../../ports/libraryCapabilities';

async function nullable<T>(operation: () => Promise<T>): Promise<T | null> {
  try {
    return await operation();
  } catch {
    return null;
  }
}

/** Expo/React Native implementation of the runtime diagnostics output port. */
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
