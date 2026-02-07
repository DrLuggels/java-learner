import { useState, useCallback } from 'react';
import { MessageCircle, X, Loader2, Sparkles } from 'lucide-react';
import { sendToAI } from '../../utils/aiProvider';
import { isAIConfigured } from '../../utils/aiProvider';

interface CodeExplainerProps {
  code: string;
  annotations?: Record<number, string>;
}

export default function CodeExplainer({ code, annotations }: CodeExplainerProps) {
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const lines = code.split('\n');
  const hasAI = isAIConfigured();

  const handleLineClick = useCallback(async (lineNum: number) => {
    setSelectedLine(lineNum);
    setAiExplanation(null);

    // Static annotation available
    if (annotations?.[lineNum]) return;

    // Try AI explanation
    if (hasAI) {
      setLoading(true);
      try {
        const line = lines[lineNum - 1];
        const response = await sendToAI([{
          role: 'user',
          content: `Erklaere diese Java-Codezeile kurz und einfach (max 2 Saetze, auf Deutsch):\n\`${line}\`\n\nKontext (vollstaendiger Code):\n\`\`\`java\n${code}\n\`\`\``,
        }]);
        setAiExplanation(response);
      } catch {
        setAiExplanation('Erklaerung konnte nicht geladen werden.');
      }
      setLoading(false);
    }
  }, [annotations, code, hasAI, lines]);

  const closePopover = () => {
    setSelectedLine(null);
    setAiExplanation(null);
  };

  return (
    <div className="relative">
      <div className="bg-dark-900 rounded-lg border border-dark-600 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 bg-dark-700 border-b border-dark-600">
          <MessageCircle className="w-4 h-4 text-accent-blue" />
          <span className="text-xs text-dark-400">Klicke auf eine Zeile fuer eine Erklaerung</span>
        </div>

        {/* Code with clickable lines */}
        <div className="p-3 overflow-x-auto">
          <pre className="text-sm mono leading-relaxed">
            {lines.map((line, i) => {
              const lineNum = i + 1;
              const hasAnnotation = !!annotations?.[lineNum];
              const isSelected = selectedLine === lineNum;

              return (
                <div
                  key={i}
                  onClick={() => handleLineClick(lineNum)}
                  className={`flex items-start cursor-pointer rounded px-1 -mx-1 transition-colors ${
                    isSelected ? 'bg-accent-blue/10' :
                    hasAnnotation ? 'hover:bg-accent-blue/5' :
                    'hover:bg-dark-800'
                  }`}
                >
                  <span className={`select-none w-8 text-right mr-3 shrink-0 ${
                    hasAnnotation ? 'text-accent-blue' : 'text-dark-600'
                  }`}>
                    {lineNum}
                    {hasAnnotation && <span className="ml-0.5 text-[8px]">●</span>}
                  </span>
                  <span className="text-dark-200 whitespace-pre">{line}</span>
                </div>
              );
            })}
          </pre>
        </div>
      </div>

      {/* Explanation Popover */}
      {selectedLine && (
        <div className="mt-2 bg-dark-800 border border-accent-blue/30 rounded-lg p-3 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-accent-blue font-medium flex items-center gap-1">
              {annotations?.[selectedLine] ? <MessageCircle className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
              Zeile {selectedLine}
            </span>
            <button onClick={closePopover} className="text-dark-500 hover:text-dark-300">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-dark-400">
              <Loader2 className="w-4 h-4 animate-spin" /> Erklaerung wird generiert...
            </div>
          ) : (
            <p className="text-sm text-dark-300">
              {annotations?.[selectedLine] || aiExplanation || 'Keine Erklaerung verfuegbar.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
