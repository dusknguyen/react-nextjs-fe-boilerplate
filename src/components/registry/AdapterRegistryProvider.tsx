'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import {
  createAdapterRegistry,
  type UIAdapter,
  type UIAdapterRegistry,
} from './createAdapterRegistry';

const emptyRegistry = createAdapterRegistry();
const AdapterRegistryContext = createContext<UIAdapterRegistry>(emptyRegistry);

/** Props for UIAdapterRegistryProvider. */
export interface UIAdapterRegistryProviderProps {
  adapters?: readonly UIAdapter[];
  children?: ReactNode;
}

/** Provides optional native/service adapters to shared UI through dependency inversion. */
export function UIAdapterRegistryProvider({
  adapters = [],
  children,
}: UIAdapterRegistryProviderProps) {
  const registry = useMemo(() => createAdapterRegistry(adapters), [adapters]);
  return (
    <AdapterRegistryContext.Provider value={registry}>
      {children}
    </AdapterRegistryContext.Provider>
  );
}

/** Reads the current adapter registry. */
export function useUIAdapterRegistry(): UIAdapterRegistry {
  return useContext(AdapterRegistryContext);
}

/** Reads one optional adapter from the current registry. */
export function useUIAdapter<Value = unknown>(capability: string): Value | undefined {
  return useContext(AdapterRegistryContext).get<Value>(capability);
}

/** Reads one required adapter and throws a descriptive error when unavailable. */
export function useRequiredUIAdapter<Value = unknown>(capability: string): Value {
  return useContext(AdapterRegistryContext).require<Value>(capability);
}
