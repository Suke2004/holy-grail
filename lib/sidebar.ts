import fs from 'fs/promises';
import path from 'path';

export interface SidebarItem {
  title: string;
  href?: string;
  items?: SidebarItem[];
}

export async function generateSidebar(dir = path.join(process.cwd(), 'content')): Promise<SidebarItem[]> {
  const items: SidebarItem[] = [];
  let entries;
  
  try {
     entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (e) {
     return [];
  }

  const contentDir = path.join(process.cwd(), 'content');

  const CODE_EXTENSIONS = ['.c', '.h', '.cpp', '.hpp', '.py', '.js', '.ts', '.go', '.rs', '.java', '.lua'];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const children = await generateSidebar(path.join(dir, entry.name));
      if (children.length > 0) {
        items.push({
          title: formatTitle(entry.name),
          items: children
        });
      }
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (ext === '.mdx' || ext === '.md' || CODE_EXTENSIONS.includes(ext)) {
        const fullPath = path.join(dir, entry.name);
        const relative = path.relative(contentDir, fullPath)
          .replace(/\\/g, '/')
          .replace(new RegExp(`${ext}$`), '');
        
        items.push({
          title: formatTitle(entry.name.replace(new RegExp(`${ext}$`), '')),
          href: `/${relative}`
        });
      }
    }
  }
  
  // Basic logical sort
  return items.sort((a, b) => a.title.localeCompare(b.title));
}

function formatTitle(slug: string) {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
