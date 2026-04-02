import React from 'react';
import { FileCode, Globe, Terminal } from 'lucide-react';
import { highlight } from '@/lib/shiki';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export async function CodeBlock({ code, lang = 'text', filename, showLineNumbers = true }: CodeBlockProps) {
  // Get highlighted HTML for both themes (Next.js 16 can use CSS variables for theme or separate elements)
  // For simplicity and B&W theme, we'll generate the HTML. 
  // Shiki doesn't easily support dynamic CSS variables in a single call, so we'll 
  // provide a neutral theme (vitesse-dark) that looks great in both or matches dark mode.
  
  const highlightedHtml = await highlight(code, lang);

  const Icon = lang === 'bash' ? Terminal : lang === 'html' ? Globe : FileCode;

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-sidebar-border bg-sidebar shadow-2xl group/code font-mono transition-all duration-300 max-w-full">
      {/* VS Code Tab Style Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-sidebar-bg/80 border-b border-sidebar-border text-[11px] backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-background px-4 py-2 border-t-2 border-primary -mb-2 rounded-t-md text-foreground font-bold shadow-sm">
            <Icon className="w-3.5 h-3.5 text-primary" />
            <span className="truncate max-w-[160px] sm:max-w-[300px] uppercase tracking-widest text-[10px]">
              {filename || `buffer.${lang}`}
            </span>
          </div>
          <div className="hidden md:block text-zinc-500 font-bold opacity-30 text-[9px] tracking-[0.2em]">
            {lang.toUpperCase()}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <CopyButton text={code} />
        </div>
      </div>

      {/* Code Area with Line Numbers & Overflow Control */}
      <div className="relative group overflow-hidden bg-background/40">
        <div className="overflow-x-auto custom-scrollbar max-w-full">
          <div 
            className="shiki-wrapper text-[13px] leading-6 py-6 min-w-full w-fit"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </div>
        
        <style dangerouslySetInnerHTML={{ __html: `
          .shiki-wrapper pre {
            background-color: transparent !important;
            margin: 0 !important;
            padding: 0 2rem !important;
            width: fit-content;
            min-width: 100%;
          }
          .shiki-wrapper code {
            counter-reset: line;
            display: grid;
            width: fit-content;
            min-width: 100%;
          }
          .shiki-wrapper .line {
            display: flex;
            width: 100%;
          }
          .shiki-wrapper .line::before {
            counter-increment: line;
            content: counter(line);
            display: inline-block;
            width: 2rem;
            margin-right: 1.5rem;
            text-align: right;
            color: var(--foreground);
            opacity: 0.15;
            user-select: none;
            font-size: 10px;
            flex-shrink: 0;
          }

          /* Shiki Dual Theme Logic - Allowing internal syntax colors through */
          html:not(.dark) .shiki {
            background-color: var(--shiki-light-bg) !important;
          }

          html.dark .shiki {
            background-color: var(--shiki-dark-bg) !important;
          }
        `}} />
      </div>

      {/* Terminal-like Status Bar */}
      <div className="px-5 py-2 bg-sidebar-bg/50 border-t border-sidebar-border flex justify-between items-center text-[9px] text-zinc-500 font-bold tracking-[0.2em] uppercase opacity-60">
        <div className="flex gap-6">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-primary" />
            {code.split('\n').length} LINES
          </span>
          <span>{new Blob([code]).size} B</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-primary/50">UTF-8</span>
          <span className="px-1.5 py-0.5 rounded bg-foreground/5 border border-sidebar-border">LF</span>
        </div>
      </div>
    </div>
  );
}
