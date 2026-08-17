import type { AccentTheme, AppearanceMode, ThemePreferences } from '../domain/theme';

export interface ThemePreferencesQueryPort {
  getServerSnapshot(): ThemePreferences;
  getSnapshot(): ThemePreferences;
  subscribe(listener: () => void): () => void;
}

export interface ThemePreferencesCommandPort {
  setAccent(accent: AccentTheme): void;
  setAppearance(appearance: AppearanceMode): void;
}

export interface ThemePreferencesRepositoryPort extends ThemePreferencesQueryPort {
  update(updater: (preferences: ThemePreferences) => ThemePreferences): void;
}

export type ThemePreferencesPort = ThemePreferencesQueryPort & ThemePreferencesCommandPort;
