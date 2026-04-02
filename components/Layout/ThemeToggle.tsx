'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-between w-full p-2 mb-4 rounded-xl bg-white/5 border border-sidebar-border hover:bg-white/10 transition-all group overflow-hidden"
      aria-label="Toggle Theme"
    >
      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary">
          <AnimatePresence mode="wait">
            {theme === 'dark' ? (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="text-[11px] font-mono font-bold tracking-wider text-zinc-500 group-hover:text-zinc-300">
          {theme.toUpperCase()}_MODE
        </span>
      </div>
      <div className="w-8 h-4 rounded-full bg-zinc-800 border border-white/5 relative p-1">
        <motion.div
          animate={{ x: theme === 'dark' ? 16 : 0 }}
          className="w-2 h-full bg-primary rounded-full shadow-[0_0_4px_rgba(255,255,255,0.3)]"
        />
      </div>
    </button>
  );
}
