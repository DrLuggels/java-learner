import type { Exercise } from '../../types';

export const binaryNumbersExercises: Exercise[] = [
  {
    id: 'binary-numbers-1',
    topicId: 'binaerzahlen',
    title: 'Binär-Dezimal Umrechnung',
    difficulty: 'leicht',
    description:
      'Schreibe ein Programm, das verschiedene Binärzahlen in Dezimalzahlen umrechnet und umgekehrt. Nutze dazu die Java-Methoden Integer.parseInt() und Integer.toBinaryString().',
    requirements: [
      'Wandle die Binärzahl "1010" in eine Dezimalzahl um und gib das Ergebnis aus',
      'Wandle die Binärzahl "11111111" in eine Dezimalzahl um und gib das Ergebnis aus',
      'Wandle die Dezimalzahl 42 in eine Binärzahl um und gib das Ergebnis aus',
      'Wandle die Dezimalzahl 128 in eine Binärzahl um und gib das Ergebnis aus',
    ],
    hints: [
      'Java bietet eingebaute Methoden zur Umrechnung zwischen Zahlensystemen.',
      'Integer.parseInt("1010", 2) wandelt einen Binär-String in eine Dezimalzahl um. Die 2 steht für die Basis.',
      'Integer.toBinaryString(42) wandelt eine Dezimalzahl in einen zugehörigen Binär-String um.',
    ],
    starterCode: `public class BinaerUmrechnung {

    public static void main(String[] args) {
        // TODO: Wandle die Binärzahl "1010" in Dezimal um
        // Tipp: Integer.parseInt(string, basis)
        System.out.println("Binär 1010 = Dezimal " + /* TODO */);

        // TODO: Wandle die Binärzahl "11111111" in Dezimal um
        System.out.println("Binär 11111111 = Dezimal " + /* TODO */);

        // TODO: Wandle die Dezimalzahl 42 in Binär um
        // Tipp: Integer.toBinaryString(zahl)
        System.out.println("Dezimal 42 = Binär " + /* TODO */);

        // TODO: Wandle die Dezimalzahl 128 in Binär um
        System.out.println("Dezimal 128 = Binär " + /* TODO */);
    }

}`,
    solutionCode: `public class BinaerUmrechnung {

    public static void main(String[] args) {
        // Binär -> Dezimal
        int dezimal1 = Integer.parseInt("1010", 2);
        System.out.println("Binär 1010 = Dezimal " + dezimal1);

        int dezimal2 = Integer.parseInt("11111111", 2);
        System.out.println("Binär 11111111 = Dezimal " + dezimal2);

        // Dezimal -> Binär
        String binaer1 = Integer.toBinaryString(42);
        System.out.println("Dezimal 42 = Binär " + binaer1);

        String binaer2 = Integer.toBinaryString(128);
        System.out.println("Dezimal 128 = Binär " + binaer2);
    }

}`,
    expectedOutput: `Binär 1010 = Dezimal 10
Binär 11111111 = Dezimal 255
Dezimal 42 = Binär 101010
Dezimal 128 = Binär 10000000`,
    testCases: [
      {
        expectedOutput: 'Binär 1010 = Dezimal 10',
        description: 'Binärzahl 1010 wird korrekt in Dezimal 10 umgerechnet',
      },
      {
        expectedOutput: 'Dezimal 42 = Binär 101010',
        description: 'Dezimalzahl 42 wird korrekt in Binär 101010 umgerechnet',
      },
    ],
  },
  {
    id: 'binary-numbers-2',
    topicId: 'binaerzahlen',
    title: 'Hexadezimal-Umrechnung',
    difficulty: 'mittel',
    description:
      'Schreibe ein Programm, das Umrechnungen zwischen Dezimal-, Binär- und Hexadezimalzahlen durchführt. Hexadezimalzahlen (Basis 16) werden häufig in der Informatik verwendet, z.B. für Farben in HTML (#FF0000) oder Speicheradressen.',
    requirements: [
      'Wandle die Dezimalzahl 255 in Hexadezimal um und gib das Ergebnis aus',
      'Wandle die Dezimalzahl 16777215 (= weiss als Farbe) in Hexadezimal um',
      'Wandle den Hex-String "1A3F" in eine Dezimalzahl um',
      'Zeige die Java-Literale für Hex (0x) und Binär (0b) am Beispiel der Zahl 255',
    ],
    hints: [
      'Hexadezimalzahlen nutzen die Ziffern 0-9 und die Buchstaben A-F für die Werte 10-15.',
      'Integer.toHexString(zahl) wandelt in Hex um, Integer.parseInt(string, 16) liest Hex ein.',
      'In Java kannst du Hex-Literale mit dem Präfix 0x schreiben (z.B. 0xFF) und Binär-Literale mit 0b (z.B. 0b11111111).',
    ],
    starterCode: `public class HexUmrechnung {

    public static void main(String[] args) {
        // TODO: Dezimal 255 in Hexadezimal umwandeln
        System.out.println("Dezimal 255 = Hex " + /* TODO */);

        // TODO: Dezimal 16777215 in Hexadezimal umwandeln
        System.out.println("Dezimal 16777215 = Hex " + /* TODO */);

        // TODO: Hex "1A3F" in Dezimal umwandeln
        System.out.println("Hex 1A3F = Dezimal " + /* TODO */);

        // TODO: Verwende Java-Literale (0x und 0b) für die Zahl 255
        int hexLiteral = 0; // TODO: Hex-Literal für 255
        int binLiteral = 0; // TODO: Binär-Literal für 255
        System.out.println("Hex-Literal 0xFF = " + hexLiteral);
        System.out.println("Binär-Literal 0b11111111 = " + binLiteral);
        System.out.println("Alle gleich? " + (255 == hexLiteral && hexLiteral == binLiteral));
    }

}`,
    solutionCode: `public class HexUmrechnung {

    public static void main(String[] args) {
        // Dezimal -> Hexadezimal
        System.out.println("Dezimal 255 = Hex " + Integer.toHexString(255));

        System.out.println("Dezimal 16777215 = Hex " + Integer.toHexString(16777215));

        // Hexadezimal -> Dezimal
        int dezimal = Integer.parseInt("1A3F", 16);
        System.out.println("Hex 1A3F = Dezimal " + dezimal);

        // Java-Literale
        int hexLiteral = 0xFF;
        int binLiteral = 0b11111111;
        System.out.println("Hex-Literal 0xFF = " + hexLiteral);
        System.out.println("Binär-Literal 0b11111111 = " + binLiteral);
        System.out.println("Alle gleich? " + (255 == hexLiteral && hexLiteral == binLiteral));
    }

}`,
    expectedOutput: `Dezimal 255 = Hex ff
Dezimal 16777215 = Hex ffffff
Hex 1A3F = Dezimal 6719
Hex-Literal 0xFF = 255
Binär-Literal 0b11111111 = 255
Alle gleich? true`,
    testCases: [
      {
        expectedOutput: 'Dezimal 255 = Hex ff',
        description: 'Dezimalzahl 255 wird korrekt in Hexadezimal ff umgerechnet',
      },
      {
        expectedOutput: 'Alle gleich? true',
        description: 'Hex-Literal und Binär-Literal ergeben denselben Wert wie 255',
      },
    ],
  },
];
