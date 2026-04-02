'use client';

import { motion } from "framer-motion";
import { Layers, Database, Box, GitMerge, ArrowRight, Zap, Code, Shield } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    title: "Architectures",
    description: "High-level design patterns and structural systems.",
    icon: <Layers className="w-6 h-6" />,
    href: "/architectures",
    color: "text-foreground",
    bg: "bg-foreground/5"
  },
  {
    title: "Domain Mastery",
    description: "Deep dives into specific technical domains and expertise.",
    icon: <Database className="w-6 h-6" />,
    href: "/domain-mastery",
    color: "text-foreground",
    bg: "bg-foreground/5"
  },
  {
    title: "Foundations",
    description: "Core principles and essential knowledge bases.",
    icon: <Box className="w-6 h-6" />,
    href: "/foundations",
    color: "text-foreground",
    bg: "bg-foreground/5"
  },
  {
    title: "The Graveyard",
    description: "Archived experiments and legacy systems.",
    icon: <GitMerge className="w-6 h-6" />,
    href: "/the-graveyard",
    color: "text-foreground",
    bg: "bg-foreground/5"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="px-6 md:px-8 pt-20 md:pt-32 pb-12 md:pb-20 border-b border-sidebar-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-foreground/5 blur-[80px] md:blur-[120px] rounded-full -mr-32 -mt-32 md:-mr-64 md:-mt-64" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-sidebar-border text-[9px] md:text-[10px] font-mono text-foreground/50 mb-6 md:mb-8 uppercase tracking-widest leading-none">
              <Zap className="w-3 h-3 text-primary" />
              <span>Vault Protocol v2.4 Active</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 text-foreground uppercase leading-tight md:leading-none">
              The Holy Grail<span className="text-primary opacity-30">_</span>
            </h1>
            
            <p className="max-w-2xl text-base md:text-lg text-foreground/60 leading-relaxed font-mono">
              The master knowledge base for software engineering excellence. 
              high-performance architectures, domain expertise, and foundational systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="px-8 py-20 bg-sidebar/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link 
                  href={cat.href}
                  className="group block p-8 rounded-2xl bg-card border border-card-border hover:border-primary/30 hover:bg-card/80 transition-all duration-300 relative overflow-hidden"
                >
                  <div className={`w-12 h-12 rounded-xl ${cat.bg} ${cat.color} flex items-center justify-center mb-6`}>
                    {cat.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 group-hover:text-primary tracking-tight">
                    {cat.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  
                  <p className="text-zinc-500 text-sm leading-relaxed font-mono group-hover:text-foreground/70 transition-colors">
                    {cat.description}
                  </p>

                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Code className="w-12 h-12 text-primary" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Features */}
      <section className="px-8 py-20 border-t border-sidebar-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 text-zinc-500 text-[10px] font-mono uppercase tracking-[0.2em] opacity-60">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-primary" />
            <span>ENCRYPTED_VAULT</span>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 text-primary" />
            <span>RAPID_PIPELINE</span>
          </div>
          <div className="flex items-center gap-3">
            <Layers className="w-4 h-4 text-primary" />
            <span>SCALABLE_PATTERNS</span>
          </div>
        </div>
      </section>
    </div>
  );
}
