import { useState } from 'react'
import CodeBlock from './CodeBlock'

export default function TheoryCard({ title, content, code }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between text-left bg-transparent border-none cursor-pointer hover:bg-slate-750 transition-colors"
      >
        <span className="text-white font-medium">{title}</span>
        <span className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-slate-700 pt-3">
          <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
            {content}
          </div>
          {code && (
            <div className="mt-3">
              <CodeBlock code={code} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
