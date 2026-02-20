export const theory = [
  {
    title: 'Arithmetische Operatoren',
    content: 'Java bietet die Grundrechenarten: + (Addition), - (Subtraktion), * (Multiplikation), / (Division), % (Modulo/Rest). Bei Ganzzahldivision wird der Nachkommateil abgeschnitten.',
    code: '10 / 3  // = 3\n10 % 3  // = 1'
  },
  {
    title: 'Zuweisungsoperatoren',
    content: 'Neben der einfachen Zuweisung (=) gibt es zusammengesetzte Operatoren: +=, -=, *=, /=, %=. Diese kombinieren eine Berechnung mit der Zuweisung.',
    code: 'int x = 10;\nx += 5;  // x = 15\nx -= 3;  // x = 12'
  },
  {
    title: 'Vergleichsoperatoren',
    content: 'Vergleichsoperatoren geben boolean zurück: == (gleich), != (ungleich), > (größer), < (kleiner), >= (größer gleich), <= (kleiner gleich).'
  },
  {
    title: 'Logische Operatoren und Short-Circuit',
    content: '&& (UND), || (ODER), ! (NICHT). Short-Circuit: Bei && wird der rechte Ausdruck nicht ausgewertet, wenn der linke false ist. Bei || wird der rechte nicht ausgewertet, wenn der linke true ist.',
    code: 'int x = 0;\nif (false && (++x > 0)) {}\n// x ist immer noch 0 (Short-Circuit!)'
  },
  {
    title: 'Inkrement/Dekrement (Pre/Post)',
    content: 'Post-Inkrement (i++): Gibt den aktuellen Wert zurück, erhöht dann. Pre-Inkrement (++i): Erhöht zuerst, gibt dann den neuen Wert zurück.',
    code: 'int i = 5;\nSystem.out.println(i++); // gibt 5 aus, i ist danach 6\nSystem.out.println(++i); // i wird 7, gibt 7 aus'
  },
  {
    title: 'Ternärer Operator',
    content: 'Der ternäre Operator ist eine Kurzform für if-else: Bedingung ? wertWennTrue : wertWennFalse',
    code: 'int alter = 20;\nString status = (alter >= 18) ? "volljährig" : "minderjährig";'
  },
  {
    title: 'Operator-Rangfolge',
    content: 'Reihenfolge (hoch → niedrig): Unäre (++, --, !), Multiplikativ (*, /, %), Additiv (+, -), Vergleich (<, >, <=, >=), Gleichheit (==, !=), Logisches UND (&&), Logisches ODER (||), Zuweisung (=, +=, ...).',
    code: '1 + 2 * 3  // = 7 (nicht 9!)'
  },
  {
    title: 'String-Konkatenation mit +',
    content: 'Der +-Operator verkettet Strings. Wenn ein Operand ein String ist, wird der andere zu String konvertiert. Die Auswertung erfolgt von links nach rechts.',
    code: '"ha" + 5 + 3   // "ha53"\n5 + 3 + "ha"   // "8ha"'
  }
];

export const questions = [
  { id: 'm2q1', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'int i = 5;\nSystem.out.println(i++);', options: ['5', '6', '4', 'Compilerfehler'], answer: '5', explanation: 'Post-Inkrement (i++) gibt zuerst den aktuellen Wert (5) zurück und erhöht i danach auf 6.' },
  { id: 'm2q2', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'int i = 5;\nSystem.out.println(++i);', options: ['5', '6', '4', 'Compilerfehler'], answer: '6', explanation: 'Pre-Inkrement (++i) erhöht i zuerst auf 6 und gibt dann den neuen Wert (6) zurück.' },
  { id: 'm2q3', type: 'mc', question: 'Was ergibt 10 % 3?', code: 'System.out.println(10 % 3);', options: ['3', '1', '0', '3.33'], answer: '1', explanation: 'Der Modulo-Operator % gibt den Rest der Ganzzahldivision zurück: 10 / 3 = 3 Rest 1.' },
  { id: 'm2q4', type: 'mc', question: 'Was ergibt true && false?', options: ['true', 'false', 'Compilerfehler', 'null'], answer: 'false', explanation: 'Der UND-Operator (&&) ergibt nur true, wenn beide Operanden true sind.' },
  { id: 'm2q5', type: 'mc', question: 'Was ergibt true || false?', options: ['true', 'false', 'Compilerfehler', 'null'], answer: 'true', explanation: 'Der ODER-Operator (||) ergibt true, wenn mindestens ein Operand true ist.' },
  { id: 'm2q6', type: 'mc', question: 'Was ergibt !true?', options: ['true', 'false', '1', '0'], answer: 'false', explanation: 'Der NOT-Operator (!) kehrt den boolean-Wert um: !true = false.' },
  { id: 'm2q7', type: 'mc', question: 'Was ist der Wert von x nach diesem Code?', code: 'int x = 10;\nx -= 3;', options: ['10', '7', '13', '3'], answer: '7', explanation: 'x -= 3 ist gleichbedeutend mit x = x - 3, also x = 10 - 3 = 7.' },
  { id: 'm2q8', type: 'mc', question: 'Was ergibt folgender Ausdruck?', code: '5 > 3 ? "ja" : "nein"', options: ['"ja"', '"nein"', 'true', 'Compilerfehler'], answer: '"ja"', explanation: 'Da 5 > 3 true ist, wird der Wert nach dem ? zurückgegeben: "ja".' },
  { id: 'm2q9', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'System.out.println("5" + 3);', options: ['8', '"53"', '"35"', 'Compilerfehler'], answer: '"53"', explanation: 'Da "5" ein String ist, wird 3 zu "3" konvertiert und angehängt: "5" + "3" = "53".' },
  { id: 'm2q10', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'System.out.println(5 + 3 + "ha");', options: ['"53ha"', '"8ha"', '"ha53"', 'Compilerfehler'], answer: '"8ha"', explanation: 'Auswertung von links nach rechts: 5 + 3 = 8 (int-Addition), dann 8 + "ha" = "8ha" (String-Konkatenation).' },
  { id: 'm2q11', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'System.out.println("ha" + 5 + 3);', options: ['"ha53"', '"ha8"', '"8ha"', 'Compilerfehler'], answer: '"ha53"', explanation: 'Von links nach rechts: "ha" + 5 = "ha5" (String), dann "ha5" + 3 = "ha53" (String).' },
  { id: 'm2q12', type: 'mc', question: 'Was ist der Wert von x nach diesem Code?', code: 'int x = 0;\nif (false && (++x > 0)) {}\nSystem.out.println(x);', options: ['0', '1', '-1', 'Compilerfehler'], answer: '0', explanation: 'Short-Circuit: Da der linke Operand von && false ist, wird ++x gar nicht ausgeführt. x bleibt 0.' },
  { id: 'm2q13', type: 'mc', question: 'Was ergibt folgender Ausdruck?', code: 'System.out.println(7 / 2 * 2.0);', options: ['7.0', '6.0', '6', '3.5'], answer: '6.0', explanation: 'Von links nach rechts: 7 / 2 = 3 (Ganzzahldivision), dann 3 * 2.0 = 6.0 (double).' },
  { id: 'm2q14', type: 'mc', question: 'Was ergibt 1 + 2 * 3?', code: 'System.out.println(1 + 2 * 3);', options: ['9', '7', '6', 'Compilerfehler'], answer: '7', explanation: 'Punkt vor Strich: 2 * 3 = 6, dann 1 + 6 = 7.' },
  { id: 'm2q15', type: 'mc', question: 'Was ist der Wert von b?', code: 'boolean b = !(5 == 5);', options: ['true', 'false', 'Compilerfehler', 'null'], answer: 'false', explanation: '5 == 5 ergibt true, und !(true) ergibt false.' }
];
