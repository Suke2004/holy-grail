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
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "Domain Mastery",
    description: "Deep dives into specific technical domains and expertise.",
    icon: <Database className="w-6 h-6" />,
    href: "/domain-mastery",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Foundations",
    description: "Core principles and essential knowledge bases.",
    icon: <Box className="w-6 h-6" />,
    href: "/foundations",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  {
    title: "The Graveyard",
    description: "Archived experiments and legacy systems.",
    icon: <GitMerge className="w-6 h-6" />,
    href: "/the-graveyard",
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="px-8 pt-32 pb-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -mr-64 -mt-64" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 mb-8">
              <Zap className="w-3 h-3 text-blue-500" />
              <span>Version 2.0 Dynamic Pipeline Active</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              The Holy Grail<span className="text-blue-500">.</span>
            </h1>
            
            <p className="max-w-2xl text-lg text-zinc-400 leading-relaxed font-mono">
              The internal knowledge base for software engineering excellence. 
              Modern architectures, deep-domain mastery, and foundational systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="px-8 py-20 bg-black/20">
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
                  className="group block p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-blue-500/50 hover:bg-zinc-900 transition-all duration-300 relative overflow-hidden"
                >
                  <div className={`w-12 h-12 rounded-xl ${cat.bg} ${cat.color} flex items-center justify-center mb-6`}>
                    {cat.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    {cat.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500" />
                  </h3>
                  
                  <p className="text-zinc-400 text-sm leading-relaxed font-mono">
                    {cat.description}
                  </p>

                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Code className="w-12 h-12" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Features */}
      <section className="px-8 py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 text-zinc-500 text-sm font-mono">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-500/50" />
            <span>Encrypted knowledge vault</span>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-amber-500/50" />
            <span>High-performance patterns</span>
          </div>
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-emerald-500/50" />
            <span>Scalable architectures</span>
          </div>
        </div>
      </section>
    </div>
  );
}
