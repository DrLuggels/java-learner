import type { Exercise } from '../../types';
export const enumsExercises: Exercise[] = [
  { id: 'enums-01', topicId: 'enums', title: 'Jahreszeiten-Enum', difficulty: 'mittel',
    description: 'Erstelle ein Enum Season (Jahreszeit) mit den vier Jahreszeiten. Jede Jahreszeit soll einen deutschen Namen und eine durchschnittliche Temperatur speichern. Implementiere eine Methode, die beschreibt, ob es warm oder kalt ist.',
    requirements: ['Enum Season mit SPRING, SUMMER, AUTUMN, WINTER', 'Jede Konstante hat einen deutschen Namen (String) und eine Durchschnittstemperatur (int)', 'Methode getDescription() gibt z.B. "Fruehling (15°C) - mild" zurueck', 'Methode isWarm() gibt true zurueck wenn Temperatur >= 15', 'In main(): Alle Jahreszeiten mit einer for-each-Schleife ausgeben'],
    hints: ['Enums koennen Konstruktoren, Felder und Methoden haben', 'Nutze Season.values() um alle Konstanten zu durchlaufen', 'Der Konstruktor eines Enums ist immer private'],
    starterCode: `// TODO: Enum Season mit deutschem Namen und Temperatur\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Alle Jahreszeiten durchlaufen und ausgeben\n    }\n}`,
    solutionCode: `enum Season {\n    SPRING("Fruehling", 15),\n    SUMMER("Sommer", 25),\n    AUTUMN("Herbst", 10),\n    WINTER("Winter", 0);\n\n    private final String germanName;\n    private final int avgTemperature;\n\n    Season(String germanName, int avgTemperature) {\n        this.germanName = germanName;\n        this.avgTemperature = avgTemperature;\n    }\n\n    public String getGermanName() { return germanName; }\n    public int getAvgTemperature() { return avgTemperature; }\n\n    public boolean isWarm() {\n        return avgTemperature >= 15;\n    }\n\n    public String getDescription() {\n        String feeling = isWarm() ? "warm" : "kalt";\n        return germanName + " (" + avgTemperature + "°C) - " + feeling;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        for (Season s : Season.values()) {\n            System.out.println(s.getDescription());\n        }\n        System.out.println("---");\n        Season liebling = Season.SUMMER;\n        System.out.println("Lieblingsjahreszeit: " + liebling.getGermanName());\n        System.out.println("Ist warm: " + liebling.isWarm());\n    }\n}`,
    expectedOutput: 'Fruehling (15°C) - warm\nSommer (25°C) - warm\nHerbst (10°C) - kalt\nWinter (0°C) - kalt\n---\nLieblingsjahreszeit: Sommer\nIst warm: true',
    testCases: [
      { expectedOutput: 'Fruehling (15°C) - warm', description: 'Fruehling wird korrekt ausgegeben' },
      { expectedOutput: 'Winter (0°C) - kalt', description: 'Winter wird als kalt erkannt' },
      { expectedOutput: 'Lieblingsjahreszeit: Sommer', description: 'Enum-Wert kann abgerufen werden' },
    ],
  },
];
