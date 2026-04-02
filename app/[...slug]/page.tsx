import { getMdxContent, getAllSlugs } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import CustomComponents from '@/components/MDX';
import { ChevronRight, Home, Calendar, Clock, Code } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slugPath) => ({ slug: slugPath }));
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug;
  const contentPath = slugArray.join('/');
  const doc = await getMdxContent(contentPath);
  
  if (!doc) return notFound();

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#09090b]">
      {/* Breadcrumbs */}
      <nav className="px-8 py-4 border-b border-white/5 bg-black/20 flex items-center gap-2 text-[11px] font-mono text-zinc-500 overflow-x-auto no-scrollbar">
        <Link href="/" className="hover:text-blue-500 transition-colors flex items-center gap-1">
          <Home className="w-3 h-3" />
          <span>ROOT</span>
        </Link>
        {slugArray.map((part, i) => (
          <React.Fragment key={i}>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className={cn(
              "uppercase tracking-wider",
              i === slugArray.length - 1 ? "text-zinc-300 font-bold" : ""
            )}>
              {part.replace(/-/g, ' ')}
            </span>
          </React.Fragment>
        ))}
      </nav>

      <div className="flex justify-center w-full py-16 px-4 sm:px-8 lg:px-12 relative">
        <article className="prose prose-zinc prose-invert max-w-3xl w-full mx-auto font-mono
          prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h1:mb-8
          prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-[14px]
          prose-code:text-blue-400 prose-code:bg-blue-500/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-a:text-blue-500 hover:prose-a:text-blue-400 prose-a:no-underline prose-a:border-b prose-a:border-blue-500/30
          prose-strong:text-zinc-100 prose-blockquote:border-l-blue-500/50 prose-blockquote:bg-white/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg">
          
          <header className="mb-16 border-b border-white/5 pb-10">
            {doc.frontmatter.isRawCode && (
              <div className="flex items-center gap-2 mb-4 text-[10px] font-bold tracking-[0.2em] text-blue-500 uppercase">
                <Code className="w-3 h-3" />
                <span>Source File: {doc.frontmatter.extension}</span>
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
              {doc.frontmatter.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 items-center text-[12px] text-zinc-500">
              {doc.frontmatter.difficulty && (
                <div className={cn(
                  "flex items-center gap-2 px-2 py-1 border rounded font-mono",
                  doc.frontmatter.isRawCode 
                    ? "bg-blue-500/10 border-blue-500/30 text-blue-400" 
                    : "bg-white/5 border-white/10"
                )}>
                  {!doc.frontmatter.isRawCode && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                  <span className="font-bold">{doc.frontmatter.difficulty.toUpperCase()}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{doc.frontmatter.isRawCode ? 'RAW_CODE_LINK' : 'DYNAMIC_PIPELINE_V2'}</span>
              </div>
              <div className="flex flex-wrap gap-2 font-mono">
                {doc.frontmatter.tags?.map((tag: string) => (
                  <span key={tag} className="text-zinc-500 hover:text-blue-500 transition-colors">#{tag.toLowerCase()}</span>
                ))}
              </div>
            </div>
          </header>
          
          <div className="[&>*:first-child]:mt-0">
            <MDXRemote source={doc.content} components={CustomComponents as any} />
          </div>
        </article>
      </div>
    </div>
  );
}

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');
import React from 'react';
