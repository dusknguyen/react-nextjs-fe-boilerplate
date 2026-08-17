import { createStore } from 'zustand/vanilla';
import { createJSONStorage, persist } from 'zustand/middleware';

import stateStorage from '@/src/shared/infrastructure/storage/stateStorage';

import { initialThemePreferences, type ThemePreferences } from '../domain/theme';
import type { ThemePreferencesRepositoryPort } from '../ports/themePreferences';

const store = createStore<ThemePreferences>()(
  persist(() => initialThemePreferences, {
    name: 'app-theme-v1',
    storage: createJSONStorage(() => stateStorage),
  }),
);

export const zustandThemePreferencesRepository: ThemePreferencesRepositoryPort = {
  getServerSnapshot: store.getInitialState,
  getSnapshot: store.getState,
  subscribe: store.subscribe,
  update: (updater) => store.setState((preferences) => updater(preferences)),
};
