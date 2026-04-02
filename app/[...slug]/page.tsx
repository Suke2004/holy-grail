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
    <div className="flex flex-col w-full min-h-screen">
      {/* Breadcrumbs */}
      <nav className="px-4 sm:px-8 py-4 border-b border-sidebar-border bg-sidebar/50 flex items-center gap-2 text-[11px] font-mono text-zinc-500 overflow-x-auto no-scrollbar backdrop-blur-sm sticky top-0 lg:top-0 z-20 transition-all duration-300
        [html:not(.lg)]
        lg:translate-y-0 translate-y-0
      ">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1 shrink-0">
          <Home className="w-3 h-3" />
          <span>ROOT</span>
        </Link>
        {slugArray.map((part, i) => (
          <React.Fragment key={i}>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className={cn(
              "uppercase tracking-wider whitespace-nowrap",
              i === slugArray.length - 1 ? "text-primary font-bold" : ""
            )}>
              {part.replace(/-/g, ' ')}
            </span>
          </React.Fragment>
        ))}
      </nav>

      <div className="flex justify-center w-full py-10 md:py-16 px-4 sm:px-8 lg:px-12 relative">
        <article className="prose prose-zinc dark:prose-invert max-w-3xl w-full mx-auto font-mono
          prose-headings:font-bold prose-headings:tracking-tighter prose-h1:text-3xl md:text-4xl prose-h1:mb-8 prose-h1:uppercase
          prose-p:text-zinc-500 dark:prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-[14px]
          prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-a:text-primary prose-a:font-bold prose-a:no-underline prose-a:border-b-2 prose-a:border-primary/20 hover:prose-a:border-primary transition-all
          prose-strong:text-foreground prose-blockquote:border-l-primary/30 prose-blockquote:bg-foreground/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg">
          
          <header className="mb-16 border-b border-sidebar-border pb-10">
            {doc.frontmatter.isRawCode && (
              <div className="flex items-center gap-2 mb-4 text-[10px] font-bold tracking-[0.2em] text-primary uppercase opacity-60">
                <Code className="w-3 h-3" />
                <span>Source File: {doc.frontmatter.extension}</span>
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground mb-6 uppercase leading-tight">
              {doc.frontmatter.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 items-center text-[11px] text-zinc-500 uppercase tracking-widest">
              {doc.frontmatter.difficulty && (
                <div className={cn(
                  "flex items-center gap-2 px-2 py-1 border rounded font-mono",
                  doc.frontmatter.isRawCode 
                    ? "bg-primary/5 border-primary/20 text-primary" 
                    : "bg-foreground/5 border-sidebar-border"
                )}>
                  {!doc.frontmatter.isRawCode && <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-50" />}
                  <span className="font-bold">{doc.frontmatter.difficulty}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 opacity-50" />
                <span>{doc.frontmatter.isRawCode ? 'RAW_CORE' : 'KNOWLEDGE_VAULT'}</span>
              </div>
              <div className="flex flex-wrap gap-2 font-mono">
                {doc.frontmatter.tags?.map((tag: string) => (
                  <span key={tag} className="hover:text-primary transition-colors cursor-default opacity-80">#{tag.toLowerCase()}</span>
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
