import type { Topic } from '../../../types';

export const binaerzahlen: Topic = {
  id: 'binaerzahlen',
  moduleId: 'grundlagen',
  title: 'Binärzahlen & Zahlensysteme',
  description: 'Binär, Oktal, Hexadezimal — Zahlensysteme verstehen und umrechnen.',
  content: `# Binärzahlen und Zahlensysteme

Computer arbeiten intern ausschließlich mit **Binärzahlen** (Basis 2). Das Verständnis von Zahlensystemen ist daher fundamental für die Programmierung.

## Die vier wichtigsten Zahlensysteme

| System | Basis | Ziffern | Java-Präfix | Beispiel (= 255 dezimal) |
|--------|-------|---------|-------------|--------------------------|
| **Dezimal** | 10 | 0-9 | keiner | \`255\` |
| **Binär** | 2 | 0, 1 | \`0b\` | \`0b11111111\` |
| **Oktal** | 8 | 0-7 | \`0\` | \`0377\` |
| **Hexadezimal** | 16 | 0-9, A-F | \`0x\` | \`0xFF\` |

## Umrechnung Dezimal → Binär

Man teilt die Zahl wiederholt durch 2 und notiert die **Reste von unten nach oben**:
- 13 ÷ 2 = 6 Rest **1**
- 6 ÷ 2 = 3 Rest **0**
- 3 ÷ 2 = 1 Rest **1**
- 1 ÷ 2 = 0 Rest **1**
- Ergebnis: **1101**

## Umrechnung Binär → Dezimal

Jede Stelle hat einen **Stellenwert** (Zweierpotenz):
- \`1101\` = 1×8 + 1×4 + 0×2 + 1×1 = **13**

## Bits und Bytes

- **1 Bit** = eine Binärziffer (0 oder 1)
- **1 Byte** = 8 Bit = Werte von 0 bis 255
- **1 Kilobyte** = 1024 Bytes`,
  codeExamples: [
    {
      title: 'Zahlensysteme in Java',
      description: 'Java unterstützt Literale in verschiedenen Zahlensystemen direkt im Code.',
      code: `public class Zahlensysteme {
    public static void main(String[] args) {
        // Verschiedene Darstellungen der Zahl 42
        int dezimal = 42;
        int binaer = 0b101010;
        int oktal = 052;
        int hexadezimal = 0x2A;

        System.out.println("Dezimal:     " + dezimal);
        System.out.println("Binär:       " + binaer);
        System.out.println("Oktal:       " + oktal);
        System.out.println("Hexadezimal: " + hexadezimal);
        System.out.println();

        // Umrechnung mit Java-Methoden
        int zahl = 255;
        System.out.println("=== " + zahl + " in verschiedenen Systemen ===");
        System.out.println("Binär:  " + Integer.toBinaryString(zahl));
        System.out.println("Oktal:  " + Integer.toOctalString(zahl));
        System.out.println("Hex:    " + Integer.toHexString(zahl));

        // Unterstriche für bessere Lesbarkeit (seit Java 7)
        int grosseZahl = 1_000_000;
        int binaerLang = 0b1111_0000_1010_0101;
        System.out.println("\\nGroße Zahl: " + grosseZahl);
        System.out.println("Binär lang: " + binaerLang);
    }
}`,
      expectedOutput: `Dezimal:     42
Binär:       42
Oktal:       42
Hexadezimal: 42

=== 255 in verschiedenen Systemen ===
Binär:  11111111
Oktal:  377
Hex:    ff

Große Zahl: 1000000
Binär lang: 61605`,
      editable: true,
    },
    {
      title: 'Binär-Umrechner',
      description: 'Manuelle Umrechnung zwischen Dezimal und Binär mit schrittweiser Ausgabe.',
      code: `public class BinaerUmrechner {
    public static void main(String[] args) {
        int zahl = 13;

        // Dezimal → Binär (schrittweise)
        System.out.println("=== Dezimal " + zahl + " → Binär ===");
        int temp = zahl;
        StringBuilder binaer = new StringBuilder();
        while (temp > 0) {
            int rest = temp % 2;
            System.out.println(temp + " / 2 = " + (temp / 2) + " Rest " + rest);
            binaer.insert(0, rest);
            temp = temp / 2;
        }
        System.out.println("Ergebnis: " + binaer);
        System.out.println();

        // Binär → Dezimal (schrittweise)
        String binaerStr = "1101";
        System.out.println("=== Binär " + binaerStr + " → Dezimal ===");
        int ergebnis = 0;
        for (int i = 0; i < binaerStr.length(); i++) {
            int bit = binaerStr.charAt(i) - '0';
            int potenz = binaerStr.length() - 1 - i;
            int wert = bit * (int) Math.pow(2, potenz);
            System.out.println(bit + " × 2^" + potenz + " = " + wert);
            ergebnis += wert;
        }
        System.out.println("Ergebnis: " + ergebnis);
    }
}`,
      expectedOutput: `=== Dezimal 13 → Binär ===
13 / 2 = 6 Rest 1
6 / 2 = 3 Rest 0
3 / 2 = 1 Rest 1
1 / 2 = 0 Rest 1
Ergebnis: 1101

=== Binär 1101 → Dezimal ===
1 × 2^3 = 8
1 × 2^2 = 4
0 × 2^1 = 0
1 × 2^0 = 1
Ergebnis: 13`,
      editable: true,
    },
  ],
  quiz: [
    {
      id: 'binaerzahlen-q1',
      question: 'Wie wird die Dezimalzahl 10 binär dargestellt?',
      options: [
        '0b1000',
        '0b1010',
        '0b1100',
        '0b1001',
      ],
      correctIndex: 1,
      explanation: '10 dezimal = 1×8 + 0×4 + 1×2 + 0×1 = 1010 binär. Der Präfix 0b kennzeichnet in Java eine Binärzahl.',
    },
    {
      id: 'binaerzahlen-q2',
      question: 'Was ist der Java-Präfix für Hexadezimalzahlen?',
      options: [
        '0b',
        '0',
        '0x',
        '#',
      ],
      correctIndex: 2,
      explanation: 'In Java beginnen Hexadezimalzahlen mit dem Präfix 0x (z.B. 0xFF für 255). 0b ist für Binär, 0 allein für Oktal.',
    },
  ],
  exercises: ['binary-numbers-1', 'binary-numbers-2'],
  keyConceptsDE: [
    'Computer arbeiten intern mit Binärzahlen (0 und 1)',
    'Java unterstützt Literale in Dezimal, Binär (0b), Oktal (0) und Hex (0x)',
    'Umrechnung Dezimal → Binär: Wiederholt durch 2 teilen, Reste notieren',
    'Umrechnung Binär → Dezimal: Stellenwerte (Zweierpotenzen) aufsummieren',
    '1 Byte = 8 Bit = 256 mögliche Werte',
  ],
  transferKnowledge: 'Binärzahlen sind die Grundlage ALLER Computer und Programmiersprachen. Ob Java, Python, C oder JavaScript — intern werden alle Daten als Binärzahlen gespeichert. Hexadezimalzahlen werden besonders häufig für Farbcodes (#FF0000) und Speicheradressen verwendet.',
  order: 4,
};
