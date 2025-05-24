import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Moon,
  Sun,
  Timer,
  TreePine,
  BarChart2,
  MessageSquare,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
      location.pathname === path
        ? "bg-slate-700 text-white"
        : "text-slate-300 hover:bg-slate-700 hover:text-white"
    }`;

  return (
    <div className="fixed left-0 top-0 h-full w-20 md:w-56 bg-slate-900 p-4 flex flex-col justify-between shadow-xl z-50">
      <div className="space-y-2">
        <div className="text-white text-2xl font-bold text-center mb-4">🌲</div>
        <Link to="/" className={linkClass("/")}>
          <Timer size={20} />
          <span className="hidden md:inline">Timer</span>
        </Link>
        <Link to="/forest" className={linkClass("/forest")}>
          <TreePine size={20} />
          <span className="hidden md:inline">Forest</span>
        </Link>
        <Link to="/stats" className={linkClass("/stats")}>
          <BarChart2 size={20} />
          <span className="hidden md:inline">Stats</span>
        </Link>
        <Link to="/chat" className={linkClass("/chat")}>
          <MessageSquare size={20} />
          <span className="hidden md:inline">AI Chat</span>
        </Link>
      </div>

      <div className="flex justify-center md:justify-end">
        <ThemeToggle
          lightIcon={<Sun size={18} />}
          darkIcon={<Moon size={18} />}
        />
      </div>
    </div>
  );
}
