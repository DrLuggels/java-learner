import type { Topic } from '../../../types';

export const listen: Topic = {
  id: 'listen',
  moduleId: 'datenstrukturen',
  title: 'Listen und das List-Interface',
  description: 'Das List-Interface, verschiedene Implementierungen und unveränderliche Listen in Java.',
  content: `
## Das List-Interface in Java

\`List<E>\` ist ein **Interface** aus \`java.util\`, das eine geordnete Sammlung von Elementen beschreibt. Es definiert Methoden wie \`add()\`, \`get()\`, \`remove()\` usw.

### Programmieren gegen Interfaces
Statt den konkreten Typ zu verwenden, deklariert man Variablen mit dem Interface-Typ:
\`\`\`java
List<String> liste = new ArrayList<>(); // empfohlen
\`\`\`
So kann die Implementierung später leicht ausgetauscht werden.

### ArrayList vs. LinkedList
| Eigenschaft | ArrayList | LinkedList |
|-------------|-----------|------------|
| Interner Aufbau | Dynamisches Array | Doppelt verkettete Liste |
| Zugriff per Index | Sehr schnell (O(1)) | Langsam (O(n)) |
| Einfügen/Löschen am Anfang | Langsam (O(n)) | Sehr schnell (O(1)) |
| Einfügen/Löschen am Ende | Schnell (amortisiert O(1)) | Schnell (O(1)) |
| Speicher | Kompakt | Mehr Overhead (Zeiger) |

### Unveränderliche Listen
- \`List.of("a", "b")\` — erstellt eine unveränderliche Liste (seit Java 9)
- \`Collections.unmodifiableList(list)\` — Wrapper um eine bestehende Liste
- Jeder Versuch, die Liste zu ändern, wirft eine \`UnsupportedOperationException\`

> **Best Practice:** Verwende \`ArrayList\` als Standard. \`LinkedList\` nur wenn sehr häufig am Anfang/in der Mitte eingefügt oder gelöscht wird.
  `.trim(),
  codeExamples: [
    {
      title: 'List-Interface und Implementierungen',
      description: 'Programmieren gegen das Interface mit verschiedenen Implementierungen.',
      code: `import java.util.List;
import java.util.ArrayList;
import java.util.LinkedList;

public class ListInterface {
    public static void main(String[] args) {
        // Gegen das Interface programmieren
        List<String> namen = new ArrayList<>();
        namen.add("Anna");
        namen.add("Ben");
        namen.add("Clara");

        // Einfach austauschbar: gleicher Code, andere Implementierung
        List<String> namenLinked = new LinkedList<>(namen);

        System.out.println("ArrayList: " + namen);
        System.out.println("LinkedList: " + namenLinked);

        // Beide haben die gleichen Methoden (List-Interface)
        namen.add(1, "David");
        namenLinked.add(1, "David");

        System.out.println("ArrayList nach Einfügen: " + namen);
        System.out.println("LinkedList nach Einfügen: " + namenLinked);

        // Methode akzeptiert jede List-Implementierung
        druckeListe(namen);
        druckeListe(namenLinked);
    }

    static void druckeListe(List<String> liste) {
        System.out.println("Liste mit " + liste.size() + " Elementen: " + liste);
    }
}`,
      expectedOutput: `ArrayList: [Anna, Ben, Clara]
LinkedList: [Anna, Ben, Clara]
ArrayList nach Einfügen: [Anna, David, Ben, Clara]
LinkedList nach Einfügen: [Anna, David, Ben, Clara]
Liste mit 4 Elementen: [Anna, David, Ben, Clara]
Liste mit 4 Elementen: [Anna, David, Ben, Clara]`,
      editable: true,
    },
    {
      title: 'Unveränderliche Listen mit List.of()',
      description: 'Erstellung und Verwendung von unveränderlichen Listen.',
      code: `import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

public class UnveraenderlicheListen {
    public static void main(String[] args) {
        // List.of() erstellt eine unveränderliche Liste
        List<String> farben = List.of("Rot", "Grün", "Blau");
        System.out.println("Unveränderlich: " + farben);

        // Versuch zu ändern -> Exception!
        try {
            farben.add("Gelb");
        } catch (UnsupportedOperationException e) {
            System.out.println("Fehler: Liste ist unveränderlich!");
        }

        // Veränderliche Kopie einer unveränderlichen Liste
        List<String> veraenderlich = new ArrayList<>(farben);
        veraenderlich.add("Gelb");
        System.out.println("Veränderliche Kopie: " + veraenderlich);

        // Collections.unmodifiableList() als Wrapper
        List<String> original = new ArrayList<>(List.of("A", "B", "C"));
        List<String> nurLesen = Collections.unmodifiableList(original);
        System.out.println("Nur-Lesen: " + nurLesen);

        // Original ändern beeinflusst den Wrapper!
        original.add("D");
        System.out.println("Nach Änderung am Original: " + nurLesen);
    }
}`,
      expectedOutput: `Unveränderlich: [Rot, Grün, Blau]
Fehler: Liste ist unveränderlich!
Veränderliche Kopie: [Rot, Grün, Blau, Gelb]
Nur-Lesen: [A, B, C]
Nach Änderung am Original: [A, B, C, D]`,
      editable: true,
    },
    {
      title: 'Nützliche List-Methoden',
      description: 'Sortieren, Suchen und Transformieren von Listen.',
      code: `import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

public class ListMethoden {
    public static void main(String[] args) {
        List<Integer> zahlen = new ArrayList<>(List.of(42, 17, 8, 33, 5, 21));
        System.out.println("Original:  " + zahlen);

        // Sortieren
        Collections.sort(zahlen);
        System.out.println("Sortiert:  " + zahlen);

        // Umkehren
        Collections.reverse(zahlen);
        System.out.println("Umgekehrt: " + zahlen);

        // Minimum und Maximum
        System.out.println("Minimum: " + Collections.min(zahlen));
        System.out.println("Maximum: " + Collections.max(zahlen));

        // Sublist (Ansicht, keine Kopie)
        List<Integer> teilListe = zahlen.subList(1, 4);
        System.out.println("Teilliste [1,4): " + teilListe);

        // indexOf und lastIndexOf
        List<String> woerter = new ArrayList<>(List.of("Hallo", "Welt", "Hallo"));
        System.out.println("Erster Index von 'Hallo': " + woerter.indexOf("Hallo"));
        System.out.println("Letzter Index von 'Hallo': " + woerter.lastIndexOf("Hallo"));
    }
}`,
      expectedOutput: `Original:  [42, 17, 8, 33, 5, 21]
Sortiert:  [5, 8, 17, 21, 33, 42]
Umgekehrt: [42, 33, 21, 17, 8, 5]
Minimum: 5
Maximum: 42
Teilliste [1,4): [33, 21, 17]
Erster Index von 'Hallo': 0
Letzter Index von 'Hallo': 2`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'listen-q1',
      question: 'Warum sollte man `List<String> liste = new ArrayList<>()` statt `ArrayList<String> liste = new ArrayList<>()` schreiben?',
      options: [
        'Weil ArrayList veraltet ist',
        'Weil man so gegen das Interface programmiert und die Implementierung leicht austauschen kann',
        'Weil List schneller ist als ArrayList',
        'Weil der Compiler es verlangt',
      ],
      correctIndex: 1,
      explanation: 'Programmieren gegen Interfaces (hier List statt ArrayList) ermöglicht es, die Implementierung später einfach auszutauschen (z. B. gegen LinkedList), ohne den restlichen Code ändern zu müssen. Das ist ein wichtiges OOP-Prinzip.',
    },
    {
      id: 'listen-q2',
      question: 'Was passiert, wenn man versucht, ein Element zu einer mit `List.of()` erstellten Liste hinzuzufügen?',
      options: [
        'Das Element wird normal hinzugefügt',
        'Es passiert nichts',
        'Eine UnsupportedOperationException wird geworfen',
        'Die Liste wird automatisch in eine ArrayList umgewandelt',
      ],
      correctIndex: 2,
      explanation: '`List.of()` erstellt eine unveränderliche (immutable) Liste. Jeder Versuch, sie zu verändern (add, remove, set), löst eine UnsupportedOperationException aus.',
    },
    {
      id: 'listen-q3',
      question: 'Wann ist eine `LinkedList` einer `ArrayList` vorzuziehen?',
      options: [
        'Wenn hauptsaechlich per Index auf Elemente zugegriffen wird',
        'Wenn die Liste sehr selten veraendert wird',
        'Wenn sehr haeufig am Anfang oder in der Mitte eingefuegt und geloescht wird',
        'Wenn die Liste sortiert sein muss',
      ],
      correctIndex: 2,
      explanation: 'LinkedList bietet O(1)-Einfuegen und -Loeschen am Anfang und Ende, waehrend ArrayList dafuer O(n) benoetigt (Elemente muessen verschoben werden). Fuer zufaelligen Indexzugriff ist ArrayList mit O(1) deutlich schneller als LinkedList mit O(n).',
    },
  ],
  exercises: [],
  keyConceptsDE: [
    'List<E> — Interface für geordnete Sammlungen',
    'Programmieren gegen Interfaces — Flexibilität durch Abstraktion',
    'ArrayList — Standardimplementierung mit schnellem Indexzugriff',
    'LinkedList — Doppelt verkettete Liste, schnelles Einfügen/Löschen',
    'List.of() — Unveränderliche Liste erstellen',
    'Collections.unmodifiableList() — Nur-Lesen-Wrapper um eine Liste',
  ],
  transferKnowledge: 'Verschiedene List-Implementierungen bedeuten verschiedene Performance-Eigenschaften. Dieses Konzept findet sich überall: Python hat list (wie ArrayList) und deque (wie LinkedList), C++ hat vector und list. Die Wahl der richtigen Datenstruktur ist eine der wichtigsten Entscheidungen in der Softwareentwicklung.',
  order: 16,
};
