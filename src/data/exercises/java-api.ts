import type { Exercise } from '../../types';
export const javaApiExercises: Exercise[] = [
  { id: 'java-api-01', topicId: 'java-api', title: 'String-Methoden', difficulty: 'leicht',
    description: 'Wende verschiedene String-Methoden an und gib die Ergebnisse aus.',
    requirements: ['Nutze length(), toUpperCase(), substring(), contains(), replace()'],
    hints: ['String-Methoden geben einen neuen String zurück', 'Strings sind unveränderlich!'],
    starterCode: `public class Main {\n    public static void main(String[] args) {\n        String text = "Hallo Java Welt";\n        // TODO: String-Methoden anwenden\n    }\n}`,
    solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String text = "Hallo Java Welt";\n        System.out.println("Laenge: " + text.length());\n        System.out.println("Gross: " + text.toUpperCase());\n        System.out.println("Sub(6,10): " + text.substring(6, 10));\n        System.out.println("Enthaelt Java: " + text.contains("Java"));\n        System.out.println("Ersetzt: " + text.replace("Java", "Python"));\n    }\n}`,
    expectedOutput: 'Laenge: 15\nGross: HALLO JAVA WELT\nSub(6,10): Java\nEnthaelt Java: true\nErsetzt: Hallo Python Welt',
    testCases: [{ expectedOutput: '15', description: 'Länge korrekt' }, { expectedOutput: 'HALLO JAVA WELT', description: 'toUpperCase korrekt' }],
  },
];
