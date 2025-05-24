import React, { useState } from "react";
import { useStore } from "../store/useStore";

export default function PresetSelector({ onSelect }) {
  const presets = useStore((s) => s.presets);
  const addPreset = useStore((s) => s.addPreset);
  const removePreset = useStore((s) => s.removePreset);
  const [custom, setCustom] = useState({ name: "", focus: "", rest: "" });

  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">Preset Times:</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {presets.map((p) => (
          <div
            key={p.name}
            className="flex items-center space-x-1 bg-gray-200 dark:bg-slate-700 px-2 py-1 rounded"
          >
            <button
              onClick={() => onSelect(p.focus * 60, p.rest * 60)}
              className="font-semibold"
            >
              {p.name}
            </button>
            <button
              onClick={() => removePreset(p.name)}
              className="text-red-500 hover:text-red-700 ml-1"
              title="Delete preset"
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <div className="flex space-x-2 items-center">
        <input
          type="text"
          placeholder="Label"
          value={custom.name}
          onChange={(e) => setCustom((c) => ({ ...c, name: e.target.value }))}
          className="w-20 p-1 border rounded"
        />
        <input
          type="number"
          placeholder="F(min)"
          value={custom.focus}
          onChange={(e) => setCustom((c) => ({ ...c, focus: e.target.value }))}
          className="w-16 p-1 border rounded"
        />
        <input
          type="number"
          placeholder="B(min)"
          value={custom.rest}
          onChange={(e) => setCustom((c) => ({ ...c, rest: e.target.value }))}
          className="w-16 p-1 border rounded"
        />
        <button
          onClick={() => {
            if (custom.name && custom.focus > 0 && custom.rest >= 0) {
              addPreset(custom.name, +custom.focus, +custom.rest);
              setCustom({ name: "", focus: "", rest: "" });
            }
          }}
          className="px-3 py-1 bg-green-300 rounded"
        >
          + Add
        </button>
      </div>
    </div>
  );
}
