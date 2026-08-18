'use client';

import type { ComponentType, ReactNode } from 'react';
import type { UIComponentRegistry } from '../registry/ComponentRegistry';
import type { UIAdapter } from '../registry/createAdapterRegistry';
import type { UITheme, UIThemeMode } from '../theme/createTheme';
import type { InheritedComponentProps } from '../types';
import { UIProvider } from './UIProvider';

/** Configuration captured by createUIFramework. */
export interface UIFrameworkConfig {
  adapters?: readonly UIAdapter[];
  components?: UIComponentRegistry;
  defaultMode?: UIThemeMode;
  theme?: UITheme;
}

/** Result returned by createUIFramework. */
export interface UIFramework {
  Provider: ComponentType<{ children?: ReactNode }>;
  config: Readonly<UIFrameworkConfig>;
}

type ConfiguredUIProviderProps = InheritedComponentProps<{ children?: ReactNode }>;

/**
 * Creates a configured composition root for an application or white-label product.
 *
 * @deprecated Prefer `createUILibrary` in new code.
 */
export function createUIFramework(config: UIFrameworkConfig = {}): UIFramework {
  const frozenConfig = Object.freeze({ ...config });
  function ConfiguredUIProvider({ children }: ConfiguredUIProviderProps) {
    return (
      <UIProvider
        adapters={frozenConfig.adapters}
        components={frozenConfig.components}
        theme={{ mode: frozenConfig.defaultMode, theme: frozenConfig.theme }}
      >
        {children}
      </UIProvider>
    );
  }
  ConfiguredUIProvider.displayName = 'ConfiguredUIProvider';
  return { Provider: ConfiguredUIProvider, config: frozenConfig };
}
