'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Box, Database, Cpu, Layers, GitMerge, ChevronRight, Terminal } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SidebarItem {
  title: string;
  href?: string;
  items?: SidebarItem[];
}

export function Sidebar({ items }: { items: SidebarItem[] }) {
  const pathname = usePathname();

  function getIcon(title: string) {
    const t = title.toLowerCase();
    if (t.includes('architecture')) return <Layers className="w-3.5 h-3.5" />;
    if (t.includes('foundation')) return <Box className="w-3.5 h-3.5" />;
    if (t.includes('domain')) return <Database className="w-3.5 h-3.5" />;
    if (t.includes('graveyard')) return <GitMerge className="w-3.5 h-3.5" />;
    return <Terminal className="w-3.5 h-3.5" />;
  }

  function renderItems(list: SidebarItem[], depth = 0) {
    return (
      <ul className={cn("space-y-0.5", depth > 0 ? "pl-3 ml-2 border-l border-white/5 mt-1" : "mt-2")}>
        {list.map((item, idx) => {
          const isActive = pathname === item.href;
          
          return (
            <li key={idx}>
              {item.href ? (
                <Link 
                  href={item.href} 
                  className={cn(
                    "group flex items-center gap-2 text-[12px] py-1.5 px-3 rounded-md transition-all duration-200 font-mono",
                    isActive 
                      ? "text-blue-400 font-bold bg-blue-500/10 shadow-sm border border-blue-500/20" 
                      : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="w-1 h-1 bg-blue-500 rounded-full"
                    />
                  )}
                  <span className="truncate">{item.title}</span>
                </Link>
              ) : (
                <div className="flex items-center gap-2 text-zinc-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-8 mb-2 px-1 font-mono">
                  {depth === 0 && (
                    <div className="p-1 rounded bg-white/5 border border-white/10">
                      {getIcon(item.title)}
                    </div>
                  )}
                  <span>{item.title}</span>
                </div>
              )}
              {item.items && renderItems(item.items, depth + 1)}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <aside className="w-[280px] bg-[#09090b] border-r border-white/5 p-6 flex-shrink-0 h-full overflow-y-auto hidden lg:block custom-scrollbar">
      <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-10 text-white tracking-tighter px-1 group">
        <div className="p-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30 group-hover:bg-blue-600/30 transition-colors">
          <BookOpen className="w-5 h-5 text-blue-500" />
        </div>
        <span className="font-mono">ALGO<span className="text-blue-500">_</span>RITHMICA</span>
      </Link>
      <nav>
        {renderItems(items)}
      </nav>
    </aside>
  );
}
