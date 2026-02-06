import type { Topic } from '../../../types';

export const baeume: Topic = {
  id: 'baeume',
  moduleId: 'datenstrukturen',
  title: 'Baumstrukturen',
  description: 'Binärbäume, Knoten, Traversierung und die baumbasierten Collections TreeMap und TreeSet.',
  content: `
## Baumstrukturen in Java

Ein **Baum** ist eine hierarchische Datenstruktur aus **Knoten** (Nodes). Jeder Knoten hat einen Wert und Verweise auf Kindknoten.

### Binärbaum
Ein **Binärbaum** hat pro Knoten maximal **zwei** Kinder: links und rechts.
- **Wurzel** (Root): Der oberste Knoten
- **Blatt** (Leaf): Knoten ohne Kinder
- **Tiefe/Höhe**: Anzahl der Ebenen

### Binärer Suchbaum (BST)
Ein spezieller Binärbaum mit einer Ordnungseigenschaft:
- Alle Werte im **linken** Teilbaum sind **kleiner** als der Knotenwert
- Alle Werte im **rechten** Teilbaum sind **größer** als der Knotenwert
- Ermöglicht effiziente Suche in O(log n)

### Traversierung (Durchlaufreihenfolgen)
- **Inorder** (Links, Wurzel, Rechts): Gibt Werte sortiert aus
- **Preorder** (Wurzel, Links, Rechts): Nützlich zum Kopieren des Baums
- **Postorder** (Links, Rechts, Wurzel): Nützlich zum Löschen des Baums

### TreeMap und TreeSet in Java
Java bietet baumbasierte Collections:
- \`TreeMap<K,V>\` — Map mit sortierten Schlüsseln (Rot-Schwarz-Baum)
- \`TreeSet<E>\` — Set mit sortierten, eindeutigen Elementen

> **Wann Bäume?** Wenn sortierte Daten, hierarchische Strukturen oder effiziente Suche benötigt werden.
  `.trim(),
  codeExamples: [
    {
      title: 'Binärbaum implementieren',
      description: 'Eigene Binärbaum-Klasse mit Einfügen und den drei Traversierungsarten.',
      code: `public class BinaerBaum {

    // Innere Klasse für einen Knoten
    static class Knoten {
        int wert;
        Knoten links, rechts;

        Knoten(int wert) {
            this.wert = wert;
            this.links = null;
            this.rechts = null;
        }
    }

    Knoten wurzel;

    // Element in den Suchbaum einfügen
    Knoten einfuegen(Knoten knoten, int wert) {
        if (knoten == null) {
            return new Knoten(wert);
        }
        if (wert < knoten.wert) {
            knoten.links = einfuegen(knoten.links, wert);
        } else if (wert > knoten.wert) {
            knoten.rechts = einfuegen(knoten.rechts, wert);
        }
        return knoten;
    }

    // Inorder: Links -> Wurzel -> Rechts (sortiert!)
    void inorder(Knoten knoten) {
        if (knoten != null) {
            inorder(knoten.links);
            System.out.print(knoten.wert + " ");
            inorder(knoten.rechts);
        }
    }

    // Preorder: Wurzel -> Links -> Rechts
    void preorder(Knoten knoten) {
        if (knoten != null) {
            System.out.print(knoten.wert + " ");
            preorder(knoten.links);
            preorder(knoten.rechts);
        }
    }

    // Postorder: Links -> Rechts -> Wurzel
    void postorder(Knoten knoten) {
        if (knoten != null) {
            postorder(knoten.links);
            postorder(knoten.rechts);
            System.out.print(knoten.wert + " ");
        }
    }

    public static void main(String[] args) {
        BinaerBaum baum = new BinaerBaum();

        //         50
        //        /  \\
        //      30    70
        //     / \\   / \\
        //   20  40 60  80
        int[] werte = {50, 30, 70, 20, 40, 60, 80};
        for (int w : werte) {
            baum.wurzel = baum.einfuegen(baum.wurzel, w);
        }

        System.out.print("Inorder (sortiert):  ");
        baum.inorder(baum.wurzel);
        System.out.println();

        System.out.print("Preorder:            ");
        baum.preorder(baum.wurzel);
        System.out.println();

        System.out.print("Postorder:           ");
        baum.postorder(baum.wurzel);
        System.out.println();
    }
}`,
      expectedOutput: `Inorder (sortiert):  20 30 40 50 60 70 80
Preorder:            50 30 20 40 70 60 80
Postorder:           20 40 30 60 80 70 50`,
      editable: true,
    },
    {
      title: 'TreeSet: Sortierte, eindeutige Elemente',
      description: 'TreeSet als baumbasierte Menge mit automatischer Sortierung.',
      code: `import java.util.TreeSet;
import java.util.Set;

public class TreeSetBeispiel {
    public static void main(String[] args) {
        // TreeSet: automatisch sortiert, keine Duplikate
        Set<Integer> zahlen = new TreeSet<>();
        zahlen.add(42);
        zahlen.add(17);
        zahlen.add(8);
        zahlen.add(42); // Duplikat wird ignoriert
        zahlen.add(33);
        zahlen.add(5);

        System.out.println("TreeSet (sortiert): " + zahlen);
        System.out.println("Anzahl: " + zahlen.size());
        System.out.println("Enthält 17? " + zahlen.contains(17));

        // TreeSet mit Strings
        TreeSet<String> namen = new TreeSet<>();
        namen.add("Zara");
        namen.add("Anna");
        namen.add("Maria");
        namen.add("Ben");

        System.out.println("\nNamen (sortiert): " + namen);
        System.out.println("Erster: " + namen.first());
        System.out.println("Letzter: " + namen.last());

        // Teilmenge: Elemente zwischen "B" und "N"
        System.out.println("Von B bis N: " + namen.subSet("B", "N"));
    }
}`,
      expectedOutput: `TreeSet (sortiert): [5, 8, 17, 33, 42]
Anzahl: 5
Enthält 17? true

Namen (sortiert): [Anna, Ben, Maria, Zara]
Erster: Anna
Letzter: Zara
Von B bis N: [Ben, Maria]`,
      editable: true,
    },
    {
      title: 'TreeMap: Sortierte Schlüssel-Wert-Paare',
      description: 'TreeMap für geordnete Maps mit Navigation und Teilbereichen.',
      code: `import java.util.TreeMap;
import java.util.Map;

public class TreeMapBeispiel {
    public static void main(String[] args) {
        // TreeMap: Schlüssel automatisch sortiert
        TreeMap<String, Double> notenSchnitt = new TreeMap<>();
        notenSchnitt.put("Mathematik", 2.3);
        notenSchnitt.put("Informatik", 1.7);
        notenSchnitt.put("Physik", 2.0);
        notenSchnitt.put("Deutsch", 2.7);
        notenSchnitt.put("Englisch", 1.3);

        System.out.println("Alle Fächer (sortiert):");
        for (Map.Entry<String, Double> eintrag : notenSchnitt.entrySet()) {
            System.out.printf("  %-12s -> %.1f%n", eintrag.getKey(), eintrag.getValue());
        }

        // Navigation in der TreeMap
        System.out.println("\nErstes Fach: " + notenSchnitt.firstKey());
        System.out.println("Letztes Fach: " + notenSchnitt.lastKey());

        // Fächer von I bis P (alphabetisch)
        Map<String, Double> teilBereich = notenSchnitt.subMap("I", "Q");
        System.out.println("\nFächer I-P: " + teilBereich);

        // Bestes Fach finden
        String bestesFach = "";
        double besteNote = Double.MAX_VALUE;
        for (Map.Entry<String, Double> eintrag : notenSchnitt.entrySet()) {
            if (eintrag.getValue() < besteNote) {
                besteNote = eintrag.getValue();
                bestesFach = eintrag.getKey();
            }
        }
        System.out.printf("Bestes Fach: %s (%.1f)%n", bestesFach, besteNote);
    }
}`,
      expectedOutput: `Alle Fächer (sortiert):
  Deutsch      -> 2,7
  Englisch     -> 1,3
  Informatik   -> 1,7
  Mathematik   -> 2,3
  Physik       -> 2,0

Erstes Fach: Deutsch
Letztes Fach: Physik

Fächer I-P: {Informatik=1.7, Mathematik=2.3}
Bestes Fach: Englisch (1,3)`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'baeume-q1',
      question: 'Welche Traversierungsart gibt die Elemente eines binären Suchbaums in sortierter Reihenfolge aus?',
      options: [
        'Preorder (Wurzel, Links, Rechts)',
        'Postorder (Links, Rechts, Wurzel)',
        'Inorder (Links, Wurzel, Rechts)',
        'Levelorder (Ebene für Ebene)',
      ],
      correctIndex: 2,
      explanation: 'Inorder-Traversierung (Links, Wurzel, Rechts) besucht zuerst den linken Teilbaum (kleinere Werte), dann die Wurzel, dann den rechten Teilbaum (größere Werte). Bei einem binären Suchbaum ergibt das automatisch die sortierte Reihenfolge.',
    },
    {
      id: 'baeume-q2',
      question: 'Welchen Vorteil hat ein TreeSet gegenüber einem HashSet?',
      options: [
        'TreeSet ist schneller beim Einfügen',
        'TreeSet erlaubt Duplikate',
        'TreeSet hält die Elemente automatisch sortiert',
        'TreeSet braucht weniger Speicher',
      ],
      correctIndex: 2,
      explanation: 'TreeSet speichert Elemente in einem Rot-Schwarz-Baum und hält sie dadurch automatisch sortiert. HashSet ist zwar schneller (O(1) statt O(log n)), garantiert aber keine Reihenfolge. TreeSet bietet zusätzlich Methoden wie first(), last() und subSet().',
    },
    {
      id: 'baeume-q3',
      question: 'Welche Eigenschaft hat ein binaerer Suchbaum (BST)?',
      options: [
        'Jeder Knoten hat genau zwei Kinder',
        'Alle Werte im linken Teilbaum sind kleiner und im rechten Teilbaum groesser als der Knotenwert',
        'Die Hoehe des Baums ist immer minimal',
        'Jedes Blatt hat die gleiche Tiefe',
      ],
      correctIndex: 1,
      explanation: 'In einem binaeren Suchbaum gilt die Ordnungseigenschaft: Alle Werte im linken Teilbaum eines Knotens sind kleiner als der Knotenwert, alle im rechten Teilbaum sind groesser. Diese Eigenschaft ermoeglicht eine effiziente Suche in O(log n) bei einem balancierten Baum.',
    },
  ],
  exercises: [],
  keyConceptsDE: [
    'Binärbaum — Hierarchische Struktur mit maximal zwei Kindern pro Knoten',
    'Binärer Suchbaum — Links kleiner, rechts größer als Knotenwert',
    'Inorder — Links, Wurzel, Rechts (sortierte Ausgabe)',
    'Preorder — Wurzel, Links, Rechts (Baumkopie)',
    'Postorder — Links, Rechts, Wurzel (Baumlöschung)',
    'TreeSet — Sortierte Menge ohne Duplikate',
    'TreeMap — Map mit automatisch sortierten Schlüsseln',
  ],
  transferKnowledge: 'Baumstrukturen sind überall in der Informatik: Dateisysteme, DOM im Browser, Datenbanken (B-Bäume), Compiler (Syntaxbäume), Entscheidungsbäume im Machine Learning. Das Verständnis von Bäumen und Traversierung ist fundamental für viele Algorithmen und Anwendungen.',
  order: 18,
};
