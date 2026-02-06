import type { Exercise } from '../../types';

export const classStructureExercises: Exercise[] = [
  {
    id: 'class-structure-1',
    topicId: 'klassenaufbau',
    title: 'Erste Java-Klasse',
    difficulty: 'leicht',
    description:
      'Erstelle deine erste Java-Klasse mit einer main-Methode, die "Hallo Java!" auf der Konsole ausgibt. Dies ist der klassische Einstieg in jede Programmiersprache.',
    requirements: [
      'Erstelle eine öffentliche Klasse namens "HalloJava"',
      'Implementiere die main-Methode mit der korrekten Signatur',
      'Gib den Text "Hallo Java!" mit System.out.println aus',
    ],
    hints: [
      'Jede Java-Klasse beginnt mit "public class" gefolgt vom Klassennamen.',
      'Die main-Methode hat immer die Signatur: public static void main(String[] args)',
      'Verwende System.out.println("Hallo Java!"); um Text auf der Konsole auszugeben.',
    ],
    starterCode: `public class HalloJava {

    // TODO: Implementiere die main-Methode
    // TODO: Gib "Hallo Java!" auf der Konsole aus

}`,
    solutionCode: `public class HalloJava {

    public static void main(String[] args) {
        System.out.println("Hallo Java!");
    }

}`,
    expectedOutput: 'Hallo Java!',
    testCases: [
      {
        expectedOutput: 'Hallo Java!',
        description: 'Das Programm gibt "Hallo Java!" aus',
      },
      {
        expectedOutput: 'Hallo Java!',
        description: 'Die Ausgabe enthält genau den Text "Hallo Java!" (mit Ausrufezeichen)',
      },
    ],
  },
];
