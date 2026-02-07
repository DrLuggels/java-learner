import CodeEditor from '../editor/CodeEditor';
import type { CodeExample } from '../../types';

interface CodeExampleStepProps {
  codeExample: CodeExample;
  onComplete: () => void;
}

export default function CodeExampleStep({ codeExample, onComplete }: CodeExampleStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-dark-100 mb-1">{codeExample.title}</h3>
        <p className="text-sm text-dark-400">{codeExample.description}</p>
      </div>

      <CodeEditor
        initialCode={codeExample.code}
        height="250px"
        readOnly={!codeExample.editable}
        showRunButton={codeExample.editable}
      />

      {codeExample.expectedOutput && (
        <div className="text-xs text-dark-500">
          Erwartete Ausgabe: <code className="bg-dark-700 px-1.5 py-0.5 rounded text-accent-cyan">{codeExample.expectedOutput}</code>
        </div>
      )}

      <button
        onClick={onComplete}
        className="px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-lg hover:bg-accent-blue/30 transition-colors text-sm font-medium"
      >
        Weiter
      </button>
    </div>
  );
}
