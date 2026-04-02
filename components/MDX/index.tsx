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
      (child: any) => (child as any).type === 'code'
    ) as any;

    if (codeElement) {
      const { children: code, className } = codeElement.props;
      const fullLang = className?.replace('language-', '') || 'text';
      const [lang, filename] = fullLang.split(':');
      return <CodeBlock code={code.trim()} lang={lang} filename={filename} />;
    }

    return <pre>{children}</pre>;
  }
};

export default CustomComponents;
