import { useState, useMemo } from 'react';
import { useHabits } from '@/context/HabitContext';
import { HabitCard } from '@/components/HabitCard';
import { EmptyState } from '@/components/EmptyState';
import { AddHabitDialog } from '@/components/AddHabitDialog';
import { SearchInput } from '@/components/SearchInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Habits() {
  const { habits, completions, toggleHabit } = useHabits();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(habits.map((h) => h.category))];
    return uniqueCategories.sort();
  }, [habits]);

  const filteredAndSortedHabits = useMemo(() => {
    let result = habits;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (habit) =>
          habit.name.toLowerCase().includes(query) ||
          habit.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter((habit) => habit.category === categoryFilter);
    }

    // Sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'completed':
          const aCompleted = completions[a.id] ? 1 : 0;
          const bCompleted = completions[b.id] ? 1 : 0;
          return bCompleted - aCompleted;
        default:
          return 0;
      }
    });

    return result;
  }, [habits, searchQuery, categoryFilter, sortBy, completions]);

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Habits</h1>
          <p className="text-muted-foreground">
            {habits.length} {habits.length === 1 ? 'habit' : 'habits'} total
          </p>
        </div>
        <AddHabitDialog />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-md">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {habits.length === 0 ? (
        <EmptyState />
      ) : filteredAndSortedHabits.length === 0 ? (
        <EmptyState message="No habits match your filters." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedHabits.map((habit) => (
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
