'use client';

import type { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { coachDayService } from '@/src/modules/coach/composition/coachModule';
import { CoachDayProvider } from '@/src/modules/coach/presentation/CoachDayProvider';

import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <CoachDayProvider port={coachDayService}>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </CoachDayProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
