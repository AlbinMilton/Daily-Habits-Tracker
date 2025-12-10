import React from "react";
import type { HabitItemProps } from "../types/index";

export const HabitItem: React.FC<HabitItemProps> = ({
  habit,
  onToggle,
  onDelete,
}) => {
  const handleToggle = (): void => {
    onToggle(habit.id);
  };

  const handleDelete = (): void => {
    if (onDelete) {
      onDelete(habit.id);
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
        habit.completed
          ? "border-green-500 bg-green-50 dark:bg-green-950 dark:border-green-700"
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        <input
          type="checkbox"
          checked={habit.completed}
          onChange={handleToggle}
          className="w-6 h-6 cursor-pointer accent-green-500"
          aria-label={`Toggle ${habit.name}`}
        />
        <div className="flex-1">
          <h3
            className={`font-semibold ${
              habit.completed
                ? "line-through text-gray-500 dark:text-gray-400"
                : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {habit.name}
          </h3>
          <div className="flex gap-4 text-sm">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
              {habit.category}
            </span>
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded">
              {habit.target} min
            </span>
          </div>
        </div>
      </div>
      <div className="ml-4 flex items-center gap-2">
        <span
          className={`inline-block px-3 py-1 rounded-full font-semibold ${
            habit.completed
              ? "bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-300"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
          }`}
        >
          {habit.completed ? "✓ Done" : "Pending"}
        </span>
        {onDelete && (
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors ml-2"
            aria-label={`Delete ${habit.name}`}
            title="Delete habit"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
