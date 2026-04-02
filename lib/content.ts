import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function getAllSlugs() {
  const files = await getFilesRecursive(CONTENT_DIR);
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const relativePath = path.relative(CONTENT_DIR, file);
      // Remove .mdx extension and split paths
      return relativePath.replace(/\.mdx$/, '').split(path.sep);
    });
}

export async function getMdxContent(slugPath: string) {
  const fullPath = path.join(CONTENT_DIR, `${slugPath}.mdx`);
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return { frontmatter: data, content };
  } catch (error) {
    return null;
  }
}

// Utility to walk directories
async function getFilesRecursive(dir: string): Promise<string[]> {
  let entries;
  try {
     entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (e) {
     return [];
  }
  
  const files = await Promise.all(entries.map((entry) => {
    const res = path.resolve(dir, entry.name);
    return entry.isDirectory() ? getFilesRecursive(res) : res;
  }));
  return files.flat();
}
