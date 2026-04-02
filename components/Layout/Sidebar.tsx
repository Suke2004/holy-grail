'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Box, Database, Cpu, Layers, GitMerge } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
    if (t.includes('architecture')) return <Layers className="w-4 h-4 opacity-70" />;
    if (t.includes('foundation')) return <Box className="w-4 h-4 opacity-70" />;
    if (t.includes('domain')) return <Database className="w-4 h-4 opacity-70" />;
    if (t.includes('graveyard')) return <GitMerge className="w-4 h-4 opacity-70" />;
    return <Cpu className="w-4 h-4 opacity-70" />;
  }

  function renderItems(list: SidebarItem[], depth = 0) {
    return (
      <ul className={cn("space-y-0.5", depth > 0 ? "pl-4 ml-2 border-l border-white/5 mt-1" : "mt-2")}>
        {list.map((item, idx) => {
          const isActive = pathname === item.href;
          
          return (
            <li key={idx}>
              {item.href ? (
                <Link 
                  href={item.href} 
                  className={cn(
                    "flex items-center text-[13px] py-1.5 px-3 rounded-md transition-all duration-200",
                    isActive 
                      ? "text-zinc-100 font-medium bg-white/10 shadow-sm" 
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5 hover:translate-x-0.5"
                  )}
                >
                  <span className="truncate">{item.title}</span>
                </Link>
              ) : (
                <div className="flex items-center gap-2 text-zinc-300 font-medium text-xs uppercase tracking-widest mt-6 mb-2 px-1">
                  {depth === 0 && getIcon(item.title)}
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
      <div className="flex items-center gap-2 font-bold text-xl mb-8 text-white tracking-tight px-1">
        <BookOpen className="w-5 h-5 text-blue-500" />
        <span>Algorithmica<span className="text-blue-500">.</span></span>
      </div>
      <nav>
        {renderItems(items)}
      </nav>
    </aside>
  );
}
