import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeExampleProps {
  title: string;
  language?: string;
  code: string;
  description?: string;
}

export default function CodeExample({ title, language = 'javascript', code, description }: CodeExampleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-example">
      {description && <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{description}</p>}
      <div className="code-example-header">
        <span className="code-example-title">{title}</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          className="copy-button"
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className="overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
