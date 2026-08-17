import { chooseMood, toggleHabitCompletion } from '../domain/coachDay';
import type { CoachDayPort, CoachDayRepositoryPort } from '../ports/coachDay';

export function createCoachDayService(repository: CoachDayRepositoryPort): CoachDayPort {
  return {
    chooseMood: (mood) => repository.update((coachDay) => chooseMood(coachDay, mood)),
    getServerSnapshot: repository.getServerSnapshot,
    getSnapshot: repository.getSnapshot,
    subscribe: repository.subscribe,
    toggleHabit: (habitId) => repository.update((coachDay) => toggleHabitCompletion(coachDay, habitId)),
  };
}
