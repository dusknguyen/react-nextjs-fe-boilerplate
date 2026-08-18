import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';

import type { DeviceFeedbackPort } from '../../ports/libraryCapabilities';

/** Expo implementation of clipboard, haptic and speech feedback capabilities. */
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
