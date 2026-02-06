import type { Topic } from '../../../types';

export const collectionsFramework: Topic = {
  id: 'collections-framework',
  moduleId: 'frameworks',
  title: 'Collections Framework',
  description: 'Die Collection-Hierarchie in Java: Set, Queue, Deque und die Collections-Utility-Klasse.',
  content: `# Das Java Collections Framework

Das **Collections Framework** stellt eine einheitliche Architektur zur Darstellung und Manipulation von Sammlungen (Collections) bereit. An der Spitze steht das Interface \`Collection<E>\`, von dem \`List\`, \`Set\` und \`Queue\` abgeleitet sind.

## Set — Mengen ohne Duplikate
Ein \`Set\` speichert Elemente **ohne Duplikate**. \`HashSet\` bietet O(1)-Zugriff, garantiert aber keine Reihenfolge. \`TreeSet\` hält Elemente **sortiert** (O(log n)) und implementiert \`NavigableSet\`.

## Queue und Deque
\`Queue\` arbeitet nach dem **FIFO**-Prinzip (First In, First Out). \`Deque\` (Double-Ended Queue) erlaubt das Einfügen und Entfernen an **beiden Enden** und kann sowohl als Queue als auch als Stack verwendet werden. \`ArrayDeque\` ist die bevorzugte Implementierung.

## Collections-Utility-Klasse
Die Klasse \`java.util.Collections\` bietet statische Hilfsmethoden: \`sort()\`, \`shuffle()\`, \`unmodifiableList()\`, \`synchronizedList()\`, \`frequency()\`, \`min()\`, \`max()\` und viele mehr.

## Wahl der richtigen Collection
- **Duplikate erlaubt?** → \`List\`. **Keine Duplikate?** → \`Set\`.
- **Sortiert?** → \`TreeSet\` / \`TreeMap\`. **FIFO?** → \`Queue\`.
- **Stack-Verhalten?** → \`Deque\` (mit \`push\`/\`pop\`).

Seit Java 9 gibt es zudem die Factory-Methoden \`List.of()\`, \`Set.of()\` und \`Map.of()\` für **unveraenderliche** Collections.`,
  codeExamples: [
    {
      title: 'Set und TreeSet verwenden',
      description: 'HashSet fuer schnelle Zugriffe, TreeSet fuer sortierte Mengen.',
      code: `import java.util.*;

public class SetBeispiel {
    public static void main(String[] args) {
        // HashSet — keine garantierte Reihenfolge
        Set<String> hashSet = new HashSet<>();
        hashSet.add("Banane");
        hashSet.add("Apfel");
        hashSet.add("Banane"); // Duplikat wird ignoriert
        System.out.println("HashSet: " + hashSet);
        System.out.println("Groesse: " + hashSet.size());

        // TreeSet — automatisch sortiert
        Set<String> treeSet = new TreeSet<>(hashSet);
        System.out.println("TreeSet (sortiert): " + treeSet);

        // Mengenoperationen
        Set<String> anderesFrüchte = Set.of("Kirsche", "Apfel");
        Set<String> vereinigung = new TreeSet<>(treeSet);
        vereinigung.addAll(anderesFrüchte);
        System.out.println("Vereinigung: " + vereinigung);
    }
}`,
      expectedOutput: `HashSet: [Banane, Apfel]
Groesse: 2
TreeSet (sortiert): [Apfel, Banane]
Vereinigung: [Apfel, Banane, Kirsche]`,
      editable: true
    },
    {
      title: 'Queue, Deque und Collections-Utility',
      description: 'ArrayDeque als Queue und Stack, Collections-Hilfsmethoden.',
      code: `import java.util.*;

public class QueueUndCollections {
    public static void main(String[] args) {
        // Deque als Queue (FIFO)
        Deque<String> queue = new ArrayDeque<>();
        queue.offer("Erster");
        queue.offer("Zweiter");
        queue.offer("Dritter");
        System.out.println("Queue poll: " + queue.poll());
        System.out.println("Queue peek: " + queue.peek());

        // Deque als Stack (LIFO)
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println("Stack pop: " + stack.pop());

        // Collections-Utility
        List<Integer> zahlen = new ArrayList<>(List.of(5, 2, 8, 1, 9));
        Collections.sort(zahlen);
        System.out.println("Sortiert: " + zahlen);
        System.out.println("Max: " + Collections.max(zahlen));
        System.out.println("Frequenz von 5: " + Collections.frequency(zahlen, 5));

        List<Integer> readOnly = Collections.unmodifiableList(zahlen);
        System.out.println("Unveraenderlich: " + readOnly);
    }
}`,
      expectedOutput: `Queue poll: Erster
Queue peek: Zweiter
Stack pop: 30
Sortiert: [1, 2, 5, 8, 9]
Max: 9
Frequenz von 5: 1
Unveraenderlich: [1, 2, 5, 8, 9]`,
      editable: true
    },
    {
      title: 'Map-Varianten und fortgeschrittene Operationen',
      description: 'HashMap, TreeMap und nuetzliche Map-Methoden wie putIfAbsent, merge und computeIfAbsent.',
      code: `import java.util.*;

public class MapBeispiel {
    public static void main(String[] args) {
        // HashMap: Schneller Zugriff O(1), keine Reihenfolge
        Map<String, Integer> lager = new HashMap<>();
        lager.put("Laptop", 15);
        lager.put("Maus", 50);
        lager.put("Tastatur", 30);

        // putIfAbsent: Nur einfuegen wenn Key nicht existiert
        lager.putIfAbsent("Laptop", 99); // Kein Effekt, Key existiert
        lager.putIfAbsent("Monitor", 10); // Wird eingefuegt
        System.out.println("Lager: " + lager);

        // getOrDefault: Standardwert wenn Key nicht existiert
        int anzahl = lager.getOrDefault("Drucker", 0);
        System.out.println("Drucker: " + anzahl);

        // TreeMap: Automatisch nach Keys sortiert
        Map<String, Integer> sortiert = new TreeMap<>(lager);
        System.out.println("\\nSortiert: " + sortiert);

        // merge: Werte zusammenfuehren
        lager.merge("Laptop", 5, Integer::sum); // 15 + 5 = 20
        System.out.println("Laptop nach merge: " + lager.get("Laptop"));

        // forEach mit Lambda
        System.out.println("\\nAlle Eintraege:");
        lager.forEach((key, val) ->
            System.out.println("  " + key + " -> " + val + " Stueck"));
    }
}`,
      expectedOutput: `Lager: {Laptop=15, Monitor=10, Tastatur=30, Maus=50}
Drucker: 0

Sortiert: {Laptop=15, Maus=50, Monitor=10, Tastatur=30}
Laptop nach merge: 20

Alle Eintraege:
  Laptop -> 20 Stueck
  Monitor -> 10 Stueck
  Tastatur -> 30 Stueck
  Maus -> 50 Stueck`,
      editable: true
    }
  ],
  quiz: [
    {
      id: 'collections-framework-q1',
      question: 'Welche Eigenschaft unterscheidet ein Set von einer List?',
      options: [
        'Ein Set ist immer sortiert',
        'Ein Set erlaubt keine Duplikate',
        'Ein Set hat eine feste Groesse',
        'Ein Set erlaubt nur Strings'
      ],
      correctIndex: 1,
      explanation: 'Ein Set speichert jedes Element hoechstens einmal — Duplikate werden automatisch ignoriert. Eine List erlaubt dagegen Duplikate und bewahrt die Einfuegereihenfolge.'
    },
    {
      id: 'collections-framework-q2',
      question: 'Welche Datenstruktur eignet sich am besten als LIFO-Stack in Java?',
      options: [
        'LinkedList als Queue',
        'ArrayList',
        'ArrayDeque mit push/pop',
        'HashSet'
      ],
      correctIndex: 2,
      explanation: 'ArrayDeque ist die empfohlene Implementierung fuer Stack-Verhalten (LIFO) in Java. Die Klasse Stack ist veraltet. ArrayDeque bietet push() und pop() mit O(1)-Performance.'
    },
    {
      id: 'collections-framework-q3',
      question: 'Was geben die Factory-Methoden List.of() und Set.of() zurueck?',
      options: [
        'Veraenderliche Listen bzw. Sets',
        'Unveraenderliche (immutable) Listen bzw. Sets',
        'Null wenn die Argumente leer sind',
        'Synchronisierte Collections',
      ],
      correctIndex: 1,
      explanation: 'List.of(), Set.of() und Map.of() geben seit Java 9 unveraenderliche Collections zurueck. Jeder Versuch, Elemente hinzuzufuegen oder zu entfernen, wirft eine UnsupportedOperationException.',
    },
  ],
  exercises: [],
  keyConceptsDE: [
    'Collection-Hierarchie: Collection → List, Set, Queue',
    'HashSet: O(1) ohne Reihenfolge, TreeSet: sortiert O(log n)',
    'Queue (FIFO) und Deque (beidseitig, auch als Stack)',
    'Collections-Utility: sort(), shuffle(), unmodifiableList()',
    'Factory-Methoden: List.of(), Set.of(), Map.of() (unveraenderlich)'
  ],
  transferKnowledge: 'Das Collections Framework ist das Rueckgrat jeder Java-Anwendung. In Projekten waehlt man die passende Collection je nach Anforderung: HashMap fuer schnelle Lookups, TreeSet fuer sortierte Mengen, ArrayDeque fuer Warteschlangen. In Frameworks wie Spring werden Collections intensiv fuer Dependency Injection und Konfiguration genutzt.',
  order: 45
};
