import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

export interface ExecutionSnapshot {
  line: number;
  variables: Record<string, string>;
  output: string;
  comment?: string;
}

interface VariableStateTableProps {
  code: string;
  trace: ExecutionSnapshot[];
}

export default function VariableStateTable({ code, trace }: VariableStateTableProps) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = trace[step];
  const lines = code.split('\n');

  // All variable names across the trace
  const allVars = [...new Set(trace.flatMap(s => Object.keys(s.variables)))];

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setStep(prev => {
          if (prev >= trace.length - 1) { setPlaying(false); return prev; }
          return prev + 1;
        });
      }, 1500);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, trace.length]);

  const reset = () => { setStep(0); setPlaying(false); };

  return (
    <div className="bg-dark-800 border border-dark-600 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-dark-700 border-b border-dark-600">
        <span className="text-sm font-medium text-dark-200">Code-Ablauf Schritt fuer Schritt</span>
        <span className="text-xs text-dark-500">Schritt {step + 1}/{trace.length}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-x divide-dark-600">
        {/* Code with highlighted line */}
        <div className="p-3 overflow-x-auto">
          <pre className="text-xs mono leading-relaxed">
            {lines.map((line, i) => (
              <div key={i} className={`px-2 rounded ${
                i + 1 === current?.line ? 'bg-accent-blue/15 text-accent-blue' : 'text-dark-400'
              }`}>
                <span className="inline-block w-6 text-right mr-2 select-none text-dark-600">{i + 1}</span>
                {line}
              </div>
            ))}
          </pre>
        </div>

        {/* Variable State + Output */}
        <div className="p-3 space-y-3">
          {/* Variable table */}
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr>
                <th className="text-left text-dark-500 pb-1 pr-4">Variable</th>
                <th className="text-left text-dark-500 pb-1">Wert</th>
              </tr>
            </thead>
            <tbody>
              {allVars.map(varName => {
                const value = current?.variables[varName];
                const prevValue = step > 0 ? trace[step - 1]?.variables[varName] : undefined;
                const changed = value !== prevValue;
                return (
                  <tr key={varName} className={changed ? 'animate-pulse' : ''}>
                    <td className="pr-4 py-1 mono text-dark-300">{varName}</td>
                    <td className={`py-1 mono ${
                      value === undefined ? 'text-dark-600 italic' :
                      changed ? 'text-accent-green font-medium' : 'text-dark-200'
                    }`}>
                      {value ?? '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Console output */}
          {current?.output && (
            <div>
              <span className="text-[10px] text-dark-500 uppercase tracking-wider">Konsolenausgabe</span>
              <pre className="mt-1 p-2 bg-dark-900 rounded text-xs mono text-accent-cyan whitespace-pre-wrap">
                {current.output}
              </pre>
            </div>
          )}

          {/* Comment */}
          {current?.comment && (
            <p className="text-xs text-dark-400 italic">{current.comment}</p>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2 px-4 py-2 border-t border-dark-600 bg-dark-750">
        <button onClick={reset} className="p-1.5 text-dark-400 hover:text-dark-200 transition-colors" title="Zuruecksetzen">
          <RotateCcw className="w-4 h-4" />
        </button>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          className="p-1.5 text-dark-400 hover:text-dark-200 disabled:opacity-30 transition-colors">
          <SkipBack className="w-4 h-4" />
        </button>
        <button onClick={() => setPlaying(!playing)}
          className="p-2 bg-accent-blue/20 text-accent-blue rounded-lg hover:bg-accent-blue/30 transition-colors">
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button onClick={() => setStep(s => Math.min(trace.length - 1, s + 1))} disabled={step >= trace.length - 1}
          className="p-1.5 text-dark-400 hover:text-dark-200 disabled:opacity-30 transition-colors">
          <SkipForward className="w-4 h-4" />
        </button>

        {/* Progress dots */}
        <div className="flex gap-0.5 ml-3">
          {trace.map((_, i) => (
            <button key={i} onClick={() => setStep(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === step ? 'bg-accent-blue' : i < step ? 'bg-accent-green/50' : 'bg-dark-600'
              }`} />
          ))}
        </div>
      </div>
    </div>
  );
}
