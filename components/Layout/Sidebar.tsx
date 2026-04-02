'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Box, Database, Layers, GitMerge, ChevronRight, ChevronLeft, Terminal, Menu } from 'lucide-react';
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

function FolderItem({ item, depth, pathname, renderItems, isCollapsed }: { 
  item: SidebarItem, 
  depth: number, 
  pathname: string, 
  renderItems: (list: SidebarItem[], depth: number) => React.ReactNode,
  isCollapsed?: boolean
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
    if (t.includes('architecture')) return <Layers className="w-4 h-4" />;
    if (t.includes('foundation')) return <Box className="w-4 h-4" />;
    if (t.includes('domain')) return <Database className="w-4 h-4" />;
    if (t.includes('graveyard')) return <GitMerge className="w-4 h-4" />;
    return <Terminal className="w-4 h-4" />;
  }

  return (
    <li className="mb-1">
      <button 
        onClick={isCollapsed ? undefined : toggle}
        className={cn(
          "w-full flex items-center gap-2 text-foreground/50 font-bold text-[10px] uppercase tracking-[0.2em] py-2 px-1 font-mono hover:text-primary transition-colors group text-left",
          depth === 0 ? "mt-6" : "mt-1",
          isCollapsed ? "justify-center px-0" : "justify-between"
        )}
        title={isCollapsed ? item.title : undefined}
      >
        <div className="flex items-center gap-2">
          {depth === 0 && (
            <div className={cn(
              "p-1.5 rounded bg-foreground/5 border border-sidebar-border group-hover:border-primary transition-colors",
              isCollapsed && "p-2"
            )}>
              {getIcon(item.title)}
            </div>
          )}
          {!isCollapsed && <span>{item.title}</span>}
        </div>
        {!isCollapsed && (
          <motion.div
             animate={{ rotate: isOpen ? 90 : 0 }}
             transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-3 h-3 opacity-50" />
          </motion.div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {!isCollapsed && isOpen && item.items && (
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

export function SidebarContent({ items, isCollapsed }: { items: SidebarItem[], isCollapsed?: boolean }) {
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
                isCollapsed={isCollapsed}
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
                    : "text-foreground/50 hover:text-primary hover:bg-foreground/5",
                  isCollapsed && "justify-center px-0"
                )}
                title={isCollapsed ? item.title : undefined}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className={cn("w-1 h-1 bg-primary rounded-full", isCollapsed && "hidden")}
                  />
                )}
                {!isCollapsed ? (
                  <span className="truncate">{item.title}</span>
                ) : (
                  <span className="text-[10px] font-bold uppercase opacity-50">{item.title.substring(0, 2)}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className={cn("flex flex-col h-full bg-sidebar transition-all duration-300", isCollapsed && "items-center")}>
      <div className="flex flex-col flex-1 w-full">
        <div className={cn(
          "flex items-center gap-3 font-bold text-lg mb-10 text-foreground tracking-tighter px- group transition-all duration-300",
          isCollapsed ? "justify-center flex-col gap-4" : "justify-between"
        )}>
           <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col leading-none">
                <span className="font-mono tracking-widest text-[14px]">Holy<span className="text-primary opacity-50">_</span>Grail</span>
                <span className="text-[10px] text-primary/50 uppercase tracking-[0.3em] font-bold mt-1">Files</span>
              </div>
            )}
          </Link>
        </div>
        <nav className={cn("flex-1 overflow-y-auto custom-scrollbar w-full", !isCollapsed && "pr-2")}>
          {renderItems(items)}
        </nav>
      </div>

      <div className={cn("mt-auto pt-8 w-full transition-all", isCollapsed && "pb-4 flex flex-col items-center")}>
        <ThemeToggle />
        {!isCollapsed && (
          <div className="px-2 py-4 border-t border-sidebar-border mt-4 flex items-center gap-4 text-[10px] font-mono text-foreground/40 uppercase tracking-widest">
            <span>VAULT_PROTO_2.4</span>
            <span>© 2026</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function Sidebar({ items }: { items: SidebarItem[] }) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved !== null) setIsCollapsed(saved === 'true');
    setMounted(true);
  }, []);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', String(newState));
  };

  if (!mounted) return (
    <aside className="w-[280px] bg-sidebar border-r border-sidebar-border p-6 flex-shrink-0 h-full hidden lg:flex flex-col sticky top-0" />
  );

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 70 : 280 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className={cn(
        "bg-sidebar border-r border-sidebar-border h-full hidden lg:flex flex-col sticky top-0 transition-colors duration-300 relative",
        isCollapsed ? "p-3" : "p-6"
      )}
    >
      <button 
        onClick={toggleCollapse}
        className="absolute -right-3 top-24 bg-sidebar border border-sidebar-border rounded-full p-1 hover:bg-foreground/5 transition-all shadow-md z-50 text-foreground/60 hover:text-primary"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      <SidebarContent items={items} isCollapsed={isCollapsed} />
    </motion.aside>
  );
}
