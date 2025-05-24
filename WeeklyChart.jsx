import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { useStore } from "../store/useStore";

export default function WeeklyChart() {
  const weeklyData = useStore((state) => state.weeklyStats);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-1/2 left-0 z-30 -translate-y-1/2 transform">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-purple-500 text-white px-3 py-1 rounded-r-lg shadow-lg focus:outline-none hover:bg-purple-600"
      >
        {isOpen ? "<" : ">"}
      </button>

      <div
        className={`bg-slate-800 text-white p-4 rounded-r-2xl shadow-lg w-[320px] transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h3 className="text-lg font-semibold text-purple-200 mb-2">
          Weekly Focus Summary
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sessions" fill="#c084fc" />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#38bdf8"
              strokeWidth={2}
              dot={{ fill: "#fff", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
