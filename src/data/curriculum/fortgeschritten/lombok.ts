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
  ],
  quiz: [
    { id: 'lom-q1', question: 'Was generiert @Data?', options: ['Nur Getter', 'Getter, Setter, toString, equals, hashCode', 'Konstruktoren', 'Nur toString'], correctIndex: 1, explanation: '@Data ist eine Abkürzung für @Getter + @Setter + @ToString + @EqualsAndHashCode + @RequiredArgsConstructor.' },
    { id: 'lom-q2', question: 'Wann wird Lombok-Code generiert?', options: ['Zur Laufzeit', 'Zur Kompilierzeit', 'Beim Deployment', 'Beim Start der JVM'], correctIndex: 1, explanation: 'Lombok ist ein Annotation Processor der zur Kompilierzeit Code generiert. Es gibt keinen Runtime-Overhead.' },
  ],
  exercises: [],
  keyConceptsDE: ['@Data', '@Getter/@Setter', '@Builder', '@AllArgsConstructor', 'Boilerplate', 'Annotation Processing'],
  transferKnowledge: 'Code-Generierung gibt es überall: Python Dekoratoren, TypeScript Dekoratoren, C# Source Generators. Das Prinzip "weniger schreiben, mehr machen" ist universal.',
  order: 38,
};
