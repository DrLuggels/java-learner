import type { Topic } from '../../../types';

export const programmieren: Topic = {
  id: 'programmieren',
  moduleId: 'grundlagen',
  title: 'Was ist Programmieren?',
  description: 'Grundlegende Konzepte: Compiler, Interpreter, JVM und Maschinensprache.',
  content: `# Was ist Programmieren?

Programmieren bedeutet, einem Computer **Anweisungen** zu geben, die er Schritt für Schritt ausführt. Diese Anweisungen werden in einer **Programmiersprache** geschrieben, die der Mensch lesen und verstehen kann.

## Compiler vs. Interpreter

- **Compiler**: Übersetzt den gesamten Quellcode *vor* der Ausführung in Maschinensprache (z.B. C, C++). Das Ergebnis ist eine ausführbare Datei.
- **Interpreter**: Liest und führt den Quellcode *Zeile für Zeile* zur Laufzeit aus (z.B. Python, JavaScript).
- **Java** nutzt einen **Hybridansatz**: Der Compiler erzeugt **Bytecode** (.class-Dateien), der dann von der **JVM** (Java Virtual Machine) interpretiert bzw. mit dem **JIT-Compiler** (Just-In-Time) in nativen Maschinencode übersetzt wird.

## Die Java Virtual Machine (JVM)

Die JVM ist eine virtuelle Maschine, die Java-Bytecode ausführt. Sie ist der Schlüssel zum Prinzip **"Write Once, Run Anywhere"** — ein kompiliertes Java-Programm läuft auf jedem Betriebssystem, auf dem eine JVM installiert ist.

## Maschinensprache

Computer verstehen nur **Binärcode** (Nullen und Einsen). Jede Programmiersprache muss daher irgendwann in Maschinensprache übersetzt werden — ob direkt durch einen Compiler oder indirekt über eine virtuelle Maschine.

## Ablauf bei Java
1. Quellcode schreiben (\`.java\`-Datei)
2. Compilieren mit \`javac\` → Bytecode (\`.class\`-Datei)
3. Ausführen mit \`java\` → JVM führt den Bytecode aus`,
  codeExamples: [
    {
      title: 'Erstes Java-Programm',
      description: 'Das klassische "Hallo Welt"-Programm — der Einstieg in jede Programmiersprache.',
      code: `public class HalloWelt {
    public static void main(String[] args) {
        // Dies ist ein Kommentar - er wird vom Compiler ignoriert
        System.out.println("Hallo, Welt!");
        System.out.println("Willkommen bei Java 21!");
    }
}`,
      expectedOutput: `Hallo, Welt!
Willkommen bei Java 21!`,
      editable: true,
    },
    {
      title: 'Kompilierung simulieren',
      description: 'Veranschaulichung des Kompilierungsprozesses mit Konsolenausgaben.',
      code: `public class KompilierungDemo {
    public static void main(String[] args) {
        System.out.println("Schritt 1: Quellcode (.java) geschrieben");
        System.out.println("Schritt 2: javac kompiliert zu Bytecode (.class)");
        System.out.println("Schritt 3: JVM führt Bytecode aus");
        System.out.println();
        System.out.println("Ergebnis: Das Programm läuft!");
        System.out.println("Plattform: " + System.getProperty("os.name"));
        System.out.println("Java-Version: " + System.getProperty("java.version"));
    }
}`,
      expectedOutput: `Schritt 1: Quellcode (.java) geschrieben
Schritt 2: javac kompiliert zu Bytecode (.class)
Schritt 3: JVM führt Bytecode aus

Ergebnis: Das Programm läuft!
Plattform: Windows 11
Java-Version: 21`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'programmieren-q1',
      question: 'Was erzeugt der Java-Compiler (javac) aus dem Quellcode?',
      options: [
        'Direkt ausführbaren Maschinencode',
        'Bytecode (.class-Dateien)',
        'Einen Interpreter',
        'Eine .exe-Datei',
      ],
      correctIndex: 1,
      explanation: 'Der Java-Compiler erzeugt Bytecode in .class-Dateien. Dieser Bytecode wird dann von der JVM ausgeführt, nicht direkt vom Betriebssystem.',
    },
    {
      id: 'programmieren-q2',
      question: 'Was ist der Hauptvorteil der JVM?',
      options: [
        'Sie macht Java-Programme schneller als C-Programme',
        'Sie ermöglicht plattformunabhängige Ausführung (Write Once, Run Anywhere)',
        'Sie ersetzt den Compiler vollständig',
        'Sie erzeugt automatisch grafische Benutzeroberflächen',
      ],
      correctIndex: 1,
      explanation: 'Die JVM ermöglicht es, kompilierten Java-Bytecode auf jedem Betriebssystem auszuführen, auf dem eine JVM installiert ist — das ist das "Write Once, Run Anywhere"-Prinzip.',
    },
  ],
  exercises: ['class-structure-1', 'class-structure-2'],
  keyConceptsDE: [
    'Compiler übersetzt Quellcode vor der Ausführung',
    'Interpreter führt Code Zeile für Zeile aus',
    'Java nutzt einen Hybridansatz: Compiler + JVM',
    'Bytecode ist der Zwischencode zwischen Quellcode und Maschinensprache',
    'JVM ermöglicht plattformunabhängige Ausführung',
  ],
  transferKnowledge: 'Das Konzept von Compiler, Interpreter und virtuellen Maschinen gilt für ALLE Programmiersprachen. Python nutzt einen Interpreter, C einen Compiler, und C# eine ähnliche virtuelle Maschine (CLR). Das Verständnis dieser Grundlagen hilft bei jeder Sprache.',
  order: 1,
};
