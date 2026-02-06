import type { Topic } from '../../../types';

export const hashing: Topic = {
  id: 'hashing',
  moduleId: 'frameworks',
  title: 'Hashing',
  description: 'Der hashCode()-Vertrag, die Beziehung zwischen equals() und hashCode(), HashMap-Internals und Hash-Kollisionen.',
  content: `# Hashing in Java

**Hashing** wandelt ein Objekt in einen ganzzahligen Wert (den **Hash-Code**) um, der als Index in einer Hash-Tabelle dient. Die Methode \`hashCode()\` ist in \`Object\` definiert und kann ueberschrieben werden.

## Der hashCode()-Vertrag
1. Wird \`hashCode()\` mehrfach auf demselben Objekt aufgerufen, muss **immer derselbe Wert** zurueckgegeben werden (solange sich das Objekt nicht aendert).
2. Sind zwei Objekte laut \`equals()\` gleich, **muessen** sie denselben Hash-Code haben.
3. Sind zwei Objekte ungleich, **duerfen** sie denselben Hash-Code haben (Kollision).

## equals() und hashCode() — untrennbar
Wer \`equals()\` ueberschreibt, **muss** auch \`hashCode()\` ueberschreiben. Andernfalls funktionieren Hash-basierte Collections (HashMap, HashSet) nicht korrekt: Gleiche Objekte landen in verschiedenen Buckets.

## HashMap Internals — Buckets
Eine \`HashMap\` speichert Eintraege in einem **Array von Buckets**. Der Hash-Code bestimmt den Bucket-Index. Bei wenigen Eintraegen pro Bucket ist der Zugriff O(1). Ab Java 8 werden Buckets mit vielen Kollisionen zu **Baeumen** (O(log n)) umgewandelt.

## Hash-Kollisionen
Eine **Kollision** tritt auf, wenn zwei verschiedene Schluessel denselben Bucket-Index erhalten. Java loest dies durch **Verkettung** (Linked List / Baum im Bucket). Eine gute \`hashCode()\`-Implementierung minimiert Kollisionen.

## Records und hashCode()
Seit Java 16 generieren **Records** automatisch korrekte \`equals()\`- und \`hashCode()\`-Implementierungen basierend auf allen Komponenten.`,
  codeExamples: [
    {
      title: 'equals() und hashCode() korrekt ueberschreiben',
      description: 'Eine Klasse mit konsistenter equals/hashCode-Implementierung.',
      code: `import java.util.Objects;
import java.util.HashSet;

public class Person {
    private final String name;
    private final int alter;

    public Person(String name, int alter) {
        this.name = name;
        this.alter = alter;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return alter == person.alter && Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, alter);
    }

    @Override
    public String toString() {
        return name + " (" + alter + ")";
    }

    public static void main(String[] args) {
        Person p1 = new Person("Anna", 25);
        Person p2 = new Person("Anna", 25);

        System.out.println("p1.equals(p2): " + p1.equals(p2));
        System.out.println("p1.hashCode(): " + p1.hashCode());
        System.out.println("p2.hashCode(): " + p2.hashCode());
        System.out.println("Gleicher Hash: " + (p1.hashCode() == p2.hashCode()));

        HashSet<Person> set = new HashSet<>();
        set.add(p1);
        set.add(p2); // Duplikat — wird nicht eingefuegt
        System.out.println("Set-Groesse: " + set.size());
    }
}`,
      expectedOutput: `p1.equals(p2): true
p1.hashCode(): 63452437
p2.hashCode(): 63452437
Gleicher Hash: true
Set-Groesse: 1`,
      editable: true
    },
    {
      title: 'HashMap-Verhalten und Kollisionen',
      description: 'Demonstration von HashMap-Internals und dem Effekt schlechter Hash-Funktionen.',
      code: `import java.util.HashMap;
import java.util.Map;

public class HashMapBeispiel {
    // Klasse mit absichtlich schlechtem hashCode (erzeugt Kollisionen)
    static class SchlechterKey {
        private final String wert;

        SchlechterKey(String wert) { this.wert = wert; }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            return wert.equals(((SchlechterKey) o).wert);
        }

        @Override
        public int hashCode() {
            return 42; // Alle Objekte landen im selben Bucket!
        }
    }

    public static void main(String[] args) {
        // Normaler HashMap-Einsatz
        Map<String, Integer> noten = new HashMap<>();
        noten.put("Mathe", 2);
        noten.put("Deutsch", 1);
        noten.put("Physik", 3);
        System.out.println("Noten: " + noten);
        System.out.println("Mathe-Note: " + noten.get("Mathe"));

        // Hash-Codes verschiedener Strings
        System.out.println("\\nHash von 'Mathe': " + "Mathe".hashCode());
        System.out.println("Hash von 'Deutsch': " + "Deutsch".hashCode());

        // Schlechter Hash — alles kollidiert
        Map<SchlechterKey, String> kollisionsMap = new HashMap<>();
        kollisionsMap.put(new SchlechterKey("A"), "Alpha");
        kollisionsMap.put(new SchlechterKey("B"), "Beta");
        kollisionsMap.put(new SchlechterKey("C"), "Gamma");
        System.out.println("\\nKollisions-Map Groesse: " + kollisionsMap.size());
        System.out.println("Wert fuer B: " + kollisionsMap.get(new SchlechterKey("B")));
    }
}`,
      expectedOutput: `Noten: {Deutsch=1, Mathe=2, Physik=3}
Mathe-Note: 2

Hash von 'Mathe': 74036400
Hash von 'Deutsch': 561925962

Kollisions-Map Groesse: 3
Wert fuer B: Beta`,
      editable: true
    }
  ],
  quiz: [
    {
      id: 'hashing-q1',
      question: 'Was passiert, wenn equals() ueberschrieben wird, aber hashCode() nicht?',
      options: [
        'Es gibt einen Compilerfehler',
        'Gleiche Objekte koennen in HashSets doppelt vorkommen',
        'Die JVM korrigiert den hashCode automatisch',
        'Es hat keinen Einfluss auf das Programmverhalten'
      ],
      correctIndex: 1,
      explanation: 'Wenn equals() ohne hashCode() ueberschrieben wird, koennen zwei logisch gleiche Objekte verschiedene Hash-Codes haben. In einem HashSet landen sie dann in verschiedenen Buckets und werden als unterschiedliche Elemente behandelt — Duplikate werden nicht erkannt.'
    },
    {
      id: 'hashing-q2',
      question: 'Wie loest eine HashMap Hash-Kollisionen?',
      options: [
        'Sie wirft eine Exception',
        'Sie ueberschreibt den alten Eintrag',
        'Sie verwendet Verkettung (Linked List / Baum) im Bucket',
        'Sie erzeugt einen neuen Hash-Code'
      ],
      correctIndex: 2,
      explanation: 'Bei einer Kollision speichert die HashMap mehrere Eintraege im selben Bucket, verkettet als Linked List. Ab 8 Eintraegen pro Bucket wird die Liste in einen Rot-Schwarz-Baum umgewandelt, um die Suchzeit auf O(log n) zu reduzieren.'
    }
  ],
  exercises: [],
  keyConceptsDE: [
    'hashCode()-Vertrag: gleiche Objekte → gleicher Hash',
    'equals() und hashCode() immer gemeinsam ueberschreiben',
    'HashMap: Array von Buckets, Hash bestimmt Index',
    'Kollisionen: Verkettung (LinkedList → Baum ab 8 Eintraegen)',
    'Records generieren equals() und hashCode() automatisch'
  ],
  transferKnowledge: 'Korrektes Hashing ist entscheidend fuer performante und fehlerfreie Anwendungen. In der Praxis nutzt man Objects.hash() oder die von Records generierten Methoden. In verteilten Systemen (z.B. Caches, Datenbanken) spielt konsistentes Hashing eine zentrale Rolle bei der Datenpartitionierung.',
  order: 46
};
