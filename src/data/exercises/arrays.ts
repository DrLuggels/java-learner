import type { Exercise } from '../../types';

export const arraysExercises: Exercise[] = [
  {
    id: 'arrays-01', topicId: 'arrays', title: 'Zweierpotenzen', difficulty: 'leicht',
    description: 'Berechne die Zweierpotenzen von 2^0 bis 2^15 und speichere sie in einem Array.',
    requirements: ['Nutze Math.pow(2, i)', 'Speichere die Ergebnisse in einem int-Array', 'Gib das Array aus'],
    hints: ['Array-Größe: 16 (von 0 bis 15)', 'Math.pow gibt double zurück, caste zu int'],
    starterCode: `import java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        int[] potenzen = new int[16];\n        // TODO: Zweierpotenzen berechnen und ausgeben\n    }\n}`,
    solutionCode: `import java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        int[] potenzen = new int[16];\n        for (int i = 0; i < 16; i++) {\n            potenzen[i] = (int) Math.pow(2, i);\n        }\n        System.out.println(Arrays.toString(potenzen));\n    }\n}`,
    expectedOutput: '[1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768]',
    testCases: [{ expectedOutput: '1, 2, 4, 8', description: 'Erste Potenzen korrekt' }, { expectedOutput: '32768', description: '2^15 = 32768' }],
  },
  {
    id: 'arrays-02', topicId: 'arrays', title: 'Min und Max finden', difficulty: 'leicht',
    description: 'Finde den kleinsten und größten Wert in einem Array.',
    requirements: ['Durchlaufe das Array mit einer Schleife', 'Speichere Min und Max in Variablen'],
    hints: ['Initialisiere min und max mit dem ersten Element', 'Vergleiche jedes Element mit dem aktuellen min/max'],
    starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] zahlen = {42, 17, 93, 5, 68, 31, 84, 12};\n        // TODO: Min und Max finden\n    }\n}`,
    solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] zahlen = {42, 17, 93, 5, 68, 31, 84, 12};\n        int min = zahlen[0], max = zahlen[0];\n        for (int z : zahlen) {\n            if (z < min) min = z;\n            if (z > max) max = z;\n        }\n        System.out.println("Min: " + min);\n        System.out.println("Max: " + max);\n    }\n}`,
    expectedOutput: 'Min: 5\nMax: 93',
    testCases: [{ expectedOutput: 'Min: 5', description: 'Minimum ist 5' }, { expectedOutput: 'Max: 93', description: 'Maximum ist 93' }],
  },
];
