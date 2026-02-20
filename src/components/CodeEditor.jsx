import { useRef, useEffect, useState, useCallback } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-java'

export default function CodeEditor({ value, onChange, minHeight = 200 }) {
  const textareaRef = useRef(null)
  const preRef = useRef(null)
  const [highlighted, setHighlighted] = useState('')

  useEffect(() => {
    const html = Prism.highlight(value || '', Prism.languages.java, 'java')
    setHighlighted(html + '\n ')
  }, [value])

  const syncScroll = useCallback(() => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop
      preRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const ta = textareaRef.current
      const start = ta.selectionStart
      const end = ta.selectionEnd
      const newValue = value.substring(0, start) + '    ' + value.substring(end)
      onChange(newValue)
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 4
      })
    }
  }

  return (
    <div className="code-editor-wrapper" style={{ position: 'relative', minHeight }}>
      <pre
        ref={preRef}
        className="code-editor-highlight"
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          margin: 0, padding: '12px', overflow: 'auto',
          fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
          fontSize: '0.8125rem', lineHeight: '1.5', whiteSpace: 'pre-wrap',
          wordWrap: 'break-word', background: '#0a0e1a', color: '#e2e8f0',
          borderRadius: 0, border: 'none', pointerEvents: 'none',
        }}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        onScroll={syncScroll}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        style={{
          position: 'relative', width: '100%', minHeight,
          margin: 0, padding: '12px', overflow: 'auto', resize: 'vertical',
          fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
          fontSize: '0.8125rem', lineHeight: '1.5', whiteSpace: 'pre-wrap',
          wordWrap: 'break-word', background: 'transparent', color: 'transparent',
          caretColor: '#e2e8f0', border: 'none', outline: 'none',
          WebkitTextFillColor: 'transparent',
        }}
      />
    </div>
  )
}
