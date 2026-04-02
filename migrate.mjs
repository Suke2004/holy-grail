import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_ROOT = path.join(__dirname, '..');
const DEST_ROOT = path.join(__dirname, 'content');

const mappings = [
  { src: 'Architectures', dest: 'architectures' },
  { src: 'Domain_Mastery', dest: 'domain-mastery' },
  { src: 'Foundations', dest: 'foundations' },
  { src: 'The_Graveyard', dest: 'the-graveyard' }
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function processFile(filePath, targetCatDir) {
  const file = path.basename(filePath);
  
  await ensureDir(path.join(targetCatDir, 'concepts'));
  await ensureDir(path.join(targetCatDir, 'implementations'));
  await ensureDir(path.join(targetCatDir, 'code'));

  if (file.endsWith('.c') || file.endsWith('.h') || file.endsWith('.cpp')) {
    await fs.copyFile(filePath, path.join(targetCatDir, 'code', file));
    console.log(`Copied code file: ${file}`);
  } else if (file.endsWith('.md')) { 
    const content = await fs.readFile(filePath, 'utf8');
    const title = file.replace('.md', '').replace(/_/g, ' ');
    const mdxContent = `---\ntitle: "${title}"\ndifficulty: "Intermediate"\ntags: []\nprerequisites: []\n---\n\n${content}`;
    
    let targetName = file.toLowerCase().replace(/_/g, '-').replace('.md', '.mdx');
    if (targetName.includes('decoder')) {
      targetName = targetName.replace('-decoder', '');
      if (targetName.startsWith('nginx-event')) {
         targetName = 'nginx-event-loop.mdx'; 
      }
      await fs.writeFile(path.join(targetCatDir, 'implementations', targetName), mdxContent);
      console.log(`Converted to implementation: ${targetName}`);
    } else {
      await fs.writeFile(path.join(targetCatDir, 'concepts', targetName), mdxContent);
      console.log(`Converted to concept: ${targetName}`);
    }
  } else if (!file.startsWith('.')) {
      await ensureDir(path.join(targetCatDir, 'misc'));
      await fs.copyFile(filePath, path.join(targetCatDir, 'misc', file));
  }
}

async function migrate() {
  console.log("Starting migration...");
  await ensureDir(DEST_ROOT);

  for (const map of mappings) {
    const srcDir = path.join(SRC_ROOT, map.src);
    const destDir = path.join(DEST_ROOT, map.dest);
    
    let entries;
    try {
       entries = await fs.readdir(srcDir, { withFileTypes: true });
    } catch (e) {
       console.log("Skipping", map.src);
       continue;
    }

    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue; // skip hidden
      
      if (entry.isDirectory()) {
         const slugCategory = entry.name.toLowerCase().replace(/_/g, '-');
         const targetCatDir = path.join(destDir, slugCategory);
         const catFiles = await fs.readdir(path.join(srcDir, entry.name), { withFileTypes: true });
         for (const catFile of catFiles) {
            if (catFile.isFile()) {
               await processFile(path.join(srcDir, entry.name, catFile.name), targetCatDir);
            }
         }
      } else if (entry.isFile()) {
         const slugCategory = "core"; // default for top-level files like MapReduce.cpp
         const targetCatDir = path.join(destDir, slugCategory);
         await processFile(path.join(srcDir, entry.name), targetCatDir);
      }
    }
  }
}

migrate().then(() => console.log('Migration complete.')).catch(console.error);
