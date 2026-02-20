/**
 * Lightweight Java-to-JS transpiler for a Java 1 course subset.
 */
export function runJava(code) {
  const output = []
  try {
    const js = transpile(code)
    const fn = new Function('__out', '__arrStr', '__intDiv', js)
    fn(output, arrStr, intDiv)
  } catch (e) {
    output.push(`Fehler: ${e.message}`)
  }
  return output.join('\n')
}

function arrStr(a) { return '[' + a.join(', ') + ']' }
function intDiv(a, b) { return Math.trunc(a / b) }

function transpile(code) {
  const lines = code.split('\n')
  const result = []
  let skipBraceDepth = 0
  let inClassOrMain = false

  for (let line of lines) {
    const trimmed = line.trim()
    // Skip package/import
    if (/^(package|import)\s+/.test(trimmed)) continue
    // Skip class declaration
    if (/^public\s+class\s+\w+\s*\{/.test(trimmed)) { inClassOrMain = true; continue }
    // Skip main method declaration
    if (/public\s+static\s+void\s+main\s*\(/.test(trimmed)) continue
    // Process the line
    result.push(processLine(line))
  }

  let js = result.join('\n')
  // Remove the last 2 standalone closing braces (from class + main)
  let removed = 0
  const jsLines = js.split('\n')
  for (let i = jsLines.length - 1; i >= 0 && removed < 2; i--) {
    if (jsLines[i].trim() === '}') { jsLines[i] = ''; removed++ }
  }
  return jsLines.join('\n')
}

function processLine(line) {
  let s = line

  // System.out.println(...) → __out.push(String(...))
  s = replacePrintln(s)

  // Type declarations → let
  s = s.replace(/\b(int|double|float|long|short|byte|char|boolean|String|var)\s*\[\s*\]\s+/g, 'let ')
  s = s.replace(/\b(int|double|float|long|short|byte|char|boolean|String|var)\s+(?=\w)/g, 'let ')
  s = s.replace(/\bfinal\s+let\s+/g, 'const ')

  // Casts — use function calls with proper paren matching
  s = replaceCast(s, '(int)', 'Math.trunc')
  s = replaceCast(s, '(double)', 'Number')
  s = replaceCast(s, '(float)', 'Number')
  s = replaceCast(s, '(char)', 'String.fromCharCode')

  // Integer division: detect int / int patterns
  // We handle this by replacing standalone / between non-decimal numbers
  s = s.replace(/\b(\d+)\s*\/\s*(\d+)\b/g, '__intDiv($1, $2)')

  // char arithmetic: 'A' + 1 → 'A'.charCodeAt(0) + 1
  s = s.replace(/'(.)'\s*([+\-*%])\s*/g, "'$1'.charCodeAt(0) $2 ")
  s = s.replace(/\s*([+\-*%])\s*'(.)'/g, " $1 '$2'.charCodeAt(0)")

  // Java String methods → JS equivalents
  s = s.replace(/\.length\(\)/g, '.length')  // .length() → .length (property in JS)
  s = s.replace(/\.equals\s*\(/g, ' === (')
  s = s.replace(/\.equalsIgnoreCase\s*\(/g, '.toLowerCase() === (')  // approximate

  // long/float suffixes
  s = s.replace(/(\d+)[lL]\b/g, '$1')
  s = s.replace(/(\d+\.?\d*)[fF]\b/g, '$1')

  // Arrays.toString → __arrStr
  s = s.replace(/Arrays\.toString\s*\(/g, '__arrStr(')

  // new int[n] → new Array(n).fill(0)
  s = s.replace(/new\s+int\s*\[\s*([^\]]+)\s*\]/g, 'new Array($1).fill(0)')
  s = s.replace(/new\s+double\s*\[\s*([^\]]+)\s*\]/g, 'new Array($1).fill(0.0)')
  s = s.replace(/new\s+boolean\s*\[\s*([^\]]+)\s*\]/g, 'new Array($1).fill(false)')
  s = s.replace(/new\s+String\s*\[\s*([^\]]+)\s*\]/g, 'new Array($1).fill(null)')

  // Array initializer {1,2,3} → [1,2,3] (only after = sign to avoid object braces)
  s = s.replace(/=\s*\{([^{}]*)\}/g, '= [$1]')

  return s
}

/** Replace System.out.println/print with proper paren matching */
function replacePrintln(s) {
  const patterns = ['System.out.println', 'System.out.print']
  for (const pat of patterns) {
    let idx = s.indexOf(pat)
    while (idx !== -1) {
      const openParen = s.indexOf('(', idx + pat.length)
      if (openParen === -1) break
      const closeParen = findMatchingParen(s, openParen)
      if (closeParen === -1) break
      const inner = s.substring(openParen + 1, closeParen)
      const before = s.substring(0, idx)
      const after = s.substring(closeParen + 1)
      s = before + '__out.push(String(' + inner + '))' + after
      idx = s.indexOf(pat, before.length + 20)
    }
  }
  return s
}

/** Replace (int)expr, (double)expr etc. with function call */
function replaceCast(s, castStr, funcName) {
  let idx = s.indexOf(castStr)
  while (idx !== -1) {
    const afterCast = idx + castStr.length
    // Skip whitespace
    let exprStart = afterCast
    while (exprStart < s.length && s[exprStart] === ' ') exprStart++
    // Find end of expression: next operator, semicolon, comma, or closing paren
    const exprEnd = findExprEnd(s, exprStart)
    const expr = s.substring(exprStart, exprEnd)
    const before = s.substring(0, idx)
    const after = s.substring(exprEnd)
    s = before + funcName + '(' + expr + ')' + after
    idx = s.indexOf(castStr, before.length + funcName.length + expr.length + 2)
  }
  return s
}

/** Find the matching closing parenthesis */
function findMatchingParen(s, openIndex) {
  let depth = 1
  for (let i = openIndex + 1; i < s.length; i++) {
    if (s[i] === '(') depth++
    else if (s[i] === ')') { depth--; if (depth === 0) return i }
  }
  return -1
}

/** Find end of a simple expression (for cast targets) */
function findExprEnd(s, start) {
  // If starts with (, find matching paren
  if (s[start] === '(') return findMatchingParen(s, start) + 1
  // Otherwise read until operator, semicolon, comma, ), or space followed by operator
  let i = start
  let parenDepth = 0
  while (i < s.length) {
    const ch = s[i]
    if (ch === '(') parenDepth++
    else if (ch === ')') { if (parenDepth === 0) return i; parenDepth-- }
    else if (parenDepth === 0) {
      if (ch === ';' || ch === ',') return i
      if (ch === ' ' || ch === '+' || ch === '-' || ch === '*' || ch === '/' || ch === '%') {
        // Check if it's part of the expression
        if (ch === ' ') { return i }
        return i
      }
    }
    i++
  }
  return i
}
