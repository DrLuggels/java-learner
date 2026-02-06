import type { Topic } from '../../../types';

export const streamApi: Topic = {
  id: 'stream-api',
  moduleId: 'fortgeschritten',
  title: 'Java Stream API',
  description: 'Datenverarbeitung mit der funktionalen Stream API.',
  content: `## Was sind Streams?

Streams sind **Pipelines zur Datenverarbeitung**. Sie verarbeiten Elemente einer Collection deklarativ — du sagst WAS du willst, nicht WIE.

\`\`\`java
List<String> ergebnis = namen.stream()
    .filter(n -> n.startsWith("A"))   // Filtern
    .map(String::toUpperCase)          // Transformieren
    .sorted()                          // Sortieren
    .toList();                         // Sammeln
\`\`\`

## Wichtige Operationen

**Zwischenoperationen** (lazy, geben Stream zurück):
- \`filter(Predicate)\` — Elemente filtern
- \`map(Function)\` — Elemente transformieren
- \`sorted()\` — Sortieren
- \`distinct()\` — Duplikate entfernen
- \`limit(n)\` / \`skip(n)\` — Begrenzen

**Endoperationen** (lösen Verarbeitung aus):
- \`forEach(Consumer)\` — Für jedes Element
- \`collect(Collector)\` — Sammeln (toList, toSet, toMap)
- \`reduce(BinaryOperator)\` — Zusammenführen
- \`count()\`, \`min()\`, \`max()\`, \`findFirst()\`

## Merke dir
- Streams sind **einmalig** — nach einer Endoperation verbraucht
- Streams verändern die **Quelle nicht**
- Zwischenoperationen sind **lazy** — werden erst bei Endoperation ausgeführt`,
  codeExamples: [
    {
      title: 'Stream-Pipeline',
      description: 'Filter, Map, Collect in Aktion',
      code: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> namen = List.of("Anna", "Bob", "Charlie", "Anna", "David", "Alice");

        // Alle mit 'A', ohne Duplikate, sortiert, als Liste
        List<String> mitA = namen.stream()
            .filter(n -> n.startsWith("A"))
            .distinct()
            .sorted()
            .toList();
        System.out.println("Mit A: " + mitA);

        // Zahlen: Summe aller geraden
        List<Integer> zahlen = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        int summeGerade = zahlen.stream()
            .filter(z -> z % 2 == 0)
            .reduce(0, Integer::sum);
        System.out.println("Summe gerade: " + summeGerade);

        // Namenlaengen
        Map<String, Integer> laengen = namen.stream()
            .distinct()
            .collect(Collectors.toMap(n -> n, String::length));
        System.out.println("Laengen: " + laengen);
    }
}`,
      expectedOutput: 'Mit A: [Alice, Anna]\nSumme gerade: 30\nLaengen: {Bob=3, Alice=5, Charlie=7, David=5, Anna=4}',
      editable: true,
    },
    {
      title: 'Collectors: groupingBy und Statistiken',
      description: 'Fortgeschrittene Collector-Operationen fuer Gruppierung und Zusammenfassung.',
      code: `import java.util.*;
import java.util.stream.*;

public class Main {
    record Mitarbeiter(String name, String abteilung, int gehalt) {}

    public static void main(String[] args) {
        List<Mitarbeiter> team = List.of(
            new Mitarbeiter("Anna", "IT", 60000),
            new Mitarbeiter("Bob", "HR", 45000),
            new Mitarbeiter("Clara", "IT", 70000),
            new Mitarbeiter("David", "HR", 50000),
            new Mitarbeiter("Eva", "IT", 55000)
        );

        // groupingBy: Nach Abteilung gruppieren
        Map<String, List<Mitarbeiter>> nachAbteilung = team.stream()
            .collect(Collectors.groupingBy(Mitarbeiter::abteilung));
        nachAbteilung.forEach((abt, mitarb) ->
            System.out.println(abt + ": " + mitarb.size() + " Mitarbeiter"));

        // Durchschnittsgehalt pro Abteilung
        Map<String, Double> durchschnitt = team.stream()
            .collect(Collectors.groupingBy(
                Mitarbeiter::abteilung,
                Collectors.averagingInt(Mitarbeiter::gehalt)));
        System.out.println("\\nDurchschnitt: " + durchschnitt);

        // Gesamtstatistik
        IntSummaryStatistics stats = team.stream()
            .mapToInt(Mitarbeiter::gehalt)
            .summaryStatistics();
        System.out.println("\\nMin: " + stats.getMin());
        System.out.println("Max: " + stats.getMax());
        System.out.println("Durchschnitt: " + stats.getAverage());
    }
}`,
      expectedOutput: 'HR: 2 Mitarbeiter\nIT: 3 Mitarbeiter\n\nDurchschnitt: {HR=47500.0, IT=61666.666666666664}\n\nMin: 45000\nMax: 70000\nDurchschnitt: 56000.0',
      editable: true,
    },
    {
      title: 'Stream-Operationen: flatMap, reduce, toMap',
      description: 'Verschachtelte Strukturen aufloesen und Werte zusammenfuehren.',
      code: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        // flatMap: Verschachtelte Listen aufloesen
        List<List<String>> verschachtelt = List.of(
            List.of("Java", "Kotlin"),
            List.of("Python", "Ruby"),
            List.of("JavaScript", "TypeScript")
        );
        List<String> flach = verschachtelt.stream()
            .flatMap(Collection::stream)
            .sorted()
            .toList();
        System.out.println("Flach: " + flach);

        // reduce: Werte zusammenfuehren
        List<String> woerter = List.of("Java", "ist", "toll");
        String satz = woerter.stream()
            .reduce("", (a, b) -> a.isEmpty() ? b : a + " " + b);
        System.out.println("Satz: " + satz);

        // toMap: Stream in Map umwandeln
        List<String> namen = List.of("Anna", "Bob", "Clara");
        Map<String, Integer> laengen = namen.stream()
            .collect(Collectors.toMap(n -> n, String::length));
        System.out.println("Laengen: " + laengen);

        // Zahlenstream mit mapToInt
        int summe = namen.stream()
            .mapToInt(String::length)
            .sum();
        System.out.println("Gesamtlaenge: " + summe);
    }
}`,
      expectedOutput: 'Flach: [Java, JavaScript, Kotlin, Python, Ruby, TypeScript]\nSatz: Java ist toll\nLaengen: {Anna=4, Bob=3, Clara=5}\nGesamtlaenge: 12',
      editable: true,
    },
  ],
  quiz: [
    { id: 'str-q1', question: 'Was ist eine Zwischenoperation?', options: ['Sie löst die Verarbeitung aus', 'Sie gibt einen Stream zurück und ist lazy', 'Sie verändert die Quellliste', 'Sie ist immer die letzte Operation'], correctIndex: 1, explanation: 'Zwischenoperationen (filter, map, sorted) geben einen neuen Stream zurück und werden erst bei einer Endoperation ausgeführt (lazy).' },
    { id: 'str-q2', question: 'Was macht collect(Collectors.toList())?', options: ['Löscht die Liste', 'Sammelt Stream-Elemente in einer neuen Liste', 'Sortiert die Liste', 'Filtert die Liste'], correctIndex: 1, explanation: 'collect() ist eine Endoperation die Stream-Elemente sammelt. Collectors.toList() erstellt eine neue ArrayList mit den Ergebnissen.' },
    { id: 'str-q3', question: 'Was passiert, wenn man einen Stream zweimal verwendet?', options: ['Er wird automatisch zurueckgesetzt', 'Es wird eine IllegalStateException geworfen', 'Er liefert leere Ergebnisse', 'Es funktioniert ohne Probleme'], correctIndex: 1, explanation: 'Streams sind einmalig verwendbar. Nach einer Endoperation (collect, forEach, etc.) ist der Stream verbraucht. Ein erneuter Aufruf wirft eine IllegalStateException. Man muss einen neuen Stream aus der Quelle erzeugen.' },
  ],
  exercises: ['stream-api-01'],
  keyConceptsDE: ['Stream', 'filter', 'map', 'reduce', 'collect', 'Collectors', 'Lazy Evaluation', 'Pipeline'],
  transferKnowledge: 'Stream-ähnliche APIs gibt es überall: JavaScript Array.filter/map/reduce, Python List Comprehensions, C# LINQ, Kotlin Sequences. Funktionale Datenverarbeitung ist universal.',
  order: 43,
};
