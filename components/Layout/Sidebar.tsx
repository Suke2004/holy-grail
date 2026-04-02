'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Box, Database, Layers, GitMerge, ChevronRight, Terminal } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

import { ThemeToggle } from './ThemeToggle';

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
          "w-full flex items-center justify-between gap-2 text-foreground/50 font-bold text-[10px] uppercase tracking-[0.2em] py-2 px-1 font-mono hover:text-primary transition-colors group text-left",
          depth === 0 ? "mt-6" : "mt-1"
        )}
      >
        <div className="flex items-center gap-2">
          {depth === 0 && (
            <div className="p-1 rounded bg-foreground/5 border border-sidebar-border group-hover:border-primary transition-colors">
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

export function SidebarContent({ items }: { items: SidebarItem[] }) {
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
                    : "text-foreground/50 hover:text-primary hover:bg-foreground/5"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="w-1 h-1 bg-primary rounded-full"
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
    <div className="flex flex-col h-full bg-sidebar">
      <div className="flex flex-col flex-1">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-10 text-foreground tracking-tighter px- group">
          <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-mono tracking-widest text-[14px]">Holy<span className="text-primary opacity-50">_</span>Grail</span>
            <span className="text-[10px] text-primary/50 uppercase tracking-[0.3em] font-bold mt-1">Files</span>
          </div>
        </Link>
        <nav className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          {renderItems(items)}
        </nav>
      </div>

      <div className="mt-auto pt-8">
        <ThemeToggle />
        <div className="px-2 py-4 border-t border-sidebar-border mt-4 flex items-center gap-4 text-[10px] font-mono text-foreground/40 uppercase tracking-widest">
          <span>VAULT_PROTO_2.4</span>
          <span>© 2026</span>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ items }: { items: SidebarItem[] }) {
  return (
    <aside className="w-[280px] bg-sidebar border-r border-sidebar-border p-6 flex-shrink-0 h-full hidden lg:flex flex-col sticky top-0 transition-colors duration-300">
      <SidebarContent items={items} />
    </aside>
  );
}
