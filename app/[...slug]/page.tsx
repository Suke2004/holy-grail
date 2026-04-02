import { getMdxContent, getAllSlugs } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import CustomComponents from '@/components/MDX';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slugPath) => ({ slug: slugPath }));
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const contentPath = resolvedParams.slug.join('/');
  const doc = await getMdxContent(contentPath);
  
  if (!doc) return notFound();

  return (
    <div className="flex justify-center w-full min-h-screen py-16 px-4 sm:px-8 lg:px-12 relative">
      <article className="prose prose-zinc prose-invert max-w-3xl w-full mx-auto
        prose-headings:tracking-tight prose-headings:font-bold prose-h1:text-4xl 
        prose-p:text-zinc-300 prose-p:leading-relaxed prose-a:text-blue-400 
        hover:prose-a:text-blue-300 prose-a:transition-colors prose-strong:text-zinc-100">
        <header className="mb-14 border-b border-white/10 pb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            {doc.frontmatter.title}
          </h1>
          <div className="flex flex-wrap gap-3 items-center">
            {doc.frontmatter.difficulty && (
              <span className="px-3 py-1 bg-zinc-800 text-zinc-300 border border-zinc-700/50 rounded-full text-[13px] font-medium shadow-sm">
                {doc.frontmatter.difficulty}
              </span>
            )}
            {doc.frontmatter.tags?.map((tag: string) => (
              <span key={tag} className="px-3 py-1 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-full text-[13px]">
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        <div className="[&>*:first-child]:mt-0">
          <MDXRemote source={doc.content} components={CustomComponents as any} />
        </div>
      </article>
    </div>
  );
}
