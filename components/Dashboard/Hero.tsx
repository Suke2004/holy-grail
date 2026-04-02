'use client';

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function DashboardHero() {
  return (
    <section className="px-6 md:px-8 pt-20 md:pt-32 pb-12 md:pb-20 border-b border-sidebar-border relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-foreground/5 blur-[80px] md:blur-[120px] rounded-full -mr-32 -mt-32 md:-mr-64 md:-mt-64" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-sidebar-border text-[9px] md:text-[10px] font-mono text-foreground/50 mb-6 md:mb-8 uppercase tracking-widest leading-none">
            <Zap className="w-3 h-3 text-primary" />
            <span>Vault Protocol v2.5 Branching_Explorer Active</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-6 md:mb-8 text-foreground uppercase leading-tight">
            The Holy Grail<span className="text-primary opacity-30">_</span>
          </h1>
          
          <p className="max-w-2xl text-base md:text-lg text-foreground/60 leading-relaxed font-mono">
            Navigate the recursive branches of software engineering excellence. 
            Select a node to explore deeper implementations and architectures.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
