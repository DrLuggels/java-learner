export const examples = {
  1: [
    {
      title: 'Datentypen & Casting ausprobieren',
      code: `public class Main {
    public static void main(String[] args) {
        // Probiere verschiedene Datentypen aus!
        int ganzzahl = 42;
        double kommazahl = 3.14;
        char buchstabe = 'A';
        boolean wahr = true;
        String text = "Hallo Java!";

        System.out.println(ganzzahl);
        System.out.println(kommazahl);
        System.out.println(buchstabe);
        System.out.println(wahr);
        System.out.println(text);

        // Casting: double zu int (schneidet ab!)
        System.out.println((int) 3.9);
        System.out.println((int) -2.7);

        // Ganzzahldivision vs Kommazahldivision
        System.out.println(5 / 2);
        System.out.println(5.0 / 2);
    }
}`,
    },
    {
      title: 'Strings & char-Tricks',
      code: `public class Main {
    public static void main(String[] args) {
        String name = "Java Mastery";
        System.out.println(name.length());
        System.out.println(name.charAt(0));
        System.out.println(name.substring(0, 4));
        System.out.println(name.toUpperCase());

        // char + int = int!
        System.out.println('A' + 1);
        System.out.println('a' + 0);

        // Binaerzahlen
        int bin = 0b1010;
        System.out.println(bin);
    }
}`,
    },
  ],
  2: [
    {
      title: 'Operatoren & Inkrement',
      code: `public class Main {
    public static void main(String[] args) {
        // Pre vs Post Inkrement
        int a = 5;
        System.out.println(a++);
        System.out.println(a);
        int b = 5;
        System.out.println(++b);

        // Modulo
        System.out.println(10 % 3);
        System.out.println(7 % 2);

        // Ternaerer Operator
        int alter = 20;
        String status = alter >= 18 ? "Erwachsen" : "Minderjaehrig";
        System.out.println(status);
    }
}`,
    },
    {
      title: 'String-Konkatenation (Klausur-Falle!)',
      code: `public class Main {
    public static void main(String[] args) {
        // Aendere die Werte und beobachte!
        System.out.println(5 + 3 + "ha");
        System.out.println("ha" + 5 + 3);
        System.out.println("ha" + (5 + 3));
        System.out.println(5 + 3 + "ha" + 5 + 3);

        // Short-Circuit
        int x = 0;
        boolean result = false && (++x > 0);
        System.out.println("x = " + x);
    }
}`,
    },
  ],
  3: [
    {
      title: 'if-else & switch ausprobieren',
      code: `public class Main {
    public static void main(String[] args) {
        // Aendere note und schau was passiert!
        int note = 2;

        if (note == 1) {
            System.out.println("Sehr gut!");
        } else if (note == 2) {
            System.out.println("Gut!");
        } else if (note <= 4) {
            System.out.println("Bestanden");
        } else {
            System.out.println("Durchgefallen");
        }

        // Ternaerer Operator
        String ergebnis = note <= 4 ? "bestanden" : "nicht bestanden";
        System.out.println(ergebnis);
    }
}`,
    },
  ],
  4: [
    {
      title: 'Schleifen verstehen',
      code: `public class Main {
    public static void main(String[] args) {
        // for-Schleife
        for (int i = 0; i < 5; i++) {
            System.out.println("i = " + i);
        }

        // Summe berechnen
        int summe = 0;
        for (int i = 1; i <= 10; i++) {
            summe = summe + i;
        }
        System.out.println("Summe 1-10: " + summe);

        // continue ueberspringt gerade Zahlen
        for (int i = 1; i <= 6; i++) {
            if (i % 2 == 0) {
                continue;
            }
            System.out.println("Ungerade: " + i);
        }
    }
}`,
    },
  ],
  5: [
    {
      title: 'Arrays verwenden',
      code: `public class Main {
    public static void main(String[] args) {
        int[] zahlen = {10, 20, 30, 40, 50};
        System.out.println("Laenge: " + zahlen.length);
        System.out.println("Erstes: " + zahlen[0]);
        System.out.println("Letztes: " + zahlen[4]);

        // Alle Elemente ausgeben
        for (int i = 0; i < zahlen.length; i++) {
            System.out.println("Index " + i + ": " + zahlen[i]);
        }

        // Maximum finden
        int max = zahlen[0];
        for (int i = 1; i < zahlen.length; i++) {
            if (zahlen[i] > max) {
                max = zahlen[i];
            }
        }
        System.out.println("Maximum: " + max);
    }
}`,
    },
  ],
  6: [
    {
      title: 'Variablen & Methoden simulieren',
      code: `public class Main {
    public static void main(String[] args) {
        // Simuliert Klassen-Konzepte
        String name = "Max";
        int alter = 22;

        // toString-Muster
        System.out.println("Person{name=" + name + ", alter=" + alter + "}");

        // static Zaehler-Muster
        int counter = 0;
        counter++;
        counter++;
        counter++;
        System.out.println("Erstellt: " + counter + " Objekte");
    }
}`,
    },
  ],
  7: [
    {
      title: 'Enum-Logik nachvollziehen',
      code: `public class Main {
    public static void main(String[] args) {
        // Enum-Werte simuliert
        String[] motorTypen = {"ELECTRO", "DIESEL", "BENZIN"};
        boolean[] nachhaltig = {true, false, false};

        for (int i = 0; i < motorTypen.length; i++) {
            String typ = motorTypen[i];
            System.out.println(typ + " - nachhaltig: " + nachhaltig[i]);
        }

        // ordinal() = Index
        System.out.println("DIESEL ordinal: " + 1);
    }
}`,
    },
  ],
  8: [
    {
      title: 'Polymorphie & Typen verstehen',
      code: `public class Main {
    public static void main(String[] args) {
        // Statischer vs Dynamischer Typ
        String statischerTyp = "Fahrzeug";
        String dynamischerTyp = "Auto";

        System.out.println("Variable deklariert als: " + statischerTyp);
        System.out.println("Tatsaechliches Objekt: " + dynamischerTyp);
        System.out.println("Aufrufbare Methoden bestimmt: " + statischerTyp);
        System.out.println("Ausgefuehrte Implementation: " + dynamischerTyp);

        // instanceof-Check
        boolean istAuto = true;
        if (istAuto) {
            System.out.println("Downcast moeglich!");
        }
    }
}`,
    },
  ],
  9: [
    {
      title: 'Interface vs Abstrakte Klasse',
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("=== Abstrakte Klasse ===");
        System.out.println("- Kann Attribute haben");
        System.out.println("- Kann Konstruktor haben");
        System.out.println("- Nur EINE Vererbung");
        System.out.println("- Kann abstrakte + konkrete Methoden haben");

        System.out.println("");
        System.out.println("=== Interface ===");
        System.out.println("- Keine Instanz-Attribute");
        System.out.println("- Kein Konstruktor");
        System.out.println("- MEHRERE implementierbar");
        System.out.println("- Nur abstrakte + default Methoden");
    }
}`,
    },
  ],
  10: [
    {
      title: 'ArrayList-Operationen simulieren',
      code: `public class Main {
    public static void main(String[] args) {
        // ArrayList simuliert mit Array-Operationen
        String[] liste = {"Apfel", "Birne", "Kirsche"};
        System.out.println("Size: " + liste.length);
        System.out.println("Get(0): " + liste[0]);
        System.out.println("Contains Birne: " + true);

        // ACHTUNG: remove(1) entfernt INDEX 1!
        // Nicht den WERT 1!
        int[] zahlen = {10, 20, 30};
        System.out.println("Vor remove(1): 10, 20, 30");
        System.out.println("Nach remove(1): 10, 30");
        System.out.println("(Index 1 entfernt, nicht Wert 1!)");
    }
}`,
    },
  ],
  11: [
    {
      title: 'Exception-Ablauf verstehen',
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("1: Vor try");

        // try-catch-finally Ablauf
        System.out.println("2: Im try-Block");
        boolean fehler = true;

        if (fehler) {
            System.out.println("3: Exception geworfen!");
            System.out.println("4: Im catch-Block");
        }

        System.out.println("5: Im finally-Block (IMMER)");
        System.out.println("6: Nach try-catch");

        // Aendere fehler zu false und beobachte!
    }
}`,
    },
  ],
  12: [
    {
      title: 'Sortierung nachvollziehen',
      code: `public class Main {
    public static void main(String[] args) {
        // compareTo Rueckgabewerte
        int a = 3;
        int b = 5;
        int result = a - b;
        System.out.println("compare(3, 5) = " + result);
        System.out.println("Bedeutung: 3 ist KLEINER als 5");

        System.out.println("");

        // Aufsteigend: this - other
        // Absteigend: other - this
        int aufsteigend = a - b;
        int absteigend = b - a;
        System.out.println("Aufsteigend: " + aufsteigend + " (negativ = a kommt zuerst)");
        System.out.println("Absteigend: " + absteigend + " (positiv = b kommt zuerst)");
    }
}`,
    },
  ],
}
