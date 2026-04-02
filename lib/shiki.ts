import { createHighlighter } from 'shiki';

let highlighter: any = null;

export async function highlight(code: string, lang: string) {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['vitesse-dark', 'vitesse-light'],
      langs: ['c', 'cpp', 'py', 'js', 'ts', 'tsx', 'jsx', 'go', 'rs', 'java', 'lua', 'bash', 'json', 'yaml', 'md', 'mdx', 'html', 'css'],
    });
  }

  // Generate dual-theme code
  return highlighter.codeToHtml(code, {
    lang,
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    }
  });
}
