'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';

import {
  accentThemeStyles,
  themePreferencesService,
} from '@/src/modules/theme/composition/themeModule';
import {
  ThemePreferencesProvider,
  useThemePreferences,
} from '@/src/modules/theme/presentation/ThemePreferencesProvider';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemePreferencesProvider port={themePreferencesService}>
      <ThemeRuntime>{children}</ThemeRuntime>
    </ThemePreferencesProvider>
  );
}

function ThemeRuntime({ children }: { children: ReactNode }) {
  const { accent, appearance } = useThemePreferences();
  const { setColorScheme } = useColorScheme();
  useEffect(() => {
    setColorScheme(appearance);
  }, [appearance, setColorScheme]);

  return (
    <View
      className="min-h-screen flex-1 bg-canvas-light dark:bg-canvas-dark"
      style={accentThemeStyles[accent]}
    >
      {children}
    </View>
  );
}
