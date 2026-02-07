import type { LessonStep } from '../../types';

export const datentypenSteps: LessonStep[] = [
  {
    id: 'dt-step-1',
    type: 'content',
    title: 'Primitive Datentypen in Java',
    content: `Java verfügt über 8 primitive Datentypen, die die Grundbausteine für die Datenspeicherung bilden:

**Ganzzahlen:**
- \`byte\`: 8 Bit (-128 bis 127)
- \`short\`: 16 Bit (-32.768 bis 32.767)
- \`int\`: 32 Bit (-2 Milliarden bis 2 Milliarden)
- \`long\`: 64 Bit (sehr große Zahlen)

**Gleitkommazahlen:**
- \`float\`: 32 Bit (einfache Genauigkeit)
- \`double\`: 64 Bit (doppelte Genauigkeit)

**Andere:**
- \`char\`: 16 Bit (einzelnes Zeichen)
- \`boolean\`: true oder false

Diese Typen sind die effizientesten Datentypen in Java und werden direkt im Speicher abgelegt.`
  },
  {
    id: 'dt-step-2',
    type: 'fill-blank',
    title: 'Variablen deklarieren',
    content: 'Ergänze die richtigen Datentypen für die folgenden Variablen:',
    fillBlankCode: `{{0}} alter = 25;
{{1}} preis = 19.99;
{{2}} buchstabe = 'A';`,
    fillBlankAnswers: ['int', 'double', 'char']
  },
  {
    id: 'dt-step-3',
    type: 'code-example',
    title: 'Alle primitiven Typen im Überblick',
    content: 'Hier siehst du alle 8 primitiven Datentypen in Aktion. Experimentiere mit den Werten!',
    codeExample: {
      title: 'Primitive Datentypen Beispiel',
      description: 'Deklaration und Ausgabe aller primitiven Typen',
      code: `public class PrimitiveDatentypen {
    public static void main(String[] args) {
        // Ganzzahlen
        byte kleinsteZahl = 127;
        short kleineZahl = 32000;
        int standardZahl = 1000000;
        long grosseZahl = 9876543210L;

        // Gleitkommazahlen
        float einfachGenau = 3.14f;
        double doppeltGenau = 3.14159265359;

        // Andere Typen
        char zeichen = 'J';
        boolean istWahr = true;

        System.out.println("byte: " + kleinsteZahl);
        System.out.println("short: " + kleineZahl);
        System.out.println("int: " + standardZahl);
        System.out.println("long: " + grosseZahl);
        System.out.println("float: " + einfachGenau);
        System.out.println("double: " + doppeltGenau);
        System.out.println("char: " + zeichen);
        System.out.println("boolean: " + istWahr);
    }
}`,
      expectedOutput: `byte: 127
short: 32000
int: 1000000
long: 9876543210
float: 3.14
double: 3.14159265359
char: J
boolean: true`,
      editable: true
    }
  },
  {
    id: 'dt-step-4',
    type: 'predict-output',
    title: 'Implizite Typumwandlung',
    content: 'Was gibt dieser Code aus? (Implizite Konvertierung von int zu double)',
    predictCode: `int x = 10;
double y = x;
System.out.println(y);`,
    predictAnswer: '10.0',
    predictExplanation: 'Java konvertiert den int-Wert automatisch zu double. Da double eine Gleitkommazahl ist, wird ".0" angehängt, auch wenn der Wert eine ganze Zahl ist.'
  },
  {
    id: 'dt-step-5',
    type: 'content',
    title: 'Typumwandlung (Type Casting)',
    content: `Bei der Arbeit mit verschiedenen Datentypen ist manchmal eine Umwandlung nötig:

**Implizite Typumwandlung (Widening):**
Automatische Konvertierung von einem kleineren zu einem größeren Typ:
\`\`\`java
int i = 100;
double d = i;  // int → double (automatisch)
\`\`\`

**Explizite Typumwandlung (Narrowing):**
Manuelle Konvertierung, bei der Datenverlust möglich ist:
\`\`\`java
double d = 9.99;
int i = (int) d;  // d = 9 (Nachkommastellen gehen verloren!)
\`\`\`

**Referenztypen vs. Primitive:**
- **Primitive Typen**: Speichern den Wert direkt (z.B. int, double)
- **Referenztypen**: Speichern eine Referenz auf ein Objekt (z.B. String, Arrays, eigene Klassen)

\`\`\`java
int zahl = 42;           // Primitiv: speichert 42
String text = "Hallo";   // Referenz: zeigt auf String-Objekt
\`\`\``
  },
  {
    id: 'dt-step-6',
    type: 'challenge',
    title: 'Variablen deklarieren und ausgeben',
    content: 'Erstelle ein vollständiges Programm mit drei Variablen.',
    challenge: {
      instruction: 'Deklariere drei Variablen: name (String), alter (int) und groesse (double). Gib alle drei Werte formatiert aus.',
      starterCode: `public class MeineVariablen {
    public static void main(String[] args) {
        // Deklariere hier deine Variablen

        // Gib die Werte aus

    }
}`,
      expectedOutput: 'Max\n25\n1.80',
      hint: 'Verwende String name = "Max"; für den Namen. Nutze System.out.println() für die Ausgabe.'
    }
  },
  {
    id: 'dt-step-7',
    type: 'quiz',
    title: 'Quiz: Explizite Typumwandlung',
    quizQuestion: {
      id: 'dt-quiz-1',
      question: 'Was passiert mit dem Wert, wenn du `int x = (int) 3.9;` ausführst?',
      options: [
        'x wird 4 (Rundung)',
        'x wird 3 (Nachkommastellen abgeschnitten)',
        'x wird 3.9 (keine Änderung)',
        'Es gibt einen Compiler-Fehler'
      ],
      correctIndex: 1,
      explanation: 'Bei der expliziten Umwandlung von double zu int werden die Nachkommastellen einfach abgeschnitten (nicht gerundet). 3.9 wird zu 3.'
    }
  },
  {
    id: 'dt-step-8',
    type: 'predict-output',
    title: 'String-Vergleich mit ==',
    content: 'Was gibt dieser Code aus? (String Pool Konzept)',
    predictCode: `String s1 = "Hello";
String s2 = "Hello";
System.out.println(s1 == s2);`,
    predictAnswer: 'true',
    predictExplanation: 'Java verwendet einen String Pool für String-Literale. Beide Variablen s1 und s2 zeigen auf dasselbe String-Objekt im Pool, daher gibt == true zurück. Achtung: Bei new String("Hello") wäre das Ergebnis false!'
  }
];
