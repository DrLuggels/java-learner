import type { Exercise } from '../../types';

export const ooExercises: Exercise[] = [
  {
    id: 'oo-01', topicId: 'klassen', title: 'Vehicle-Klasse', difficulty: 'mittel',
    description: 'Erstelle die Klasse Vehicle mit Attributen und Methoden. Erstelle ein Fahrzeug, beschleunige und bremse es.',
    requirements: ['Erstelle die Klasse Vehicle gemäß der Tabelle', 'Erstelle eine Main-Klasse die ein Fahrzeug erzeugt und testet'],
    hints: ['Alle Attribute sind private', 'Getter geben Werte zurück, Setter setzen Werte', 'toString() gibt "Hersteller Modell" zurück'],
    tables: [{
      title: 'Attribute der Klasse Vehicle',
      headers: ['Attribut', 'Datentyp', 'Sichtbarkeit'],
      rows: [['make', 'String', 'private'], ['model', 'String', 'private'], ['speedInKmh', 'double', 'private']],
    }, {
      title: 'Methoden der Klasse Vehicle',
      headers: ['Methode', 'Rückgabewert', 'Beschreibung'],
      rows: [
        ['setMake(make: String)', 'void', 'Hersteller setzen'],
        ['setModel(model: String)', 'void', 'Modell setzen'],
        ['getMake()', 'String', 'Hersteller zurückgeben'],
        ['getModel()', 'String', 'Modell zurückgeben'],
        ['getSpeedInKmh()', 'double', 'Geschwindigkeit zurückgeben'],
        ['accelerate(valueInKmh: int)', 'void', 'Beschleunigen + Konsolenausgabe'],
        ['brake(valueInKmh: int)', 'void', 'Bremsen + Konsolenausgabe'],
        ['toString()', 'String', 'Gibt "Hersteller Modell" zurück'],
      ],
    }],
    starterCode: `// TODO: Erstelle die Klasse Vehicle\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Vehicle erstellen und testen\n    }\n}`,
    solutionCode: `class Vehicle {\n    private String make;\n    private String model;\n    private double speedInKmh;\n\n    public void setMake(String make) { this.make = make; }\n    public void setModel(String model) { this.model = model; }\n    public String getMake() { return make; }\n    public String getModel() { return model; }\n    public double getSpeedInKmh() { return speedInKmh; }\n\n    public void accelerate(int valueInKmh) {\n        speedInKmh += valueInKmh;\n        System.out.println(this + " beschleunigt auf " + speedInKmh + "km/h");\n    }\n\n    public void brake(int valueInKmh) {\n        speedInKmh -= valueInKmh;\n        System.out.println(this + " bremst auf " + speedInKmh + "km/h ab");\n    }\n\n    public String toString() { return make + " " + model; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Vehicle v = new Vehicle();\n        v.setMake("Porsche");\n        v.setModel("911");\n        v.accelerate(30);\n        v.accelerate(30);\n        v.brake(20);\n        v.accelerate(40);\n    }\n}`,
    expectedOutput: 'Porsche 911 beschleunigt auf 30.0km/h\nPorsche 911 beschleunigt auf 60.0km/h\nPorsche 911 bremst auf 40.0km/h ab\nPorsche 911 beschleunigt auf 80.0km/h',
    testCases: [{ expectedOutput: 'beschleunigt auf 30.0km/h', description: 'Erste Beschleunigung' }, { expectedOutput: 'bremst auf 40.0km/h', description: 'Bremsen funktioniert' }],
  },
  {
    id: 'oo-02', topicId: 'klassen', title: 'Bankkonto', difficulty: 'mittel',
    description: 'Erstelle eine Klasse BankAccount mit Einzahlung, Abhebung und Kontostandabfrage.',
    requirements: ['Attribute: owner (String), balance (double)', 'Methoden: deposit(), withdraw() mit Validierung, getBalance()', 'Abhebung nur wenn genug Guthaben'],
    hints: ['Prüfe bei withdraw() ob genug Guthaben da ist', 'Gib bei ungültiger Abhebung eine Fehlermeldung aus'],
    starterCode: `// TODO: Erstelle die Klasse BankAccount\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Konto erstellen und Transaktionen durchfuehren\n    }\n}`,
    solutionCode: `class BankAccount {\n    private String owner;\n    private double balance;\n\n    public BankAccount(String owner, double initial) {\n        this.owner = owner;\n        this.balance = initial;\n    }\n\n    public void deposit(double amount) {\n        balance += amount;\n        System.out.printf("%s: +%.2f EUR (Kontostand: %.2f EUR)%n", owner, amount, balance);\n    }\n\n    public void withdraw(double amount) {\n        if (amount > balance) {\n            System.out.printf("%s: Abhebung von %.2f EUR abgelehnt! (Kontostand: %.2f EUR)%n", owner, amount, balance);\n        } else {\n            balance -= amount;\n            System.out.printf("%s: -%.2f EUR (Kontostand: %.2f EUR)%n", owner, amount, balance);\n        }\n    }\n\n    public double getBalance() { return balance; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        BankAccount konto = new BankAccount("Max", 1000);\n        konto.deposit(500);\n        konto.withdraw(200);\n        konto.withdraw(2000);\n    }\n}`,
    expectedOutput: 'Max: +500,00 EUR (Kontostand: 1500,00 EUR)\nMax: -200,00 EUR (Kontostand: 1300,00 EUR)\nMax: Abhebung von 2000,00 EUR abgelehnt! (Kontostand: 1300,00 EUR)',
    testCases: [{ expectedOutput: '1500', description: 'Einzahlung funktioniert' }, { expectedOutput: 'abgelehnt', description: 'Zu hohe Abhebung wird abgelehnt' }],
  },
];
