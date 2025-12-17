import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Habit, HabitCompletion } from '@/types/habit';
import { defaultHabits } from '@/data/habits';

interface HabitContextType {
  habits: Habit[];
  completions: HabitCompletion;
  toggleHabit: (habitId: string) => void;
  addHabit: (habit: Habit) => void;
  completedCount: number;
  totalCount: number;
}

const HabitContext = createContext<HabitContextType | null>(null);

const COMPLETIONS_KEY = 'habit-completions';
const HABITS_KEY = 'habit-list';

export function HabitProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const stored = localStorage.getItem(HABITS_KEY);
    return stored ? JSON.parse(stored) : defaultHabits;
  });

  const [completions, setCompletions] = useState<HabitCompletion>(() => {
    const stored = localStorage.getItem(COMPLETIONS_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem(COMPLETIONS_KEY, JSON.stringify(completions));
  }, [completions]);

  const toggleHabit = (habitId: string) => {
    setCompletions((prev) => ({ ...prev, [habitId]: !prev[habitId] }));
  };

  const addHabit = (habit: Habit) => {
    setHabits((prev) => [...prev, habit]);
  };

  const completedCount = Object.values(completions).filter(Boolean).length;

  return (
    <HabitContext.Provider
      value={{ habits, completions, toggleHabit, addHabit, completedCount, totalCount: habits.length }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (!context) throw new Error('useHabits must be used within HabitProvider');
  return context;
}
