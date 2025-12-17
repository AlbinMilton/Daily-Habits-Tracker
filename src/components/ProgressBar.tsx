import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  completed: number;
  total: number;
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Daily Progress</span>
        <span className="font-medium text-foreground">
          {completed} / {total} habits completed
        </span>
      </div>
      <Progress value={percentage} className="h-3" />
    </div>
  );
}
