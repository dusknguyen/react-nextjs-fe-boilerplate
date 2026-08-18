'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { StyleSheet, View } from 'react-native';

interface PortalEntry {
  id: number;
  node: ReactNode;
}

interface PortalContextValue {
  mount: (id: number, node: ReactNode) => void;
  unmount: (id: number) => void;
}

const PortalContext = createContext<PortalContextValue | null>(null);
let nextPortalId = 1;

/** Props for UIPortalProvider. */
export interface UIPortalProviderProps {
  children?: ReactNode;
}

/** Hosts library overlays at the top of the current React Native root without external portal dependencies. */
export function UIPortalProvider({ children }: UIPortalProviderProps) {
  const [entries, setEntries] = useState<PortalEntry[]>([]);
  const mount = useCallback((id: number, node: ReactNode) => {
    setEntries((current) => [...current.filter((entry) => entry.id !== id), { id, node }]);
  }, []);
  const unmount = useCallback((id: number) => {
    setEntries((current) => current.filter((entry) => entry.id !== id));
  }, []);
  const value = useMemo(() => ({ mount, unmount }), [mount, unmount]);

  return (
    <PortalContext.Provider value={value}>
      <View style={styles.root}>
        {children}
        <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
          {entries.map((entry) => <View key={entry.id} pointerEvents="box-none" style={StyleSheet.absoluteFill}>{entry.node}</View>)}
        </View>
      </View>
    </PortalContext.Provider>
  );
}

/** Props for UIPortal. */
export interface UIPortalProps {
  children?: ReactNode;
}

/** Renders content into the nearest UIPortalProvider overlay host. */
export function UIPortal({ children }: UIPortalProps) {
  const portal = useContext(PortalContext);
  const idRef = useRef<number | null>(null);
  if (idRef.current === null) idRef.current = nextPortalId++;

  useEffect(() => {
    if (!portal) return undefined;
    const id = idRef.current as number;
    portal.mount(id, children);
    return () => portal.unmount(id);
  }, [children, portal]);

  return portal ? null : <>{children}</>;
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
