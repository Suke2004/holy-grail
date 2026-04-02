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
  
  const highlightedHtml = await highlight(code, lang, 'vitesse-dark');

  const Icon = lang === 'bash' ? Terminal : lang === 'html' ? Globe : FileCode;

  return (
    <div className="my-8 rounded-lg overflow-hidden border border-zinc-800 bg-[#0d0d0d] shadow-2xl group/code font-mono">
      {/* VS Code Tab Style Header */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#1a1a1a] border-b border-zinc-800 text-[11px]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#1e1e1e] px-3 py-1.5 border-t-2 border-primary -mb-1.5 rounded-t-sm text-zinc-300">
            <Icon className="w-3.5 h-3.5 text-primary opacity-80" />
            <span className="truncate max-w-[200px] uppercase tracking-wider font-bold">
              {filename || `buffer.${lang}`}
            </span>
          </div>
          <div className="hidden sm:block text-zinc-600 font-mono tracking-tighter opacity-50">
            {lang.toUpperCase()}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <CopyButton text={code} />
        </div>
      </div>

      {/* Code Area with Line Numbers */}
      <div className="relative group overflow-x-auto selection:bg-primary/20">
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
            color: #404040;
            user-select: none;
            font-size: 11px;
          }
        `}} />
      </div>

      {/* Terminal-like Status Bar (Optional) */}
      <div className="px-4 py-1.5 bg-[#111111] border-t border-zinc-900/50 flex justify-between items-center text-[10px] text-zinc-500 font-bold tracking-widest">
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
