'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CodeBlockProps {
  file: string;
  lines?: string;
  highlight?: string;
  children?: React.ReactNode;
}

export function CodeBlock({ file, lines, highlight, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // In actual app we'd copy the raw text ref. Muted functionality here.
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-zinc-800 bg-[#09090b] shadow-2xl">
      {/* Title Bar MacOS Style */}
      <div className="flex items-center px-4 py-3 bg-zinc-900/80 border-b border-zinc-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-zinc-700 transition hover:bg-zinc-600"></div>
          <div className="w-3 h-3 rounded-full bg-zinc-700 transition hover:bg-zinc-600"></div>
          <div className="w-3 h-3 rounded-full bg-zinc-700 transition hover:bg-zinc-600"></div>
        </div>
        <div className="flex-1 text-center pr-8">
          <span className="text-xs font-mono tracking-wide text-zinc-400">
            {file} {lines && <span className="text-zinc-600 ml-1">L{lines}</span>}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="text-zinc-500 hover:text-zinc-300 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Code Container */}
      <div className="p-4 overflow-x-auto text-[13px] leading-6 font-mono text-zinc-300 antialiased selection:bg-zinc-700">
        <pre><code>{`// ... Content mapping from ${file} ...\n// Powered by modern Next.js reading layers.`}</code></pre>
      </div>

      {/* Narrative Footer */}
      {children && (
        <div className="p-4 bg-zinc-900 border-t border-zinc-800/50 text-[13.5px] text-zinc-400 leading-relaxed rounded-b-xl">
          {children}
        </div>
      )}
    </div>
  );
}
