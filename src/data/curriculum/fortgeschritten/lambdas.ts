import type { Topic } from '../../../types';

export const lambdas: Topic = {
  id: 'lambdas',
  moduleId: 'fortgeschritten',
  title: 'Lambda-Ausdrücke',
  description: 'Funktionale Programmierung in Java mit Lambda-Ausdrücken und Method References.',
  content: `## Was sind Lambdas?

Lambda-Ausdrücke sind **anonyme Funktionen** — Funktionen ohne Namen. Sie machen Code kürzer und lesbarer.

\`\`\`java
// Vorher: Anonyme Klasse
Comparator<String> comp = new Comparator<String>() {
    public int compare(String a, String b) { return a.compareTo(b); }
};

// Nachher: Lambda
Comparator<String> comp = (a, b) -> a.compareTo(b);
\`\`\`

## Syntax

\`\`\`
(Parameter) -> Ausdruck
(Parameter) -> { Anweisungen; }
\`\`\`

## Wichtige funktionale Interfaces

| Interface | Methode | Beschreibung |
|---|---|---|
| \`Predicate<T>\` | \`test(T)\` → boolean | Bedingung prüfen |
| \`Consumer<T>\` | \`accept(T)\` → void | Wert konsumieren |
| \`Function<T,R>\` | \`apply(T)\` → R | Wert transformieren |
| \`Supplier<T>\` | \`get()\` → T | Wert erzeugen |

## Merke dir
- Lambdas brauchen ein **funktionales Interface** (genau 1 abstrakte Methode)
- **Method References** sind Kurzformen: \`String::toUpperCase\` statt \`s -> s.toUpperCase()\``,
  codeExamples: [
    {
      title: 'Lambda-Grundlagen',
      description: 'Verschiedene Lambda-Syntaxformen und Anwendungen',
      code: `import java.util.*;
import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        List<String> namen = new ArrayList<>(List.of("Charlie", "Anna", "Bob"));

        // Lambda zum Sortieren
        namen.sort((a, b) -> a.compareTo(b));
        System.out.println("Sortiert: " + namen);

        // Predicate - Bedingung pruefen
        Predicate<String> istKurz = name -> name.length() <= 3;
        System.out.println("Bob ist kurz: " + istKurz.test("Bob"));

        // Consumer - Wert ausgeben
        Consumer<String> gruessen = name -> System.out.println("Hallo " + name + "!");
        gruessen.accept("Java");

        // Function - Wert transformieren
        Function<String, Integer> laenge = String::length; // Method Reference!
        System.out.println("Laenge von 'Hallo': " + laenge.apply("Hallo"));
    }
}`,
      expectedOutput: 'Sortiert: [Anna, Bob, Charlie]\nBob ist kurz: true\nHallo Java!\nLaenge von \'Hallo\': 5',
      editable: true,
    },
    {
      title: 'Lambdas mit Listen',
      description: 'forEach, removeIf und replaceAll mit Lambdas',
      code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        var zahlen = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

        // forEach mit Lambda
        System.out.print("Alle: ");
        zahlen.forEach(z -> System.out.print(z + " "));
        System.out.println();

        // removeIf - Ungerade entfernen
        zahlen.removeIf(z -> z % 2 != 0);
        System.out.println("Nur gerade: " + zahlen);

        // replaceAll - Verdoppeln
        zahlen.replaceAll(z -> z * 2);
        System.out.println("Verdoppelt: " + zahlen);
    }
}`,
      expectedOutput: 'Alle: 1 2 3 4 5 6 7 8 9 10 \nNur gerade: [2, 4, 6, 8, 10]\nVerdoppelt: [4, 8, 12, 16, 20]',
      editable: true,
    },
    {
      title: 'Eigene funktionale Interfaces und Method References',
      description: 'Eigene funktionale Interfaces definieren und alle vier Arten von Method References.',
      code: `import java.util.*;
import java.util.function.*;

// Eigenes funktionales Interface
@FunctionalInterface
interface Berechnung {
    double ausfuehren(double a, double b);
}

public class Main {
    public static void main(String[] args) {
        // Eigenes funktionales Interface mit Lambda
        Berechnung addiere = (a, b) -> a + b;
        Berechnung multipliziere = (a, b) -> a * b;
        System.out.println("5 + 3 = " + addiere.ausfuehren(5, 3));
        System.out.println("5 * 3 = " + multipliziere.ausfuehren(5, 3));

        // Method References - 4 Arten:
        // 1. Statische Methode: Klasse::methode
        Function<String, Integer> parse = Integer::parseInt;
        System.out.println("\\nParsed: " + parse.apply("42"));

        // 2. Instanzmethode eines Typs: Typ::methode
        Function<String, String> toUpper = String::toUpperCase;
        System.out.println("Upper: " + toUpper.apply("java"));

        // 3. Instanzmethode eines Objekts: objekt::methode
        List<String> log = new ArrayList<>();
        Consumer<String> logger = log::add;
        logger.accept("Eintrag 1");
        logger.accept("Eintrag 2");
        System.out.println("Log: " + log);

        // 4. Konstruktor-Referenz: Klasse::new
        Supplier<ArrayList<String>> listeErzeugen = ArrayList::new;
        var neueListe = listeErzeugen.get();
        System.out.println("Neue Liste: " + neueListe);
    }
}`,
      expectedOutput: '5 + 3 = 8.0\n5 * 3 = 15.0\n\nParsed: 42\nUpper: JAVA\nLog: [Eintrag 1, Eintrag 2]\nNeue Liste: []',
      editable: true,
    },
  ],
  quiz: [
    { id: 'lam-q1', question: 'Was ist ein funktionales Interface?', options: ['Ein Interface mit vielen Methoden', 'Ein Interface mit genau einer abstrakten Methode', 'Ein Interface ohne Methoden', 'Ein Interface mit static Methoden'], correctIndex: 1, explanation: 'Ein funktionales Interface hat genau EINE abstrakte Methode. Es kann mit @FunctionalInterface annotiert werden.' },
    { id: 'lam-q2', question: 'Was macht Predicate<T>?', options: ['Erzeugt einen Wert', 'Konsumiert einen Wert', 'Prüft eine Bedingung und gibt boolean zurück', 'Transformiert einen Wert'], correctIndex: 2, explanation: 'Predicate<T> hat die Methode test(T) die einen boolean zurückgibt. Perfekt zum Filtern.' },
    { id: 'lam-q3', question: 'Was ist eine Method Reference wie String::toUpperCase?', options: ['Ein neuer String wird erzeugt', 'Eine Kurzform fuer das Lambda s -> s.toUpperCase()', 'Ein statischer Import', 'Ein Konstruktor-Aufruf'], correctIndex: 1, explanation: 'Method References sind kompakte Schreibweisen fuer Lambdas. String::toUpperCase ist identisch mit s -> s.toUpperCase(). Es gibt vier Arten: statische (Math::max), Instanz (String::length), Objekt (System.out::println) und Konstruktor (ArrayList::new).' },
  ],
  exercises: ['lambdas-01', 'lambdas-02'],
  keyConceptsDE: ['Lambda-Ausdruck', 'Funktionales Interface', 'Predicate', 'Consumer', 'Function', 'Supplier', 'Method Reference'],
  transferKnowledge: 'Lambdas/Closures gibt es überall: JavaScript Arrow Functions, Python Lambda, C# Lambda, Kotlin Lambda. Funktionale Programmierung ist sprachübergreifend.',
  order: 40,
};
