import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";

export default function Timer({ onSessionComplete }) {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [disciplineMode, setDisciplineMode] = useState(false);
  const [reflectionText, setReflectionText] = useState("");
  const [isZenMode, setIsZenMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const ss = s % 60;
    return `${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
  };

  const playSound = () => {
    const audio = new Audio("/success-sound.mp3");
    audio.play();
  };

  const saveHistory = () => {
    const today = new Date().toLocaleDateString();
    const log = JSON.parse(localStorage.getItem("history") || "{}");
    log[today] = (log[today] || 0) + 1;
    localStorage.setItem("history", JSON.stringify(log));
  };

  const plantTree = () => {
    const forest = JSON.parse(localStorage.getItem("forest") || "[]");
    forest.push({ stage: 1 });
    localStorage.setItem("forest", JSON.stringify(forest));
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setProgress(100);
            setShowSuggestion(true);
            setShowConfetti(true);
            playSound();
            saveHistory();
            plantTree();
            if (onSessionComplete) onSessionComplete();
            setTimeout(() => setShowConfetti(false), 3000);
            setShowReflection(true);
            return 0;
          }
          const newProgress = Math.floor(100 - ((prev - 1) / (25 * 60)) * 100);
          setProgress(newProgress);
          return prev - 1;
        });
      }, 1000);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setSeconds(25 * 60);
    setIsRunning(false);
    setProgress(0);
    setShowSuggestion(false);
    setShowConfetti(false);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  let stage = 1;
  if (progress >= 75) stage = 4;
  else if (progress >= 50) stage = 3;
  else if (progress >= 25) stage = 2;

  return (
    <div className="relative w-full max-w-md mx-auto bg-slate-800 rounded-3xl p-6 text-center shadow-xl">
      {showConfetti && <Confetti />}

      <button
        className="absolute top-4 left-6 text-sm text-green-400 hover:underline"
        onClick={() => setDisciplineMode(!disciplineMode)}
      >
        {disciplineMode ? "Discipline: ON" : "Discipline: OFF"}
      </button>

      <button
        className="absolute top-4 right-6 text-sm text-purple-400 hover:underline"
        onClick={() => setIsZenMode(!isZenMode)}
      >
        {isZenMode ? "Exit Zen" : "Zen Mode"}
      </button>

      <h2 className="text-lg font-semibold text-purple-300 mb-4">Pomodoro</h2>

      <div className="w-60 h-60 rounded-full border-[14px] border-purple-300 mx-auto flex items-center justify-center text-4xl font-bold text-purple-800 bg-slate-900">
        {formatTime(seconds)}
      </div>

      {!isZenMode && (
        <div className="flex flex-col items-center gap-4 mt-6">
          <p className="text-white font-medium">Focus Session</p>
          <button
            onClick={!disciplineMode || !isRunning ? startTimer : undefined}
            disabled={disciplineMode && isRunning}
            className="bg-purple-500 hover:bg-purple-400 text-white font-semibold px-6 py-2 rounded-full transition"
          >
            {isRunning ? "Running..." : "Start"}
          </button>

          {!disciplineMode && (
            <button
              onClick={resetTimer}
              className="text-sm text-slate-400 hover:underline mt-1"
            >
              Reset
            </button>
          )}

          <img
            src={`/plant-stage${stage}.svg`}
            alt="Plant Growth"
            className="h-20 transition-all duration-500 animate-grow"
          />
          <div className="text-sm text-slate-300">
            Growth: {progress}%<br />
            <span className="text-green-400 italic">
              {progress >= 100
                ? "Tree fully grown!"
                : "Your seed is sprouting..."}
            </span>
          </div>
        </div>
      )}

      {showSuggestion && (
        <div className="fixed bottom-6 right-6 bg-slate-800 text-white p-4 rounded-xl shadow-lg max-w-xs z-50">
          <p className="mb-2">🎉 Great job! Want a tip for next session?</p>
          <button
            onClick={() => setShowSuggestion(false)}
            className="bg-purple-500 hover:bg-purple-400 px-4 py-2 rounded-xl"
          >
            Show Tip
          </button>
        </div>
      )}
    </div>
  );
}
