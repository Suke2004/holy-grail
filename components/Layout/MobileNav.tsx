'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarContent } from './Sidebar';

export function MobileNav({ sidebarItems }: { sidebarItems: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <div className="lg:hidden w-full sticky top-0 z-[100]">
      {/* Mobile Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2 group">
          <BookOpen className="w-5 h-5 text-primary" />
          <div className="flex flex-col leading-none">
            <span className="font-mono text-[14px] tracking-widest font-bold">
              Holy<span className="text-primary opacity-50">_</span>Grail
            </span>
            <span className="text-[10px] text-primary/50 uppercase tracking-[0.3em] font-bold mt-0.5">Files</span>
          </div>
        </Link>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-foreground/5 transition-colors border border-sidebar-border"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[90]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-sidebar border-r border-sidebar-border z-[100] shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                <SidebarContent items={sidebarItems} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
