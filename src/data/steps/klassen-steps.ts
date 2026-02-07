import type { LessonStep } from '../../types';

export const klassenSteps: LessonStep[] = [
  {
    id: 'kl-step-1',
    type: 'content',
    title: 'Klassen und Objekte - Die Grundlagen',
    content: `## Klassen und Objekte
Java ist **objektorientiert** - Programme bestehen aus interagierenden Objekten.

### Klasse = Bauplan
Definiert **Attribute** (was ein Objekt hat) und **Methoden** (was es tun kann).

### Objekt = Instanz
Ein konkretes Exemplar nach dem Bauplan.

\`\`\`java
class Auto {
    String marke;
    int ps;
    void fahren() { System.out.println("Fährt!"); }
}

Auto meinAuto = new Auto();
meinAuto.marke = "BMW";
meinAuto.fahren();
\`\`\`

**Analogie:** Klasse = Bauplan, Objekt = gebautes Haus`,
  },
  {
    id: 'kl-step-2',
    type: 'fill-blank',
    title: 'Vervollständige die Klasse',
    fillBlankCode: `// Erstelle eine Klasse für eine Person
public class {{0}} {
    private {{1}} name;
    private int {{2}};
}`,
    fillBlankAnswers: ['Person', 'String', 'alter'],
  },
  {
    id: 'kl-step-3',
    type: 'code-example',
    title: 'Vollständige Klasse mit Konstruktor',
    codeExample: {
      title: 'Person-Klasse mit Konstruktor, Getter und toString',
      description: 'Eine vollständige Klasse mit private Attributen, Konstruktor, Getter-Methoden und toString() für lesbare Ausgabe.',
      code: `public class Person {
    // Private Attribute (Encapsulation)
    private String name;
    private int alter;

    // Konstruktor - wird beim Erstellen eines Objekts aufgerufen
    public Person(String name, int alter) {
        this.name = name;    // 'this' unterscheidet Parameter von Attribut
        this.alter = alter;
    }

    // Getter-Methoden für Zugriff auf private Attribute
    public String getName() {
        return name;
    }

    public int getAlter() {
        return alter;
    }

    // toString() für lesbare String-Darstellung
    @Override
    public String toString() {
        return "Person{name='" + name + "', alter=" + alter + "}";
    }

    // Main-Methode zum Testen
    public static void main(String[] args) {
        // Objekt erstellen mit new und Konstruktor
        Person p1 = new Person("Max", 20);
        Person p2 = new Person("Anna", 25);

        // Objekte verwenden
        System.out.println(p1);
        System.out.println(p2);
        System.out.println(p1.getName() + " ist " + p1.getAlter() + " Jahre alt.");
    }
}`,
      expectedOutput: `Person{name='Max', alter=20}
Person{name='Anna', alter=25}
Max ist 20 Jahre alt.`,
      editable: true,
    },
  },
  {
    id: 'kl-step-4',
    type: 'predict-output',
    title: 'Vorhersage: toString() Ausgabe',
    predictCode: `// Angenommen, die Person-Klasse ist wie oben definiert
Person p = new Person("Max", 20);
System.out.println(p);`,
    predictAnswer: "Person{name='Max', alter=20}",
    predictExplanation: 'Wenn ein Objekt mit System.out.println() ausgegeben wird, ruft Java automatisch die toString()-Methode auf. Die Person-Klasse überschreibt toString() und gibt eine formatierte Darstellung zurück: Person{name=\'Max\', alter=20}.',
  },
  {
    id: 'kl-step-5',
    type: 'challenge',
    title: 'Challenge: Auto-Klasse erstellen',
    challenge: {
      instruction: 'Erstelle eine Klasse Auto mit den Attributen marke (String) und ps (int). Erstelle einen Konstruktor und eine toString()-Methode. Erstelle dann ein Auto-Objekt und gib es aus.',
      starterCode: `public class Auto {
    // Attribute hier


    // Konstruktor hier


    // toString() hier


    public static void main(String[] args) {
        // Erstelle ein Auto-Objekt und gib es aus


    }
}`,
      validationPattern: 'Auto|marke|ps',
      hint: 'Orientiere dich an der Person-Klasse. Denke an: private Attribute, public Konstruktor mit Parametern, @Override toString().',
    },
  },
  {
    id: 'kl-step-6',
    type: 'content',
    title: 'Konstruktoren, this und static',
    content: `## Konstruktoren
Spezielle Methode beim Erstellen eines Objekts:
- Gleicher Name wie Klasse, kein Rückgabetyp
\`\`\`java
public Person(String name) { this.name = name; }
\`\`\`

## this-Keyword
Bezieht sich auf aktuelles Objekt:
\`\`\`java
this.name = name;  // Unterscheidet Attribut von Parameter
\`\`\`

## static
Gehört zur Klasse, nicht zum Objekt:
\`\`\`java
class Zaehler {
    static int count = 0;
    public Zaehler() { count++; }
}
// Nach 3x new Zaehler(): count = 3
\`\`\``,
  },
  {
    id: 'kl-step-7',
    type: 'predict-output',
    title: 'Vorhersage: static counter',
    predictCode: `public class Zaehler {
    static int count = 0;

    public Zaehler() {
        count++;
    }
}

// In main:
new Zaehler();
new Zaehler();
new Zaehler();
System.out.println(Zaehler.count);`,
    predictAnswer: '3',
    predictExplanation: 'Das static Attribut count gehört zur Klasse, nicht zu einzelnen Objekten. Jeder Konstruktor-Aufruf erhöht count um 1. Nach drei new Zaehler() Aufrufen hat count den Wert 3. static-Variablen werden von allen Instanzen geteilt.',
  },
  {
    id: 'kl-step-8',
    type: 'quiz',
    title: 'Quiz: Standard-Konstruktor',
    quizQuestion: {
      id: 'kl-quiz-1',
      question: 'Was passiert, wenn in einer Klasse kein Konstruktor definiert wird?',
      options: [
        'Die Klasse kann nicht kompiliert werden',
        'Objekte können nicht erstellt werden',
        'Java erstellt automatisch einen Standard-Konstruktor ohne Parameter',
        'Man muss immer einen Konstruktor definieren',
      ],
      correctIndex: 2,
      explanation: 'Wenn keine Konstruktoren definiert sind, erstellt Java automatisch einen Standard-Konstruktor (Default Constructor) ohne Parameter. Dieser macht nichts außer das Objekt zu erstellen. Sobald du aber einen eigenen Konstruktor definierst, wird der Standard-Konstruktor nicht mehr automatisch erstellt.',
    },
  },
];
