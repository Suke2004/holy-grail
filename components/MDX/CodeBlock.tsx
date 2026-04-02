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
    <div className="my-8 rounded-lg overflow-hidden border border-sidebar-border bg-sidebar shadow-2xl group/code font-mono transition-colors duration-300">
      {/* VS Code Tab Style Header */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-sidebar-bg/50 border-b border-sidebar-border text-[11px] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-background px-3 py-1.5 border-t-2 border-primary -mb-1.5 rounded-t-sm text-foreground/80">
            <Icon className="w-3.5 h-3.5 text-primary opacity-80" />
            <span className="truncate max-w-[200px] uppercase tracking-wider font-bold">
              {filename || `buffer.${lang}`}
            </span>
          </div>
          <div className="hidden sm:block text-zinc-500 font-mono tracking-tighter opacity-50">
            {lang.toUpperCase()}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <CopyButton text={code} />
        </div>
      </div>

      {/* Code Area with Line Numbers */}
      <div className="relative group overflow-x-auto selection:bg-primary/20 bg-background/50">
        <div 
          className="shiki-wrapper text-[13px] leading-6 py-4"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
        
        <style dangerouslySetInnerHTML={{ __html: `
          .shiki-wrapper pre {
            background-color: transparent !important;
            margin: 0 !important;
            padding: 0 1.5rem !important;
          }
          .shiki-wrapper code {
            counter-reset: line;
            display: grid;
          }
          .shiki-wrapper .line::before {
            counter-increment: line;
            content: counter(line);
            display: inline-block;
            width: 1.5rem;
            margin-right: 1.5rem;
            text-align: right;
            color: #888888;
            opacity: 0.3;
            user-select: none;
            font-size: 11px;
          }

          /* Shiki Dual Theme Logic */
          html:not(.dark) .shiki,
          html:not(.dark) .shiki span {
            color: var(--shiki-light) !important;
            background-color: var(--shiki-light-bg) !important;
          }

          html.dark .shiki,
          html.dark .shiki span {
            color: var(--shiki-dark) !important;
            background-color: var(--shiki-dark-bg) !important;
          }
        `}} />
      </div>

      {/* Terminal-like Status Bar */}
      <div className="px-4 py-1.5 bg-sidebar-bg/30 border-t border-sidebar-border flex justify-between items-center text-[10px] text-zinc-500 font-bold tracking-widest opacity-80">
        <div className="flex gap-4">
          <span>{code.split('\n').length} LINES</span>
          <span>{new Blob([code]).size} B</span>
        </div>
        <div className="flex gap-4 uppercase font-bold text-primary/40 text-[9px] tracking-[0.2em]">
          <span>UTF-8</span>
          <span>Spaces: 2</span>
        </div>
      </div>
    </div>
  );
}
