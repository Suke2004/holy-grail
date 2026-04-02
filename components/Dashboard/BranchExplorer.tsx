'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Folder, FileText, ArrowRight, BookOpen, Layers, Box, Database, GitMerge } from 'lucide-react';
import Link from 'next/link';
import { SidebarItem } from '@/lib/sidebar';

interface Column {
  parentId: string;
  items: SidebarItem[];
  selectedIndex: number | null;
}

export function BranchExplorer({ initialItems }: { initialItems: SidebarItem[] }) {
  const [columns, setColumns] = useState<Column[]>([
    { parentId: 'root', items: initialItems, selectedIndex: null }
  ]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNodeClick = (colIndex: number, itemIndex: number, item: SidebarItem) => {
    // Update current column's selection
    const newColumns = [...columns.slice(0, colIndex + 1)];
    newColumns[colIndex] = { ...newColumns[colIndex], selectedIndex: itemIndex };

    // If it's a folder, add its items as a new column
    if (item.items && item.items.length > 0) {
      newColumns.push({
        parentId: item.title,
        items: item.items,
        selectedIndex: null
      });
    }

    setColumns(newColumns);
  };

  // Auto-scroll to the right when a new column is added
  useEffect(() => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      containerRef.current.scrollTo({
        left: scrollWidth,
        behavior: 'smooth'
      });
    }
  }, [columns.length]);

  return (
    <div 
      ref={containerRef}
      className="w-full overflow-x-auto custom-scrollbar flex gap-32 py-20 px-8 md:px-16 min-h-[600px] relative scroll-smooth"
    >
      <AnimatePresence mode="popLayout">
        {columns.map((col, colIdx) => (
          <motion.div
            key={`${col.parentId}-${colIdx}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-shrink-0 w-[320px] relative z-10"
          >
            {/* Level Compartment (The "Box") */}
            <div className="bg-card/30 border border-card-border rounded-2xl p-6 h-full shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col gap-4 relative">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-mono text-primary font-bold uppercase tracking-[0.4em] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  LVL_0{colIdx + 1}
                </div>
                <div className="text-[9px] font-mono text-foreground/20 uppercase tracking-widest font-bold">
                  {col.parentId === 'root' ? 'VAULT_ROOT' : `SECT_${col.parentId.substring(0, 4)}`}
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                {col.items.map((item, itemIdx) => {
                  const isSelected = col.selectedIndex === itemIdx;
                  const isFolder = !!item.items;

                  return (
                    <div key={itemIdx} className="relative group/node">
                      {/* Pipeline Connector Line with S-Bend - Perfectly Aligned */}
                      {isSelected && isFolder && columns[colIdx + 1] && (
                        <svg 
                          className="absolute left-full top-1/2 w-48 h-20 -translate-y-1/2 pointer-events-none overflow-visible z-0"
                        >
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            d="M 0 40 C 64 40, 64 60, 152 60"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-primary/40"
                          />
                          <motion.circle
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            cx="152"
                            cy="60"
                            r="4"
                            className="fill-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                          />
                        </svg>
                      )}

                      <button
                        onClick={() => handleNodeClick(colIdx, itemIdx, item)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group/btn relative z-20 ${
                          isSelected 
                            ? 'bg-primary/10 border-primary/40 shadow-sm' 
                            : 'bg-foreground/[0.03] border-transparent hover:border-primary/20 hover:bg-foreground/[0.05]'
                        }`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className={`p-1.5 rounded-lg transition-colors ${
                            isSelected ? 'bg-primary/20 text-primary' : 'bg-foreground/5 text-foreground/40'
                          }`}>
                            {isFolder ? <Folder className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                          </div>
                          <span className={`text-[12px] font-bold tracking-tight truncate ${
                            isSelected ? 'text-primary' : 'text-foreground/70'
                          }`}>
                            {item.title}
                          </span>
                        </div>

                        {isFolder ? (
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            isSelected ? 'text-primary rotate-90 lg:rotate-0' : 'text-foreground/20'
                          }`} />
                        ) : (
                          <Link 
                            href={item.href || '#'}
                            className="p-1 px-2 rounded-md bg-primary text-background text-[9px] font-bold opacity-0 group-hover/btn:opacity-100 transition-all"
                          >
                            OPEN
                          </Link>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Background Grid Decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
    </div>
  );
}
