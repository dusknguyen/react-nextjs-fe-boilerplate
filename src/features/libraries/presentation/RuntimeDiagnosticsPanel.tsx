'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Text, View } from 'react-native';

import { AppButton, SectionHeading, Surface } from '@/src/components';
import { libraryLabService } from '@/src/modules/libraries/composition/libraryModule';

export function RuntimeDiagnosticsPanel() {
  const diagnostics = useQuery({
    queryKey: ['library-lab', 'runtime-diagnostics'],
    queryFn: () => libraryLabService.readDiagnostics(),
  });

  const snapshot = diagnostics.data;
  const refreshedAt = diagnostics.dataUpdatedAt > 0
    ? format(new Date(diagnostics.dataUpdatedAt), 'PPpp')
    : 'Waiting for the first snapshot';
  const rows = [
    ['Device', snapshot?.deviceName ?? 'Loading...'],
    ['OS', snapshot?.osName ?? 'Loading...'],
    ['Locale', snapshot?.locale ?? 'Loading...'],
    ['Battery', snapshot?.batteryPercent === null || snapshot?.batteryPercent === undefined ? 'Unavailable' : `${snapshot.batteryPercent}%`],
    ['Expo network', snapshot?.networkType ?? 'Loading...'],
    ['NetInfo', snapshot?.connectionType ?? 'Loading...'],
    ['Internet', snapshot?.internetReachable === null || snapshot?.internetReachable === undefined ? 'Unknown' : snapshot.internetReachable ? 'Reachable' : 'Offline'],
    ['Fingerprint', snapshot?.sessionFingerprint ?? 'Loading...'],
  ];

  return (
    <Surface className="flex-1">
      <SectionHeading
        description="TanStack Query caches one diagnostics use case backed by Expo Device, Battery, Network, Localization, Crypto and community NetInfo adapters."
        eyebrow="Async data + cache"
        title="Runtime diagnostics"
      />
      <View className="gap-2 sm:flex-row sm:flex-wrap">
        {rows.map(([label, value]) => (
          <View className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800 sm:w-[48%]" key={label}>
            <Text className="text-xs font-black uppercase tracking-[1px] text-slate-400">{label}</Text>
            <Text className="mt-1 font-bold text-slate-950 dark:text-white">{value}</Text>
          </View>
        ))}
      </View>
      <View className="mt-4 flex-row flex-wrap items-center justify-between gap-3">
        <Text className="text-xs text-slate-500 dark:text-slate-400">Refreshed {refreshedAt}</Text>
        <AppButton loading={diagnostics.isFetching} onPress={() => void diagnostics.refetch()} size="small" variant="secondary">
          Refresh adapters
        </AppButton>
      </View>
      {diagnostics.error ? <Text className="mt-3 text-sm font-semibold text-rose-600">{diagnostics.error.message}</Text> : null}
    </Surface>
  );
}
