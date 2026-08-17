import { vars } from 'nativewind';

import { accentThemes, type AccentTheme } from '../domain/theme';

export const accentThemeStyles = Object.fromEntries(
  Object.entries(accentThemes).map(([name, theme]) => [name, vars(theme.variables)]),
) as Record<AccentTheme, ReturnType<typeof vars>>;
