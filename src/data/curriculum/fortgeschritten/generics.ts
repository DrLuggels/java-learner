import type { Topic } from '../../../types';

export const generics: Topic = {
  id: 'generics',
  moduleId: 'fortgeschritten',
  title: 'Generics',
  description: 'Typensichere, wiederverwendbare Klassen und Methoden mit Generics.',
  content: `## Warum Generics?

Ohne Generics müsstest du für jede Type eine eigene Klasse schreiben. Generics erlauben **eine Klasse für viele Typen**.

\`\`\`java
// Ohne Generics: Object casten, unsicher
// Mit Generics: Typsicher zur Kompilierzeit
List<String> namen = new ArrayList<>(); // Nur Strings!
\`\`\`

## Type Parameters

- \`<T>\` — Type (beliebiger Typ)
- \`<E>\` — Element
- \`<K, V>\` — Key, Value
- \`<T extends Comparable<T>>\` — Bounded Type (Obergrenze)

## Wildcards

- \`?\` — Unbekannter Typ
- \`? extends T\` — T oder Subtyp (Lesen)
- \`? super T\` — T oder Supertyp (Schreiben)

## Merke dir
- Generics existieren nur zur **Kompilierzeit** (Type Erasure)
- Primitive Typen nicht erlaubt: \`List<int>\` → \`List<Integer>\``,
  codeExamples: [
    {
      title: 'Generische Klasse',
      description: 'Eine Box die jeden Typ speichern kann',
      code: `class Box<T> {
    private T inhalt;

    public Box(T inhalt) { this.inhalt = inhalt; }
    public T getInhalt() { return inhalt; }
    public void setInhalt(T inhalt) { this.inhalt = inhalt; }
    public String toString() { return "Box[" + inhalt + "]"; }
}

public class Main {
    public static void main(String[] args) {
        Box<String> textBox = new Box<>("Hallo");
        Box<Integer> zahlBox = new Box<>(42);
        Box<Double> doubleBox = new Box<>(3.14);

        System.out.println(textBox);
        System.out.println(zahlBox);
        System.out.println(doubleBox);

        // Typsicher! Das wuerde nicht kompilieren:
        // zahlBox.setInhalt("Text"); // Compilerfehler!
    }
}`,
      expectedOutput: 'Box[Hallo]\nBox[42]\nBox[3.14]',
      editable: true,
    },
    {
      title: 'Generische Methode mit Bounded Type',
      description: 'Maximum-Funktion die mit allen vergleichbaren Typen funktioniert',
      code: `public class Main {
    // T muss Comparable implementieren
    static <T extends Comparable<T>> T maximum(T a, T b, T c) {
        T max = a;
        if (b.compareTo(max) > 0) max = b;
        if (c.compareTo(max) > 0) max = c;
        return max;
    }

    public static void main(String[] args) {
        System.out.println("Max(3,7,5) = " + maximum(3, 7, 5));
        System.out.println("Max(a,z,m) = " + maximum("a", "z", "m"));
        System.out.println("Max(1.1,2.2,0.5) = " + maximum(1.1, 2.2, 0.5));
    }
}`,
      expectedOutput: 'Max(3,7,5) = 7\nMax(a,z,m) = z\nMax(1.1,2.2,0.5) = 2.2',
      editable: true,
    },
  ],
  quiz: [
    { id: 'gen-q1', question: 'Was bedeutet <T extends Comparable<T>>?', options: ['T muss Comparable sein oder davon erben', 'T muss genau Comparable sein', 'T darf kein Comparable sein', 'T ist immer String'], correctIndex: 0, explanation: 'extends bei Generics bedeutet "ist vom Typ oder implementiert". T muss Comparable implementieren.' },
    { id: 'gen-q2', question: 'Warum kann man nicht List<int> schreiben?', options: ['int ist zu kurz', 'Generics funktionieren nur mit Referenztypen, nicht primitiven', 'int gibt es nicht in Java', 'List unterstützt nur Strings'], correctIndex: 1, explanation: 'Generics nutzen Type Erasure und funktionieren nur mit Referenztypen. Nutze List<Integer> statt List<int>.' },
  ],
  exercises: ['generics-01'],
  keyConceptsDE: ['Type Parameter', 'Bounded Type', 'Wildcard', 'Type Erasure', 'Generische Klasse', 'Generische Methode'],
  transferKnowledge: 'Generics gibt es in vielen Sprachen: C# Generics, TypeScript Generics, C++ Templates, Rust Generics. Das Konzept der parametrisierten Typen ist universal.',
  order: 41,
};
