'use client';

import type { ReactNode } from 'react';

import { UIComponentRegistryProvider, type UIComponentRegistry } from '../registry/ComponentRegistry';
import { UIAdapterRegistryProvider } from '../registry/AdapterRegistryProvider';
import type { UIAdapter } from '../registry/createAdapterRegistry';
import { UIThemeProvider, type UIThemeProviderProps } from '../theme/ThemeProvider';
import { UINotificationProvider, type UINotificationProviderProps } from './Notifications';
import { UIPortalProvider } from './Portal';

/** Root configuration for the library provider. */
export interface UIProviderProps {
  adapters?: readonly UIAdapter[];
  children?: ReactNode;
  components?: UIComponentRegistry;
  notifications?: Omit<UINotificationProviderProps, 'children'>;
  theme?: Omit<UIThemeProviderProps, 'children'>;
}

/** Installs theme, component overrides, overlay hosting and notifications in one root provider. */
export function UIProvider({ adapters, children, components, notifications, theme }: UIProviderProps) {
  return (
    <UIThemeProvider {...theme}>
      <UIAdapterRegistryProvider adapters={adapters}>
        <UIComponentRegistryProvider components={components}>
          <UIPortalProvider>
            <UINotificationProvider {...notifications}>{children}</UINotificationProvider>
          </UIPortalProvider>
        </UIComponentRegistryProvider>
      </UIAdapterRegistryProvider>
    </UIThemeProvider>
  );
}
