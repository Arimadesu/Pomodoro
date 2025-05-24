// src/components/ZenToggle.jsx
import React from "react";
import { useStore } from "../store/useStore";

export default function ZenToggle() {
  const zen = useStore((state) => state.zen);
  const toggleZen = useStore((state) => state.toggleZen);

  return (
    <button
      onClick={toggleZen}
      className="px-3 py-1 bg-blue-200 dark:bg-blue-700 text-gray-800 dark:text-gray-100 rounded-full transition"
    >
      {zen ? "Exit Zen" : "Zen Mode"}
    </button>
  );
}
