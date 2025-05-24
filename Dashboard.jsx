import React from "react";
import Timer from "./Timer";
import AIChat from "./AIChat";
import WeeklyChart from "./WeeklyChart";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 py-8 lg:flex-row lg:items-start bg-gradient-to-b from-[#2c3e50] to-[#34495e] min-h-screen">
      {/* Left Column: Pomodoro + WeeklyChart */}
      <div className="flex flex-col items-center gap-6 w-full max-w-md backdrop-blur-md bg-white/10 rounded-3xl p-4 shadow-lg">
        <Timer />
        <WeeklyChart />
      </div>

      {/* Right Column: AI Chat */}
      <div className="w-full max-w-sm backdrop-blur-md bg-white/10 rounded-3xl p-4 shadow-lg">
        <AIChat />
      </div>
    </div>
  );
}
