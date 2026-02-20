export const theory = [
  {
    title: 'if-Anweisung',
    content: 'Die if-Anweisung führt einen Block nur aus, wenn die Bedingung true ergibt.',
    code: 'if (alter >= 18) {\n    System.out.println("Volljährig");\n}'
  },
  {
    title: 'if-else und if-else-if-Kette',
    content: 'Mit else wird ein alternativer Block ausgeführt. Mit else if können mehrere Bedingungen geprüft werden. Nur der erste zutreffende Block wird ausgeführt.',
    code: 'if (note == 1) {\n    System.out.println("Sehr gut");\n} else if (note == 2) {\n    System.out.println("Gut");\n} else {\n    System.out.println("Andere Note");\n}'
  },
  {
    title: 'switch-case mit break',
    content: 'switch vergleicht einen Wert mit mehreren Fällen. Ohne break tritt Fall-Through auf: alle folgenden Fälle werden ebenfalls ausgeführt. default fängt alle nicht abgedeckten Fälle ab.',
    code: 'switch (tag) {\n    case 1: System.out.println("Mo"); break;\n    case 2: System.out.println("Di"); break;\n    default: System.out.println("Anderer Tag");\n}'
  },
  {
    title: 'Switch-Expressions (Java 14+)',
    content: 'Switch-Expressions verwenden den Pfeil-Operator (->). Sie haben keinen Fall-Through und können direkt einen Wert zurückgeben.',
    code: 'String ergebnis = switch (tag) {\n    case 1 -> "Montag";\n    case 2 -> "Dienstag";\n    default -> "Anderer Tag";\n};'
  },
  {
    title: 'Verschachtelte Bedingungen',
    content: 'Bedingungen können ineinander verschachtelt werden. Dabei gehört ein else immer zum nächstgelegenen if ohne else.',
    code: 'if (x > 0) {\n    if (x > 100) {\n        System.out.println("Groß");\n    } else {\n        System.out.println("Klein");\n    }\n}'
  },
  {
    title: '= vs == Fehler',
    content: 'Ein häufiger Fehler: = ist eine Zuweisung, == ein Vergleich. if(x = 5) führt bei int zu einem Compilerfehler, da das Ergebnis kein boolean ist.',
    code: 'int x = 3;\n// if (x = 5) {}  // Compilerfehler!\nif (x == 5) {}    // Korrekt: Vergleich'
  }
];

export const questions = [
  { id: 'm3q1', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'if (true) {\n    System.out.println("A");\n} else {\n    System.out.println("B");\n}', options: ['A', 'B', 'AB', 'Compilerfehler'], answer: 'A', explanation: 'Die Bedingung ist true, daher wird nur der if-Block ausgeführt und "A" ausgegeben.' },
  { id: 'm3q2', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'int x = 2;\nswitch (x) {\n    case 1: System.out.print("A");\n    case 2: System.out.print("B");\n    case 3: System.out.print("C");\n    default: System.out.print("D");\n}', options: ['B', 'BCD', 'ABCD', 'BD'], answer: 'BCD', explanation: 'Ohne break tritt Fall-Through auf: Ab case 2 werden alle folgenden Fälle (B, C, D) ausgeführt.' },
  { id: 'm3q3', type: 'mc', question: 'Was ist eine Switch-Expression?', options: ['Ein switch, der nur Zahlen akzeptiert', 'Ein switch mit -> Syntax, der einen Wert zurückgeben kann und kein break braucht', 'Ein switch ohne default', 'Ein switch mit Schleifen'], answer: 'Ein switch mit -> Syntax, der einen Wert zurückgeben kann und kein break braucht', explanation: 'Switch-Expressions (ab Java 14) nutzen den Pfeil-Operator (->), haben kein Fall-Through und können Werte zurückgeben.' },
  { id: 'm3q4', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'int x = 15;\nif (x > 20) {\n    System.out.println("A");\n} else if (x > 10) {\n    System.out.println("B");\n} else {\n    System.out.println("C");\n}', options: ['A', 'B', 'C', 'AB'], answer: 'B', explanation: 'x = 15: x > 20 ist false, x > 10 ist true, also wird "B" ausgegeben.' },
  { id: 'm3q5', type: 'mc', question: 'Welche zwei Hauptarten von Fallunterscheidungen gibt es in Java?', options: ['if-else und switch', 'for und while', 'try und catch', 'if und for'], answer: 'if-else und switch', explanation: 'Die zwei Hauptarten der Fallunterscheidung in Java sind if-else und switch.' },
  { id: 'm3q6', type: 'mc', question: 'Was passiert bei einem switch ohne break-Anweisungen?', options: ['Compilerfehler', 'Nur der passende case wird ausgeführt', 'Fall-Through: Alle Fälle ab dem Treffer werden ausgeführt', 'Das Programm stürzt ab'], answer: 'Fall-Through: Alle Fälle ab dem Treffer werden ausgeführt', explanation: 'Ohne break werden alle Anweisungen ab dem passenden case bis zum Ende des switch ausgeführt (Fall-Through).' },
  { id: 'm3q7', type: 'truefalse', question: 'Kann ein switch-Statement mit Strings arbeiten?', options: ['Wahr', 'Falsch'], answer: 'Wahr', explanation: 'Seit Java 7 kann switch mit Strings arbeiten. Der Vergleich nutzt intern die equals()-Methode.' },
  { id: 'm3q8', type: 'truefalse', question: 'Bei einer Switch-Expression mit -> braucht man kein break.', options: ['Wahr', 'Falsch'], answer: 'Wahr', explanation: 'Die Pfeil-Syntax (->) in Switch-Expressions verhindert automatisch Fall-Through. Ein break ist nicht nötig.' },
  { id: 'm3q9', type: 'mc', question: 'Kompiliert folgender Code?', code: 'int x = 3;\nif (x = 5) {\n    System.out.println("gleich");\n}', options: ['Ja, gibt "gleich" aus', 'Ja, gibt nichts aus', 'Nein, Compilerfehler: = statt ==', 'Nein, x ist nicht deklariert'], answer: 'Nein, Compilerfehler: = statt ==', explanation: 'x = 5 ist eine Zuweisung (Typ int), kein Vergleich. if erwartet einen boolean-Ausdruck, daher Compilerfehler.' },
  { id: 'm3q10', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'int x = 5;\nif (x > 3) {\n    if (x > 10) {\n        System.out.println("A");\n    } else {\n        System.out.println("B");\n    }\n} else {\n    System.out.println("C");\n}', options: ['A', 'B', 'C', 'Nichts'], answer: 'B', explanation: 'x = 5: x > 3 ist true (äußeres if). x > 10 ist false, also wird der innere else-Block ausgeführt: "B".' },
  { id: 'm3q11', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'int x = 42;\nswitch (x) {\n    case 1: System.out.println("Eins"); break;\n    case 2: System.out.println("Zwei"); break;\n    default: System.out.println("Andere");\n}', options: ['Eins', 'Zwei', 'Andere', 'Compilerfehler'], answer: 'Andere', explanation: 'Da x = 42 keinem case entspricht, wird der default-Block ausgeführt: "Andere".' },
  { id: 'm3q12', type: 'mc', question: 'Was ist der Wert von x?', code: 'int x = (3 > 5) ? 10 : 20;', options: ['10', '20', '3', 'Compilerfehler'], answer: '20', explanation: '3 > 5 ist false, daher wird der Wert nach dem : genommen: x = 20.' }
];
