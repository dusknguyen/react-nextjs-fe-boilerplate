import {
  type ThemePreferencesView,
  useThemePreferencesSelector,
} from '@/src/modules/theme/presentation/ThemePreferencesProvider';

/** Compatibility facade. New presentation code should use useThemePreferences. */
export function useThemeStore<T>(selector: (state: ThemePreferencesView) => T): T {
  return useThemePreferencesSelector(selector);
}
