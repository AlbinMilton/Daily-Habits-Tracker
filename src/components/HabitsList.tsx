import React from "react";
import type { HabitsListProps } from "../types/index";
import { HabitItem } from "./HabitItem";

export const HabitsList: React.FC<HabitsListProps> = ({
  habits,
  onToggle,
  onDelete,
}) => {
  // Empty state
  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-6xl mb-4">📋</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          No habits yet
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Add some habits to get started on your daily routine.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
