import { useState } from 'react';
import { Search, Loader2, X, Sparkles } from 'lucide-react';
import { sendToAI, isAIConfigured } from '../../utils/aiProvider';
import type { Exercise } from '../../types';

interface CodeReviewPanelProps {
  exercise: Exercise;
  code: string;
}

export default function CodeReviewPanel({ exercise, code }: CodeReviewPanelProps) {
  const [review, setReview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  if (!isAIConfigured()) return null;

  const handleReview = async () => {
    setOpen(true);
    setLoading(true);
    try {
      const prompt = `Mache ein kurzes Code-Review fuer diesen Java-Code eines Anfaengers.
Aufgabe: "${exercise.title}" - ${exercise.description}
Anforderungen: ${exercise.requirements.join(', ')}

Code:
\`\`\`java
${code}
\`\`\`

Gib Feedback zu (jeweils max 1 Satz, nur wenn relevant):
1. Namenskonventionen (camelCase, sprechende Namen)
2. Code-Stil (Einrueckung, Klammern)
3. Verbesserungsvorschlaege (ohne die Loesung zu verraten)

Antworte auf Deutsch. Maximal 5 Punkte. Wenn der Code gut ist, sage das. Formatiere als Aufzaehlung mit - am Anfang.`;

      const response = await sendToAI([{ role: 'user', content: prompt }]);
      setReview(response);
    } catch {
      setReview('Code-Review konnte nicht geladen werden.');
    }
    setLoading(false);
  };

  if (!open) {
    return (
      <button onClick={handleReview}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-dark-700 text-dark-400 rounded-lg hover:bg-dark-600 hover:text-dark-300 transition-colors">
        <Search className="w-3.5 h-3.5" />
        Code Review
      </button>
    );
  }

  return (
    <div className="p-3 rounded-lg bg-dark-800 border border-dark-600 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-accent-blue flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> AI Code Review
        </span>
        <button onClick={() => { setOpen(false); setReview(null); }} className="text-dark-500 hover:text-dark-300">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      {loading ? (
        <div className="flex items-center gap-2 text-sm text-dark-400">
          <Loader2 className="w-4 h-4 animate-spin" /> Analysiere deinen Code...
        </div>
      ) : (
        <div className="text-sm text-dark-300 leading-relaxed whitespace-pre-wrap">{review}</div>
      )}
    </div>
  );
}
