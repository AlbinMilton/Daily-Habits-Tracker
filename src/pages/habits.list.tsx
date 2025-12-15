import React, { useState, useMemo } from "react";
import { useHabits } from "../context/HabitsContext";
import { HabitsList } from "../components/HabitsList";
import { AddHabitForm } from "../components/AddHabitForm";
import type { Habit } from "../types/index";

type FilterType = "all" | "completed" | "pending";
type SortType = "name" | "category" | "target";

export const HabitsListPage: React.FC = () => {
  const { state, dispatch } = useHabits();
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("name");

  // Derived state: filtered and sorted habits
  const filteredAndSortedHabits = useMemo(() => {
    let filtered: Habit[] = state.habits;

    // Apply filter
    if (filter === "completed") {
      filtered = filtered.filter((h) => h.completed);
    } else if (filter === "pending") {
      filtered = filtered.filter((h) => !h.completed);
    }

    // Apply sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "category") {
        return a.category.localeCompare(b.category);
      } else if (sortBy === "target") {
        return a.target - b.target;
      }
      return 0;
    });

    return sorted;
  }, [state.habits, filter, sortBy]);

  const handleToggleHabit = (id: string): void => {
    dispatch({ type: "TOGGLE_HABIT", payload: id });
  };

  const handleAddHabit = (habit: Omit<Habit, "id" | "completed">): void => {
    dispatch({ type: "ADD_HABIT", payload: habit });
  };

  const handleDeleteHabit = (id: string): void => {
    dispatch({ type: "DELETE_HABIT", payload: id });
  };

  const completedCount = state.habits.filter((h) => h.completed).length;
  const pendingCount = state.habits.filter((h) => !h.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            All Habits
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage all your habits
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {state.habits.length}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Total Habits
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border dark:border-gray-700">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {completedCount}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Completed
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border dark:border-gray-700">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
              {pendingCount}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Pending</p>
          </div>
        </div>

        {/* Add Habit Form */}
        <AddHabitForm onAdd={handleAddHabit} />

        {/* Filter and Sort Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 border dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Filter:
              </label>
              <div className="flex gap-2 flex-wrap">
                {(["all", "completed", "pending"] as const).map(
                  (filterType) => (
                    <button
                      key={filterType}
                      onClick={() => setFilter(filterType)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        filter === filterType
                          ? "bg-indigo-600 dark:bg-indigo-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                      aria-pressed={filter === filterType}
                    >
                      {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortType)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
              >
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="target">Target (minutes)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Habits List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 border dark:border-gray-700">
          <HabitsList
            habits={filteredAndSortedHabits}
            onToggle={handleToggleHabit}
            onDelete={handleDeleteHabit}
          />
        </div>
      </div>
    </div>
  );
};
