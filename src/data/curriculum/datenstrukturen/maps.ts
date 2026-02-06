import type { Topic } from '../../../types';

export const maps: Topic = {
  id: 'maps',
  moduleId: 'datenstrukturen',
  title: 'Maps',
  description: 'Schlüssel-Wert-Paare mit HashMap, TreeMap und unveränderlichen Maps in Java.',
  content: `
## Maps in Java

Eine **Map** speichert Daten als **Schlüssel-Wert-Paare** (Key-Value-Pairs). Jeder Schlüssel ist eindeutig und verweist auf genau einen Wert.

### HashMap vs. TreeMap
| Eigenschaft | HashMap | TreeMap |
|-------------|---------|---------|
| Ordnung | Keine garantierte Reihenfolge | Schlüssel sind sortiert |
| Geschwindigkeit | O(1) für get/put | O(log n) für get/put |
| Null-Schlüssel | Erlaubt (einer) | Nicht erlaubt |
| Implementierung | Hash-Tabelle | Rot-Schwarz-Baum |

### Wichtige Methoden
| Methode | Beschreibung |
|---------|-------------|
| \`put(key, value)\` | Schlüssel-Wert-Paar einfügen/aktualisieren |
| \`get(key)\` | Wert zum Schlüssel abrufen |
| \`getOrDefault(key, default)\` | Wert abrufen oder Standardwert |
| \`containsKey(key)\` | Prüft, ob Schlüssel vorhanden |
| \`containsValue(value)\` | Prüft, ob Wert vorhanden |
| \`keySet()\` | Alle Schlüssel als Set |
| \`values()\` | Alle Werte als Collection |
| \`entrySet()\` | Alle Einträge als Set von Map.Entry |
| \`remove(key)\` | Eintrag entfernen |
| \`size()\` | Anzahl der Einträge |

### Unveränderliche Maps
\`Map.of(k1, v1, k2, v2, ...)\` erstellt eine unveränderliche Map (max. 10 Paare). Für mehr Einträge: \`Map.ofEntries()\`.

> **Tipp:** Verwende \`HashMap\` als Standard. \`TreeMap\` nur, wenn sortierte Schlüssel benötigt werden.
  `.trim(),
  codeExamples: [
    {
      title: 'HashMap: Grundlagen',
      description: 'Erstellen, Befüllen und Abfragen einer HashMap.',
      code: `import java.util.HashMap;
import java.util.Map;

public class HashMapGrundlagen {
    public static void main(String[] args) {
        // HashMap erstellen: Schlüssel -> Wert
        Map<String, Integer> hauptstaedte = new HashMap<>();

        // Einträge hinzufügen
        hauptstaedte.put("Deutschland", 83_000_000);
        hauptstaedte.put("Frankreich", 67_000_000);
        hauptstaedte.put("Italien", 60_000_000);
        hauptstaedte.put("Spanien", 47_000_000);

        System.out.println("Map: " + hauptstaedte);
        System.out.println("Anzahl: " + hauptstaedte.size());

        // Wert abrufen
        int einwohnerDE = hauptstaedte.get("Deutschland");
        System.out.println("Deutschland: " + einwohnerDE);

        // getOrDefault für fehlende Schlüssel
        int einwohnerUK = hauptstaedte.getOrDefault("UK", 0);
        System.out.println("UK (Standard): " + einwohnerUK);

        // Schlüssel prüfen
        System.out.println("Enthält Frankreich? " + hauptstaedte.containsKey("Frankreich"));
        System.out.println("Enthält Japan? " + hauptstaedte.containsKey("Japan"));

        // Wert aktualisieren
        hauptstaedte.put("Deutschland", 84_000_000);
        System.out.println("DE aktualisiert: " + hauptstaedte.get("Deutschland"));
    }
}`,
      expectedOutput: `Map: {Spanien=47000000, Frankreich=67000000, Italien=60000000, Deutschland=83000000}
Anzahl: 4
Deutschland: 83000000
UK (Standard): 0
Enthält Frankreich? true
Enthält Japan? false
DE aktualisiert: 84000000`,
      editable: true,
    },
    {
      title: 'Map iterieren und TreeMap',
      description: 'Verschiedene Wege eine Map zu durchlaufen und sortierte Maps mit TreeMap.',
      code: `import java.util.HashMap;
import java.util.TreeMap;
import java.util.Map;

public class MapIteration {
    public static void main(String[] args) {
        Map<String, String> woerterbuch = new HashMap<>();
        woerterbuch.put("Hund", "dog");
        woerterbuch.put("Katze", "cat");
        woerterbuch.put("Vogel", "bird");
        woerterbuch.put("Fisch", "fish");

        // 1. Iteration über entrySet (Key + Value)
        System.out.println("=== Wörterbuch (HashMap) ===");
        for (Map.Entry<String, String> eintrag : woerterbuch.entrySet()) {
            System.out.println(eintrag.getKey() + " = " + eintrag.getValue());
        }

        // 2. Nur Schlüssel
        System.out.println("\nSchlüssel: " + woerterbuch.keySet());

        // 3. Nur Werte
        System.out.println("Werte: " + woerterbuch.values());

        // TreeMap: automatisch nach Schlüssel sortiert
        Map<String, String> sortiert = new TreeMap<>(woerterbuch);
        System.out.println("\n=== Wörterbuch (TreeMap, sortiert) ===");
        for (Map.Entry<String, String> eintrag : sortiert.entrySet()) {
            System.out.println(eintrag.getKey() + " = " + eintrag.getValue());
        }
    }
}`,
      expectedOutput: `=== Wörterbuch (HashMap) ===
Katze = cat
Hund = dog
Fisch = fish
Vogel = bird

Schlüssel: [Katze, Hund, Fisch, Vogel]
Werte: [cat, dog, fish, bird]

=== Wörterbuch (TreeMap, sortiert) ===
Fisch = fish
Hund = dog
Katze = cat
Vogel = bird`,
      editable: true,
    },
    {
      title: 'Map.of() und praktisches Beispiel',
      description: 'Unveränderliche Maps und ein Häufigkeitszähler als praktisches Beispiel.',
      code: `import java.util.HashMap;
import java.util.Map;

public class MapPraxis {
    public static void main(String[] args) {
        // Unveränderliche Map mit Map.of()
        Map<String, String> abkuerzungen = Map.of(
            "JVM", "Java Virtual Machine",
            "API", "Application Programming Interface",
            "OOP", "Objektorientierte Programmierung"
        );
        System.out.println("Abkürzungen: " + abkuerzungen);

        // Praktisches Beispiel: Buchstabenhäufigkeit zählen
        String text = "PROGRAMMIERUNG";
        Map<Character, Integer> haeufigkeit = new HashMap<>();

        for (char c : text.toCharArray()) {
            haeufigkeit.put(c, haeufigkeit.getOrDefault(c, 0) + 1);
        }

        System.out.println("\nBuchstabenhäufigkeit in '" + text + "':");
        for (Map.Entry<Character, Integer> eintrag : haeufigkeit.entrySet()) {
            System.out.println("  " + eintrag.getKey() + ": " + eintrag.getValue());
        }

        // Häufigster Buchstabe finden
        char haeufigster = ' ';
        int maxAnzahl = 0;
        for (Map.Entry<Character, Integer> eintrag : haeufigkeit.entrySet()) {
            if (eintrag.getValue() > maxAnzahl) {
                maxAnzahl = eintrag.getValue();
                haeufigster = eintrag.getKey();
            }
        }
        System.out.println("Häufigster Buchstabe: " + haeufigster + " (" + maxAnzahl + "x)");
    }
}`,
      expectedOutput: `Abkürzungen: {OOP=Objektorientierte Programmierung, API=Application Programming Interface, JVM=Java Virtual Machine}

Buchstabenhäufigkeit in 'PROGRAMMIERUNG':
  P: 1
  R: 3
  O: 1
  G: 2
  A: 1
  M: 2
  I: 1
  E: 1
  U: 1
  N: 1
Häufigster Buchstabe: R (3x)`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'maps-q1',
      question: 'Was passiert, wenn man `put()` mit einem bereits vorhandenen Schlüssel aufruft?',
      options: [
        'Eine Exception wird geworfen',
        'Der Aufruf wird ignoriert',
        'Der alte Wert wird durch den neuen Wert ersetzt',
        'Ein zweiter Eintrag mit dem gleichen Schlüssel wird erstellt',
      ],
      correctIndex: 2,
      explanation: 'In einer Map ist jeder Schlüssel eindeutig. Wenn `put()` mit einem bestehenden Schlüssel aufgerufen wird, wird der alte Wert durch den neuen ersetzt. Der alte Wert wird als Rückgabewert von `put()` zurückgegeben.',
    },
    {
      id: 'maps-q2',
      question: 'Was ist der Hauptunterschied zwischen HashMap und TreeMap?',
      options: [
        'HashMap ist schneller, TreeMap speichert mehr Daten',
        'HashMap hat keine Ordnung, TreeMap sortiert die Schlüssel automatisch',
        'HashMap speichert nur Strings, TreeMap speichert alle Typen',
        'HashMap ist veraltet, TreeMap ist die moderne Alternative',
      ],
      correctIndex: 1,
      explanation: 'HashMap hat keine garantierte Reihenfolge der Einträge, bietet aber O(1)-Zugriff. TreeMap sortiert die Schlüssel automatisch in natürlicher Ordnung, hat aber O(log n)-Zugriff. Beide implementieren das Map-Interface.',
    },
    {
      id: 'maps-q3',
      question: 'Was gibt `map.get(key)` zurueck, wenn der Schluessel nicht in der Map vorhanden ist?',
      options: [
        'Eine KeyNotFoundException wird geworfen',
        'Ein leerer String',
        'null',
        'Der Standardwert des Wert-Typs (z.B. 0 fuer Integer)',
      ],
      correctIndex: 2,
      explanation: 'Wenn ein Schluessel nicht vorhanden ist, gibt `get()` den Wert `null` zurueck. Um einen Standardwert statt null zu erhalten, kann man `getOrDefault(key, defaultValue)` verwenden. Bei primitiven Wrapper-Typen ist Vorsicht geboten, da Unboxing von null eine NullPointerException ausloest.',
    },
  ],
  exercises: ['maps-01', 'maps-02'],
  keyConceptsDE: [
    'Map<K, V> — Schlüssel-Wert-Paare, eindeutige Schlüssel',
    'HashMap — Schnellster Zugriff (O(1)), keine Ordnung',
    'TreeMap — Automatisch sortierte Schlüssel (O(log n))',
    'put(), get(), containsKey() — Grundlegende Map-Operationen',
    'keySet(), values(), entrySet() — Map durchlaufen',
    'getOrDefault() — Sicherer Zugriff mit Standardwert',
    'Map.of() — Unveränderliche Map erstellen',
  ],
  transferKnowledge: 'Dictionaries/Maps sind essentiell in jeder Programmiersprache. Python hat `dict`, JavaScript hat `Map` und Object-Literals, C# hat `Dictionary<TKey, TValue>`. Das Konzept der Schlüssel-Wert-Zuordnung ist eines der wichtigsten in der gesamten Informatik — von Datenbanken bis zu JSON.',
  order: 17,
};
