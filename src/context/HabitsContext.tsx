import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { Habit, HabitsState, HabitsAction } from "../types/index";

// Hardcoded initial habits
const INITIAL_HABITS: Habit[] = [
  {
    id: "1",
    name: "Morning Exercise",
    category: "Health",
    target: 30,
    completed: false,
  },
  {
    id: "2",
    name: "Read Book",
    category: "Learning",
    target: 20,
    completed: false,
  },
  {
    id: "3",
    name: "Meditation",
    category: "Mindfulness",
    target: 10,
    completed: true,
  },
  {
    id: "4",
    name: "Drink Water",
    category: "Health",
    target: 8,
    completed: true,
  },
  {
    id: "5",
    name: "Code Practice",
    category: "Learning",
    target: 60,
    completed: false,
  },
];

interface HabitsContextType {
  state: HabitsState;
  dispatch: React.Dispatch<HabitsAction>;
  completedCount: number;
  totalCount: number;
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

const habitsReducer = (
  state: HabitsState,
  action: HabitsAction
): HabitsState => {
  switch (action.type) {
    case "TOGGLE_HABIT":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.payload
            ? { ...habit, completed: !habit.completed }
            : habit
        ),
      };
    case "RESET_HABITS":
      return {
        ...state,
        habits: state.habits.map((habit) => ({ ...habit, completed: false })),
      };
    case "ADD_HABIT":
      return {
        ...state,
        habits: [
          ...state.habits,
          {
            id: Date.now().toString(),
            ...action.payload,
            completed: false,
          },
        ],
      };
    case "DELETE_HABIT":
      return {
        ...state,
        habits: state.habits.filter((habit) => habit.id !== action.payload),
      };
    default:
      return state;
  }
};

interface HabitsProviderProps {
  children: ReactNode;
}

export const HabitsProvider: React.FC<HabitsProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(habitsReducer, {
    habits: INITIAL_HABITS,
  });

  const completedCount = state.habits.filter((habit) => habit.completed).length;
  const totalCount = state.habits.length;

  const value: HabitsContextType = {
    state,
    dispatch,
    completedCount,
    totalCount,
  };

  return (
    <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>
  );
};

export const useHabits = (): HabitsContextType => {
  const context = useContext(HabitsContext);
  if (context === undefined) {
    throw new Error("useHabits must be used within a HabitsProvider");
  }
  return context;
};
