import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

import type { ContentSelectionPort } from '../../ports/libraryCapabilities';

/** Expo system-picker implementation of the content selection output port. */
export const expoContentSelection: ContentSelectionPort = {
  async pickDocument() {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: false,
    });
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
    return asset
      ? { kind: 'image', name: asset.fileName ?? 'Selected image', uri: asset.uri }
      : null;
  },
};
