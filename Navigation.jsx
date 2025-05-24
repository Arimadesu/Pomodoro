import React from "react";
import { TreePine } from "lucide-react";
import ZenToggle from "./ZenToggle";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2 text-purple-100 dark:text-purple-200 font-bold text-xl">
        <TreePine className="w-6 h-6 text-green-400" />
        <span>Pomodoro Focus</span>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/forest"
          className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-1.5 rounded-full transition"
        >
          🌴 Forest
        </Link>

        <ZenToggle />
        <ThemeToggle />
      </div>
    </div>
  );
}
