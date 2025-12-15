import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { HabitsProvider } from "./context/HabitsContext";
import { Dashboard } from "./pages/dashboard";
import { HabitsListPage } from "./pages/habits.list";
import "./App.css";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Check system preference and update on change
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <Router>
      <HabitsProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
          {/* Navigation */}
          <nav className="bg-white dark:bg-gray-900 shadow-md border-b dark:border-gray-800">
            <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                📊 Habits Tracker
              </h1>
              <div className="flex gap-6 items-center">
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/habits"
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                >
                  All Habits
                </Link>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-lg"
                  aria-label="Toggle dark mode"
                  title={
                    isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                >
                  {isDarkMode ? "☀️" : "🌙"}
                </button>
              </div>
            </div>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/habits" element={<HabitsListPage />} />
          </Routes>
        </div>
      </HabitsProvider>
    </Router>
  );
};

export default App;
