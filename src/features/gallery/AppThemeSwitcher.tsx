'use client';

import { useColorScheme } from 'nativewind';

import { ThemeSwitcher } from '@/src/components';
import { accentThemeNames, accentThemes } from '@/src/modules/theme/domain/theme';
import { useThemePreferences } from '@/src/modules/theme/presentation/ThemePreferencesProvider';

const accentOptions = accentThemeNames.map((value) => ({
  description: accentThemes[value].description,
  label: accentThemes[value].label,
  swatchClassName: accentThemes[value].swatchClassName,
  value,
}));

export function AppThemeSwitcher({ className }: { className?: string }) {
  const { accent, appearance, setAccent, setAppearance } = useThemePreferences();
  const { colorScheme } = useColorScheme();

  return <ThemeSwitcher accent={accent} accents={accentOptions} appearance={appearance} className={className} onAccentChange={setAccent} onAppearanceChange={setAppearance} resolvedAppearance={colorScheme ?? 'light'} />;
}
