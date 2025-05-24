import React, { useEffect, useState } from "react";
import allAchievements from "./achievements";

export default function Achievements() {
  const [earned, setEarned] = useState([]);

  useEffect(() => {
    const sessions = JSON.parse(localStorage.getItem("history") || "{}");
    const totalSessions = Object.values(sessions).reduce((a, b) => a + b, 0);
    const trees = JSON.parse(localStorage.getItem("forest") || "[]");
    const reflections = JSON.parse(localStorage.getItem("reflections") || "[]");

    const stats = {
      totalSessions,
      totalTrees: trees.length,
      totalReflections: reflections.length,
    };

    const unlocked = allAchievements
      .filter((ach) => ach.condition(stats))
      .map((a) => a.id);
    setEarned(unlocked);
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-800 rounded-xl shadow-lg text-white text-center">
      <h2 className="text-2xl font-bold mb-4">🏆 Achievements</h2>
      <ul className="grid grid-cols-2 gap-4">
        {allAchievements.map((ach, idx) => {
          const unlocked = earned.includes(ach.id);
          return (
            <li
              key={idx}
              className={`py-3 px-2 rounded-xl text-lg transition-all duration-300 ${
                unlocked
                  ? "bg-slate-700 text-white"
                  : "bg-slate-600 text-slate-400 opacity-50"
              }`}
            >
              {ach.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
