import type { Exercise } from '../../types';

export const operatorsExercises: Exercise[] = [
  {
    id: 'operators-01',
    topicId: 'operatoren',
    title: 'Arithmetische Operatoren',
    difficulty: 'leicht',
    description:
      'Verwende die arithmetischen Operatoren (+, -, *, /, %) in Java. Berechne verschiedene Ergebnisse und gib sie auf der Konsole aus. Beachte besonders die Ganzzahldivision und den Modulo-Operator.',
    requirements: [
      'Berechne die Summe von 17 und 5 und gib das Ergebnis aus',
      'Berechne die Differenz von 17 und 5 und gib das Ergebnis aus',
      'Berechne das Produkt von 17 und 5 und gib das Ergebnis aus',
      'Berechne die Ganzzahldivision von 17 durch 5 und gib das Ergebnis aus',
      'Berechne den Rest (Modulo) von 17 geteilt durch 5 und gib das Ergebnis aus',
    ],
    hints: [
      'Die arithmetischen Operatoren sind: + (Addition), - (Subtraktion), * (Multiplikation), / (Division), % (Modulo/Rest).',
      'Bei der Division zweier int-Werte wird das Ergebnis abgeschnitten (Ganzzahldivision): 17 / 5 ergibt 3, nicht 3.4.',
      'Der Modulo-Operator % gibt den Rest einer Division zurück: 17 % 5 ergibt 2, weil 17 = 3 * 5 + 2.',
    ],
    starterCode: `public class Operatoren {

    public static void main(String[] args) {
        int a = 17;
        int b = 5;

        // TODO: Berechne und gib die Summe aus
        System.out.println("Summe: " + a + " + " + b + " = " + /* TODO */);

        // TODO: Berechne und gib die Differenz aus
        System.out.println("Differenz: " + a + " - " + b + " = " + /* TODO */);

        // TODO: Berechne und gib das Produkt aus
        System.out.println("Produkt: " + a + " * " + b + " = " + /* TODO */);

        // TODO: Berechne und gib die Ganzzahldivision aus
        System.out.println("Division: " + a + " / " + b + " = " + /* TODO */);

        // TODO: Berechne und gib den Rest (Modulo) aus
        System.out.println("Modulo: " + a + " % " + b + " = " + /* TODO */);
    }

}`,
    solutionCode: `public class Operatoren {

    public static void main(String[] args) {
        int a = 17;
        int b = 5;

        System.out.println("Summe: " + a + " + " + b + " = " + (a + b));
        System.out.println("Differenz: " + a + " - " + b + " = " + (a - b));
        System.out.println("Produkt: " + a + " * " + b + " = " + (a * b));
        System.out.println("Division: " + a + " / " + b + " = " + (a / b));
        System.out.println("Modulo: " + a + " % " + b + " = " + (a % b));
    }

}`,
    expectedOutput: `Summe: 17 + 5 = 22
Differenz: 17 - 5 = 12
Produkt: 17 * 5 = 85
Division: 17 / 5 = 3
Modulo: 17 % 5 = 2`,
    testCases: [
      {
        expectedOutput: 'Summe: 17 + 5 = 22',
        description: 'Addition von 17 und 5 ergibt 22',
      },
      {
        expectedOutput: 'Modulo: 17 % 5 = 2',
        description: 'Modulo-Operation 17 % 5 ergibt den Rest 2',
      },
    ],
  },
  {
    id: 'operators-02',
    topicId: 'operatoren',
    title: 'Taschenrechner-Ausgabe',
    difficulty: 'mittel',
    description:
      'Erstelle ein Programm, das wie ein einfacher Taschenrechner funktioniert. Es soll zwei Zahlen verwenden und alle Grundrechenarten sowie zusätzliche Berechnungen durchführen. Nutze dabei auch zusammengesetzte Zuweisungsoperatoren (+=, -=, etc.).',
    requirements: [
      'Definiere zwei double-Variablen mit den Werten 10.0 und 3.0',
      'Berechne und gib alle vier Grundrechenarten aus (mit double-Ergebnissen)',
      'Demonstriere die zusammengesetzten Zuweisungsoperatoren (+=, -=, *=, /=)',
      'Zeige den Unterschied zwischen Prä- und Post-Inkrement (++x vs x++)',
    ],
    hints: [
      'Bei double-Division erhältst du das exakte Ergebnis mit Nachkommastellen, anders als bei int-Division.',
      'Zusammengesetzte Operatoren: x += 5 ist identisch mit x = x + 5. Das gilt auch für -=, *= und /=.',
      'Bei x++ wird erst der alte Wert verwendet, dann erhöht. Bei ++x wird erst erhöht, dann der neue Wert verwendet.',
    ],
    starterCode: `public class Taschenrechner {

    public static void main(String[] args) {
        double x = 10.0;
        double y = 3.0;

        // TODO: Grundrechenarten mit double-Werten
        System.out.println("=== Grundrechenarten ===");
        System.out.println(x + " + " + y + " = " + /* TODO */);
        System.out.println(x + " - " + y + " = " + /* TODO */);
        System.out.println(x + " * " + y + " = " + /* TODO */);
        System.out.println(x + " / " + y + " = " + /* TODO */);

        // TODO: Zusammengesetzte Zuweisungsoperatoren
        System.out.println("\\n=== Zusammengesetzte Zuweisung ===");
        double wert = 20.0;
        System.out.println("Startwert: " + wert);
        // wert += 5;
        // System.out.println("Nach += 5: " + wert);
        // wert -= 3;
        // System.out.println("Nach -= 3: " + wert);
        // wert *= 2;
        // System.out.println("Nach *= 2: " + wert);
        // wert /= 4;
        // System.out.println("Nach /= 4: " + wert);

        // TODO: Prä- und Post-Inkrement
        System.out.println("\\n=== Inkrement ===");
        int zaehler = 5;
        // System.out.println("zaehler:   " + zaehler);
        // System.out.println("zaehler++: " + zaehler++);
        // System.out.println("zaehler:   " + zaehler);
        // System.out.println("++zaehler: " + ++zaehler);
        // System.out.println("zaehler:   " + zaehler);
    }

}`,
    solutionCode: `public class Taschenrechner {

    public static void main(String[] args) {
        double x = 10.0;
        double y = 3.0;

        // Grundrechenarten mit double-Werten
        System.out.println("=== Grundrechenarten ===");
        System.out.println(x + " + " + y + " = " + (x + y));
        System.out.println(x + " - " + y + " = " + (x - y));
        System.out.println(x + " * " + y + " = " + (x * y));
        System.out.println(x + " / " + y + " = " + (x / y));

        // Zusammengesetzte Zuweisungsoperatoren
        System.out.println("\\n=== Zusammengesetzte Zuweisung ===");
        double wert = 20.0;
        System.out.println("Startwert: " + wert);
        wert += 5;
        System.out.println("Nach += 5: " + wert);
        wert -= 3;
        System.out.println("Nach -= 3: " + wert);
        wert *= 2;
        System.out.println("Nach *= 2: " + wert);
        wert /= 4;
        System.out.println("Nach /= 4: " + wert);

        // Prä- und Post-Inkrement
        System.out.println("\\n=== Inkrement ===");
        int zaehler = 5;
        System.out.println("zaehler:   " + zaehler);
        System.out.println("zaehler++: " + zaehler++);
        System.out.println("zaehler:   " + zaehler);
        System.out.println("++zaehler: " + ++zaehler);
        System.out.println("zaehler:   " + zaehler);
    }

}`,
    expectedOutput: `=== Grundrechenarten ===
10.0 + 3.0 = 13.0
10.0 - 3.0 = 7.0
10.0 * 3.0 = 30.0
10.0 / 3.0 = 3.3333333333333335

=== Zusammengesetzte Zuweisung ===
Startwert: 20.0
Nach += 5: 25.0
Nach -= 3: 22.0
Nach *= 2: 44.0
Nach /= 4: 11.0

=== Inkrement ===
zaehler:   5
zaehler++: 5
zaehler:   6
++zaehler: 7
zaehler:   7`,
    testCases: [
      {
        expectedOutput: '10.0 / 3.0 = 3.3333333333333335',
        description: 'Double-Division liefert das exakte Ergebnis mit Nachkommastellen',
      },
      {
        expectedOutput: 'zaehler++: 5',
        description: 'Post-Inkrement gibt erst den alten Wert aus (5), dann wird erhöht',
      },
    ],
  },
];
