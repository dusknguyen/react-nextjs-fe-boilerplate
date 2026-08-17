import { createStore } from 'zustand/vanilla';
import { createJSONStorage, persist } from 'zustand/middleware';

import stateStorage from '@/src/shared/infrastructure/storage/stateStorage';

import { initialCoachDay, type CoachDay } from '../domain/coachDay';
import type { CoachDayRepositoryPort } from '../ports/coachDay';

const store = createStore<CoachDay>()(
  persist(() => initialCoachDay, {
    name: 'coach-day-v1',
    storage: createJSONStorage(() => stateStorage),
  }),
);

export const zustandCoachDayRepository: CoachDayRepositoryPort = {
  getServerSnapshot: store.getInitialState,
  getSnapshot: store.getState,
  subscribe: store.subscribe,
  update: (updater) => store.setState((coachDay) => updater(coachDay)),
};
