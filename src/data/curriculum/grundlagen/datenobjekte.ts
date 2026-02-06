import type { Topic } from '../../../types';

export const datenobjekte: Topic = {
  id: 'datenobjekte',
  moduleId: 'grundlagen',
  title: 'Datenobjekte (Variablen & Konstanten)',
  description: 'Variablen deklarieren, initialisieren, final-Konstanten und das var-Keyword.',
  content: `# Datenobjekte: Variablen und Konstanten

Variablen sind **benannte Speicherplätze** im Arbeitsspeicher, die einen Wert eines bestimmten Typs halten.

## Variablen deklarieren und initialisieren

\`\`\`java
int alter;           // Deklaration (Variable existiert, hat aber keinen Wert)
alter = 25;          // Initialisierung (Wert zuweisen)
int groesse = 180;   // Deklaration + Initialisierung in einem Schritt
\`\`\`

## Konstanten mit final

Mit dem Schlüsselwort \`final\` wird eine Variable zur **Konstante** — der Wert kann nach der Zuweisung nicht mehr geändert werden:
\`\`\`java
final double PI = 3.14159;
final int MAX_VERSUCHE = 3;
\`\`\`
Konvention: Konstantennamen in **GROSSBUCHSTABEN** mit Unterstrichen.

## Das var-Keyword (seit Java 10)

Mit \`var\` erkennt der Compiler den Typ automatisch (**Typinferenz**):
\`\`\`java
var name = "Anna";      // Compiler erkennt: String
var alter = 25;         // Compiler erkennt: int
var preis = 9.99;       // Compiler erkennt: double
\`\`\`
**Wichtig**: \`var\` funktioniert nur mit sofortiger Initialisierung und nur für lokale Variablen.

## Namenskonventionen

| Konvention | Beispiel | Verwendung |
|------------|----------|------------|
| **camelCase** | \`meinAlter\`, \`firstName\` | Variablen, Methoden |
| **PascalCase** | \`MeineKlasse\`, \`Student\` | Klassen |
| **UPPER_SNAKE** | \`MAX_WERT\`, \`PI\` | Konstanten |`,
  codeExamples: [
    {
      title: 'Variablen und Konstanten',
      description: 'Verschiedene Arten der Variablendeklaration und Verwendung von final.',
      code: `public class VariablenDemo {
    public static void main(String[] args) {
        // Deklaration und Initialisierung
        String vorname = "Max";
        String nachname = "Mustermann";
        int alter = 22;
        double groesse = 1.82;

        // Konstanten
        final double MWST_SATZ = 0.19;
        final String WAEHRUNG = "EUR";

        System.out.println("=== Personendaten ===");
        System.out.println("Name:   " + vorname + " " + nachname);
        System.out.println("Alter:  " + alter + " Jahre");
        System.out.println("Größe:  " + groesse + " m");

        // Variable ändern
        alter = 23;
        System.out.println("\\nNeues Alter: " + alter);

        // Konstante verwenden
        double netto = 100.0;
        double brutto = netto + (netto * MWST_SATZ);
        System.out.println("\\n=== Preisberechnung ===");
        System.out.println("Netto:  " + netto + " " + WAEHRUNG);
        System.out.println("MwSt:   " + (netto * MWST_SATZ) + " " + WAEHRUNG);
        System.out.println("Brutto: " + brutto + " " + WAEHRUNG);

        // final kann nicht geändert werden:
        // MWST_SATZ = 0.20; // Compilerfehler!
    }
}`,
      expectedOutput: `=== Personendaten ===
Name:   Max Mustermann
Alter:  22 Jahre
Größe:  1.82 m

Neues Alter: 23

=== Preisberechnung ===
Netto:  100.0 EUR
MwSt:   19.0 EUR
Brutto: 119.0 EUR`,
      editable: true,
    },
    {
      title: 'var-Keyword und Typinferenz',
      description: 'Verwendung von var für lokale Variablen mit automatischer Typerkennung.',
      code: `public class VarDemo {
    public static void main(String[] args) {
        // var erkennt den Typ automatisch
        var name = "Anna";                // String
        var alter = 25;                   // int
        var durchschnitt = 1.7;           // double
        var istStudent = true;            // boolean
        var anfangsbuchstabe = 'A';       // char

        System.out.println("=== var-Keyword (Typinferenz) ===");
        System.out.println("name:    " + name + " (Typ: String)");
        System.out.println("alter:   " + alter + " (Typ: int)");
        System.out.println("schnitt: " + durchschnitt + " (Typ: double)");
        System.out.println("student: " + istStudent + " (Typ: boolean)");
        System.out.println("buchst.: " + anfangsbuchstabe + " (Typ: char)");

        // Typ prüfen mit getClass() für Objekte
        var text = "Hallo";
        var zahl = Integer.valueOf(42);
        System.out.println("\\n=== Typ-Überprüfung ===");
        System.out.println("text ist: " + text.getClass().getSimpleName());
        System.out.println("zahl ist: " + zahl.getClass().getSimpleName());

        // Mehrere Variablen
        var breite = 10;
        var hoehe = 5;
        var flaeche = breite * hoehe;
        System.out.println("\\nFläche: " + breite + " × " + hoehe + " = " + flaeche);
    }
}`,
      expectedOutput: `=== var-Keyword (Typinferenz) ===
name:    Anna (Typ: String)
alter:   25 (Typ: int)
schnitt: 1.7 (Typ: double)
student: true (Typ: boolean)
buchst.: A (Typ: char)

=== Typ-Überprüfung ===
text ist: String
zahl ist: Integer

Fläche: 10 × 5 = 50`,
      editable: true,
    },
    {
      title: 'Gültigkeitsbereich (Scope) von Variablen',
      description: 'Variablen sind nur innerhalb ihres definierten Blocks sichtbar.',
      code: `public class ScopeDemo {
    // Klassenvariable — überall in der Klasse sichtbar
    static String klassenVariable = "Ich bin überall sichtbar";

    public static void main(String[] args) {
        // Lokale Variable — nur in main sichtbar
        int lokaleVar = 10;
        System.out.println("=== Gueltigkeitsbereich (Scope) ===");
        System.out.println(klassenVariable);
        System.out.println("lokaleVar = " + lokaleVar);

        // Block-Variable — nur innerhalb der geschweiften Klammern
        {
            int blockVar = 20;
            System.out.println("blockVar = " + blockVar);
            System.out.println("lokaleVar im Block = " + lokaleVar);
        }
        // blockVar ist hier NICHT mehr zugreifbar!
        // System.out.println(blockVar); // Compilerfehler!

        // Schleifenvariable — nur in der Schleife sichtbar
        for (int i = 0; i < 3; i++) {
            var temp = "Durchlauf " + i;
            System.out.println(temp);
        }
        // i und temp sind hier NICHT mehr zugreifbar!

        System.out.println("\\nVariablen leben nur in ihrem Block!");
    }
}`,
      expectedOutput: `=== Gueltigkeitsbereich (Scope) ===
Ich bin überall sichtbar
lokaleVar = 10
blockVar = 20
lokaleVar im Block = 10
Durchlauf 0
Durchlauf 1
Durchlauf 2

Variablen leben nur in ihrem Block!`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'datenobjekte-q1',
      question: 'Was bewirkt das Schlüsselwort `final` bei einer Variable?',
      options: [
        'Die Variable wird automatisch initialisiert',
        'Die Variable kann nach der Zuweisung nicht mehr geändert werden',
        'Die Variable wird gelöscht, wenn sie nicht mehr benötigt wird',
        'Die Variable wird öffentlich zugänglich',
      ],
      correctIndex: 1,
      explanation: 'final macht eine Variable zur Konstante — nach der ersten Zuweisung kann der Wert nicht mehr verändert werden. Ein Änderungsversuch führt zu einem Compilerfehler.',
    },
    {
      id: 'datenobjekte-q2',
      question: 'Welche Aussage über `var` ist korrekt?',
      options: [
        'var kann ohne Initialisierung verwendet werden',
        'var kann für Klassenvariablen verwendet werden',
        'var erkennt den Typ aus dem zugewiesenen Wert (Typinferenz)',
        'var macht die Variable dynamisch typisiert',
      ],
      correctIndex: 2,
      explanation: 'var nutzt Typinferenz: Der Compiler erkennt den Typ aus dem zugewiesenen Wert. Die Variable ist danach aber fest typisiert — var macht Java nicht dynamisch typisiert.',
    },
    {
      id: 'datenobjekte-q3',
      question: 'Welche Namenskonvention gilt in Java für Konstanten?',
      options: [
        'camelCase (z.B. maxWert)',
        'PascalCase (z.B. MaxWert)',
        'UPPER_SNAKE_CASE (z.B. MAX_WERT)',
        'kebab-case (z.B. max-wert)',
      ],
      correctIndex: 2,
      explanation: 'Konstanten (final-Variablen) werden in Java per Konvention in GROSSBUCHSTABEN mit Unterstrichen geschrieben, z.B. MAX_WERT, PI oder MWST_SATZ. camelCase ist für Variablen/Methoden, PascalCase für Klassen.',
    },
  ],
  exercises: ['data-objects-1', 'data-objects-2'],
  keyConceptsDE: [
    'Variablen werden mit Typ und Name deklariert',
    'final macht Variablen zu unveränderlichen Konstanten',
    'var ermöglicht Typinferenz für lokale Variablen (seit Java 10)',
    'camelCase für Variablen, PascalCase für Klassen, UPPER_SNAKE für Konstanten',
    'Variablen müssen vor der Verwendung initialisiert werden',
  ],
  transferKnowledge: 'Variablen gibt es in jeder Programmiersprache. Python hat dynamische Typisierung (kein Typ nötig), JavaScript nutzt let/const/var, C# hat ebenfalls var für Typinferenz. Konstanten gibt es als const (JS, C#) oder als Konvention (Python GROSSBUCHSTABEN).',
  order: 6,
};
