import {
  type CoachDashboardView,
  useCoachDashboardSelector,
} from '@/src/modules/coach/presentation/CoachDayProvider';

export type { CoachDay as CoachState, Habit, Mood } from '@/src/modules/coach/domain/coachDay';

/** Compatibility facade. New presentation code should use a module-specific view model. */
export function useCoachStore<T>(selector: (state: CoachDashboardView) => T): T {
  return useCoachDashboardSelector(selector);
}
