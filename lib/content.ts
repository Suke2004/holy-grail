import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

const CODE_EXTS = ['.c', '.h', '.cpp', '.hpp', '.py', '.js', '.ts', '.go', '.rs', '.java', '.lua', '.txt'];

export async function getAllSlugs() {
  const files = await getFilesRecursive(CONTENT_DIR);
  return files
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.mdx' || ext === '.md' || CODE_EXTS.includes(ext);
    })
    .map(file => {
      const relativePath = path.relative(CONTENT_DIR, file);
      // Remove extension and split paths
      const ext = path.extname(relativePath);
      return relativePath.replace(new RegExp(`\\${ext}$`), '').split(path.sep);
    });
}

export async function getMdxContent(slugPath: string) {
  // Try .mdx then .md then code extensions
  const extensions = ['.mdx', '.md', ...CODE_EXTS];
  
  for (const ext of extensions) {
    const fullPath = path.join(CONTENT_DIR, `${slugPath}${ext}`);
    try {
      const fileContents = await fs.readFile(fullPath, 'utf8');
      
      // If it's a code file, wrap it in a code block
      if (CODE_EXTS.includes(ext)) {
        const lang = ext.substring(1);
        // Escape special MDX characters to prevent parsing errors
        const escapedContents = fileContents
          .replace(/{/g, '&#123;')
          .replace(/}/g, '&#125;')
          .replace(/</g, '&lt;');

        return { 
          frontmatter: { 
            title: path.basename(slugPath).replace(/-/g, ' '),
            difficulty: "Source File",
            tags: ["Raw Code", lang],
            isRawCode: true,
            extension: ext
          }, 
          content: `\`\`\`${lang}:${path.basename(slugPath)}${ext}\n${escapedContents}\n\`\`\`` 
        };
      }
      
      const { data, content } = matter(fileContents);
      return { frontmatter: data, content };
    } catch (error) {
      continue;
    }
  }
  return null;
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
