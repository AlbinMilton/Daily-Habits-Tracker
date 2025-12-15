import React, { useEffect, useState } from "react";
import { useHabits } from "../context/HabitsContext";
import { HabitsList } from "../components/HabitsList";
import { AddHabitForm } from "../components/AddHabitForm";
import type { Habit } from "../types/index";

export const Dashboard: React.FC = () => {
  const { state, dispatch, completedCount, totalCount } = useHabits();
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  // Derived state: calculate progress percentage
  useEffect(() => {
    if (totalCount === 0) {
      setProgressPercentage(0);
    } else {
      setProgressPercentage(Math.round((completedCount / totalCount) * 100));
    }
  }, [completedCount, totalCount]);

  const handleToggleHabit = (id: string): void => {
    dispatch({ type: "TOGGLE_HABIT", payload: id });
  };

  const handleAddHabit = (habit: Omit<Habit, "id" | "completed">): void => {
    dispatch({ type: "ADD_HABIT", payload: habit });
  };

  const handleDeleteHabit = (id: string): void => {
    dispatch({ type: "DELETE_HABIT", payload: id });
  };

  const handleResetHabits = (): void => {
    dispatch({ type: "RESET_HABITS" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Daily Habits
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your daily habits and stay consistent
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Today's Progress
            </h2>
            <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {completedCount} / {totalCount}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 h-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
            {progressPercentage}% complete · {totalCount - completedCount}{" "}
            remaining
          </p>
        </div>

        {/* Add Habit Form */}
        <AddHabitForm onAdd={handleAddHabit} />

        {/* Habits List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border dark:border-gray-700">
          <HabitsList
            habits={state.habits}
            onToggle={handleToggleHabit}
            onDelete={handleDeleteHabit}
          />
        </div>

        {/* Reset Button */}
        {completedCount > 0 && (
          <div className="flex justify-center">
            <button
              onClick={handleResetHabits}
              className="px-6 py-3 bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
              aria-label="Reset all habits"
            >
              Reset All Habits
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
