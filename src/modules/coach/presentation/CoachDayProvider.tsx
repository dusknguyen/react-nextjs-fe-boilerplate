'use client';

import { createContext, type ReactNode, useContext, useMemo, useSyncExternalStore } from 'react';

import { getCoachDayMetrics, type CoachDay } from '../domain/coachDay';
import type { CoachDayCommandPort, CoachDayPort } from '../ports/coachDay';

const CoachDayContext = createContext<CoachDayPort | null>(null);

export function CoachDayProvider({
  children,
  port,
}: {
  children: ReactNode;
  port: CoachDayPort;
}) {
  return <CoachDayContext.Provider value={port}>{children}</CoachDayContext.Provider>;
}

export function useCoachDayPort(): CoachDayPort {
  const port = useContext(CoachDayContext);
  if (!port) throw new Error('useCoachDayPort must be used inside CoachDayProvider');
  return port;
}

export function useCoachDashboardModel() {
  const port = useCoachDayPort();
  const coachDay = useSyncExternalStore(port.subscribe, port.getSnapshot, port.getServerSnapshot);
  const metrics = useMemo(() => getCoachDayMetrics(coachDay), [coachDay]);

  return {
    ...coachDay,
    ...metrics,
    setMood: port.chooseMood,
    toggleHabit: port.toggleHabit,
  };
}

type CoachDashboardActions = {
  setMood: CoachDayCommandPort['chooseMood'];
  toggleHabit: CoachDayCommandPort['toggleHabit'];
};

export type CoachDashboardView = CoachDay & ReturnType<typeof getCoachDayMetrics> & CoachDashboardActions;

function createCoachSelectionReader<T>(
  read: () => CoachDay,
  port: CoachDayCommandPort,
  selector: (state: CoachDashboardView) => T,
) {
  let cachedSnapshot: CoachDay | undefined;
  let cachedView: CoachDashboardView | undefined;
  let initialized = false;
  let selected: T;

  return () => {
    const snapshot = read();
    if (snapshot !== cachedSnapshot || !cachedView) {
      cachedSnapshot = snapshot;
      cachedView = {
        ...snapshot,
        ...getCoachDayMetrics(snapshot),
        setMood: port.chooseMood,
        toggleHabit: port.toggleHabit,
      };
    }
    const next = selector(cachedView);
    if (!initialized || !Object.is(selected, next)) {
      initialized = true;
      selected = next;
    }
    return selected;
  };
}

export function useCoachDashboardSelector<T>(selector: (state: CoachDashboardView) => T): T {
  const port = useCoachDayPort();
  const readers = useMemo(
    () => ({
      client: createCoachSelectionReader(port.getSnapshot, port, selector),
      server: createCoachSelectionReader(port.getServerSnapshot, port, selector),
    }),
    [port, selector],
  );
  return useSyncExternalStore(port.subscribe, readers.client, readers.server);
}
