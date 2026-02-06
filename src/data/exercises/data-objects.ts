import type { Exercise } from '../../types';

export const dataObjectsExercises: Exercise[] = [
  {
    id: 'data-objects-1',
    topicId: 'datenobjekte',
    title: 'Variablen deklarieren und ausgeben',
    difficulty: 'leicht',
    description:
      'Deklariere Variablen verschiedener Datentypen (int, double, String, boolean, char) und gib deren Werte formatiert auf der Konsole aus. Lerne dabei die grundlegenden Datentypen von Java kennen.',
    requirements: [
      'Deklariere eine int-Variable "alter" mit dem Wert 25',
      'Deklariere eine double-Variable "groesse" mit dem Wert 1.78',
      'Deklariere eine String-Variable "name" mit dem Wert "Max Mustermann"',
      'Deklariere eine boolean-Variable "istStudent" mit dem Wert true',
      'Deklariere eine char-Variable "geschlecht" mit dem Wert \'M\'',
      'Gib alle Variablen mit beschreibendem Text auf der Konsole aus',
    ],
    hints: [
      'Jede Variable wird mit dem Datentyp, einem Namen und einem Wert deklariert, z.B.: int alter = 25;',
      'Strings stehen in doppelten Anführungszeichen ("..."), char-Werte in einfachen Anführungszeichen (\'...\').',
      'Mit System.out.println("Name: " + name) kannst du Text und Variablen verknüpfen.',
    ],
    starterCode: `public class Variablen {

    public static void main(String[] args) {
        // TODO: Deklariere eine int-Variable "alter" mit Wert 25

        // TODO: Deklariere eine double-Variable "groesse" mit Wert 1.78

        // TODO: Deklariere eine String-Variable "name" mit Wert "Max Mustermann"

        // TODO: Deklariere eine boolean-Variable "istStudent" mit Wert true

        // TODO: Deklariere eine char-Variable "geschlecht" mit Wert 'M'

        // TODO: Gib alle Variablen formatiert aus
        // Beispiel: System.out.println("Name: " + name);
    }

}`,
    solutionCode: `public class Variablen {

    public static void main(String[] args) {
        int alter = 25;
        double groesse = 1.78;
        String name = "Max Mustermann";
        boolean istStudent = true;
        char geschlecht = 'M';

        System.out.println("Name: " + name);
        System.out.println("Alter: " + alter);
        System.out.println("Groesse: " + groesse + " m");
        System.out.println("Geschlecht: " + geschlecht);
        System.out.println("Student: " + istStudent);
    }

}`,
    expectedOutput: `Name: Max Mustermann
Alter: 25
Groesse: 1.78 m
Geschlecht: M
Student: true`,
    testCases: [
      {
        expectedOutput: 'Name: Max Mustermann',
        description: 'Die String-Variable "name" wird korrekt ausgegeben',
      },
      {
        expectedOutput: 'Alter: 25',
        description: 'Die int-Variable "alter" wird korrekt ausgegeben',
      },
    ],
  },
  {
    id: 'data-objects-2',
    topicId: 'datenobjekte',
    title: 'Typkonvertierung (Casting)',
    difficulty: 'mittel',
    description:
      'Lerne die implizite und explizite Typkonvertierung (Casting) in Java kennen. Wandle Werte zwischen verschiedenen Datentypen um und beobachte, was bei der Konvertierung passiert.',
    requirements: [
      'Führe eine implizite Konvertierung (Widening) von int nach double durch',
      'Führe eine explizite Konvertierung (Narrowing/Casting) von double nach int durch',
      'Konvertiere einen String in einen int-Wert mit Integer.parseInt()',
      'Konvertiere einen int-Wert in einen String mit String.valueOf()',
      'Zeige den Datenverlust beim Casting von double zu int',
    ],
    hints: [
      'Implizite Konvertierung (Widening) passiert automatisch, wenn ein kleinerer Typ in einen grösseren passt, z.B. int -> double.',
      'Explizite Konvertierung (Narrowing) erfordert einen Cast-Operator: (int) meineDoubleVariable. Dabei gehen Nachkommastellen verloren!',
      'String.valueOf(zahl) und Integer.parseInt(string) wandeln zwischen String und Zahl um.',
    ],
    starterCode: `public class Typkonvertierung {

    public static void main(String[] args) {
        // TODO: Implizite Konvertierung (Widening): int -> double
        int ganzeZahl = 42;
        // double dezimalZahl = ???;
        // System.out.println("int -> double: " + ganzeZahl + " -> " + dezimalZahl);

        // TODO: Explizite Konvertierung (Narrowing): double -> int
        double pi = 3.14159;
        // int piGerundet = ???;
        // System.out.println("double -> int: " + pi + " -> " + piGerundet);

        // TODO: String -> int mit Integer.parseInt()
        String zahlAlsText = "123";
        // int zahlAusText = ???;
        // System.out.println("String -> int: \\"" + zahlAlsText + "\\" -> " + zahlAusText);

        // TODO: int -> String mit String.valueOf()
        int wert = 456;
        // String wertAlsText = ???;
        // System.out.println("int -> String: " + wert + " -> \\"" + wertAlsText + "\\"");

        // TODO: Datenverlust demonstrieren
        double grosseZahl = 9.99;
        // int verlust = ???;
        // System.out.println("Datenverlust: " + grosseZahl + " -> " + verlust);
    }

}`,
    solutionCode: `public class Typkonvertierung {

    public static void main(String[] args) {
        // Implizite Konvertierung (Widening): int -> double
        int ganzeZahl = 42;
        double dezimalZahl = ganzeZahl;
        System.out.println("int -> double: " + ganzeZahl + " -> " + dezimalZahl);

        // Explizite Konvertierung (Narrowing): double -> int
        double pi = 3.14159;
        int piGerundet = (int) pi;
        System.out.println("double -> int: " + pi + " -> " + piGerundet);

        // String -> int mit Integer.parseInt()
        String zahlAlsText = "123";
        int zahlAusText = Integer.parseInt(zahlAlsText);
        System.out.println("String -> int: \\"" + zahlAlsText + "\\" -> " + zahlAusText);

        // int -> String mit String.valueOf()
        int wert = 456;
        String wertAlsText = String.valueOf(wert);
        System.out.println("int -> String: " + wert + " -> \\"" + wertAlsText + "\\"");

        // Datenverlust demonstrieren
        double grosseZahl = 9.99;
        int verlust = (int) grosseZahl;
        System.out.println("Datenverlust: " + grosseZahl + " -> " + verlust);
    }

}`,
    expectedOutput: `int -> double: 42 -> 42.0
double -> int: 3.14159 -> 3
String -> int: "123" -> 123
int -> String: 456 -> "456"
Datenverlust: 9.99 -> 9`,
    testCases: [
      {
        expectedOutput: 'int -> double: 42 -> 42.0',
        description: 'Implizite Konvertierung von int 42 nach double 42.0 funktioniert',
      },
      {
        expectedOutput: 'Datenverlust: 9.99 -> 9',
        description: 'Explizites Casting von 9.99 zu int ergibt 9 (Nachkommastellen abgeschnitten)',
      },
    ],
  },
];
