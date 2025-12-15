// TypeScript interfaces for the Daily Habits Tracker

export interface Habit {
  id: string;
  name: string;
  category: string;
  target: number;
  completed: boolean;
}

export interface HabitsState {
  habits: Habit[];
}

export type HabitsAction =
  | { type: "TOGGLE_HABIT"; payload: string }
  | { type: "RESET_HABITS" }
  | { type: "ADD_HABIT"; payload: Omit<Habit, "id" | "completed"> }
  | { type: "DELETE_HABIT"; payload: string };

export interface HabitItemProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
}

export interface HabitsListProps {
  habits: Habit[];
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
}
