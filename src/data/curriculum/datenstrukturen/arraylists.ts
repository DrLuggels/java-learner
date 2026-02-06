import type { Topic } from '../../../types';

export const arraylists: Topic = {
  id: 'arraylists',
  moduleId: 'datenstrukturen',
  title: 'ArrayList',
  description: 'Dynamische Listen mit ArrayList<E>, Generics-Einführung und Vergleich mit Arrays.',
  content: `
## ArrayList in Java

Die \`ArrayList<E>\` ist eine **dynamische Liste**, die ihre Größe automatisch anpasst. Sie gehört zum \`java.util\`-Paket und ist die meistgenutzte List-Implementierung.

### Generics: Der Typparameter \`<E>\`
ArrayList verwendet **Generics**, um den Elementtyp festzulegen:
- \`ArrayList<String>\` — Liste von Strings
- \`ArrayList<Integer>\` — Liste von Ganzzahlen (Wrapper-Typ!)
- Primitive Typen (\`int\`, \`double\`) sind nicht erlaubt — nutze Wrapper (\`Integer\`, \`Double\`)

### Wichtige Methoden
| Methode | Beschreibung |
|---------|-------------|
| \`add(element)\` | Element am Ende hinzufügen |
| \`add(index, element)\` | Element an Position einfügen |
| \`get(index)\` | Element an Position lesen |
| \`set(index, element)\` | Element an Position ersetzen |
| \`remove(index)\` | Element an Position entfernen |
| \`size()\` | Aktuelle Anzahl der Elemente |
| \`contains(element)\` | Prüft, ob Element vorhanden ist |
| \`isEmpty()\` | Prüft, ob die Liste leer ist |

### ArrayList vs. Array
- **Array**: Feste Größe, primitiv + Objekte, schneller Zugriff per Index
- **ArrayList**: Dynamische Größe, nur Objekte (Wrapper), komfortable Methoden

> **Faustregel:** Verwende \`ArrayList\`, wenn die Anzahl der Elemente zur Compile-Zeit unbekannt ist.
  `.trim(),
  codeExamples: [
    {
      title: 'ArrayList erstellen und befüllen',
      description: 'Grundlegende Operationen: Elemente hinzufügen, lesen und entfernen.',
      code: `import java.util.ArrayList;

public class ArrayListGrundlagen {
    public static void main(String[] args) {
        // ArrayList mit Typparameter erstellen
        ArrayList<String> einkaufsliste = new ArrayList<>();

        // Elemente hinzufügen
        einkaufsliste.add("Milch");
        einkaufsliste.add("Brot");
        einkaufsliste.add("Eier");
        einkaufsliste.add("Käse");

        System.out.println("Einkaufsliste: " + einkaufsliste);
        System.out.println("Anzahl: " + einkaufsliste.size());

        // Zugriff per Index
        System.out.println("Erstes Element: " + einkaufsliste.get(0));

        // Element einfügen an Position 1
        einkaufsliste.add(1, "Butter");
        System.out.println("Nach Einfügen: " + einkaufsliste);

        // Element entfernen
        einkaufsliste.remove("Eier");
        System.out.println("Nach Entfernen: " + einkaufsliste);

        // Enthält die Liste ein Element?
        System.out.println("Enthält Milch? " + einkaufsliste.contains("Milch"));
    }
}`,
      expectedOutput: `Einkaufsliste: [Milch, Brot, Eier, Käse]
Anzahl: 4
Erstes Element: Milch
Nach Einfügen: [Milch, Butter, Brot, Eier, Käse]
Nach Entfernen: [Milch, Butter, Brot, Käse]
Enthält Milch? true`,
      editable: true,
    },
    {
      title: 'ArrayList mit Zahlen und Iteration',
      description: 'ArrayList mit Integer-Wrapper, for-each-Iteration und Autoboxing.',
      code: `import java.util.ArrayList;

public class ArrayListZahlen {
    public static void main(String[] args) {
        // Integer-Wrapper statt int (Autoboxing)
        ArrayList<Integer> noten = new ArrayList<>();
        noten.add(2);  // Autoboxing: int -> Integer
        noten.add(1);
        noten.add(3);
        noten.add(2);
        noten.add(1);

        // Iteration mit for-each
        System.out.print("Noten: ");
        for (int note : noten) {  // Auto-Unboxing: Integer -> int
            System.out.print(note + " ");
        }
        System.out.println();

        // Durchschnitt berechnen
        double summe = 0;
        for (int note : noten) {
            summe += note;
        }
        double durchschnitt = summe / noten.size();
        System.out.printf("Durchschnitt: %.2f%n", durchschnitt);

        // Alle 1er entfernen (Achtung: rückwärts iterieren!)
        for (int i = noten.size() - 1; i >= 0; i--) {
            if (noten.get(i) == 1) {
                noten.remove(i);
            }
        }
        System.out.println("Ohne 1er: " + noten);
    }
}`,
      expectedOutput: `Noten: 2 1 3 2 1
Durchschnitt: 1,80
Ohne 1er: [2, 3, 2]`,
      editable: true,
    },
    {
      title: 'ArrayList vs. Array im Vergleich',
      description: 'Direkter Vergleich der Eigenschaften und Nutzung von Array und ArrayList.',
      code: `import java.util.ArrayList;
import java.util.Arrays;

public class ArrayVsArrayList {
    public static void main(String[] args) {
        // --- Array: feste Größe ---
        String[] arrayFarben = new String[3];
        arrayFarben[0] = "Rot";
        arrayFarben[1] = "Grün";
        arrayFarben[2] = "Blau";
        // arrayFarben[3] = "Gelb"; // ArrayIndexOutOfBoundsException!
        System.out.println("Array:     " + Arrays.toString(arrayFarben));
        System.out.println("Array-Länge: " + arrayFarben.length);

        // --- ArrayList: dynamische Größe ---
        ArrayList<String> listFarben = new ArrayList<>();
        listFarben.add("Rot");
        listFarben.add("Grün");
        listFarben.add("Blau");
        listFarben.add("Gelb");  // Kein Problem!
        listFarben.add("Lila");  // Wächst automatisch
        System.out.println("ArrayList: " + listFarben);
        System.out.println("ArrayList-Größe: " + listFarben.size());

        // Array aus ArrayList erstellen
        String[] alsArray = listFarben.toArray(new String[0]);
        System.out.println("Konvertiert: " + Arrays.toString(alsArray));
    }
}`,
      expectedOutput: `Array:     [Rot, Grün, Blau]
Array-Länge: 3
ArrayList: [Rot, Grün, Blau, Gelb, Lila]
ArrayList-Größe: 5
Konvertiert: [Rot, Grün, Blau, Gelb, Lila]`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'arraylists-q1',
      question: 'Warum kann man `ArrayList<int>` nicht schreiben?',
      options: [
        'Weil int zu wenig Speicher braucht',
        'Weil Generics nur mit Objekttypen funktionieren — man muss den Wrapper-Typ Integer verwenden',
        'Weil ArrayList nur Strings speichern kann',
        'Weil int kein gültiger Typname ist',
      ],
      correctIndex: 1,
      explanation: 'Java-Generics funktionieren nur mit Referenztypen (Objekten), nicht mit primitiven Typen. Statt `int` verwendet man den Wrapper-Typ `Integer`. Java wandelt automatisch um (Autoboxing/Unboxing).',
    },
    {
      id: 'arraylists-q2',
      question: 'Was ist der Hauptunterschied zwischen `arr.length` (Array) und `list.size()` (ArrayList)?',
      options: [
        'length ist eine Eigenschaft, size() ist eine Methode',
        'length gibt die Kapazität zurück, size() die Anzahl der Elemente',
        'Es gibt keinen Unterschied',
        'length funktioniert nur mit Strings',
      ],
      correctIndex: 0,
      explanation: 'Bei Arrays ist `length` eine unveränderliche Eigenschaft (ohne Klammern). Bei ArrayList ist `size()` eine Methode (mit Klammern), die die aktuelle Anzahl der Elemente zurückgibt.',
    },
  ],
  exercises: [],
  keyConceptsDE: [
    'ArrayList<E> — Dynamische Liste mit automatischer Größenanpassung',
    'Generics — Typparameter legt den Elementtyp fest',
    'Autoboxing/Unboxing — Automatische Umwandlung zwischen primitiven und Wrapper-Typen',
    'add(), get(), remove(), size() — Wichtigste ArrayList-Methoden',
    'contains() — Prüft ob ein Element vorhanden ist',
    'ArrayList vs. Array — Dynamisch vs. feste Größe',
  ],
  transferKnowledge: 'Dynamische Listen gibt es in jeder modernen Sprache: Python hat `list` (standardmäßig dynamisch), JavaScript hat `Array` (ebenfalls dynamisch), C# hat `List<T>`. Das Konzept der Generics findet sich auch in TypeScript, C# und Rust.',
  order: 15,
};
