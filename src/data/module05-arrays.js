export const theory = [
  {
    title: 'Array-Deklaration und Initialisierung',
    content: 'Arrays sind Container fester Größe für Elemente des gleichen Typs. Deklaration: int[] a = new int[5]; oder int[] a = {1, 2, 3}; Die Größe wird bei der Erstellung festgelegt und kann nicht mehr geändert werden.',
    code: 'int[] zahlen = new int[3];        // [0, 0, 0]\nint[] werte = {10, 20, 30};       // [10, 20, 30]\nString[] namen = new String[2];   // [null, null]'
  },
  {
    title: 'Zugriff und length',
    content: 'Array-Elemente werden über ihren Index angesprochen (0-basiert). Das erste Element hat Index 0, das letzte Index length-1. length ist ein Feld (keine Methode!), daher ohne Klammern.',
    code: 'int[] a = {10, 20, 30};\na[0]       // 10 (erstes Element)\na[2]       // 30 (letztes Element)\na.length   // 3 (Feld, keine Klammern!)'
  },
  {
    title: 'Iteration mit for und for-each',
    content: 'Klassische for-Schleife nutzt den Index. Die for-each-Schleife (enhanced for) iteriert direkt über die Elemente, ohne Index-Zugriff.',
    code: 'int[] a = {1, 2, 3};\n// Klassisch:\nfor (int i = 0; i < a.length; i++) {\n    System.out.println(a[i]);\n}\n// For-each:\nfor (int x : a) {\n    System.out.println(x);\n}'
  },
  {
    title: 'Mehrdimensionale Arrays',
    content: 'Mehrdimensionale Arrays sind Arrays von Arrays. int[][] m = new int[2][3] erzeugt eine Matrix mit 2 Zeilen und 3 Spalten. m.length gibt die Anzahl der Zeilen, m[0].length die Anzahl der Spalten.',
    code: 'int[][] matrix = {\n    {1, 2, 3},\n    {4, 5, 6}\n};\nmatrix[1][2]   // 6\nmatrix.length  // 2 (Zeilen)'
  },
  {
    title: 'VarArgs und String[] args',
    content: 'VarArgs (Variable Arguments) erlauben eine variable Anzahl von Parametern. Intern wird ein Array erzeugt. String[] args in der main-Methode empfängt Kommandozeilenargumente.',
    code: 'public static int summe(int... zahlen) {\n    int s = 0;\n    for (int z : zahlen) s += z;\n    return s;\n}\nsumme(1, 2, 3); // 6'
  },
  {
    title: 'Arrays.toString() und ArrayIndexOutOfBoundsException',
    content: 'Arrays.toString() gibt eine lesbare String-Darstellung zurück. Ein Zugriff außerhalb des gültigen Index (< 0 oder >= length) löst eine ArrayIndexOutOfBoundsException aus.',
    code: 'int[] a = {1, 2, 3};\nSystem.out.println(Arrays.toString(a)); // [1, 2, 3]\n// a[3] = 4; // ArrayIndexOutOfBoundsException!'
  }
];

export const questions = [
  { id: 'm5q1', type: 'mc', question: 'Was ist der Standardwert von a[0] nach: int[] a = new int[3];?', options: ['null', '0', '1', 'undefiniert'], answer: '0', explanation: 'Primitive Arrays werden mit Standardwerten initialisiert. Für int ist der Standardwert 0.' },
  { id: 'm5q2', type: 'mc', question: 'Was passiert bei folgendem Code?', code: 'int[] a = {1, 2, 3};\na[3] = 4;', options: ['a wird auf {1, 2, 3, 4} erweitert', 'Compilerfehler', 'ArrayIndexOutOfBoundsException', 'a[3] wird ignoriert'], answer: 'ArrayIndexOutOfBoundsException', explanation: 'Der gültige Indexbereich ist 0-2. Index 3 liegt außerhalb und löst eine ArrayIndexOutOfBoundsException aus.' },
  { id: 'm5q3', type: 'mc', question: 'Was ist der Unterschied zwischen array.length und string.length()?', options: ['Kein Unterschied', 'length ist ein Feld bei Arrays, length() ist eine Methode bei Strings', 'length() ist ein Feld, length ist eine Methode', 'Beide sind Methoden'], answer: 'length ist ein Feld bei Arrays, length() ist eine Methode bei Strings', explanation: 'Bei Arrays ist length ein öffentliches Feld (ohne Klammern). Bei Strings ist length() eine Methode (mit Klammern).' },
  { id: 'm5q4', type: 'mc', question: 'Was gibt Arrays.toString(new int[]{1, 2, 3}) aus?', options: ['123', '{1, 2, 3}', '[1, 2, 3]', '1, 2, 3'], answer: '[1, 2, 3]', explanation: 'Arrays.toString() gibt die Elemente in eckigen Klammern, durch Komma und Leerzeichen getrennt, aus.' },
  { id: 'm5q5', type: 'mc', question: 'Was ist m.length bei: int[][] m = new int[2][3];?', options: ['3', '6', '2', '5'], answer: '2', explanation: 'm.length gibt die Anzahl der Zeilen (erste Dimension) zurück, also 2.' },
  { id: 'm5q6', type: 'mc', question: 'Was sind VarArgs in Java?', options: ['Variable Datentypen', 'Variable Anzahl von Parametern gleichen Typs', 'Variablen ohne Typ', 'Globale Variablen'], answer: 'Variable Anzahl von Parametern gleichen Typs', explanation: 'VarArgs (z.B. int... zahlen) erlauben, eine beliebige Anzahl von Argumenten desselben Typs zu übergeben.' },
  { id: 'm5q7', type: 'mc', question: 'Was ist a.length bei: int[] a = {5, 3, 1};?', options: ['1', '5', '3', '0'], answer: '3', explanation: 'Das Array hat 3 Elemente, daher ist a.length = 3.' },
  { id: 'm5q8', type: 'truefalse', question: 'Die Größe eines Arrays kann nach der Erstellung geändert werden.', options: ['Wahr', 'Falsch'], answer: 'Falsch', explanation: 'Arrays haben eine feste Größe. Nach der Erstellung kann die Länge nicht mehr geändert werden.' },
  { id: 'm5q9', type: 'mc', question: 'Was empfängt String[] args in der main-Methode?', options: ['Die Klassennamen', 'Kommandozeilenargumente', 'Umgebungsvariablen', 'Dateipfade'], answer: 'Kommandozeilenargumente', explanation: 'String[] args nimmt die beim Programmstart übergebenen Kommandozeilenargumente entgegen.' },
  { id: 'm5q10', type: 'truefalse', question: 'int[] a = new int[0]; ist gültiger Java-Code.', options: ['Wahr', 'Falsch'], answer: 'Wahr', explanation: 'Ein leeres Array mit Länge 0 ist vollkommen gültig. Es enthält keine Elemente, aber existiert als Objekt.' },
  { id: 'm5q11', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'int[] a = {10, 20, 30};\nfor (int x : a) {\n    System.out.print(x + " ");\n}', options: ['0 1 2', '10 20 30', '10, 20, 30', '[10, 20, 30]'], answer: '10 20 30', explanation: 'Die for-each-Schleife durchläuft alle Elemente. Jedes Element wird mit einem Leerzeichen ausgegeben.' },
  { id: 'm5q12', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'int[][] m = {{1, 2}, {3, 4}, {5, 6}};\nSystem.out.println(m[2][1]);', options: ['2', '4', '5', '6'], answer: '6', explanation: 'm[2] ist die dritte Zeile {5, 6}. m[2][1] ist das zweite Element dieser Zeile, also 6.' }
];
