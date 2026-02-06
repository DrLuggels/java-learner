import type { Topic } from '../../../types';

export const operatoren: Topic = {
  id: 'operatoren',
  moduleId: 'grundlagen',
  title: 'Operatoren',
  description: 'Arithmetische, Vergleichs-, logische, Zuweisungs- und ternäre Operatoren.',
  content: `# Operatoren in Java

Operatoren sind Symbole, die **Operationen** auf Werten (Operanden) durchführen. Java kennt verschiedene Kategorien von Operatoren.

## Arithmetische Operatoren

| Operator | Beschreibung | Beispiel | Ergebnis |
|----------|-------------|----------|----------|
| \`+\` | Addition | \`5 + 3\` | 8 |
| \`-\` | Subtraktion | \`5 - 3\` | 2 |
| \`*\` | Multiplikation | \`5 * 3\` | 15 |
| \`/\` | Division | \`7 / 2\` | **3** (Ganzzahl!) |
| \`%\` | Modulo (Rest) | \`7 % 2\` | 1 |

**Achtung**: Division zweier \`int\`-Werte ergibt immer eine Ganzzahl! Für Kommazahlen muss mindestens ein Operand ein \`double\` sein.

## Vergleichsoperatoren

\`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\` — geben immer einen \`boolean\`-Wert zurück.

## Logische Operatoren

| Operator | Beschreibung | Beispiel |
|----------|-------------|----------|
| \`&&\` | UND (beide wahr) | \`true && false\` → false |
| \`\\|\\|\` | ODER (mindestens eins wahr) | \`true \\|\\| false\` → true |
| \`!\` | NICHT (negiert) | \`!true\` → false |

## Zuweisungsoperatoren

\`=\`, \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`%=\` — Kurzformen wie \`x += 5\` statt \`x = x + 5\`.

## Inkrement/Dekrement

- \`i++\` / \`++i\` — erhöht um 1
- \`i--\` / \`--i\` — verringert um 1
- **Unterschied**: \`i++\` gibt den alten Wert zurück, \`++i\` den neuen.

## Ternärer Operator

Kurzform für if-else: \`bedingung ? wertWennWahr : wertWennFalsch\``,
  codeExamples: [
    {
      title: 'Alle Operatoren im Überblick',
      description: 'Demonstration aller wichtigen Operatorkategorien mit Beispielen.',
      code: `public class OperatorenDemo {
    public static void main(String[] args) {
        // Arithmetische Operatoren
        int a = 17, b = 5;
        System.out.println("=== Arithmetik ===");
        System.out.println(a + " + " + b + " = " + (a + b));
        System.out.println(a + " - " + b + " = " + (a - b));
        System.out.println(a + " * " + b + " = " + (a * b));
        System.out.println(a + " / " + b + " = " + (a / b) + " (Ganzzahl!)");
        System.out.println(a + " % " + b + " = " + (a % b) + " (Rest)");
        System.out.println("17.0 / 5 = " + (17.0 / 5) + " (mit double)");

        // Vergleichsoperatoren
        System.out.println("\\n=== Vergleich ===");
        System.out.println("5 == 5: " + (5 == 5));
        System.out.println("5 != 3: " + (5 != 3));
        System.out.println("5 > 3:  " + (5 > 3));
        System.out.println("5 <= 3: " + (5 <= 3));

        // Logische Operatoren
        boolean x = true, y = false;
        System.out.println("\\n=== Logisch ===");
        System.out.println("true && false: " + (x && y));
        System.out.println("true || false: " + (x || y));
        System.out.println("!true:         " + (!x));

        // Zuweisungsoperatoren
        int zahl = 10;
        System.out.println("\\n=== Zuweisung ===");
        zahl += 5;  System.out.println("10 += 5  → " + zahl);
        zahl -= 3;  System.out.println("15 -= 3  → " + zahl);
        zahl *= 2;  System.out.println("12 *= 2  → " + zahl);
        zahl /= 4;  System.out.println("24 /= 4  → " + zahl);
        zahl %= 5;  System.out.println(" 6 %= 5  → " + zahl);
    }
}`,
      expectedOutput: `=== Arithmetik ===
17 + 5 = 22
17 - 5 = 12
17 * 5 = 85
17 / 5 = 3 (Ganzzahl!)
17 % 5 = 2 (Rest)
17.0 / 5 = 3.4 (mit double)

=== Vergleich ===
5 == 5: true
5 != 3: true
5 > 3:  true
5 <= 3: false

=== Logisch ===
true && false: false
true || false: true
!true:         false

=== Zuweisung ===
10 += 5  → 15
15 -= 3  → 12
12 *= 2  → 24
24 /= 4  → 6
 6 %= 5  → 1`,
      editable: true,
    },
    {
      title: 'Inkrement, Dekrement und Ternärer Operator',
      description: 'Prä-/Post-Inkrement und die Kurzform für if-else.',
      code: `public class InkrementTernaer {
    public static void main(String[] args) {
        // Inkrement und Dekrement
        int i = 5;
        System.out.println("=== Inkrement/Dekrement ===");
        System.out.println("i = " + i);
        System.out.println("i++ = " + (i++) + " (gibt alten Wert, dann +1)");
        System.out.println("i ist jetzt: " + i);
        System.out.println("++i = " + (++i) + " (erst +1, dann Wert)");
        System.out.println("i-- = " + (i--) + " (gibt alten Wert, dann -1)");
        System.out.println("i ist jetzt: " + i);

        // Ternärer Operator
        int alter = 20;
        String status = (alter >= 18) ? "volljährig" : "minderjährig";

        System.out.println("\\n=== Ternärer Operator ===");
        System.out.println("Alter " + alter + ": " + status);

        // Praktisches Beispiel
        int punkte = 85;
        String note = (punkte >= 90) ? "Sehr gut" :
                      (punkte >= 75) ? "Gut" :
                      (punkte >= 60) ? "Befriedigend" :
                      (punkte >= 50) ? "Ausreichend" : "Nicht bestanden";
        System.out.println("Punkte " + punkte + ": " + note);

        // Modulo für gerade/ungerade
        System.out.println("\\n=== Gerade/Ungerade (Modulo) ===");
        for (int n = 1; n <= 6; n++) {
            String art = (n % 2 == 0) ? "gerade" : "ungerade";
            System.out.println(n + " ist " + art);
        }
    }
}`,
      expectedOutput: `=== Inkrement/Dekrement ===
i = 5
i++ = 5 (gibt alten Wert, dann +1)
i ist jetzt: 6
++i = 7 (erst +1, dann Wert)
i-- = 7 (gibt alten Wert, dann -1)
i ist jetzt: 6

=== Ternärer Operator ===
Alter 20: volljährig
Punkte 85: Gut

=== Gerade/Ungerade (Modulo) ===
1 ist ungerade
2 ist gerade
3 ist ungerade
4 ist gerade
5 ist ungerade
6 ist gerade`,
      editable: true,
    },
    {
      title: 'Priorität und Klammern bei Operatoren',
      description: 'Operatorrangfolge (Präzedenz) und explizite Klammerung für lesbare Ausdrücke.',
      code: `public class PrioritaetDemo {
    public static void main(String[] args) {
        // Punkt-vor-Strich gilt auch in Java
        int ergebnis1 = 2 + 3 * 4;       // 3*4 = 12, dann 2+12 = 14
        int ergebnis2 = (2 + 3) * 4;     // 2+3 = 5, dann 5*4 = 20
        System.out.println("=== Prioritaet ===");
        System.out.println("2 + 3 * 4   = " + ergebnis1);
        System.out.println("(2 + 3) * 4 = " + ergebnis2);

        // Vergleich hat niedrigere Prioritaet als Arithmetik
        boolean test = 3 + 4 > 6;  // erst 3+4=7, dann 7>6=true
        System.out.println("3 + 4 > 6 = " + test);

        // Logische Operatoren: && hat hoehere Prioritaet als ||
        boolean a = true, b = false, c = true;
        boolean erg1 = a || b && c;   // b&&c zuerst → false, dann a||false → true
        boolean erg2 = (a || b) && c; // a||b zuerst → true, dann true&&c → true
        System.out.println("\\n=== Logische Prioritaet ===");
        System.out.println("true || false && true   = " + erg1);
        System.out.println("(true || false) && true = " + erg2);

        // Praktisches Beispiel: Rabattberechnung
        double preis = 100.0;
        double rabatt = 0.15;  // 15%
        double mwst = 0.19;    // 19%

        // Ohne Klammern — falsche Berechnung!
        double falsch = preis - preis * rabatt * mwst;
        // Mit Klammern — korrekte Berechnung
        double korrekt = (preis - preis * rabatt) * (1 + mwst);

        System.out.println("\\n=== Praxisbeispiel ===");
        System.out.printf("Netto nach Rabatt: %.2f%n", preis - preis * rabatt);
        System.out.printf("Brutto (korrekt):  %.2f%n", korrekt);
    }
}`,
      expectedOutput: `=== Prioritaet ===
2 + 3 * 4   = 14
(2 + 3) * 4 = 20
3 + 4 > 6 = true

=== Logische Prioritaet ===
true || false && true   = true
(true || false) && true = true

=== Praxisbeispiel ===
Netto nach Rabatt: 85.00
Brutto (korrekt):  101.15`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'operatoren-q1',
      question: 'Was ist das Ergebnis von `7 / 2` in Java (beide int)?',
      options: [
        '3.5',
        '3',
        '4',
        '3.0',
      ],
      correctIndex: 1,
      explanation: 'Bei der Division zweier int-Werte wird das Ergebnis abgeschnitten (nicht gerundet). 7 / 2 = 3 (Rest 1). Für 3.5 müsste man 7.0 / 2 schreiben.',
    },
    {
      id: 'operatoren-q2',
      question: 'Was gibt der Ausdruck `(5 > 3) && (2 > 8)` zurück?',
      options: [
        'true',
        'false',
        'Einen Compilerfehler',
        '5',
      ],
      correctIndex: 1,
      explanation: 'Der &&-Operator (logisches UND) ergibt nur true, wenn BEIDE Seiten true sind. (5 > 3) ist true, aber (2 > 8) ist false. true && false = false.',
    },
    {
      id: 'operatoren-q3',
      question: 'Was ist der Unterschied zwischen `i++` und `++i`?',
      options: [
        'Es gibt keinen Unterschied',
        'i++ erhöht um 2, ++i um 1',
        'i++ gibt den alten Wert zurück und erhöht danach, ++i erhöht zuerst und gibt den neuen Wert zurück',
        'i++ funktioniert nur mit int, ++i mit allen Typen',
      ],
      correctIndex: 2,
      explanation: 'Bei i++ (Post-Inkrement) wird der aktuelle Wert zurückgegeben und erst danach um 1 erhöht. Bei ++i (Prä-Inkrement) wird zuerst um 1 erhöht und dann der neue Wert zurückgegeben.',
    },
  ],
  exercises: ['operators-1', 'operators-2'],
  keyConceptsDE: [
    'Ganzzahl-Division schneidet Nachkommastellen ab (7/2 = 3)',
    'Modulo (%) gibt den Rest einer Division zurück',
    'Logische Operatoren: && (UND), || (ODER), ! (NICHT)',
    'i++ gibt den alten Wert zurück, ++i den neuen',
    'Ternärer Operator: bedingung ? wennWahr : wennFalsch',
  ],
  transferKnowledge: 'Operatoren sind in fast allen Programmiersprachen identisch. Die arithmetischen, logischen und Vergleichsoperatoren funktionieren in Python, JavaScript, C# und C++ nahezu gleich. Unterschiede gibt es bei der Ganzzahl-Division: Python 3 nutzt // für Ganzzahl-Division, / ergibt immer float.',
  order: 8,
};
