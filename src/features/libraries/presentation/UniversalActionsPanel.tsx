'use client';

import { Image } from 'expo-image';
import { useState } from 'react';
import { Platform, Text, View } from 'react-native';

import { AppButton, SectionHeading, Surface } from '@/src/components';
import { libraryLabService } from '@/src/modules/libraries/composition/libraryModule';
import type { SelectedAsset } from '@/src/modules/libraries/domain/library';

export function UniversalActionsPanel() {
  const [asset, setAsset] = useState<SelectedAsset | null>(null);
  const [message, setMessage] = useState('Choose an action. Permission prompts only run after your tap.');

  async function run(success: string, operation: () => Promise<void>) {
    try {
      await operation();
      setMessage(success);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'The capability is unavailable.');
    }
  }

  return (
    <Surface className="flex-1">
      <SectionHeading
        description="Every action crosses a narrow port. Browser or permission UI is opened only from an explicit user event."
        eyebrow="Platform adapters"
        title="Universal device actions"
      />
      <View className="flex-row flex-wrap gap-2">
        <AppButton onPress={() => void run('Copied the lab URL.', () => libraryLabService.copy('https://reactnative.directory/packages?android=true&web=true'))} size="small">Clipboard</AppButton>
        <AppButton onPress={() => void run('Haptic feedback requested.', () => libraryLabService.pulse())} size="small" variant="secondary">Haptic</AppButton>
        <AppButton onPress={() => { libraryLabService.speak('Universal React Native libraries lab'); setMessage('Speech requested.'); }} size="small" variant="secondary">Speak</AppButton>
        <AppButton onPress={() => void run('Opened React Native Directory.', () => libraryLabService.openDirectory())} size="small" variant="secondary">Open directory</AppButton>
        <AppButton
          onPress={() => void run('Image picker completed.', async () => {
            const selected = await libraryLabService.pickImage();
            if (selected) setAsset(selected);
          })}
          size="small"
          variant="secondary"
        >
          Pick image
        </AppButton>
        <AppButton
          onPress={() => void run('Document picker completed.', async () => {
            const selected = await libraryLabService.pickDocument();
            if (selected) setAsset(selected);
          })}
          size="small"
          variant="secondary"
        >
          Pick document
        </AppButton>
        <AppButton
          onPress={() => void run('Location resolved.', async () => {
            const coordinates = await libraryLabService.locate();
            setMessage(coordinates ? `${coordinates.latitude.toFixed(4)}, ${coordinates.longitude.toFixed(4)}` : 'Location permission was not granted.');
          })}
          size="small"
          variant="secondary"
        >
          Locate
        </AppButton>
        {asset && Platform.OS !== 'web' ? (
          <AppButton onPress={() => void run(`Shared ${asset.name}.`, () => libraryLabService.share(asset))} size="small" variant="secondary">Share file</AppButton>
        ) : null}
      </View>

      <View className="mt-4 rounded-2xl bg-brand-50 p-4 dark:bg-brand-950">
        <Text accessibilityRole="alert" className="text-sm font-semibold leading-5 text-brand-800 dark:text-brand-100">{message}</Text>
      </View>

      {asset ? (
        <View className="mt-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
          {asset.kind === 'image' ? <Image className="h-44 w-full" contentFit="cover" source={{ uri: asset.uri }} transition={200} /> : null}
          <View className="p-4">
            <Text className="font-black text-slate-950 dark:text-white">{asset.name}</Text>
            <Text className="mt-1 text-xs text-slate-500 dark:text-slate-400" numberOfLines={1}>{asset.uri}</Text>
          </View>
        </View>
      ) : null}
    </Surface>
  );
}
