import { CodeBlock } from './CodeBlock';
import { Note } from './Note';
import { Quiz } from './Quiz';
import React from 'react';

export const CustomComponents = {
  CodeBlock,
  Note,
  Quiz,
  // Map standard Markdown code blocks to our custom CodeBlock
pre: ({ children }: any) => {
  const codeElement = React.Children.toArray(children).find(
    (child: any) => child?.type === 'code'
  ) as any;

  if (codeElement?.props) {
    const { children: rawCode, className } = codeElement.props;

    // ✅ SAFE extraction
    let code = '';

    if (typeof rawCode === 'string') {
      code = rawCode;
    } else if (Array.isArray(rawCode)) {
      code = rawCode.join('');
    } else if (rawCode) {
      code = String(rawCode);
    }

    const fullLang = className?.replace('language-', '') || 'text';
    const [lang, filename] = fullLang.split(':');

    return (
      <CodeBlock
        code={code.trim()}
        lang={lang}
        filename={filename}
      />
    );
  }

  // fallback (important)
  return <pre>{children}</pre>;
}
};

export default CustomComponents;
