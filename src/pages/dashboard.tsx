import { useState, useMemo } from 'react';
import { useHabits } from '@/context/HabitContext';
import { HabitCard } from '@/components/HabitCard';
import { ProgressBar } from '@/components/ProgressBar';
import { EmptyState } from '@/components/EmptyState';
import { AddHabitDialog } from '@/components/AddHabitDialog';
import { SearchInput } from '@/components/SearchInput';

export default function Dashboard() {
  const { habits, completions, toggleHabit, completedCount, totalCount } = useHabits();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHabits = useMemo(() => {
    if (!searchQuery.trim()) return habits;
    const query = searchQuery.toLowerCase();
    return habits.filter(
      (habit) =>
        habit.name.toLowerCase().includes(query) ||
        habit.category.toLowerCase().includes(query)
    );
  }, [habits, searchQuery]);

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Track your daily habits</p>
        </div>
        <AddHabitDialog />
      </div>

      <ProgressBar completed={completedCount} total={totalCount} />

      <div className="max-w-md">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
      </div>

      {habits.length === 0 ? (
        <EmptyState />
      ) : filteredHabits.length === 0 ? (
        <EmptyState message="No habits match your search." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              isCompleted={!!completions[habit.id]}
              onToggle={toggleHabit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
