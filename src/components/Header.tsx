import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold text-foreground">
            Habit Tracker
          </Link>
          <nav className="flex gap-4">
            <Link
              to="/"
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              Dashboard
            </Link>
            <Link
              to="/habits"
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === '/habits' ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              All Habits
            </Link>
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
