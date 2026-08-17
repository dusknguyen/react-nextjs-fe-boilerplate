export type Mood = 'low' | 'calm' | 'good' | 'great';

export type Habit = {
  completed: boolean;
  detail: string;
  id: string;
  title: string;
};

export type CoachDay = {
  habits: Habit[];
  mood: Mood | null;
  streak: number;
};

export const initialCoachDay: CoachDay = {
  habits: [
    { id: 'move', title: 'Move your body', detail: '20 minute walk', completed: true },
    { id: 'focus', title: 'Deep focus', detail: 'One 45 minute session', completed: false },
    { id: 'reflect', title: 'Evening reflection', detail: 'Write three honest lines', completed: false },
  ],
  mood: null,
  streak: 7,
};

export function chooseMood(coachDay: CoachDay, mood: Mood): CoachDay {
  return { ...coachDay, mood };
}

export function toggleHabitCompletion(coachDay: CoachDay, habitId: string): CoachDay {
  return {
    ...coachDay,
    habits: coachDay.habits.map((habit) =>
      habit.id === habitId ? { ...habit, completed: !habit.completed } : habit,
    ),
  };
}

export function getCoachDayMetrics(coachDay: CoachDay) {
  const completed = coachDay.habits.filter((habit) => habit.completed).length;
  const progress = coachDay.habits.length === 0 ? 0 : Math.round((completed / coachDay.habits.length) * 100);
  return { completed, progress };
}
