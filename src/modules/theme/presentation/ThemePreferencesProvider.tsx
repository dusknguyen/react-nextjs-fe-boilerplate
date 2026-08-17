'use client';

import { createContext, type ReactNode, useContext, useMemo, useSyncExternalStore } from 'react';

import type { ThemePreferences } from '../domain/theme';
import type {
  ThemePreferencesCommandPort,
  ThemePreferencesPort,
} from '../ports/themePreferences';

const ThemePreferencesContext = createContext<ThemePreferencesPort | null>(null);

export function ThemePreferencesProvider({
  children,
  port,
}: {
  children: ReactNode;
  port: ThemePreferencesPort;
}) {
  return <ThemePreferencesContext.Provider value={port}>{children}</ThemePreferencesContext.Provider>;
}

export function useThemePreferencesPort(): ThemePreferencesPort {
  const port = useContext(ThemePreferencesContext);
  if (!port) throw new Error('useThemePreferencesPort must be used inside ThemePreferencesProvider');
  return port;
}

/** Command-only consumers do not subscribe to preference state (ISP). */
export function useThemePreferenceCommands(): ThemePreferencesCommandPort {
  return useThemePreferencesPort();
}

export type ThemePreferencesView = ThemePreferences & ThemePreferencesCommandPort;

function createSelectionReader<T>(
  read: () => ThemePreferences,
  port: ThemePreferencesCommandPort,
  selector: (state: ThemePreferencesView) => T,
) {
  let initialized = false;
  let selected: T;

  return () => {
    const preferences = read();
    const next = selector({
      ...preferences,
      setAccent: port.setAccent,
      setAppearance: port.setAppearance,
    });
    if (!initialized || !Object.is(selected, next)) {
      initialized = true;
      selected = next;
    }
    return selected;
  };
}

/** Selector subscription keeps compatibility facades from rerendering on unrelated updates. */
export function useThemePreferencesSelector<T>(selector: (state: ThemePreferencesView) => T): T {
  const port = useThemePreferencesPort();
  const readers = useMemo(
    () => ({
      client: createSelectionReader(port.getSnapshot, port, selector),
      server: createSelectionReader(port.getServerSnapshot, port, selector),
    }),
    [port, selector],
  );
  return useSyncExternalStore(port.subscribe, readers.client, readers.server);
}

export function useThemePreferences() {
  const port = useThemePreferencesPort();
  const preferences = useSyncExternalStore(port.subscribe, port.getSnapshot, port.getServerSnapshot);
  return {
    ...preferences,
    setAccent: port.setAccent,
    setAppearance: port.setAppearance,
  };
}
