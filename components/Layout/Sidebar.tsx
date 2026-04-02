'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Box, Database, Cpu, Layers, GitMerge, ChevronRight, Terminal } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

import { ThemeToggle } from './ThemeToggle';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SidebarItem {
  title: string;
  href?: string;
  items?: SidebarItem[];
}

function FolderItem({ item, depth, pathname, renderItems }: { 
  item: SidebarItem, 
  depth: number, 
  pathname: string, 
  renderItems: (list: SidebarItem[], depth: number) => React.ReactNode 
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Auto-expand if a child is active
  useEffect(() => {
    const hasActiveChild = (items: SidebarItem[]): boolean => {
      return items. some(i => i.href === pathname || (i.items && hasActiveChild(i.items)));
    };
    if (item.items && hasActiveChild(item.items)) {
      setIsOpen(true);
    }
  }, [pathname, item.items]);

  const toggle = () => setIsOpen(!isOpen);

  function getIcon(title: string) {
    const t = title.toLowerCase();
    if (t.includes('architecture')) return <Layers className="w-3.5 h-3.5" />;
    if (t.includes('foundation')) return <Box className="w-3.5 h-3.5" />;
    if (t.includes('domain')) return <Database className="w-3.5 h-3.5" />;
    if (t.includes('graveyard')) return <GitMerge className="w-3.5 h-3.5" />;
    return <Terminal className="w-3.5 h-3.5" />;
  }

  return (
    <li className="mb-1">
      <button 
        onClick={toggle}
        className={cn(
          "w-full flex items-center justify-between gap-2 text-zinc-400 font-bold text-[10px] uppercase tracking-[0.2em] py-2 px-1 font-mono hover:text-zinc-200 transition-colors group",
          depth === 0 ? "mt-6" : "mt-1"
        )}
      >
        <div className="flex items-center gap-2">
          {depth === 0 && (
            <div className="p-1 rounded bg-white/5 border border-sidebar-border group-hover:border-blue-500/50 transition-colors">
              {getIcon(item.title)}
            </div>
          )}
          <span>{item.title}</span>
        </div>
        <motion.div
           animate={{ rotate: isOpen ? 90 : 0 }}
           transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-3 h-3 opacity-50" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && item.items && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {renderItems(item.items, depth + 1)}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Sidebar({ items }: { items: SidebarItem[] }) {
  const pathname = usePathname();

  function renderItems(list: SidebarItem[], depth = 0) {
    return (
      <ul className={cn("space-y-0.5", depth > 0 ? "pl-3 ml-2 border-l border-sidebar-border mt-1" : "mt-2")}>
        {list.map((item, idx) => {
          const isActive = pathname === item.href;
          
          if (!item.href && item.items) {
            return (
              <FolderItem 
                key={idx} 
                item={item} 
                depth={depth} 
                pathname={pathname} 
                renderItems={renderItems} 
              />
            );
          }

          return (
            <li key={idx}>
              <Link 
                href={item.href || '#'} 
                className={cn(
                  "group flex items-center gap-2 text-[12px] py-1.5 px-3 rounded-md transition-all duration-200 font-mono",
                  isActive 
                    ? "text-primary font-bold bg-primary/10 shadow-sm border border-primary/20" 
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                  />
                )}
                <span className="truncate">{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <aside className="w-[280px] bg-sidebar border-r border-sidebar-border p-6 flex-shrink-0 h-full overflow-y-auto hidden lg:flex flex-col justify-between custom-scrollbar shadow-2xl transition-colors duration-300">
      <div className="flex flex-col">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-10 text-foreground tracking-tighter px-1 group">
          <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <span className="font-mono tracking-widest">Holy<span className="text-primary opacity-50">_</span>Grail</span>
          <span className="text-primary opacity-50">Files</span>
        </Link>
        <nav>
          {renderItems(items)}
        </nav>
      </div>

      <div className="mt-auto pt-8">
        <ThemeToggle />
        <div className="px-2 py-4 border-t border-sidebar-border mt-4 flex items-center gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest opacity-40">
          <span>VAULT_PROTO_2.4</span>
          <span>© 2026</span>
        </div>
      </div>
    </aside>
  );
}
