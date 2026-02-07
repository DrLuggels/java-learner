import Editor from '@monaco-editor/react';
import { useState, useCallback } from 'react';
import { Play, RotateCcw, Loader2, Copy, Check } from 'lucide-react';
import { useJavaRunner } from '../../hooks/useJavaRunner';
import { isAIConfigured } from '../../utils/aiProvider';
import LineExplainPopover from './LineExplainPopover';

interface CodeEditorProps {
  initialCode: string;
  onCodeChange?: (code: string) => void;
  onRunResult?: (stdout: string, stderr: string) => void;
  height?: string;
  readOnly?: boolean;
  showRunButton?: boolean;
}

export default function CodeEditor({
  initialCode,
  onCodeChange,
  onRunResult,
  height = '300px',
  readOnly = false,
  showRunButton = true,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [explainLine, setExplainLine] = useState<{ line: string; lineNumber: number } | null>(null);
  const { output, isRunning, run, clear } = useJavaRunner();
  const hasAI = isAIConfigured();

  const handleEditorMount = useCallback((editor: unknown) => {
    if (!hasAI) return;
    const ed = editor as { addAction: (action: unknown) => void; getPosition: () => { lineNumber: number } | null; getModel: () => { getLineContent: (n: number) => string } | null };
    ed.addAction({
      id: 'explain-line',
      label: 'Erklaere diese Zeile (AI)',
      contextMenuGroupId: '9_cutcopypaste',
      contextMenuOrder: 99,
      run: () => {
        const pos = ed.getPosition();
        const model = ed.getModel();
        if (pos && model) {
          const lineContent = model.getLineContent(pos.lineNumber);
          setExplainLine({ line: lineContent, lineNumber: pos.lineNumber });
        }
      },
    });
  }, [hasAI]);

  const handleRun = async () => {
    const result = await run(code);
    onRunResult?.(result.stdout, result.stderr);
  };

  const handleReset = () => {
    setCode(initialCode);
    onCodeChange?.(initialCode);
    clear();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const isFullSize = height === '100%';
  const editorOptions = {
    minimap: { enabled: false }, fontSize: 14,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    lineNumbers: 'on' as const, scrollBeyondLastLine: false, automaticLayout: true,
    tabSize: 4, readOnly, wordWrap: 'on' as const, padding: { top: 12 },
    renderLineHighlight: 'line' as const, cursorBlinking: 'smooth' as const,
    smoothScrolling: true, bracketPairColorization: { enabled: true },
  };

  return (
    <div className={`rounded-lg border border-dark-600 overflow-hidden bg-dark-800 w-full ${isFullSize ? 'h-full flex flex-col' : ''}`}>
      <div className="flex items-center justify-between px-3 py-2 bg-dark-700 border-b border-dark-600 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-accent-red/60" />
            <div className="w-3 h-3 rounded-full bg-accent-orange/60" />
            <div className="w-3 h-3 rounded-full bg-accent-green/60" />
          </div>
          <span className="text-xs text-dark-400 ml-2 mono">Main.java</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleCopy} className="p-1.5 text-dark-400 hover:text-dark-200 transition-colors" title="Code kopieren">
            {copied ? <Check className="w-3.5 h-3.5 text-accent-green" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button onClick={handleReset} className="p-1.5 text-dark-400 hover:text-dark-200 transition-colors" title="Zurücksetzen">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          {showRunButton && (
            <button onClick={handleRun} disabled={isRunning}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-accent-green/20 text-accent-green hover:bg-accent-green/30 disabled:opacity-50 transition-colors text-sm font-medium">
              {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
              {isRunning ? 'Läuft...' : 'Ausführen'}
            </button>
          )}
        </div>
      </div>

      {isFullSize ? (
        <div className="flex-1 min-h-0">
          <Editor height="100%" defaultLanguage="java" value={code} onChange={handleEditorChange}
            onMount={handleEditorMount} theme="vs-dark" options={editorOptions} />
        </div>
      ) : (
        <Editor height={height} defaultLanguage="java" value={code} onChange={handleEditorChange}
          onMount={handleEditorMount} theme="vs-dark" options={editorOptions} />
      )}

      {output && (
        <div className="border-t border-dark-600 shrink-0">
          <div className="px-3 py-1.5 bg-dark-700 flex items-center gap-2">
            <span className="text-xs font-medium text-dark-400">Ausgabe</span>
            {output.exitCode === 0 ? (
              <span className="text-xs text-accent-green">Erfolgreich</span>
            ) : (
              <span className="text-xs text-accent-red">Fehler (Exit Code: {output.exitCode})</span>
            )}
          </div>
          <pre className="p-3 text-sm mono max-h-48 overflow-auto">
            {output.stdout && <span className="text-dark-200">{output.stdout}</span>}
            {output.stderr && <span className="text-accent-red">{output.stderr}</span>}
            {!output.stdout && !output.stderr && <span className="text-dark-500">(Keine Ausgabe)</span>}
          </pre>
        </div>
      )}

      {explainLine && (
        <div className="border-t border-dark-600 p-3 shrink-0">
          <LineExplainPopover
            line={explainLine.line}
            lineNumber={explainLine.lineNumber}
            fullCode={code}
            onClose={() => setExplainLine(null)}
          />
        </div>
      )}
    </div>
  );
}
