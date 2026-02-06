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
    {
      title: 'Wildcards und generisches Interface',
      description: 'Upper und Lower Bounded Wildcards sowie generische Interfaces.',
      code: `import java.util.*;

public class Main {
    // Generisches Interface
    interface Speicher<T> {
        void speichern(T wert);
        T laden();
    }

    // Implementierung mit konkretem Typ
    static class StringSpeicher implements Speicher<String> {
        private String wert;
        public void speichern(String wert) { this.wert = wert; }
        public String laden() { return wert; }
    }

    // ? extends Number: Lesen aus einer Liste von Zahlen
    static double summe(List<? extends Number> zahlen) {
        double sum = 0;
        for (Number n : zahlen) {
            sum += n.doubleValue();
        }
        return sum;
    }

    // ? super Integer: Schreiben in eine Liste die Integer akzeptiert
    static void fuellen(List<? super Integer> liste, int bis) {
        for (int i = 1; i <= bis; i++) {
            liste.add(i);
        }
    }

    public static void main(String[] args) {
        // Generisches Interface nutzen
        Speicher<String> sp = new StringSpeicher();
        sp.speichern("Hallo Generics!");
        System.out.println("Geladen: " + sp.laden());

        // ? extends: Lesen aus Integer- und Double-Listen
        List<Integer> ints = List.of(1, 2, 3);
        List<Double> doubles = List.of(1.5, 2.5, 3.5);
        System.out.println("Summe ints: " + summe(ints));
        System.out.println("Summe doubles: " + summe(doubles));

        // ? super: Schreiben
        List<Number> nummern = new ArrayList<>();
        fuellen(nummern, 5);
        System.out.println("Gefuellt: " + nummern);
    }
}`,
      expectedOutput: 'Geladen: Hallo Generics!\nSumme ints: 6.0\nSumme doubles: 7.5\nGefuellt: [1, 2, 3, 4, 5]',
      editable: true,
    },
  ],
  quiz: [
    { id: 'gen-q1', question: 'Was bedeutet <T extends Comparable<T>>?', options: ['T muss Comparable sein oder davon erben', 'T muss genau Comparable sein', 'T darf kein Comparable sein', 'T ist immer String'], correctIndex: 0, explanation: 'extends bei Generics bedeutet "ist vom Typ oder implementiert". T muss Comparable implementieren.' },
    { id: 'gen-q2', question: 'Warum kann man nicht List<int> schreiben?', options: ['int ist zu kurz', 'Generics funktionieren nur mit Referenztypen, nicht primitiven', 'int gibt es nicht in Java', 'List unterstützt nur Strings'], correctIndex: 1, explanation: 'Generics nutzen Type Erasure und funktionieren nur mit Referenztypen. Nutze List<Integer> statt List<int>.' },
    { id: 'gen-q3', question: 'Was bedeutet die Wildcard ? extends Number?', options: ['Nur genau Number ist erlaubt', 'Number oder ein beliebiger Subtyp von Number (z.B. Integer, Double)', 'Number oder ein Supertyp von Number', 'Alle Typen sind erlaubt'], correctIndex: 1, explanation: '? extends Number ist eine Upper Bounded Wildcard. Sie erlaubt Number selbst und alle Subtypen (Integer, Double, Long, etc.). Man kann daraus lesen, aber nicht hineinschreiben (Producer Extends, Consumer Super -- PECS).' },
  ],
  exercises: ['generics-01'],
  keyConceptsDE: ['Type Parameter', 'Bounded Type', 'Wildcard', 'Type Erasure', 'Generische Klasse', 'Generische Methode'],
  transferKnowledge: 'Generics gibt es in vielen Sprachen: C# Generics, TypeScript Generics, C++ Templates, Rust Generics. Das Konzept der parametrisierten Typen ist universal.',
  order: 41,
};
