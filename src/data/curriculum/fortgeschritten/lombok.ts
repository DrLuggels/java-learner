import type { Topic } from '../../../types';

export const lombok: Topic = {
  id: 'lombok',
  moduleId: 'fortgeschritten',
  title: 'Lombok',
  description: 'Boilerplate-Code reduzieren mit Lombok-Annotationen.',
  content: `## Was ist Lombok?

Lombok ist eine Java-Bibliothek die **Boilerplate-Code** (repetitiven Code) automatisch generiert. Statt Getter, Setter, Konstruktoren etc. manuell zu schreiben, nutzt du Annotationen.

## Wichtigste Annotationen

| Annotation | Generiert |
|---|---|
| \`@Getter\` | Getter für alle Felder |
| \`@Setter\` | Setter für alle Felder |
| \`@ToString\` | toString()-Methode |
| \`@EqualsAndHashCode\` | equals() und hashCode() |
| \`@NoArgsConstructor\` | Konstruktor ohne Parameter |
| \`@AllArgsConstructor\` | Konstruktor mit allen Parametern |
| \`@Data\` | Kombination: Getter+Setter+ToString+Equals+HashCode |
| \`@Builder\` | Builder-Pattern |

## Merke dir
- Lombok generiert Code zur **Kompilierzeit** — kein Runtime-Overhead
- \`@Data\` = die häufigste Annotation, ersetzt 5 andere
- Für unveränderliche Klassen: \`@Value\` statt \`@Data\``,
  codeExamples: [
    {
      title: '@Data Annotation',
      description: 'Vorher vs. Nachher mit Lombok @Data',
      code: `// OHNE Lombok: ~50 Zeilen fuer eine einfache Klasse
// MIT Lombok (konzeptuell - laeuft nicht im Browser):

// @Data
// @AllArgsConstructor
// public class Student {
//     private String name;
//     private int matrikelNr;
//     private double note;
// }

// Ohne Lombok muss man das alles selbst schreiben:
public class Main {
    public static void main(String[] args) {
        System.out.println("Lombok-Annotationen:");
        System.out.println("@Getter  -> generiert getXxx()");
        System.out.println("@Setter  -> generiert setXxx()");
        System.out.println("@Data    -> Getter+Setter+ToString+Equals+HashCode");
        System.out.println("@Builder -> ermoeglicht Builder-Pattern");
        System.out.println("@Value   -> wie @Data aber unveraenderlich");
    }
}`,
      expectedOutput: 'Lombok-Annotationen:\n@Getter  -> generiert getXxx()\n@Setter  -> generiert setXxx()\n@Data    -> Getter+Setter+ToString+Equals+HashCode\n@Builder -> ermoeglicht Builder-Pattern\n@Value   -> wie @Data aber unveraenderlich',
      editable: true,
    },
    {
      title: '@Builder fuer das Builder-Pattern',
      description: 'Lombok @Builder erzeugt ein elegantes Builder-Pattern automatisch.',
      code: `// Konzeptuell -- Lombok laeuft nicht im Browser
// MIT Lombok:
// @Builder
// @ToString
// public class Pizza {
//     private String groesse;
//     private boolean kaese;
//     private boolean salami;
//     private boolean pilze;
// }
//
// Pizza pizza = Pizza.builder()
//     .groesse("Gross")
//     .kaese(true)
//     .salami(true)
//     .pilze(false)
//     .build();

// Ohne Lombok muss man den Builder selbst implementieren:
public class Main {
    static class Pizza {
        private String groesse;
        private boolean kaese;
        private boolean salami;

        static class Builder {
            private String groesse;
            private boolean kaese;
            private boolean salami;

            Builder groesse(String g) { this.groesse = g; return this; }
            Builder kaese(boolean k) { this.kaese = k; return this; }
            Builder salami(boolean s) { this.salami = s; return this; }
            Pizza build() {
                Pizza p = new Pizza();
                p.groesse = groesse;
                p.kaese = kaese;
                p.salami = salami;
                return p;
            }
        }
        static Builder builder() { return new Builder(); }

        public String toString() {
            return "Pizza(" + groesse + ", Kaese=" + kaese + ", Salami=" + salami + ")";
        }
    }

    public static void main(String[] args) {
        Pizza pizza = Pizza.builder()
            .groesse("Gross")
            .kaese(true)
            .salami(true)
            .build();
        System.out.println(pizza);
        System.out.println("Mit @Builder spart man den gesamten Builder-Code!");
    }
}`,
      expectedOutput: 'Pizza(Gross, Kaese=true, Salami=true)\nMit @Builder spart man den gesamten Builder-Code!',
      editable: true,
    },
    {
      title: '@Value fuer unveraenderliche Klassen',
      description: 'Lombok @Value erzeugt eine immutable Klasse mit allen notwendigen Methoden.',
      code: `// Konzeptuell -- Lombok laeuft nicht im Browser
// MIT Lombok:
// @Value
// public class Geld {
//     double betrag;
//     String waehrung;
// }
// -> Alle Felder private final, nur Getter, kein Setter,
//    toString, equals, hashCode, AllArgsConstructor

// Ohne Lombok muss man das alles selbst schreiben:
public class Main {
    public static void main(String[] args) {
        System.out.println("=== @Value vs @Data ===");
        System.out.println("@Data:  Getter + Setter + toString + equals + hashCode");
        System.out.println("@Value: Getter + toString + equals + hashCode (KEIN Setter!)");
        System.out.println();
        System.out.println("@Value macht alle Felder 'private final'");
        System.out.println("@Value macht die Klasse 'final'");
        System.out.println("=> Perfekt fuer unveraenderliche Werteobjekte!");
        System.out.println();
        System.out.println("Vergleich mit Java Records:");
        System.out.println("  record Geld(double betrag, String waehrung) {}");
        System.out.println("  => Aehnlich, aber Records sind seit Java 16 eingebaut");
    }
}`,
      expectedOutput: '=== @Value vs @Data ===\n@Data:  Getter + Setter + toString + equals + hashCode\n@Value: Getter + toString + equals + hashCode (KEIN Setter!)\n\n@Value macht alle Felder \'private final\'\n@Value macht die Klasse \'final\'\n=> Perfekt fuer unveraenderliche Werteobjekte!\n\nVergleich mit Java Records:\n  record Geld(double betrag, String waehrung) {}\n  => Aehnlich, aber Records sind seit Java 16 eingebaut',
      editable: true,
    },
  ],
  quiz: [
    { id: 'lom-q1', question: 'Was generiert @Data?', options: ['Nur Getter', 'Getter, Setter, toString, equals, hashCode', 'Konstruktoren', 'Nur toString'], correctIndex: 1, explanation: '@Data ist eine Abkürzung für @Getter + @Setter + @ToString + @EqualsAndHashCode + @RequiredArgsConstructor.' },
    { id: 'lom-q2', question: 'Wann wird Lombok-Code generiert?', options: ['Zur Laufzeit', 'Zur Kompilierzeit', 'Beim Deployment', 'Beim Start der JVM'], correctIndex: 1, explanation: 'Lombok ist ein Annotation Processor der zur Kompilierzeit Code generiert. Es gibt keinen Runtime-Overhead.' },
    { id: 'lom-q3', question: 'Was ist der Unterschied zwischen @Data und @Value?', options: ['@Data ist fuer Klassen, @Value fuer Interfaces', '@Data erzeugt Getter+Setter, @Value erzeugt nur Getter (unveraenderlich)', '@Value ist veraltet', '@Data ist nur fuer Records'], correctIndex: 1, explanation: '@Data erzeugt Getter, Setter, toString, equals und hashCode. @Value ist wie @Data, aber alle Felder sind private final (unveraenderlich) und die Klasse ist final -- es gibt keine Setter.' },
  ],
  exercises: [],
  keyConceptsDE: ['@Data', '@Getter/@Setter', '@Builder', '@AllArgsConstructor', 'Boilerplate', 'Annotation Processing'],
  transferKnowledge: 'Code-Generierung gibt es überall: Python Dekoratoren, TypeScript Dekoratoren, C# Source Generators. Das Prinzip "weniger schreiben, mehr machen" ist universal.',
  order: 38,
};
