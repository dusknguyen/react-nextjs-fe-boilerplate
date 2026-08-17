import type { CoachDay, Mood } from '../domain/coachDay';

export interface CoachDayQueryPort {
  getServerSnapshot(): CoachDay;
  getSnapshot(): CoachDay;
  subscribe(listener: () => void): () => void;
}

export interface CoachDayCommandPort {
  chooseMood(mood: Mood): void;
  toggleHabit(habitId: string): void;
}

export interface CoachDayRepositoryPort extends CoachDayQueryPort {
  update(updater: (coachDay: CoachDay) => CoachDay): void;
}

export type CoachDayPort = CoachDayQueryPort & CoachDayCommandPort;
