import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const COLORS = ["#a855f7", "#38bdf8"];

export default function Stats() {
  const [weeklyData, setWeeklyData] = useState([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [reflections, setReflections] = useState([]);

  useEffect(() => {
    const log = JSON.parse(localStorage.getItem("history") || "{}");
    const today = new Date();
    const weekData = [];
    let total = 0;

    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() - today.getDay() + 1 + i); // start from Mon
      const key = day.toLocaleDateString();
      const count = log[key] || 0;
      weekData.push({
        name: days[i],
        sessions: count,
      });
      total += count;
    }

    setWeeklyData(weekData);
    setTotalSessions(total);

    const savedReflections = JSON.parse(
      localStorage.getItem("reflections") || "[]"
    );
    setReflections(savedReflections);
  }, []);

  const pieData = [
    { name: "Focus Time", value: totalSessions * 25 },
    { name: "Break Time", value: totalSessions * 5 },
  ];

  const totalHours = ((totalSessions * 25) / 60).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-800 rounded-2xl shadow-xl space-y-8">
      <h2 className="text-2xl font-bold text-white text-center">
        📊 Weekly Focus Stats
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis allowDecimals={false} stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="sessions" fill="#a855f7" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-white mb-1">
            ⏱️ Total Focus Time
          </h3>
          <p className="text-green-400 text-lg">{totalHours} hours</p>
        </div>

        <ResponsiveContainer width={250} height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
