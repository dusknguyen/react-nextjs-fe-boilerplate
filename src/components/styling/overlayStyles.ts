import { StyleSheet } from 'react-native';

/** Runtime styles that keep modal layers visible in native portals and React Native Web. */
export const overlayStyles = StyleSheet.create({
  absoluteFill: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  backdrop: {
    backgroundColor: 'rgba(2, 6, 23, 0.72)',
    flex: 1,
  },
  elevatedSurface: {
    elevation: 16,
  },
  snackbarSurface: {
    backgroundColor: '#0f172a',
    elevation: 12,
  },
});
