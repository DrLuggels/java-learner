import type { Topic } from '../../../types';

export const objectKlasse: Topic = {
  id: 'object-klasse',
  moduleId: 'oop',
  title: 'Die Object-Klasse',
  description: 'toString(), equals(), hashCode(), clone(), getClass() - die Wurzelklasse aller Java-Klassen.',
  content: `# Die Object-Klasse

In Java erbt **jede Klasse** implizit von \`java.lang.Object\`. Object ist die **Wurzelklasse** der gesamten Java-Klassenhierarchie. Auch wenn man kein \`extends\` schreibt, erbt jede Klasse automatisch von Object.

## Wichtige Methoden von Object

### toString()
Gibt eine **String-Darstellung** des Objekts zurueck. Standardmaessig: Klassenname@HashCode. Sollte fuer aussagekraeftige Ausgaben **ueberschrieben** werden.

### equals(Object obj)
Prueft auf **inhaltliche Gleichheit**. Standardmaessig vergleicht equals() nur die Referenzen (wie ==). Muss fuer sinnvolle Vergleiche **ueberschrieben** werden.

### hashCode()
Gibt einen **ganzzahligen Hash-Wert** zurueck. Wichtig fuer Hash-basierte Datenstrukturen (HashMap, HashSet). **Vertrag**: Wenn \`equals()\` ueberschrieben wird, muss auch \`hashCode()\` ueberschrieben werden.

### getClass()
Gibt das **Class-Objekt** zurueck, das die Klasse des Objekts repraesentiert. Kann nicht ueberschrieben werden (\`final\`).

### clone()
Erstellt eine **Kopie** des Objekts. Erfordert, dass die Klasse \`Cloneable\` implementiert. In der Praxis werden oft Copy-Konstruktoren bevorzugt.`,
  codeExamples: [
    {
      title: 'toString() ueberschreiben',
      description: 'Ohne eigenes toString() gibt Java nur den Klassennamen und HashCode aus.',
      code: `class Produkt {
    private String name;
    private double preis;

    public Produkt(String name, double preis) {
        this.name = name;
        this.preis = preis;
    }

    // OHNE toString(): Ausgabe waere z.B. "Produkt@1b6d3586"
    @Override
    public String toString() {
        return String.format("Produkt{name='%s', preis=%.2f EUR}", name, preis);
    }
}

class OhneToString {
    private int wert;
    public OhneToString(int wert) { this.wert = wert; }
    // Kein toString() ueberschrieben!
}

public class ToStringDemo {
    public static void main(String[] args) {
        Produkt p = new Produkt("Laptop", 999.99);
        System.out.println("Mit toString(): " + p);

        OhneToString ohne = new OhneToString(42);
        System.out.println("Ohne toString(): " + ohne);

        // toString() wird automatisch bei println und String-Konkatenation aufgerufen
        System.out.println("Direkt: " + new Produkt("Maus", 29.99));
    }
}`,
      expectedOutput: `Mit toString(): Produkt{name='Laptop', preis=999.99 EUR}
Ohne toString(): OhneToString@<hashcode>
Direkt: Produkt{name='Maus', preis=29.99 EUR}`,
      editable: true,
    },
    {
      title: 'equals() und hashCode() korrekt ueberschreiben',
      description: 'equals und hashCode muessen konsistent ueberschrieben werden.',
      code: `import java.util.Objects;

class Person {
    private String name;
    private int alter;

    public Person(String name, int alter) {
        this.name = name;
        this.alter = alter;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;                    // Gleiche Referenz
        if (obj == null) return false;                   // null-Pruefung
        if (getClass() != obj.getClass()) return false;  // Gleiche Klasse?

        Person other = (Person) obj;
        return alter == other.alter
            && Objects.equals(name, other.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, alter);
    }

    @Override
    public String toString() {
        return name + " (" + alter + ")";
    }
}

public class EqualsHashCodeDemo {
    public static void main(String[] args) {
        Person p1 = new Person("Anna", 25);
        Person p2 = new Person("Anna", 25);
        Person p3 = new Person("Ben", 30);

        System.out.println("p1: " + p1);
        System.out.println("p2: " + p2);
        System.out.println("p3: " + p3);
        System.out.println();

        // Referenzvergleich
        System.out.println("p1 == p2: " + (p1 == p2));           // false
        // Inhaltsvergleich
        System.out.println("p1.equals(p2): " + p1.equals(p2));   // true
        System.out.println("p1.equals(p3): " + p1.equals(p3));   // false
        System.out.println();

        // hashCode muss bei equals-Objekten gleich sein
        System.out.println("p1.hashCode(): " + p1.hashCode());
        System.out.println("p2.hashCode(): " + p2.hashCode());
        System.out.println("Gleicher Hash: " + (p1.hashCode() == p2.hashCode()));
    }
}`,
      expectedOutput: `p1: Anna (25)
p2: Anna (25)
p3: Ben (30)

p1 == p2: false
p1.equals(p2): true
p1.equals(p3): false

p1.hashCode(): <gleicher Wert>
p2.hashCode(): <gleicher Wert>
Gleicher Hash: true`,
      editable: true,
    },
    {
      title: 'getClass() und weitere Object-Methoden',
      description: 'Laufzeit-Typinformationen mit getClass() abfragen.',
      code: `class Tier {
    String name;
    Tier(String name) { this.name = name; }

    @Override
    public String toString() { return name; }
}

class Katze extends Tier {
    Katze(String name) { super(name); }
}

class Hund extends Tier {
    Hund(String name) { super(name); }
}

public class GetClassDemo {
    public static void main(String[] args) {
        Tier t1 = new Katze("Minka");
        Tier t2 = new Hund("Rex");
        Tier t3 = new Katze("Luna");

        // getClass() gibt das tatsaechliche Class-Objekt zurueck
        System.out.println(t1 + " -> " + t1.getClass().getSimpleName());
        System.out.println(t2 + " -> " + t2.getClass().getSimpleName());
        System.out.println(t3 + " -> " + t3.getClass().getSimpleName());
        System.out.println();

        // Vergleich der Klassen
        System.out.println("t1 und t3 gleiche Klasse: "
            + (t1.getClass() == t3.getClass())); // true
        System.out.println("t1 und t2 gleiche Klasse: "
            + (t1.getClass() == t2.getClass())); // false
        System.out.println();

        // Vollqualifizierter Klassenname
        System.out.println("Vollstaendiger Name: " + t1.getClass().getName());

        // Superklasse abfragen
        System.out.println("Superklasse: " + t1.getClass().getSuperclass().getSimpleName());
    }
}`,
      expectedOutput: `Minka -> Katze
Rex -> Hund
Luna -> Katze

t1 und t3 gleiche Klasse: true
t1 und t2 gleiche Klasse: false

Vollstaendiger Name: Katze
Superklasse: Tier`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'object-klasse-q1',
      question: 'Warum muss hashCode() ueberschrieben werden, wenn equals() ueberschrieben wird?',
      options: [
        'Weil der Compiler es erzwingt',
        'Weil Hash-basierte Datenstrukturen (HashMap, HashSet) darauf angewiesen sind, dass gleiche Objekte den gleichen hashCode haben',
        'Weil toString() sonst nicht funktioniert',
        'Weil Java 21 es als Pflicht einfuehrt',
      ],
      correctIndex: 1,
      explanation: 'Der equals-hashCode-Vertrag besagt: Wenn zwei Objekte laut equals() gleich sind, muessen sie denselben hashCode haben. HashMap und HashSet nutzen den hashCode, um Objekte in Buckets zu organisieren. Ohne konsistenten hashCode wuerden gleiche Objekte in verschiedenen Buckets landen.',
    },
    {
      id: 'object-klasse-q2',
      question: 'Was gibt toString() standardmaessig zurueck, wenn es nicht ueberschrieben wird?',
      options: [
        'Den Wert aller Attribute als String',
        'null',
        'Den Klassennamen gefolgt von @ und dem HashCode in Hexadezimal',
        'Eine leere Zeichenkette',
      ],
      correctIndex: 2,
      explanation: 'Die Standard-Implementierung von toString() in Object gibt getClass().getName() + "@" + Integer.toHexString(hashCode()) zurueck, z.B. "Person@1b6d3586". Daher sollte toString() fuer sinnvolle Ausgaben ueberschrieben werden.',
    },
  ],
  exercises: [],
  keyConceptsDE: [
    'Jede Java-Klasse erbt implizit von java.lang.Object',
    'toString() gibt eine String-Darstellung des Objekts zurueck',
    'equals() prueft inhaltliche Gleichheit (muss ueberschrieben werden)',
    'hashCode() muss konsistent mit equals() ueberschrieben werden',
    'getClass() gibt Laufzeit-Typinformationen zurueck (final)',
    'Objects.hash() und Objects.equals() sind nuetzliche Hilfsmethoden',
  ],
  transferKnowledge: 'Jede objektorientierte Sprache hat eine Wurzelklasse: Python hat object, C# hat System.Object, Kotlin hat Any. Die Methoden toString/equals/hashCode existieren in aehnlicher Form ueberall. Das Verstehen der Object-Klasse hilft beim Wechsel zwischen Sprachen.',
  order: 24,
};
