import * as Sharing from 'expo-sharing';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

import type { ExternalActionPort } from '../../ports/libraryCapabilities';

/** Expo implementation of browser and native sharing output ports. */
export const expoExternalActions: ExternalActionPort = {
  canShare: () => Sharing.isAvailableAsync(),
  async open(url) {
    await WebBrowser.openBrowserAsync(url);
  },
  async share(asset) {
    if (Platform.OS === 'web') {
      throw new Error('Local file sharing is not supported on web.');
    }
    await Sharing.shareAsync(asset.uri, { dialogTitle: `Share ${asset.name}` });
  },
};
