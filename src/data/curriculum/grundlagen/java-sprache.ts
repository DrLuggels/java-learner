import type { Topic } from '../../../types';

export const javaSprache: Topic = {
  id: 'java-sprache',
  moduleId: 'grundlagen',
  title: 'Die Sprache Java',
  description: 'Geschichte, Prinzipien und das Java-Ökosystem mit JDK, JRE und JVM.',
  content: `# Die Sprache Java

Java wurde **1995** von **James Gosling** bei Sun Microsystems entwickelt. Seit 2010 gehört Java zu **Oracle**. Java ist eine der am weitesten verbreiteten Programmiersprachen der Welt.

## Grundprinzipien

- **Write Once, Run Anywhere (WORA)**: Java-Programme laufen auf jedem System mit JVM.
- **Objektorientiert**: Alles in Java dreht sich um Klassen und Objekte.
- **Stark typisiert**: Jede Variable hat einen festen Datentyp.
- **Automatische Speicherverwaltung**: Der Garbage Collector räumt unbenutzten Speicher auf.

## Das Java-Ökosystem

| Abkürzung | Bedeutung | Beschreibung |
|-----------|-----------|--------------|
| **JVM** | Java Virtual Machine | Führt Bytecode aus |
| **JRE** | Java Runtime Environment | JVM + Standardbibliotheken (zum Ausführen) |
| **JDK** | Java Development Kit | JRE + Compiler + Entwicklungstools (zum Entwickeln) |

## Java 21 — LTS-Release (September 2023)

Java 21 ist ein **Long-Term-Support**-Release mit wichtigen Neuerungen:
- **Virtual Threads** — leichtgewichtige Threads für hohe Parallelität
- **Pattern Matching für switch** — elegantere Fallunterscheidungen
- **Record Patterns** — Dekonstruktion von Records
- **Sequenced Collections** — geordnete Sammlungen mit einheitlicher API
- **String Templates (Preview)** — eingebettete Ausdrücke in Strings`,
  codeExamples: [
    {
      title: 'Java-Version und Systeminformationen',
      description: 'Auslesen der aktuellen Java-Version und Systemeigenschaften.',
      code: `public class JavaInfo {
    public static void main(String[] args) {
        System.out.println("=== Java-Systeminformationen ===");
        System.out.println("Java-Version: " + System.getProperty("java.version"));
        System.out.println("Java-Vendor:  " + System.getProperty("java.vendor"));
        System.out.println("OS-Name:      " + System.getProperty("os.name"));
        System.out.println("OS-Arch:      " + System.getProperty("os.arch"));
        System.out.println("User-Home:    " + System.getProperty("user.home"));
        System.out.println();
        System.out.println("Java ist objektorientiert, plattformunabhängig");
        System.out.println("und stark typisiert.");
    }
}`,
      expectedOutput: `=== Java-Systeminformationen ===
Java-Version: 21
Java-Vendor:  Oracle Corporation
OS-Name:      Windows 11
OS-Arch:      amd64
User-Home:    C:\\Users\\student
`,
      editable: true,
    },
    {
      title: 'Java 21 Record-Beispiel',
      description: 'Records sind kompakte, unveränderliche Datenklassen — ein Feature seit Java 16.',
      code: `public class RecordDemo {
    // Ein Record ersetzt eine ganze Klasse mit Konstruktor,
    // Gettern, equals(), hashCode() und toString()
    record Student(String name, int matrikelnummer, double notenschnitt) {}

    public static void main(String[] args) {
        Student s1 = new Student("Anna Müller", 12345, 1.7);
        Student s2 = new Student("Ben Schmidt", 67890, 2.3);

        System.out.println(s1);
        System.out.println(s2);
        System.out.println();
        System.out.println("Name: " + s1.name());
        System.out.println("Matrikelnr: " + s1.matrikelnummer());
        System.out.println("Schnitt: " + s1.notenschnitt());
    }
}`,
      expectedOutput: `Student[name=Anna Müller, matrikelnummer=12345, notenschnitt=1.7]
Student[name=Ben Schmidt, matrikelnummer=67890, notenschnitt=2.3]

Name: Anna Müller
Matrikelnr: 12345
Schnitt: 1.7`,
      editable: true,
    },
    {
      title: 'Java 21 — Sealed Classes und Pattern Matching',
      description: 'Demonstration moderner Java-21-Features wie versiegelte Klassen und Pattern Matching im switch.',
      code: `public class Java21Features {
    // Sealed Interface: nur bestimmte Klassen dürfen implementieren
    sealed interface Form permits Kreis, Rechteck {}
    record Kreis(double radius) implements Form {}
    record Rechteck(double breite, double hoehe) implements Form {}

    // Pattern Matching im switch (Java 21)
    static String beschreibe(Form form) {
        return switch (form) {
            case Kreis k   -> "Kreis mit Radius " + k.radius();
            case Rechteck r -> "Rechteck " + r.breite() + " x " + r.hoehe();
        };
    }

    public static void main(String[] args) {
        Form f1 = new Kreis(5.0);
        Form f2 = new Rechteck(3.0, 4.0);

        System.out.println(beschreibe(f1));
        System.out.println(beschreibe(f2));
        System.out.println();
        System.out.println("Java 21 ist ein LTS-Release.");
        System.out.println("Sealed Classes + Pattern Matching = typsichere Verzweigungen!");
    }
}`,
      expectedOutput: `Kreis mit Radius 5.0
Rechteck 3.0 x 4.0

Java 21 ist ein LTS-Release.
Sealed Classes + Pattern Matching = typsichere Verzweigungen!`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'java-sprache-q1',
      question: 'Was benötigt man mindestens, um Java-Programme zu ENTWICKELN?',
      options: [
        'Nur die JVM',
        'Das JRE (Java Runtime Environment)',
        'Das JDK (Java Development Kit)',
        'Einen Texteditor reicht aus',
      ],
      correctIndex: 2,
      explanation: 'Zum Entwickeln benötigt man das JDK, das den Compiler (javac) und weitere Entwicklungstools enthält. Das JRE reicht nur zum Ausführen fertiger Programme.',
    },
    {
      id: 'java-sprache-q2',
      question: 'Was bedeutet "Write Once, Run Anywhere" bei Java?',
      options: [
        'Java-Code muss nur einmal geschrieben und nie geändert werden',
        'Kompilierter Java-Bytecode läuft auf jeder Plattform mit JVM',
        'Java-Programme können nur auf einem Betriebssystem laufen',
        'Java-Code wird automatisch in alle Sprachen übersetzt',
      ],
      correctIndex: 1,
      explanation: 'Dank der JVM läuft kompilierter Java-Bytecode auf jedem Betriebssystem, das eine JVM bereitstellt — Windows, macOS, Linux etc.',
    },
    {
      id: 'java-sprache-q3',
      question: 'Welches Feature wurde mit Java 21 eingeführt?',
      options: [
        'Generics',
        'Lambda-Ausdrücke',
        'Virtual Threads',
        'Das var-Keyword',
      ],
      correctIndex: 2,
      explanation: 'Virtual Threads wurden mit Java 21 als finales Feature eingeführt. Generics kamen in Java 5, Lambda-Ausdrücke in Java 8 und var in Java 10.',
    },
  ],
  exercises: ['class-structure-1', 'class-structure-2'],
  keyConceptsDE: [
    'Java wurde 1995 von James Gosling bei Sun Microsystems entwickelt',
    'Write Once, Run Anywhere durch die JVM',
    'JDK = JRE + Compiler + Tools, JRE = JVM + Bibliotheken',
    'Java ist objektorientiert und stark typisiert',
    'Java 21 ist ein LTS-Release mit Virtual Threads und Pattern Matching',
  ],
  transferKnowledge: 'Jede Programmiersprache hat eine Runtime-Umgebung. Python hat den Python-Interpreter, C# hat die .NET CLR, JavaScript hat die V8-Engine (Node.js) oder den Browser. Das Verständnis des Ökosystems (SDK, Runtime, VM) ist bei jeder Sprache wichtig.',
  order: 2,
};
