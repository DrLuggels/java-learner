import type { Topic } from '../../../types';

export const komparatoren: Topic = {
  id: 'komparatoren',
  moduleId: 'fortgeschritten',
  title: 'Comparable und Comparator',
  description: 'Sortiere Objekte mit Comparable<T>, compareTo, Comparator<T>, comparing, thenComparing, reversed und Collections.sort.',
  content: `
## Comparable und Comparator

Um Objekte in Java zu sortieren, gibt es zwei Interfaces:
**Comparable** (natuerliche Ordnung) und **Comparator** (externe Ordnung).

### Comparable<T> -- natuerliche Ordnung

Eine Klasse implementiert \`Comparable<T>\` und definiert ihre **natuerliche Sortierreihenfolge**
durch die Methode \`compareTo(T other)\`. Rueckgabewert:
- **negativ**: dieses Objekt kommt vor \`other\`
- **0**: beide sind gleich
- **positiv**: dieses Objekt kommt nach \`other\`

### Comparator<T> -- externe Ordnung

Ein \`Comparator\` definiert eine Sortierreihenfolge **ausserhalb** der Klasse.
Nuetzlich, wenn du verschiedene Sortierungen brauchst oder die Klasse nicht aendern kannst.

### Moderne Comparator-Methoden

- \`Comparator.comparing()\` -- sortiert nach einem Feld
- \`thenComparing()\` -- zweites Sortierkriterium bei Gleichheit
- \`reversed()\` -- kehrt die Reihenfolge um
- \`Comparator.naturalOrder()\` und \`reverseOrder()\`

### Sortieren

Verwende \`Collections.sort()\` fuer Listen oder \`list.sort()\` direkt.
Arrays sortierst du mit \`Arrays.sort()\`.
  `,
  codeExamples: [
    {
      title: 'Comparable implementieren',
      description: 'Eine Klasse mit natuerlicher Ordnung durch Comparable.',
      code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Student implements Comparable<Student> {
    private String name;
    private double note;

    public Student(String name, double note) {
        this.name = name;
        this.note = note;
    }

    public String getName() { return name; }
    public double getNote() { return note; }

    // Natuerliche Ordnung: nach Note (aufsteigend)
    @Override
    public int compareTo(Student other) {
        return Double.compare(this.note, other.note);
    }

    @Override
    public String toString() {
        return name + " (Note: " + note + ")";
    }
}

public class ComparableBeispiel {
    public static void main(String[] args) {
        List<Student> studenten = new ArrayList<>();
        studenten.add(new Student("Anna", 1.7));
        studenten.add(new Student("Ben", 1.3));
        studenten.add(new Student("Clara", 2.0));
        studenten.add(new Student("David", 1.0));

        System.out.println("Unsortiert: " + studenten);

        // Sortiert nach natuerlicher Ordnung (Note)
        Collections.sort(studenten);
        System.out.println("\\nNach Note sortiert:");
        for (Student s : studenten) {
            System.out.println("  " + s);
        }
    }
}`,
      expectedOutput: `Unsortiert: [Anna (Note: 1.7), Ben (Note: 1.3), Clara (Note: 2.0), David (Note: 1.0)]

Nach Note sortiert:
  David (Note: 1.0)
  Ben (Note: 1.3)
  Anna (Note: 1.7)
  Clara (Note: 2.0)`,
      editable: true,
    },
    {
      title: 'Comparator mit comparing und thenComparing',
      description: 'Flexible Sortierung mit Comparator-Methoden und mehreren Kriterien.',
      code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

record Mitarbeiter(String name, String abteilung, int gehalt) {}

public class ComparatorBeispiel {
    public static void main(String[] args) {
        List<Mitarbeiter> team = new ArrayList<>(List.of(
            new Mitarbeiter("Anna", "IT", 55000),
            new Mitarbeiter("Ben", "HR", 48000),
            new Mitarbeiter("Clara", "IT", 62000),
            new Mitarbeiter("David", "HR", 48000),
            new Mitarbeiter("Eva", "IT", 55000)
        ));

        // Nach Gehalt sortieren (aufsteigend)
        team.sort(Comparator.comparingInt(Mitarbeiter::gehalt));
        System.out.println("Nach Gehalt:");
        team.forEach(m -> System.out.println("  " + m));

        // Nach Gehalt absteigend
        team.sort(Comparator.comparingInt(Mitarbeiter::gehalt).reversed());
        System.out.println("\\nNach Gehalt (absteigend):");
        team.forEach(m -> System.out.println("  " + m));

        // Mehrstufig: erst Abteilung, dann Gehalt absteigend
        team.sort(Comparator.comparing(Mitarbeiter::abteilung)
                .thenComparing(Comparator.comparingInt(Mitarbeiter::gehalt).reversed()));
        System.out.println("\\nNach Abteilung, dann Gehalt (absteigend):");
        team.forEach(m -> System.out.println("  " + m));
    }
}`,
      expectedOutput: `Nach Gehalt:
  Mitarbeiter[name=Ben, abteilung=HR, gehalt=48000]
  Mitarbeiter[name=David, abteilung=HR, gehalt=48000]
  Mitarbeiter[name=Anna, abteilung=IT, gehalt=55000]
  Mitarbeiter[name=Eva, abteilung=IT, gehalt=55000]
  Mitarbeiter[name=Clara, abteilung=IT, gehalt=62000]

Nach Gehalt (absteigend):
  Mitarbeiter[name=Clara, abteilung=IT, gehalt=62000]
  Mitarbeiter[name=Anna, abteilung=IT, gehalt=55000]
  Mitarbeiter[name=Eva, abteilung=IT, gehalt=55000]
  Mitarbeiter[name=Ben, abteilung=HR, gehalt=48000]
  Mitarbeiter[name=David, abteilung=HR, gehalt=48000]

Nach Abteilung, dann Gehalt (absteigend):
  Mitarbeiter[name=Ben, abteilung=HR, gehalt=48000]
  Mitarbeiter[name=David, abteilung=HR, gehalt=48000]
  Mitarbeiter[name=Clara, abteilung=IT, gehalt=62000]
  Mitarbeiter[name=Anna, abteilung=IT, gehalt=55000]
  Mitarbeiter[name=Eva, abteilung=IT, gehalt=55000]`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'komparatoren-q1',
      question: 'Was gibt compareTo() zurueck, wenn das aktuelle Objekt "kleiner" als das andere ist?',
      options: ['0', 'Einen positiven Wert', 'Einen negativen Wert', 'true'],
      correctIndex: 2,
      explanation: 'compareTo() gibt einen negativen Wert zurueck, wenn das aktuelle Objekt vor dem anderen kommt. 0 bei Gleichheit und einen positiven Wert, wenn es danach kommt.',
    },
    {
      id: 'komparatoren-q2',
      question: 'Wofuer wird thenComparing() verwendet?',
      options: [
        'Um die Sortierung umzukehren',
        'Um ein zweites Sortierkriterium bei Gleichheit des ersten zu definieren',
        'Um die Sortierung abzubrechen',
        'Um zwei Listen zusammenzufuegen',
      ],
      correctIndex: 1,
      explanation: 'thenComparing() definiert ein zusaetzliches Sortierkriterium, das angewendet wird, wenn das erste Kriterium Gleichheit ergibt. So kann man mehrstufig sortieren.',
    },
  ],
  exercises: [],
  keyConceptsDE: [
    'Comparable<T> definiert die natuerliche Ordnung einer Klasse mit compareTo()',
    'Comparator<T> ermoeglicht externe und flexible Sortierungen',
    'Comparator.comparing() und thenComparing() ermoeglichen mehrstufige Sortierung',
    'reversed() kehrt die Sortierreihenfolge um',
  ],
  transferKnowledge: 'Das Konzept von Vergleichsfunktionen gibt es in jeder Sprache: JavaScript hat sort() mit Callback, Python hat key-Funktionen, C# hat IComparable. Die Idee ist immer gleich: eine Funktion, die zwei Objekte vergleicht und die Reihenfolge bestimmt.',
  order: 35,
};
