import { create } from "zustand";

const todayKey = () => {
  const now = new Date();
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][now.getDay()];
};

const loadHistory = () => {
  const stored = localStorage.getItem("pomodoroHistory");
  return stored ? JSON.parse(stored) : {};
};

const saveHistory = (history) => {
  localStorage.setItem("pomodoroHistory", JSON.stringify(history));
};

export const useStore = create((set, get) => ({
  zen: false,
  dark: false,
  history: loadHistory(),

  toggleDark: () => set((state) => ({ dark: !state.dark })),
  setDark: (value) => set(() => ({ dark: value })),

  toggleZen: () => set((state) => ({ zen: !state.zen })),

  incrementTodaySession: () => {
    const key = todayKey();
    const history = { ...get().history };
    history[key] = (history[key] || 0) + 1;
    saveHistory(history);
    set({ history });
  },

  resetHistory: () => {
    localStorage.removeItem("pomodoroHistory");
    set({ history: {} });
  },
}));
