import { Habit } from '@/types/habit';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface HabitCardProps {
  habit: Habit;
  isCompleted: boolean;
  onToggle: (habitId: string) => void;
}

export function HabitCard({ habit, isCompleted, onToggle }: HabitCardProps) {
  return (
    <Card
      className={cn(
        'transition-all duration-200 cursor-pointer hover:shadow-md',
        isCompleted && 'bg-primary/10 border-primary/30'
      )}
      onClick={() => onToggle(habit.id)}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <Checkbox
          checked={isCompleted}
          onCheckedChange={() => onToggle(habit.id)}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              'font-medium text-foreground truncate',
              isCompleted && 'line-through text-muted-foreground'
            )}
          >
            {habit.name}
          </h3>
          <p className="text-sm text-muted-foreground">Target: {habit.target}</p>
        </div>
        <Badge variant="secondary">{habit.category}</Badge>
      </CardContent>
    </Card>
  );
}
