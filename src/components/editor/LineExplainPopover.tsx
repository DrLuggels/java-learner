import { useState, useEffect } from 'react';
import { Sparkles, Loader2, X, MessageCircle } from 'lucide-react';
import { sendToAI } from '../../utils/aiProvider';

interface LineExplainPopoverProps {
  line: string;
  lineNumber: number;
  fullCode: string;
  onClose: () => void;
}

export default function LineExplainPopover({ line, lineNumber, fullCode, onClose }: LineExplainPopoverProps) {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const prompt = `Erklaere diese Java-Codezeile kurz und einfach (max 2 Saetze, auf Deutsch):
Zeile ${lineNumber}: \`${line.trim()}\`

Vollstaendiger Code:
\`\`\`java
${fullCode}
\`\`\``;
        const response = await sendToAI([{ role: 'user', content: prompt }]);
        if (!cancelled) setExplanation(response);
      } catch {
        if (!cancelled) setExplanation('Erklaerung konnte nicht geladen werden.');
      }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [line, lineNumber, fullCode]);

  return (
    <div className="p-3 rounded-lg bg-dark-800 border border-accent-blue/30 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-accent-blue flex items-center gap-1">
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
          Zeile {lineNumber}
        </span>
        <button onClick={onClose} className="text-dark-500 hover:text-dark-300">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <pre className="text-xs mono text-dark-400 bg-dark-900 rounded p-2 mb-2 overflow-x-auto">
        <code>{line.trim()}</code>
      </pre>
      {loading ? (
        <div className="flex items-center gap-2 text-sm text-dark-400">
          <MessageCircle className="w-3.5 h-3.5" /> Erklaerung wird generiert...
        </div>
      ) : (
        <p className="text-sm text-dark-300 leading-relaxed">{explanation}</p>
      )}
    </div>
  );
}
