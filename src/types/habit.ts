export interface Habit {
  id: string;
  name: string;
  category: string;
  target: string;
}

export interface HabitCompletion {
  [habitId: string]: boolean;
}
