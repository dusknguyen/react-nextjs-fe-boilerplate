import { selectAccent, selectAppearance } from '../domain/theme';
import type { ThemePreferencesPort, ThemePreferencesRepositoryPort } from '../ports/themePreferences';

export function createThemePreferencesService(
  repository: ThemePreferencesRepositoryPort,
): ThemePreferencesPort {
  return {
    getServerSnapshot: repository.getServerSnapshot,
    getSnapshot: repository.getSnapshot,
    setAccent: (accent) => repository.update((preferences) => selectAccent(preferences, accent)),
    setAppearance: (appearance) =>
      repository.update((preferences) => selectAppearance(preferences, appearance)),
    subscribe: repository.subscribe,
  };
}
