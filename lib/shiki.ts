import { createHighlighter } from 'shiki';

let highlighter: any = null;

export async function highlight(code: string, lang: string, theme: string = 'vitesse-dark') {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['github-dark', 'github-light', 'vitesse-dark', 'vitesse-light'],
      langs: ['c', 'cpp', 'py', 'js', 'ts', 'tsx', 'jsx', 'go', 'rs', 'java', 'lua', 'bash', 'json', 'yaml', 'md', 'mdx', 'html', 'css'],
    });
  }

  return highlighter.codeToHtml(code, {
    lang,
    theme,
  });
}
