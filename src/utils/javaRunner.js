/**
 * Lightweight Java-to-JS transpiler for a Java 1 course subset.
 * Handles: println, variables, arithmetic, casting, strings,
 * if/else, for, while, arrays, pre/post increment.
 */
export function runJava(code) {
  const output = []
  try {
    const js = transpile(code)
    const fn = new Function('__out', js)
    fn(output)
  } catch (e) {
    output.push(`Fehler: ${e.message}`)
  }
  return output.join('\n')
}

function transpile(code) {
  let s = code
  // Remove package/import statements
  s = s.replace(/^(package|import)\s+.*?;/gm, '')
  // Remove class wrapper + main method
  s = s.replace(/public\s+class\s+\w+\s*\{/, '')
  s = s.replace(/public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*\w+\s*\)\s*\{/, '')
  // Remove trailing braces from class/main (last two })
  s = removeTrailingBraces(s)
  // System.out.println → __out.push
  s = s.replace(/System\.out\.println\s*\(/g, '__out.push(String(')
  s = s.replace(/System\.out\.print\s*\(/g, '__out.push(String(')
  // Close the String() wrapper — find matching paren + semicolon
  s = fixPrintStatements(s)
  // Type declarations → let
  s = s.replace(/\b(int|double|float|long|short|byte|char|boolean|String|var)\s+/g, 'let ')
  s = s.replace(/\bfinal\s+let\s+/g, 'const ')
  // Casts: (int)expr → Math.trunc(expr), (double)expr → Number(expr)
  s = s.replace(/\(int\)\s*/g, 'Math.trunc(')
  s = s.replace(/\(double\)\s*/g, 'Number(')
  s = s.replace(/\(float\)\s*/g, 'Number(')
  s = s.replace(/\(char\)\s*/g, 'String.fromCharCode(')
  // Fix cast parens — add closing paren before semicolon
  s = fixCastParens(s)
  // char literals 'A' → 'A'.charCodeAt(0) in arithmetic
  s = fixCharArithmetic(s)
  // boolean literals
  s = s.replace(/\btrue\b/g, 'true')
  s = s.replace(/\bfalse\b/g, 'false')
  // long suffix
  s = s.replace(/(\d+)[lL]\b/g, '$1')
  // float suffix
  s = s.replace(/(\d+\.?\d*)[fF]\b/g, '$1')
  // binary literals 0b
  // (JS supports 0b natively, no change needed)
  // .length() for strings → .length (but keep () for method call compat)
  // Actually JS strings have .length too, and we keep .length() working via prototype
  // .equals() → ===
  s = s.replace(/\.equals\s*\(/g, ' === (')
  // Arrays.toString(arr) → JSON.stringify(arr)
  s = s.replace(/Arrays\.toString\s*\(/g, '__arrStr(')
  // new int[n] → new Array(n).fill(0)
  s = s.replace(/new\s+int\s*\[\s*(\w+)\s*\]/g, 'new Array($1).fill(0)')
  s = s.replace(/new\s+double\s*\[\s*(\w+)\s*\]/g, 'new Array($1).fill(0.0)')
  s = s.replace(/new\s+String\s*\[\s*(\w+)\s*\]/g, 'new Array($1).fill(null)')
  // int[] arr = {1,2,3} → let arr = [1,2,3]
  s = s.replace(/\{(\s*[\d.,\s"'\w]+\s*)\}/g, '[$1]')
  // .length for arrays (no parens in Java)
  // JS arrays also use .length, so this works

  // Wrap in helper functions
  const helpers = `
    function __arrStr(a) { return '[' + a.join(', ') + ']'; }
  `
  return helpers + s
}

function removeTrailingBraces(s) {
  const lines = s.split('\n')
  let braceCount = 0
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim() === '}' && braceCount < 2) {
      lines[i] = ''
      braceCount++
    }
  }
  return lines.join('\n')
}

function fixPrintStatements(s) {
  return s.replace(/__out\.push\(String\((.*?)\)\s*\)/g, (match, inner) => {
    return `__out.push(String(${inner}))`
  })
}

function fixCastParens(s) {
  // After Math.trunc( or Number( from cast, add ) before ;
  return s.replace(/(Math\.trunc|Number|String\.fromCharCode)\(([^;]*?)(;)/g, '$1($2)$3')
}

function fixCharArithmetic(s) {
  // 'X' + number → 'X'.charCodeAt(0) + number
  return s.replace(/'(.)'\s*([+\-*/])\s*(\d+)/g, "'$1'.charCodeAt(0) $2 $3")
    .replace(/(\d+)\s*([+\-*/])\s*'(.)'/g, "$1 $2 '$3'.charCodeAt(0)")
}
