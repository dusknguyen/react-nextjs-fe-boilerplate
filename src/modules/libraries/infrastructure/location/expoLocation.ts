import * as Location from 'expo-location';

import type { LocationPort } from '../../ports/libraryCapabilities';

/** Permission-aware Expo implementation of the location output port. */
export const expoLocation: LocationPort = {
  async locate() {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (!permission.granted) return null;

    const result = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    return {
      latitude: result.coords.latitude,
      longitude: result.coords.longitude,
    };
  },
};
