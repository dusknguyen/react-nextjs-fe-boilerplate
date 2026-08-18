'use client';

import { createContext, useContext, useMemo, type ComponentType, type ReactNode } from 'react';

/** Library component override map. */
export type UIComponentRegistry = Readonly<Record<string, ComponentType<any>>>;

const RegistryContext = createContext<UIComponentRegistry>({});

/** Props for UIComponentRegistryProvider. */
export interface UIComponentRegistryProviderProps {
  children?: ReactNode;
  components?: UIComponentRegistry;
}

/** Provides application-specific component implementations without changing library source. */
export function UIComponentRegistryProvider({
  children,
  components = {},
}: UIComponentRegistryProviderProps) {
  const parent = useContext(RegistryContext);
  const value = useMemo(() => ({ ...parent, ...components }), [components, parent]);
  return <RegistryContext.Provider value={value}>{children}</RegistryContext.Provider>;
}

/** Reads a registered component override by key and falls back to the supplied implementation. */
export function useUIComponent<Props>(
  key: string,
  fallback: ComponentType<Props>,
): ComponentType<Props> {
  const registry = useContext(RegistryContext);
  return (registry[key] as ComponentType<Props> | undefined) ?? fallback;
}
