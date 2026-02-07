import type { LessonStep } from '../../types';

export const operatorenSteps: LessonStep[] = [
  {
    id: 'op-step-1',
    type: 'content',
    title: 'Arithmetische Operatoren',
    content: `Java bietet die folgenden arithmetischen Operatoren für Berechnungen:

**Grundrechenarten:**
- \`+\` Addition (z.B. \`5 + 3\` = 8)
- \`-\` Subtraktion (z.B. \`10 - 4\` = 6)
- \`*\` Multiplikation (z.B. \`7 * 2\` = 14)
- \`/\` Division (z.B. \`20 / 4\` = 5)
- \`%\` Modulo/Rest (z.B. \`10 % 3\` = 1)

**Wichtig bei der Division:**
- Ganzzahl-Division: \`7 / 2\` = 3 (Rest wird ignoriert)
- Gleitkomma-Division: \`7.0 / 2\` = 3.5 (genaues Ergebnis)

**Modulo-Operator:**
Der Modulo-Operator \`%\` gibt den Rest einer Division zurück:
- \`10 % 3\` = 1 (10 geteilt durch 3 ist 3 Rest 1)
- \`15 % 4\` = 3 (15 geteilt durch 4 ist 3 Rest 3)

Sehr nützlich, um zu prüfen, ob eine Zahl gerade ist: \`zahl % 2 == 0\``
  },
  {
    id: 'op-step-2',
    type: 'predict-output',
    title: 'Ganzzahl- vs. Gleitkomma-Division',
    content: 'Was gibt dieser Code aus? Achte auf den Unterschied zwischen int und double!',
    predictCode: `System.out.println(7 / 2);
System.out.println(7.0 / 2);`,
    predictAnswer: '3\n3.5',
    predictExplanation: 'Die erste Division (7 / 2) ist eine Ganzzahl-Division, da beide Operanden int sind. Das Ergebnis ist 3 (Rest wird ignoriert). Die zweite Division (7.0 / 2) ist eine Gleitkomma-Division, da 7.0 ein double ist. Das Ergebnis ist 3.5.'
  },
  {
    id: 'op-step-3',
    type: 'fill-blank',
    title: 'Die richtigen Operatoren',
    content: 'Ergänze die passenden arithmetischen Operatoren:',
    fillBlankCode: `// 10 modulo 3 ergibt 1
10 {{0}} 3

// 5 mal 2 ergibt 10
5 {{1}} 2`,
    fillBlankAnswers: ['%', '*']
  },
  {
    id: 'op-step-4',
    type: 'code-example',
    title: 'Vergleichs- und logische Operatoren',
    content: 'Neben arithmetischen Operatoren gibt es Vergleichs- und logische Operatoren für Bedingungen.',
    codeExample: {
      title: 'Vergleichs- und logische Operatoren',
      description: 'Operatoren für Bedingungen und Logik',
      code: `public class VergleichsOperatoren {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;

        // Vergleichsoperatoren
        System.out.println("a == b: " + (a == b));  // false
        System.out.println("a != b: " + (a != b));  // true
        System.out.println("a < b: " + (a < b));    // true
        System.out.println("a > b: " + (a > b));    // false
        System.out.println("a <= 10: " + (a <= 10)); // true
        System.out.println("b >= 20: " + (b >= 20)); // true

        // Logische Operatoren
        System.out.println("\\nLogische Operatoren:");
        System.out.println("(a < b) && (b > 15): " + ((a < b) && (b > 15))); // true
        System.out.println("(a > b) || (b == 20): " + ((a > b) || (b == 20))); // true
        System.out.println("!(a == b): " + (!(a == b))); // true
    }
}`,
      expectedOutput: `a == b: false
a != b: true
a < b: true
a > b: false
a <= 10: true
b >= 20: true

Logische Operatoren:
(a < b) && (b > 15): true
(a > b) || (b == 20): true
!(a == b): true`,
      editable: true
    }
  },
  {
    id: 'op-step-5',
    type: 'challenge',
    title: 'BMI-Rechner',
    content: 'Berechne den Body Mass Index mit der Formel: BMI = gewicht / (groesse * groesse)',
    challenge: {
      instruction: 'Berechne den BMI für ein Gewicht von 75.0 kg und eine Größe von 1.80 m. Gib das Ergebnis aus.',
      starterCode: `public class BMIRechner {
    public static void main(String[] args) {
        double gewicht = 75.0;
        double groesse = 1.80;

        // Berechne den BMI hier

        // Gib das Ergebnis aus

    }
}`,
      expectedOutput: '23.148148148148145',
      hint: 'Verwende die Formel: double bmi = gewicht / (groesse * groesse); und gib bmi mit System.out.println() aus.'
    }
  },
  {
    id: 'op-step-6',
    type: 'content',
    title: 'Inkrement/Dekrement und Ternärer Operator',
    content: `Java bietet spezielle Operatoren für häufige Operationen:

**Inkrement und Dekrement:**
- \`++\` erhöht eine Variable um 1
- \`--\` verringert eine Variable um 1

Es gibt zwei Varianten:
- **Prefix**: \`++x\` (erst erhöhen, dann verwenden)
- **Postfix**: \`x++\` (erst verwenden, dann erhöhen)

\`\`\`java
int a = 5;
System.out.println(a++);  // Gibt 5 aus, dann a = 6
System.out.println(++a);  // a = 7, dann ausgeben: 7
\`\`\`

**Ternärer Operator (Bedingungsoperator):**
Kurzform für if-else: \`bedingung ? wertWennTrue : wertWennFalse\`

\`\`\`java
int alter = 18;
String status = (alter >= 18) ? "Erwachsen" : "Minderjährig";
// status ist "Erwachsen"
\`\`\`

**Zusammengesetzte Zuweisungen:**
- \`x += 5\` entspricht \`x = x + 5\`
- \`x -= 3\` entspricht \`x = x - 3\`
- \`x *= 2\` entspricht \`x = x * 2\`
- \`x /= 4\` entspricht \`x = x / 4\``
  },
  {
    id: 'op-step-7',
    type: 'predict-output',
    title: 'Post-Inkrement verstehen',
    content: 'Was gibt dieser Code aus? Achte auf die Reihenfolge beim Post-Inkrement!',
    predictCode: `int a = 5;
System.out.println(a++);
System.out.println(a);`,
    predictAnswer: '5\n6',
    predictExplanation: 'Bei a++ (Post-Inkrement) wird zuerst der aktuelle Wert von a (5) ausgegeben, danach wird a um 1 erhöht. Die zweite println-Anweisung gibt dann den erhöhten Wert (6) aus.'
  },
  {
    id: 'op-step-8',
    type: 'quiz',
    title: 'Quiz: Logische Operatoren',
    quizQuestion: {
      id: 'op-quiz-1',
      question: 'Was gibt der Ausdruck `(5 > 3) && (2 > 8)` zurück?',
      options: [
        'true (weil 5 > 3 wahr ist)',
        'false (weil beide Bedingungen wahr sein müssen)',
        'true (weil mindestens eine Bedingung wahr ist)',
        'Es gibt einen Fehler'
      ],
      correctIndex: 1,
      explanation: 'Der &&-Operator (logisches UND) gibt nur true zurück, wenn BEIDE Bedingungen wahr sind. Hier ist (5 > 3) zwar true, aber (2 > 8) ist false. Daher ist das Gesamtergebnis false.'
    }
  }
];
