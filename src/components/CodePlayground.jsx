import { useState, useCallback } from 'react'
import { runJava } from '../utils/javaRunner'
import CodeEditor from './CodeEditor'

export default function CodePlayground({ initialCode, title }) {
  const [code, setCode] = useState(initialCode || DEFAULT_CODE)
  const [output, setOutput] = useState('')
  const [hasRun, setHasRun] = useState(false)

  const handleRun = useCallback(() => {
    setOutput(runJava(code))
    setHasRun(true)
  }, [code])

  const handleReset = () => {
    setCode(initialCode || DEFAULT_CODE)
    setOutput('')
    setHasRun(false)
  }

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') handleRun()
  }

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden" onKeyDown={handleKeyDown}>
      {title && (
        <div className="px-4 py-2 bg-slate-750 border-b border-slate-700 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-300">{title}</span>
          <span className="text-xs text-slate-500">Java Playground</span>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-700">
        <div className="flex flex-col">
          <div className="px-3 py-1.5 bg-slate-900/50 border-b border-slate-700 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">Code</span>
            <button onClick={handleReset} className="text-xs text-slate-500 hover:text-slate-300 bg-transparent border-none cursor-pointer">
              Zurücksetzen
            </button>
          </div>
          <CodeEditor value={code} onChange={setCode} minHeight={200} />
        </div>
        <div className="flex flex-col">
          <div className="px-3 py-1.5 bg-slate-900/50 border-b border-slate-700">
            <span className="text-xs text-slate-500 font-mono">Ausgabe</span>
          </div>
          <div className="flex-1 min-h-[200px] bg-slate-950 p-3 font-mono text-sm whitespace-pre-wrap">
            {hasRun ? (
              <span className={output.startsWith('Fehler') ? 'text-red-400' : 'text-white'}>
                {output || '(keine Ausgabe)'}
              </span>
            ) : (
              <span className="text-slate-600">Drücke "Ausführen" oder Strg+Enter</span>
            )}
          </div>
        </div>
      </div>
      <div className="px-3 py-2 bg-slate-900/50 border-t border-slate-700 flex items-center justify-between">
        <button
          onClick={handleRun}
          className="px-4 py-1.5 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 transition-colors border-none cursor-pointer"
        >
          ▶ Ausführen
        </button>
        <span className="text-xs text-slate-600">Strg+Enter zum Ausführen</span>
      </div>
    </div>
  )
}

const DEFAULT_CODE = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hallo Welt!");
        System.out.println(5 + 3);
        System.out.println("Ergebnis: " + (10 / 3));
    }
}`
