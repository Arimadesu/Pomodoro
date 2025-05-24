import React, { useEffect, useState } from "react";

export default function Forest() {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("forest") || "[]");
    setTrees(saved);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-white mb-6">🌳 Your Forest</h2>
      {trees.length === 0 ? (
        <p className="text-slate-300">
          No trees yet. Start a Pomodoro to grow your forest!
        </p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {trees.map((tree, index) => (
            <img
              key={index}
              src={`/plant-stage${tree.stage || 1}.svg`}
              alt="Tree"
              className="w-16 h-16 transition-transform hover:scale-110"
            />
          ))}
        </div>
      )}
    </div>
  );
}
