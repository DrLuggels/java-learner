export const theory = [
  {
    title: 'while-Schleife',
    content: 'Die while-Schleife prüft die Bedingung vor jedem Durchlauf. Ist die Bedingung von Anfang an false, wird der Schleifenkörper nie ausgeführt.',
    code: 'int i = 0;\nwhile (i < 5) {\n    System.out.println(i);\n    i++;\n}'
  },
  {
    title: 'do-while-Schleife',
    content: 'Die do-while-Schleife prüft die Bedingung nach jedem Durchlauf. Der Schleifenkörper wird daher mindestens einmal ausgeführt.',
    code: 'int i = 0;\ndo {\n    System.out.println(i);\n    i++;\n} while (i < 5);'
  },
  {
    title: 'for-Schleife',
    content: 'Die for-Schleife hat drei Teile: Initialisierung, Bedingung, Inkrement. Sie eignet sich besonders, wenn die Anzahl der Durchläufe bekannt ist.',
    code: 'for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}'
  },
  {
    title: 'Enhanced for (for-each)',
    content: 'Die for-each-Schleife durchläuft alle Elemente eines Arrays oder einer Collection, ohne einen Index zu benötigen.',
    code: 'int[] zahlen = {1, 2, 3, 4, 5};\nfor (int z : zahlen) {\n    System.out.println(z);\n}'
  },
  {
    title: 'break und continue',
    content: 'break verlässt die Schleife sofort. continue überspringt den Rest des aktuellen Durchlaufs und springt zur nächsten Iteration.',
    code: 'for (int i = 0; i < 10; i++) {\n    if (i == 3) continue; // 3 überspringen\n    if (i == 7) break;    // bei 7 abbrechen\n    System.out.println(i);\n}'
  },
  {
    title: 'Verschachtelte Schleifen',
    content: 'Schleifen können ineinander verschachtelt werden. Die innere Schleife läuft für jeden Durchlauf der äußeren Schleife komplett durch.',
    code: 'for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 2; j++) {\n        System.out.println(i + "-" + j);\n    }\n}'
  },
  {
    title: 'Endlosschleifen',
    content: 'Eine Endlosschleife läuft ohne Abbruch unendlich weiter. Sie entsteht, wenn die Abbruchbedingung nie erfüllt wird. for(;;) und while(true) sind bewusste Endlosschleifen.',
    code: 'for (;;) {\n    // Endlosschleife\n    break; // manueller Abbruch nötig\n}'
  }
];

export const questions = [
  { id: 'm4q1', type: 'mc', question: 'Wie oft wird die Schleife durchlaufen?', code: 'for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}', options: ['4 mal', '5 mal', '6 mal', 'Endlosschleife'], answer: '5 mal', explanation: 'i startet bei 0 und läuft solange i < 5: Werte 0, 1, 2, 3, 4 = 5 Durchläufe.' },
  { id: 'm4q2', type: 'mc', question: 'Was ist der Unterschied zwischen while und do-while?', options: ['Kein Unterschied', 'do-while wird mindestens einmal ausgeführt', 'while ist schneller', 'do-while braucht kein Semikolon'], answer: 'do-while wird mindestens einmal ausgeführt', explanation: 'do-while prüft die Bedingung nach dem Durchlauf, daher wird der Körper mindestens einmal ausgeführt.' },
  { id: 'm4q3', type: 'mc', question: 'Wie oft wird diese Schleife durchlaufen?', code: 'for (int i = 10; i > 0; i -= 3) {\n    System.out.println(i);\n}', options: ['3 mal', '4 mal', '5 mal', '10 mal'], answer: '4 mal', explanation: 'i-Werte: 10, 7, 4, 1 (bei i = -2 ist die Bedingung i > 0 false). Also 4 Durchläufe.' },
  { id: 'm4q4', type: 'mc', question: 'Was macht die Anweisung continue in einer Schleife?', options: ['Verlässt die Schleife sofort', 'Überspringt den Rest des Durchlaufs und beginnt die nächste Iteration', 'Beendet das Programm', 'Startet die Schleife neu von vorne'], answer: 'Überspringt den Rest des Durchlaufs und beginnt die nächste Iteration', explanation: 'continue überspringt die restlichen Anweisungen im Schleifenkörper und springt direkt zur nächsten Iteration.' },
  { id: 'm4q5', type: 'mc', question: 'Was macht die Anweisung break in einer Schleife?', options: ['Überspringt den aktuellen Durchlauf', 'Verlässt die Schleife sofort', 'Pausiert die Schleife', 'Verdoppelt die Geschwindigkeit'], answer: 'Verlässt die Schleife sofort', explanation: 'break beendet die Schleife sofort und die Ausführung wird nach der Schleife fortgesetzt.' },
  { id: 'm4q6', type: 'mc', question: 'Was ist der Wert von s nach diesem Code?', code: 'int s = 0;\nfor (int i = 1; i <= 3; i++) {\n    s += i;\n}', options: ['3', '5', '6', '10'], answer: '6', explanation: 'Durchläufe: s += 1 (s=1), s += 2 (s=3), s += 3 (s=6). Ergebnis: s = 6.' },
  { id: 'm4q7', type: 'mc', question: 'Wie oft wird der Schleifenkörper ausgeführt?', code: 'while (false) {\n    System.out.println("Hallo");\n}', options: ['0 mal', '1 mal', 'Endlosschleife', 'Compilerfehler'], answer: '0 mal', explanation: 'Die Bedingung ist sofort false, daher wird der Schleifenkörper nie ausgeführt.' },
  { id: 'm4q8', type: 'mc', question: 'Wie oft wird der Schleifenkörper ausgeführt?', code: 'do {\n    System.out.println("Hallo");\n} while (false);', options: ['0 mal', '1 mal', 'Endlosschleife', 'Compilerfehler'], answer: '1 mal', explanation: 'do-while führt den Körper mindestens einmal aus. Danach ist die Bedingung false, also nur 1 Durchlauf.' },
  { id: 'm4q9', type: 'mc', question: 'Was ist for(;;)?', code: 'for (;;) {\n    // ...\n}', options: ['Compilerfehler', 'Eine Schleife, die nie läuft', 'Eine Endlosschleife', 'Eine for-each-Schleife'], answer: 'Eine Endlosschleife', explanation: 'for(;;) hat keine Bedingung, was als true interpretiert wird. Die Schleife läuft endlos.' },
  { id: 'm4q10', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'for (int i = 0; i < 2; i++) {\n    for (int j = 0; j < 3; j++) {\n        System.out.print("*");\n    }\n    System.out.println();\n}', options: ['***\\n***', '**\\n**\\n**', '******', '**\\n***'], answer: '***\\n***', explanation: 'Äußere Schleife: 2 Durchläufe. Innere Schleife: je 3 Sterne. Ergibt 2 Zeilen mit je 3 Sternen.' },
  { id: 'm4q11', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'for (int i = 1; i <= 5; i++) {\n    if (i == 3) continue;\n    System.out.print(i + " ");\n}', options: ['1 2 3 4 5', '1 2 4 5', '1 2', '3'], answer: '1 2 4 5', explanation: 'continue bei i == 3 überspringt die Ausgabe für 3. Es werden 1, 2, 4, 5 ausgegeben.' },
  { id: 'm4q12', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'int[] arr = {10, 20, 30};\nfor (int x : arr) {\n    System.out.print(x + " ");\n}', options: ['0 1 2', '10 20 30', '[10, 20, 30]', 'Compilerfehler'], answer: '10 20 30', explanation: 'Die for-each-Schleife durchläuft alle Elemente des Arrays: 10, 20, 30.' }
];
