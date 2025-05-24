import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Timer from "./components/Timer";
import Stats from "./components/Stats";
import Forest from "./components/Forest";
import AIChat from "./components/AIChat";

export default function App() {
  const [showAIChat, setShowAIChat] = useState(false);

  const handleSessionComplete = () => {
    setShowAIChat(true);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 ml-20 md:ml-56 p-6">
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center gap-6">
                <h1 className="text-3xl font-bold text-center">
                  🌲 Pomodoro Forest
                </h1>
                <Timer onSessionComplete={handleSessionComplete} />
              </div>
            }
          />
          <Route path="/stats" element={<Stats />} />
          <Route path="/forest" element={<Forest />} />
          <Route path="/chat" element={<AIChat triggerOpen={true} />} />
        </Routes>
      </main>
      <AIChat triggerOpen={showAIChat} />
    </div>
  );
}
