import React, { useEffect, useState } from 'react';
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);
  return (
    <button onClick={() => setDark(!dark)} className="p-2 bg-gray-200 dark:bg-slate-700 rounded-full">
      {dark ? 'Light' : 'Dark'}
    </button>
  );
}
